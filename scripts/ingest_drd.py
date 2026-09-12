from __future__ import annotations

import csv
import io
import json
import math
import os
import re
import statistics
import urllib.parse
import urllib.request
from collections import Counter, defaultdict
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path

PUBLICATION_URL = os.environ.get(
    "DRD_PUBLICATION_URL",
    "https://www.england.nhs.uk/statistics/statistical-work-areas/discharge-delays/discharge-ready-date/",
)
SOURCE_OVERRIDE = os.environ.get("DRD_SOURCE_URL")
BACKFILL_MONTHS = max(1, int(os.environ.get("DRD_BACKFILL_MONTHS", "12")))
OUT = Path("data/generated/drd-latest.json")
HISTORY_DIR = Path("data/generated/drd-history")
INDEX_OUT = Path("data/generated/drd-history.json")

MONTHS = {
    "jan": 1, "january": 1,
    "feb": 2, "february": 2,
    "mar": 3, "march": 3,
    "apr": 4, "april": 4,
    "may": 5,
    "jun": 6, "june": 6,
    "jul": 7, "july": 7,
    "aug": 8, "august": 8,
    "sep": 9, "sept": 9, "september": 9,
    "oct": 10, "october": 10,
    "nov": 11, "november": 11,
    "dec": 12, "december": 12,
}


class LinkParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self._href = None
        self._text = []

    def handle_starttag(self, tag, attrs):
        if tag.lower() == "a":
            self._href = dict(attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.links.append((" ".join(self._text).strip(), self._href))
            self._href = None
            self._text = []


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


def month_key_from_text(text: str):
    t = norm(text)
    years = re.findall(r"\b(20\d{2})\b", t)
    if not years:
        return None
    year = int(years[-1])
    for token, month in MONTHS.items():
        if re.search(rf"\b{re.escape(token)}\b", t):
            return f"{year:04d}-{month:02d}"
    return None


def discover_csv_sources():
    if SOURCE_OVERRIDE:
        key = month_key_from_text(SOURCE_OVERRIDE) or datetime.now(timezone.utc).strftime("%Y-%m")
        return [(key, SOURCE_OVERRIDE)]

    req = urllib.request.Request(PUBLICATION_URL, headers={"User-Agent": "Sitora-NHS-Resource-Intelligence/2.0"})
    with urllib.request.urlopen(req, timeout=60) as response:
        html = response.read().decode("utf-8", errors="replace")

    parser = LinkParser()
    parser.feed(html)
    found = {}
    for text, href in parser.links:
        blob = f"{text} {href}"
        nb = norm(blob)
        if "discharge ready date monthly data csv" not in nb:
            continue
        key = month_key_from_text(blob)
        if not key:
            continue
        url = urllib.parse.urljoin(PUBLICATION_URL, href)
        existing = found.get(key)
        # Prefer revised files when NHS England exposes both original and revised links.
        if existing is None or ("revised" in nb and "revised" not in norm(existing)):
            found[key] = url

    if not found:
        raise RuntimeError("No monthly DRD CSV links discovered from NHS England publication page")
    return sorted(found.items(), key=lambda x: x[0])


def download(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": "Sitora-NHS-Resource-Intelligence/2.0"})
    with urllib.request.urlopen(req, timeout=120) as response:
        return response.read()


def analyse(payload: bytes, source_url: str, period: str):
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

    return {
        "period": period,
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "source_url": source_url,
        "source_publication": f"NHS England Discharge Ready Date, {period}",
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
            "average_delay_formula": "Total bed days lost due to delayed discharge divided by total patients discharged.",
            "opportunity_screen": "Excess bed days versus the national provider median is an investigative counterfactual, not a savings estimate.",
        },
    }


def compact_month(result):
    return {
        "period": result["period"],
        "source_url": result["source_url"],
        "provider_count": result["provider_count"],
        "derived_distributions": result["derived_distributions"],
        "provider_summary": result["provider_summary"],
    }


def build_trends(months):
    by_code = defaultdict(list)
    for month in months:
        for p in month.get("provider_summary", []):
            key = p.get("code") or p.get("provider")
            by_code[key].append({"period": month["period"], **p})

    trends = []
    for _, series in by_code.items():
        series.sort(key=lambda x: x["period"])
        latest = series[-1]
        item = {
            "provider": latest.get("provider"),
            "code": latest.get("code"),
            "region": latest.get("region"),
            "icb": latest.get("icb"),
            "months_available": len(series),
            "latest_period": latest.get("period"),
            "latest_average_delay_days": latest.get("average_delay_days"),
            "latest_bed_days_lost": latest.get("bed_days_lost"),
            "latest_same_day_discharge_rate": latest.get("same_day_discharge_rate"),
        }
        for window in (3, 6, 12):
            subset = series[-window:]
            vals = [x.get("average_delay_days") for x in subset if x.get("average_delay_days") is not None]
            beds = [x.get("bed_days_lost") for x in subset if x.get("bed_days_lost") is not None]
            if vals:
                item[f"avg_delay_{window}m"] = statistics.fmean(vals)
                if len(vals) >= 2:
                    item[f"avg_delay_change_{window}m"] = vals[-1] - vals[0]
            if beds:
                item[f"bed_days_{window}m_total"] = sum(beds)
        trends.append(item)

    def change_key(x):
        v = x.get("avg_delay_change_3m")
        return v if v is not None else -999

    return {
        "providers": trends,
        "persistent_high_delay": sorted(
            [x for x in trends if x.get("avg_delay_3m") is not None],
            key=lambda x: x["avg_delay_3m"], reverse=True
        )[:20],
        "fastest_deteriorating_3m": sorted(
            [x for x in trends if x.get("avg_delay_change_3m") is not None],
            key=change_key, reverse=True
        )[:20],
        "fastest_improving_3m": sorted(
            [x for x in trends if x.get("avg_delay_change_3m") is not None],
            key=lambda x: x["avg_delay_change_3m"]
        )[:20],
    }


def main():
    sources = discover_csv_sources()
    selected = sources[-BACKFILL_MONTHS:]
    HISTORY_DIR.mkdir(parents=True, exist_ok=True)

    months = []
    for period, url in selected:
        path = HISTORY_DIR / f"{period}.json"
        if path.exists():
            try:
                existing = json.loads(path.read_text(encoding="utf-8"))
                if existing.get("source_url") == url:
                    months.append(existing)
                    print(f"Reusing {period}")
                    continue
            except Exception:
                pass
        print(f"Downloading {period}: {url}")
        result = analyse(download(url), url, period)
        compact = compact_month(result)
        path.write_text(json.dumps(compact, indent=2, ensure_ascii=False), encoding="utf-8")
        months.append(compact)

    months.sort(key=lambda x: x["period"])
    latest_period, latest_url = selected[-1]
    latest = analyse(download(latest_url), latest_url, latest_period)
    trends = build_trends(months)
    latest["history"] = {
        "months_available": [x["period"] for x in months],
        "months_count": len(months),
        "rolling_windows": [3, 6, 12],
        "trends": trends,
    }

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(latest, indent=2, ensure_ascii=False), encoding="utf-8")
    INDEX_OUT.write_text(json.dumps({
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "publication_url": PUBLICATION_URL,
        "latest_period": latest_period,
        "months": [{"period": x["period"], "source_url": x["source_url"]} for x in months],
        "trend_summary": {
            "persistent_high_delay": trends["persistent_high_delay"],
            "fastest_deteriorating_3m": trends["fastest_deteriorating_3m"],
            "fastest_improving_3m": trends["fastest_improving_3m"],
        },
    }, indent=2, ensure_ascii=False), encoding="utf-8")

    print(json.dumps({
        "latest_period": latest_period,
        "months_ingested": [x["period"] for x in months],
        "providers": latest["provider_count"],
        "median_average_delay_days": latest["derived_distributions"]["average_delay_days"]["median"],
    }, indent=2))


if __name__ == "__main__":
    main()
