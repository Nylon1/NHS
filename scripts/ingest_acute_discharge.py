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


def classify_reason(metric: str) -> str | None:
    n = norm(metric)
    groups = [
        ("Hospital process", ["decision", "assessment", "diagnostic", "pharmacy", "medication", "internal", "medical review", "clinical decision"]),
        ("Home care / package of care", ["package of care", "domiciliary", "home care", "care package"]),
        ("Residential / nursing placement", ["residential", "nursing home", "care home", "placement"]),
        ("Community / rehabilitation", ["rehab", "rehabilitation", "community bed", "intermediate care", "community hospital"]),
        ("Social care assessment", ["social care", "social worker", "social services"]),
        ("Equipment / home adaptation", ["equipment", "adaptation", "housing"]),
        ("Transport", ["transport", "ambulance"]),
        ("Patient / family choice", ["patient choice", "family choice", "choice"]),
        ("Funding / approval", ["funding", "approval", "continuing healthcare", "chc"]),
    ]
    # Only classify metrics from delay-reason groups or labels that clearly indicate waiting/delay.
    if not any(token in n for token in ["delay", "awaiting", "waiting", "reason"]):
        return None
    for label, tokens in groups:
        if any(token in n for token in tokens):
            return label
    return "Other / uncategorised"


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

    # Prefer the exact August 2026 schema when present; fall back to fuzzy detection.
    provider_col = "Org Name" if "Org Name" in headers else choose(headers, ["org name", "provider name", "organisation name", "organization name", "trust name"])
    provider_code_col = "Org Code" if "Org Code" in headers else choose(headers, ["org code", "provider code", "organisation code", "organization code", "trust code"])
    region_col = "Region" if "Region" in headers else choose(headers, ["region"])
    icb_col = "ICB" if "ICB" in headers else choose(headers, ["icb", "integrated care board"])
    metric_col = "Metric" if "Metric" in headers else choose(headers, ["metric", "measure", "indicator"])
    metric_group_col = "Metric Group" if "Metric Group" in headers else choose(headers, ["metric group", "measure group", "indicator group"])
    value_col = "Value" if "Value" in headers else choose(headers, ["value", "measure value", "metric value"])
    type_col = "Level" if "Level" in headers else choose(headers, ["level", "data type", "organisation type", "organization type"])

    categorical_profile = {}
    for h in headers:
        vals = [str(r.get(h, "")).strip() for r in rows if str(r.get(h, "")).strip()]
        unique = Counter(vals)
        if len(unique) <= 50:
            categorical_profile[h] = unique.most_common(50)

    provider_rows = []
    for row in rows:
        if type_col and norm(row.get(type_col, "")) != "provider":
            continue
        provider = str(row.get(provider_col, "")).strip() if provider_col else ""
        if provider:
            provider_rows.append(row)

    reason_by_provider = defaultdict(lambda: defaultdict(float))
    provider_meta = {}
    reason_metrics = Counter()

    for row in provider_rows:
        metric = str(row.get(metric_col, "")).strip() if metric_col else ""
        metric_group = str(row.get(metric_group_col, "")).strip() if metric_group_col else ""
        value = to_number(row.get(value_col, "")) if value_col else None
        provider = str(row.get(provider_col, "")).strip() if provider_col else ""
        if not metric or not provider or value is None:
            continue
        group_context = norm(metric_group)
        if "delay reason" not in group_context:
            continue
        reason_group = classify_reason(metric) or "Other / uncategorised"
        reason_by_provider[provider][reason_group] += value
        reason_metrics[f"{metric_group} | {metric}"] += 1
        provider_meta[provider] = {
            "provider": provider,
            "code": str(row.get(provider_code_col, "")).strip() if provider_code_col else "",
            "region": str(row.get(region_col, "")).strip() if region_col else "",
            "icb": str(row.get(icb_col, "")).strip() if icb_col else "",
        }

    providers = []
    national_reason_totals = Counter()
    for provider, groups in reason_by_provider.items():
        total = sum(groups.values())
        if total <= 0:
            continue
        ranked = sorted(groups.items(), key=lambda x: x[1], reverse=True)
        for reason, value in groups.items():
            national_reason_totals[reason] += value
        providers.append({
            **provider_meta.get(provider, {"provider": provider, "code": "", "region": "", "icb": ""}),
            "total_reason_signal": total,
            "dominant_reason": ranked[0][0] if ranked else None,
            "dominant_reason_value": ranked[0][1] if ranked else None,
            "reason_mix": [{"reason": reason, "value": value, "share": value / total} for reason, value in ranked],
        })

    providers.sort(key=lambda x: x["total_reason_signal"], reverse=True)
    national_total = sum(national_reason_totals.values())
    national_mix = [
        {"reason": reason, "value": value, "share": (value / national_total if national_total else None)}
        for reason, value in national_reason_totals.most_common()
    ]

    result = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "source_url": SOURCE_URL,
        "source_publication": "NHS England Acute Discharge Situation Report, August 2026",
        "status": "management information",
        "encoding": encoding,
        "methodology_warning": "Delay-reason data are management information and definitions changed from 27 May 2024. Reason categories are grouped by Sitora using source measure labels and must be clinically and operationally validated before causal or financial conclusions.",
        "row_count": len(rows),
        "provider_row_count": len(provider_rows),
        "provider_count_with_reason_signal": len(providers),
        "headers": headers,
        "categorical_profile": categorical_profile,
        "detected_columns": {
            "provider": provider_col, "provider_code": provider_code_col, "region": region_col,
            "icb": icb_col, "metric": metric_col, "metric_group": metric_group_col,
            "value": value_col, "type": type_col,
        },
        "detected_reason_metrics": [{"metric": metric, "rows": count} for metric, count in reason_metrics.most_common()],
        "national_reason_mix": national_mix,
        "reason_total_distribution": describe([p["total_reason_signal"] for p in providers]),
        "providers": providers,
        "top_provider_reason_signals": providers[:25],
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(result, indent=2, ensure_ascii=False), encoding="utf-8")
    print(json.dumps({
        "rows": len(rows), "provider_rows": len(provider_rows),
        "providers_with_reason_signal": len(providers),
        "detected_columns": result["detected_columns"],
        "national_reason_mix": national_mix,
        "top_provider_reason_signals": providers[:5],
    }, indent=2))


if __name__ == "__main__":
    main()
