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
    "DRD_SOURCE_URL",
    "https://www.england.nhs.uk/statistics/wp-content/uploads/sites/2/2026/09/Discharge-Ready-Date-monthly-data-csv-July-2026.csv",
)
OUT = Path("data/generated/drd-latest.json")
RAW = Path("data/raw/drd-july-2026.csv")


def norm(s: str) -> str:
    return re.sub(r"[^a-z0-9]+", " ", (s or "").lower()).strip()


def to_number(value: str):
    if value is None:
        return None
    s = str(value).strip().replace(",", "").replace("%", "")
    if not s or s in {"-", ".", "..", "n/a", "na", "null", "*"}:
        return None
    try:
        x = float(s)
        return x if math.isfinite(x) else None
    except ValueError:
        return None


def choose_column(headers, patterns):
    scored = []
    for h in headers:
        nh = norm(h)
        score = sum(1 for p in patterns if p in nh)
        if score:
            scored.append((score, h))
    return max(scored, default=(0, None))[1]


def percentile(values, p):
    if not values:
        return None
    vals = sorted(values)
    if len(vals) == 1:
        return vals[0]
    k = (len(vals) - 1) * p
    f = math.floor(k)
    c = math.ceil(k)
    if f == c:
        return vals[int(k)]
    return vals[f] + (vals[c] - vals[f]) * (k - f)


def describe(values):
    vals = [v for v in values if v is not None]
    if not vals:
        return None
    return {
        "n": len(vals),
        "min": min(vals),
        "p25": percentile(vals, 0.25),
        "median": statistics.median(vals),
        "p75": percentile(vals, 0.75),
        "max": max(vals),
        "mean": statistics.fmean(vals),
    }


def main():
    req = urllib.request.Request(SOURCE_URL, headers={"User-Agent": "Sitora-NHS-Resource-Intelligence/1.0"})
    with urllib.request.urlopen(req, timeout=60) as response:
        payload = response.read()

    RAW.parent.mkdir(parents=True, exist_ok=True)
    RAW.write_bytes(payload)

    text = payload.decode("utf-8-sig", errors="replace")
    reader = csv.DictReader(io.StringIO(text))
    rows = list(reader)
    headers = reader.fieldnames or []

    geo_type_col = choose_column(headers, ["geography type", "organisation type", "organization type", "org type", "level"])
    geo_name_col = choose_column(headers, ["geography name", "organisation name", "organization name", "provider name", "org name", "trust name"])
    geo_code_col = choose_column(headers, ["geography code", "organisation code", "organization code", "provider code", "org code", "trust code"])
    metric_col = choose_column(headers, ["metric name", "measure name", "indicator name", "metric", "measure", "indicator"])
    value_col = choose_column(headers, ["metric value", "measure value", "indicator value", "value"])

    # Profile categorical columns to make format changes visible rather than silently failing.
    categorical_profile = {}
    for h in headers:
        vals = [str(r.get(h, "")).strip() for r in rows if str(r.get(h, "")).strip()]
        unique = Counter(vals)
        if len(unique) <= 25:
            categorical_profile[h] = unique.most_common(25)

    def is_provider(r):
        if geo_type_col:
            t = norm(r.get(geo_type_col, ""))
            return any(x in t for x in ["provider", "trust", "acute trust"])
        # Fallback: NHS provider codes are usually short alphanumeric codes; exclude obvious aggregate names.
        name = norm(r.get(geo_name_col, "")) if geo_name_col else ""
        return bool(name) and not any(x in name for x in ["england", "region", "integrated care", "icb", "national"])

    provider_rows = [r for r in rows if is_provider(r)]

    metrics = {}
    rankings = []

    # Long-format publication: metric/measure in one column and value in another.
    if metric_col and value_col and geo_name_col:
        by_metric = defaultdict(list)
        for r in provider_rows:
            value = to_number(r.get(value_col, ""))
            if value is None:
                continue
            m = str(r.get(metric_col, "")).strip()
            if not m:
                continue
            by_metric[m].append({
                "provider": str(r.get(geo_name_col, "")).strip(),
                "code": str(r.get(geo_code_col, "")).strip() if geo_code_col else "",
                "value": value,
            })

        for metric, items in by_metric.items():
            metrics[metric] = describe([x["value"] for x in items])

        priority_terms = [
            "average number of days",
            "average delay",
            "total bed days lost",
            "bed days after discharge ready",
            "21 days or more",
            "same as discharge ready date",
        ]
        for metric, items in by_metric.items():
            nm = norm(metric)
            if any(term in nm for term in priority_terms):
                ordered = sorted(items, key=lambda x: x["value"], reverse=True)
                rankings.append({
                    "metric": metric,
                    "direction_note": "Higher is not automatically worse for percentage same-day metrics; interpret with metric definition.",
                    "top": ordered[:15],
                    "bottom": list(reversed(ordered[-15:])),
                    "distribution": describe([x["value"] for x in items]),
                })

    # Wide-format publication fallback: numeric metric columns across provider rows.
    elif geo_name_col:
        numeric_columns = []
        for h in headers:
            vals = [to_number(r.get(h, "")) for r in provider_rows]
            vals = [v for v in vals if v is not None]
            if len(vals) >= max(10, len(provider_rows) // 4):
                numeric_columns.append(h)
                metrics[h] = describe(vals)

        priority_terms = ["average", "delay", "bed day", "21", "same day", "discharge ready"]
        for h in numeric_columns:
            if not any(term in norm(h) for term in priority_terms):
                continue
            items = []
            for r in provider_rows:
                v = to_number(r.get(h, ""))
                if v is None:
                    continue
                items.append({
                    "provider": str(r.get(geo_name_col, "")).strip(),
                    "code": str(r.get(geo_code_col, "")).strip() if geo_code_col else "",
                    "value": v,
                })
            ordered = sorted(items, key=lambda x: x["value"], reverse=True)
            rankings.append({
                "metric": h,
                "direction_note": "Direction depends on metric definition. Do not label providers good/bad without interpreting the measure.",
                "top": ordered[:15],
                "bottom": list(reversed(ordered[-15:])),
                "distribution": describe([x["value"] for x in items]),
            })

    result = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "source_url": SOURCE_URL,
        "source_publication": "NHS England Discharge Ready Date, July 2026",
        "status": "official statistic",
        "row_count": len(rows),
        "provider_row_count": len(provider_rows),
        "headers": headers,
        "detected_columns": {
            "geography_type": geo_type_col,
            "geography_name": geo_name_col,
            "geography_code": geo_code_col,
            "metric": metric_col,
            "value": value_col,
        },
        "categorical_profile": categorical_profile,
        "metric_distributions": metrics,
        "rankings": rankings,
        "methodology": {
            "warning": "This output identifies statistical variation, not waste. Outliers require peer-group, case-mix, data-quality and operational review before any causal conclusion.",
            "ranking_rule": "Only provider rows with numeric values are ranked. Missing/suppressed values are excluded.",
            "next_step": "Use NHS trust type/peer group and activity denominators before estimating excess bed days above peer benchmark.",
        },
        "sample_rows": rows[:5],
    }

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(result, indent=2, ensure_ascii=False), encoding="utf-8")
    print(json.dumps({
        "rows": len(rows),
        "providers": len(provider_rows),
        "headers": headers,
        "detected": result["detected_columns"],
        "rankings": [r["metric"] for r in rankings],
    }, indent=2))


if __name__ == "__main__":
    main()
