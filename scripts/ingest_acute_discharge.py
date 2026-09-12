from __future__ import annotations

import csv
import io
import json
import math
import os
import re
import statistics
import urllib.request
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path

SOURCE_URL = os.environ.get(
    "ACUTE_DISCHARGE_SOURCE_URL",
    "https://www.england.nhs.uk/statistics/wp-content/uploads/sites/2/2026/09/Daily-discharge-sitrep-monthly-data-webfile-05-CSV-aug26.csv",
)
OUT = Path("data/generated/acute-discharge-latest.json")
RAW = Path("data/raw/acute-discharge-august-2026.csv")
PRIMARY_REASON_GROUP = "delay reason los 7"


def norm(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", " ", (value or "").lower()).strip()


def to_number(value):
    if value is None:
        return None
    text = str(value).strip().replace(",", "").replace("%", "")
    if not text or text.lower() in {"-", ".", "..", "n/a", "na", "null", "*", "[z]"}:
        return None
    try:
        number = float(text)
        return number if math.isfinite(number) else None
    except ValueError:
        return None


def choose(headers, terms):
    ranked = []
    for header in headers:
        n = norm(header)
        score = sum(term in n for term in terms)
        if score:
            ranked.append((score, header))
    return max(ranked, default=(0, None))[1]


def decode_payload(payload: bytes):
    for encoding in ("utf-8-sig", "cp1252", "latin-1"):
        try:
            return payload.decode(encoding), encoding
        except UnicodeDecodeError:
            continue
    return payload.decode("utf-8", errors="replace"), "utf-8-replace"


def describe(values):
    values = sorted(v for v in values if v is not None)
    if not values:
        return None
    def pct(p):
        if len(values) == 1:
            return values[0]
        x = (len(values) - 1) * p
        lo, hi = math.floor(x), math.ceil(x)
        return values[lo] if lo == hi else values[lo] + (values[hi] - values[lo]) * (x - lo)
    return {
        "n": len(values), "min": min(values), "p25": pct(.25),
        "median": statistics.median(values), "p75": pct(.75),
        "max": max(values), "mean": statistics.fmean(values),
    }


def source_family(metric: str) -> str:
    n = norm(metric)
    if "hospital process" in n:
        return "Hospital process"
    if "wellbeing concerns" in n:
        return "Wellbeing / patient factors"
    if "care transfer hub process" in n:
        return "Care transfer hub"
    if "interface process" in n:
        return "Interface process"
    if "capacity" in n:
        return "Downstream capacity"
    return "Other coded reason"


def classify_reason(metric: str) -> str:
    n = norm(metric)
    if "patient transport" in n or "transport services" in n or "ambulance" in n:
        return "Transport"
    if "medicines to take home" in n or "discharge letter" in n or "medical review" in n or "therapy review" in n or "formal decision to discharge" in n or "referral to care transfer hub" in n:
        return "Hospital process"
    if "home based rehabilitation" in n or "home based community health" in n or "bed based rehabilitation" in n or "mental health admitted patient care" in n:
        return "Community / rehabilitation"
    if "home based social care" in n or "restart of existing social care" in n or "self funded care package" in n:
        return "Home care / package of care"
    if "residential nursing home" in n:
        return "Residential / nursing placement"
    if "equipment" in n or "housing adaptations" in n or "housing provision" in n or "homeless" in n:
        return "Equipment / housing"
    if "funding eligibility" in n or "fast track chc" in n or "continuing healthcare" in n:
        return "Funding / approval"
    if "patient family carer choice" in n or "patient family carer concerns" in n or "mental capacity" in n or "safeguarding" in n:
        return "Patient / family / safeguarding"
    if "care transfer hub" in n or "immediate care needs and pathway" in n:
        return "Care transfer hub"
    if "discharge destination readiness" in n or "out of area discharge" in n or "further action requested by agreed provider" in n:
        return "Cross-system interface"
    return source_family(metric)


def main():
    req = urllib.request.Request(SOURCE_URL, headers={"User-Agent": "Sitora-NHS-Resource-Intelligence/1.0"})
    with urllib.request.urlopen(req, timeout=120) as response:
        payload = response.read()

    RAW.parent.mkdir(parents=True, exist_ok=True)
    RAW.write_bytes(payload)

    text, encoding = decode_payload(payload)
    reader = csv.DictReader(io.StringIO(text))
    rows = list(reader)
    headers = reader.fieldnames or []

    provider_col = "Org Name" if "Org Name" in headers else choose(headers, ["org name", "provider name", "organisation name", "organization name", "trust name"])
    provider_code_col = "Org Code" if "Org Code" in headers else choose(headers, ["org code", "provider code", "organisation code", "organization code", "trust code"])
    region_col = "Region" if "Region" in headers else choose(headers, ["region"])
    icb_col = "ICB" if "ICB" in headers else choose(headers, ["icb", "integrated care board"])
    metric_col = "Metric" if "Metric" in headers else choose(headers, ["metric", "measure", "indicator"])
    metric_group_col = "Metric Group" if "Metric Group" in headers else choose(headers, ["metric group", "measure group", "indicator group"])
    value_col = "Value" if "Value" in headers else choose(headers, ["value", "measure value", "metric value"])
    type_col = "Level" if "Level" in headers else choose(headers, ["level", "data type", "organisation type", "organization type"])

    provider_rows = [
        row for row in rows
        if (not type_col or norm(row.get(type_col, "")) == "provider")
        and (str(row.get(provider_col, "")).strip() if provider_col else "")
    ]

    reason_by_provider = defaultdict(lambda: defaultdict(float))
    source_family_by_provider = defaultdict(lambda: defaultdict(float))
    provider_meta = {}
    reason_metrics = Counter()
    excluded_group_counts = Counter()

    for row in provider_rows:
        metric = str(row.get(metric_col, "")).strip() if metric_col else ""
        metric_group = str(row.get(metric_group_col, "")).strip() if metric_group_col else ""
        value = to_number(row.get(value_col, "")) if value_col else None
        provider = str(row.get(provider_col, "")).strip() if provider_col else ""
        if not metric or not provider or value is None:
            continue

        group_context = norm(metric_group)
        # Primary cause-mix uses only the LOS 7+ count series. Exclude the LOS 14+ series
        # and the separate LOS 7+ cost series so pounds and counts are never added together.
        if group_context != PRIMARY_REASON_GROUP:
            if "delay reason" in group_context:
                excluded_group_counts[metric_group] += 1
            continue

        reason = classify_reason(metric)
        family = source_family(metric)
        reason_by_provider[provider][reason] += value
        source_family_by_provider[provider][family] += value
        reason_metrics[metric] += 1
        provider_meta[provider] = {
            "provider": provider,
            "code": str(row.get(provider_code_col, "")).strip() if provider_code_col else "",
            "region": str(row.get(region_col, "")).strip() if region_col else "",
            "icb": str(row.get(icb_col, "")).strip() if icb_col else "",
        }

    providers = []
    national_reason_totals = Counter()
    national_family_totals = Counter()
    for provider, groups in reason_by_provider.items():
        total = sum(groups.values())
        if total <= 0:
            continue
        ranked = sorted(groups.items(), key=lambda x: x[1], reverse=True)
        families = source_family_by_provider[provider]
        family_ranked = sorted(families.items(), key=lambda x: x[1], reverse=True)
        for reason, value in groups.items():
            national_reason_totals[reason] += value
        for family, value in families.items():
            national_family_totals[family] += value
        providers.append({
            **provider_meta.get(provider, {"provider": provider, "code": "", "region": "", "icb": ""}),
            "total_reason_signal": total,
            "dominant_reason": ranked[0][0] if ranked else None,
            "dominant_reason_value": ranked[0][1] if ranked else None,
            "dominant_source_family": family_ranked[0][0] if family_ranked else None,
            "reason_mix": [{"reason": reason, "value": value, "share": value / total} for reason, value in ranked],
            "source_family_mix": [{"family": family, "value": value, "share": value / total} for family, value in family_ranked],
        })

    providers.sort(key=lambda x: x["total_reason_signal"], reverse=True)
    national_total = sum(national_reason_totals.values())
    national_mix = [
        {"reason": reason, "value": value, "share": value / national_total}
        for reason, value in national_reason_totals.most_common()
    ] if national_total else []
    national_family_mix = [
        {"family": family, "value": value, "share": value / national_total}
        for family, value in national_family_totals.most_common()
    ] if national_total else []

    result = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "source_url": SOURCE_URL,
        "source_publication": "NHS England Acute Discharge Situation Report, August 2026",
        "status": "management information",
        "encoding": encoding,
        "primary_reason_series": "Delay reason LOS 7+",
        "methodology_warning": "Cause mix uses only provider-level Delay reason LOS 7+ counts. LOS 14+ counts and LOS 7+ cost fields are excluded from the mix so unlike units are never added. Data are management information and require operational validation before causal or financial conclusions.",
        "row_count": len(rows),
        "provider_row_count": len(provider_rows),
        "provider_count_with_reason_signal": len(providers),
        "detected_columns": {
            "provider": provider_col, "provider_code": provider_code_col, "region": region_col,
            "icb": icb_col, "metric": metric_col, "metric_group": metric_group_col,
            "value": value_col, "type": type_col,
        },
        "excluded_delay_groups": dict(excluded_group_counts),
        "detected_reason_metrics": [{"metric": metric, "rows": count} for metric, count in reason_metrics.most_common()],
        "national_reason_mix": national_mix,
        "national_source_family_mix": national_family_mix,
        "reason_total_distribution": describe([p["total_reason_signal"] for p in providers]),
        "providers": providers,
        "top_provider_reason_signals": providers[:25],
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(result, indent=2, ensure_ascii=False), encoding="utf-8")
    print(json.dumps({
        "provider_rows": len(provider_rows),
        "providers_with_reason_signal": len(providers),
        "primary_reason_series": result["primary_reason_series"],
        "national_reason_mix": national_mix,
        "national_source_family_mix": national_family_mix,
    }, indent=2))


if __name__ == "__main__":
    main()
