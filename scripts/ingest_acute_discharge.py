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


def decode_payload(payload: bytes) -> tuple[str, str]:
    for encoding in ("utf-8-sig", "cp1252", "latin-1"):
        try:
            return payload.decode(encoding), encoding
        except UnicodeDecodeError:
            continue
    return payload.decode("utf-8", errors="replace"), "utf-8-replacement"


def classify_reason(metric: str) -> str | None:
    n = norm(metric)
    # The discharge sitrep uses both explicit reasons and pathway/destination labels.
    if not any(token in n for token in [
        "delay reason", "reason for delay", "awaiting", "waiting for", "reason", "pathway"
    ]):
        return None
    groups = [
        ("Hospital process", ["decision", "assessment", "diagnostic", "pharmacy", "medication", "internal", "medical review", "hospital process"]),
        ("Home care / package of care", ["package of care", "domiciliary", "home care", "care package", "pathway 1"]),
        ("Residential / nursing placement", ["residential", "nursing home", "care home", "placement", "pathway 3"]),
        ("Community / rehabilitation", ["rehab", "rehabilitation", "community bed", "intermediate care", "community hospital", "pathway 2"]),
        ("Social care assessment", ["social care", "social worker", "social services"]),
        ("Equipment / home adaptation", ["equipment", "adaptation", "housing"]),
        ("Transport", ["transport", "ambulance"]),
        ("Patient / family choice", ["patient choice", "family choice", "choice"]),
        ("Funding / approval", ["funding", "approval", "continuing healthcare", "chc"]),
    ]
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

    provider_col = choose(headers, [
        "provider name", "organisation name", "organization name", "trust name",
        "provider", "organisation", "organization", "trust"
    ])
    provider_code_col = choose(headers, [
        "provider code", "organisation code", "organization code", "trust code", "org code", "code"
    ])
    region_col = choose(headers, ["region"])
    icb_col = choose(headers, ["icb", "integrated care board"])
    metric_col = choose(headers, ["measure", "metric type", "metric", "indicator", "category"])
    value_col = choose(headers, ["value", "measure value", "metric value", "count"])
    type_col = choose(headers, ["data type", "organisation type", "organization type", "level"])

    categorical_profile = {}
    for header in headers:
        values = [str(r.get(header, "")).strip() for r in rows if str(r.get(header, "")).strip()]
        unique = Counter(values)
        if len(unique) <= 40:
            categorical_profile[header] = unique.most_common(40)

    # Accept exact provider/trust level rows, while also handling files where the level is named Provider/Trust level.
    provider_rows = []
    level_values = Counter()
    for row in rows:
        if type_col:
            level = norm(row.get(type_col, ""))
            if level:
                level_values[level] += 1
            if level and not any(token in level for token in ["provider", "trust"]):
                continue
        provider = str(row.get(provider_col, "")).strip() if provider_col else ""
        if provider:
            provider_rows.append(row)

    reason_by_provider = defaultdict(lambda: defaultdict(float))
    provider_meta = {}
    reason_metrics = Counter()

    for row in provider_rows:
        metric = str(row.get(metric_col, "")).strip() if metric_col else ""
        value = to_number(row.get(value_col, "")) if value_col else None
        provider = str(row.get(provider_col, "")).strip() if provider_col else ""
        if not metric or not provider or value is None:
            continue
        group = classify_reason(metric)
        if group:
            reason_by_provider[provider][group] += value
            reason_metrics[metric] += 1
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
        "level_values": level_values.most_common(30),
        "categorical_profile": categorical_profile,
        "detected_columns": {
            "provider": provider_col, "provider_code": provider_code_col, "region": region_col,
            "icb": icb_col, "metric": metric_col, "value": value_col, "type": type_col,
        },
        "detected_reason_metrics": [{"metric": metric, "rows": count, "group": classify_reason(metric)} for metric, count in reason_metrics.most_common()],
        "national_reason_mix": national_mix,
        "reason_total_distribution": describe([p["total_reason_signal"] for p in providers]),
        "providers": providers,
        "top_provider_reason_signals": providers[:25],
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(result, indent=2, ensure_ascii=False), encoding="utf-8")
    print(json.dumps({
        "encoding": encoding,
        "headers": headers,
        "level_values": level_values.most_common(20),
        "rows": len(rows), "provider_rows": len(provider_rows),
        "providers_with_reason_signal": len(providers),
        "detected_columns": result["detected_columns"],
        "reason_metrics": result["detected_reason_metrics"][:20],
        "national_reason_mix": national_mix,
        "top_provider_reason_signals": providers[:5],
    }, indent=2))


if __name__ == "__main__":
    main()
