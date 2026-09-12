from __future__ import annotations

import json
import re
from pathlib import Path

DRD = Path("data/generated/drd-latest.json")
ACUTE = Path("data/generated/acute-discharge-latest.json")
OUT = Path("data/generated/discharge-bottlenecks.json")


def norm_name(value: str) -> str:
    text = re.sub(r"[^a-z0-9]+", " ", (value or "").lower()).strip()
    for token in ["nhs foundation trust", "nhs trust", "foundation trust", "trust"]:
        text = text.replace(token, " ")
    return re.sub(r"\s+", " ", text).strip()


def ownership_bucket(reason: str | None) -> str:
    if reason in {"Hospital process", "Transport"}:
        return "Provider-led / operational"
    if reason in {"Home care / package of care", "Residential / nursing placement", "Social care assessment", "Equipment / home adaptation", "Funding / approval"}:
        return "Community / social care / commissioning"
    if reason in {"Community / rehabilitation", "Patient / family choice"}:
        return "Cross-system"
    return "Unknown / mixed"


def main():
    if not DRD.exists() or not ACUTE.exists():
        raise SystemExit("Required generated inputs are missing")

    drd = json.loads(DRD.read_text(encoding="utf-8"))
    acute = json.loads(ACUTE.read_text(encoding="utf-8"))

    acute_by_code = {p.get("code"): p for p in acute.get("providers", []) if p.get("code")}
    acute_by_name = {norm_name(p.get("provider", "")): p for p in acute.get("providers", []) if p.get("provider")}

    joined = []
    matched = 0
    for p in drd.get("provider_summary", []):
        match = acute_by_code.get(p.get("code"))
        method = "code" if match else None
        if not match:
            match = acute_by_name.get(norm_name(p.get("provider", "")))
            method = "name" if match else None

        row = {
            "provider": p.get("provider"),
            "code": p.get("code"),
            "region": p.get("region"),
            "icb": p.get("icb"),
            "discharges": p.get("discharges"),
            "bed_days_lost": p.get("bed_days_lost"),
            "average_delay_days": p.get("average_delay_days"),
            "same_day_discharge_rate": p.get("same_day_discharge_rate"),
            "delay_21_plus_rate": p.get("delay_21_plus_rate"),
            "match_method": method,
            "dominant_reason": None,
            "dominant_reason_share": None,
            "ownership_bucket": "Unknown / mixed",
            "reason_mix": [],
        }
        if match:
            matched += 1
            total = match.get("total_reason_signal") or 0
            dominant_value = match.get("dominant_reason_value") or 0
            row.update({
                "dominant_reason": match.get("dominant_reason"),
                "dominant_reason_share": (dominant_value / total if total else None),
                "ownership_bucket": ownership_bucket(match.get("dominant_reason")),
                "reason_mix": match.get("reason_mix", []),
            })
        joined.append(row)

    median = drd.get("derived_distributions", {}).get("average_delay_days", {}).get("median")
    for row in joined:
        if median is not None and row.get("average_delay_days") is not None and row.get("discharges"):
            row["excess_bed_days_vs_median"] = max(0, (row["average_delay_days"] - median) * row["discharges"])
        else:
            row["excess_bed_days_vs_median"] = None

    prioritised = [
        r for r in joined
        if (r.get("discharges") or 0) >= 100 and (r.get("excess_bed_days_vs_median") or 0) > 0
    ]
    prioritised.sort(key=lambda x: x.get("excess_bed_days_vs_median") or 0, reverse=True)

    cause_totals = {}
    owner_totals = {}
    for row in prioritised:
        cause = row.get("dominant_reason") or "Unknown / mixed"
        owner = row.get("ownership_bucket") or "Unknown / mixed"
        excess = row.get("excess_bed_days_vs_median") or 0
        cause_totals[cause] = cause_totals.get(cause, 0) + excess
        owner_totals[owner] = owner_totals.get(owner, 0) + excess

    result = {
        "source_drd": drd.get("source_publication"),
        "source_acute": acute.get("source_publication"),
        "matched_provider_count": matched,
        "drd_provider_count": len(drd.get("provider_summary", [])),
        "acute_provider_count": len(acute.get("providers", [])),
        "join_rate": matched / len(drd.get("provider_summary", [])) if drd.get("provider_summary") else 0,
        "methodology_warning": "This joins July 2026 DRD performance signals to August 2026 acute-discharge reason mix. It is a directional bottleneck analysis, not causal proof. Different months, coding practices and local context can affect interpretation.",
        "priority_providers": prioritised[:40],
        "dominant_cause_excess_bed_day_screen": [
            {"cause": k, "screened_excess_bed_days": v}
            for k, v in sorted(cause_totals.items(), key=lambda kv: kv[1], reverse=True)
        ],
        "ownership_excess_bed_day_screen": [
            {"owner": k, "screened_excess_bed_days": v}
            for k, v in sorted(owner_totals.items(), key=lambda kv: kv[1], reverse=True)
        ],
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(result, indent=2, ensure_ascii=False), encoding="utf-8")
    print(json.dumps({
        "matched_provider_count": matched,
        "join_rate": result["join_rate"],
        "top_priority": prioritised[:5],
        "ownership": result["ownership_excess_bed_day_screen"],
    }, indent=2))


if __name__ == "__main__":
    main()
