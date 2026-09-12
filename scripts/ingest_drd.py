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
    if not s or s.lower() in {"-", ".", "..", "n/a", "na", "null", "*", "[z]"}:
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
    vals = sorted(v for v in values if v is not None)
    if not vals:
        return None
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

    data_type_col = choose_column(headers, ["data type", "geography type", "organisation type", "organization type", "org type", "level"])
    geo_name_col = choose_column(headers, ["organisation name", "organization name", "provider name", "geography name", "org name", "trust name"])
    geo_code_col = "Code" if "Code" in headers else choose_column(headers, ["organisation code", "organization code", "provider code", "org code", "trust code"])
    metric_col = choose_column(headers, ["measure", "metric name", "measure name", "indicator name", "metric", "indicator"])
    value_col = choose_column(headers, ["value", "metric value", "measure value", "indicator value"])
    region_col = choose_column(headers, ["region of provider", "region"])
    icb_col = choose_column(headers, ["icb of provider", "icb"])

    categorical_profile = {}
    for h in headers:
        vals = [str(r.get(h, "")).strip() for r in rows if str(r.get(h, "")).strip()]
        unique = Counter(vals)
        if len(unique) <= 25:
            categorical_profile[h] = unique.most_common(25)

    def is_provider(r):
        if data_type_col:
            return norm(r.get(data_type_col, "")) == "provider"
        name = norm(r.get(geo_name_col, "")) if geo_name_col else ""
        return bool(name) and not any(x in name for x in ["england", "region", "integrated care", "icb", "national", "utla"])

    provider_rows = [r for r in rows if is_provider(r)]

    by_metric = defaultdict(list)
    provider_measure_map = defaultdict(dict)
    provider_meta = {}

    if metric_col and value_col and geo_name_col:
        for r in provider_rows:
            value = to_number(r.get(value_col, ""))
            if value is None:
                continue
            metric = str(r.get(metric_col, "")).strip()
            provider = str(r.get(geo_name_col, "")).strip()
            if not metric or not provider:
                continue
            item = {
                "provider": provider,
                "code": str(r.get(geo_code_col, "")).strip() if geo_code_col else "",
                "region": str(r.get(region_col, "")).strip() if region_col else "",
                "icb": str(r.get(icb_col, "")).strip() if icb_col else "",
                "value": value,
            }
            by_metric[metric].append(item)
            provider_measure_map[provider][metric] = value
            provider_meta[provider] = {k: item[k] for k in ["provider", "code", "region", "icb"]}

    metrics = {metric: describe([x["value"] for x in items]) for metric, items in by_metric.items()}

    def find_metric(*terms):
        for metric in by_metric:
            nm = norm(metric)
            if all(term in nm for term in terms):
                return metric
        return None

    total_discharges_metric = find_metric("number of patients discharged in total")
    bed_days_metric = find_metric("total bed days lost", "delayed discharge")
    same_day_metric = find_metric("date of discharge is same", "discharge ready date")
    delay_21_pct_metric = None
    for metric in by_metric:
        nm = norm(metric)
        if metric.lower().startswith("% of patients discharged") and "21 days or more" in nm and "between the discharge ready date" in nm:
            delay_21_pct_metric = metric
            break

    provider_summary = []
    for provider, measures in provider_measure_map.items():
        discharged = measures.get(total_discharges_metric) if total_discharges_metric else None
        bed_days = measures.get(bed_days_metric) if bed_days_metric else None
        same_day = measures.get(same_day_metric) if same_day_metric else None
        delayed_21_pct = measures.get(delay_21_pct_metric) if delay_21_pct_metric else None
        avg_delay = (bed_days / discharged) if bed_days is not None and discharged and discharged > 0 else None
        if not any(v is not None for v in [discharged, bed_days, same_day, delayed_21_pct, avg_delay]):
            continue
        provider_summary.append({
            **provider_meta.get(provider, {"provider": provider, "code": "", "region": "", "icb": ""}),
            "discharges": discharged,
            "bed_days_lost": bed_days,
            "average_delay_days": avg_delay,
            "same_day_discharge_rate": same_day,
            "delay_21_plus_rate": delayed_21_pct,
        })

    derived_distributions = {
        "discharges": describe([x["discharges"] for x in provider_summary]),
        "bed_days_lost": describe([x["bed_days_lost"] for x in provider_summary]),
        "average_delay_days": describe([x["average_delay_days"] for x in provider_summary]),
        "same_day_discharge_rate": describe([x["same_day_discharge_rate"] for x in provider_summary]),
        "delay_21_plus_rate": describe([x["delay_21_plus_rate"] for x in provider_summary]),
    }

    eligible = [x for x in provider_summary if (x.get("discharges") or 0) >= 100]
    by_avg_delay = sorted([x for x in eligible if x.get("average_delay_days") is not None], key=lambda x: x["average_delay_days"], reverse=True)
    by_bed_days = sorted([x for x in eligible if x.get("bed_days_lost") is not None], key=lambda x: x["bed_days_lost"], reverse=True)
    by_same_day = sorted([x for x in eligible if x.get("same_day_discharge_rate") is not None], key=lambda x: x["same_day_discharge_rate"])

    rankings = {
        "highest_average_delay_days": by_avg_delay[:20],
        "highest_bed_days_lost": by_bed_days[:20],
        "lowest_same_day_discharge_rate": by_same_day[:20],
    }

    national_median_avg = derived_distributions["average_delay_days"]["median"] if derived_distributions["average_delay_days"] else None
    opportunity = []
    if national_median_avg is not None:
        for x in eligible:
            avg = x.get("average_delay_days")
            discharges = x.get("discharges")
            if avg is None or discharges is None or avg <= national_median_avg:
                continue
            excess = (avg - national_median_avg) * discharges
            opportunity.append({**x, "excess_bed_days_vs_national_median": excess})
        opportunity.sort(key=lambda x: x["excess_bed_days_vs_national_median"], reverse=True)

    result = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "source_url": SOURCE_URL,
        "source_publication": "NHS England Discharge Ready Date, July 2026",
        "status": "official statistic",
        "row_count": len(rows),
        "provider_row_count": len(provider_rows),
        "provider_count": len(provider_summary),
        "headers": headers,
        "detected_columns": {
            "data_type": data_type_col,
            "geography_name": geo_name_col,
            "geography_code": geo_code_col,
            "metric": metric_col,
            "value": value_col,
            "region": region_col,
            "icb": icb_col,
        },
        "detected_metrics": {
            "total_discharges": total_discharges_metric,
            "bed_days_lost": bed_days_metric,
            "same_day_discharge_rate": same_day_metric,
            "delay_21_plus_rate": delay_21_pct_metric,
        },
        "categorical_profile": categorical_profile,
        "metric_distributions": metrics,
        "derived_distributions": derived_distributions,
        "rankings": rankings,
        "median_opportunity_screen": opportunity[:30],
        "provider_summary": provider_summary,
        "methodology": {
            "warning": "Variation is not proof of waste or poor performance. Provider outliers require peer-group, case-mix, data-quality and operational review before causal conclusions.",
            "provider_filter": "Only rows where NHS England Data Type equals Provider are included in provider benchmarking.",
            "minimum_volume": "Ranking screens require at least 100 discharges in the month.",
            "average_delay_formula": "Total bed days lost due to delayed discharge divided by total patients discharged. This mirrors the NHS Oversight Framework concept of average days from discharge-ready date to actual discharge including zero-day discharges.",
            "opportunity_screen": "Excess bed days versus the national provider median is an investigative counterfactual, not a savings estimate. It is used to prioritise review only.",
        },
    }

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(result, indent=2, ensure_ascii=False), encoding="utf-8")
    print(json.dumps({
        "rows": len(rows),
        "provider_rows": len(provider_rows),
        "providers": len(provider_summary),
        "detected_columns": result["detected_columns"],
        "detected_metrics": result["detected_metrics"],
        "national_median_average_delay_days": national_median_avg,
        "top_average_delay": by_avg_delay[:5],
        "top_opportunity_screen": opportunity[:5],
    }, indent=2))


if __name__ == "__main__":
    main()
