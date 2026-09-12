import acute from "@/data/generated/acute-discharge-latest.json";
import joined from "@/data/generated/discharge-bottlenecks.json";

type ReasonMix = { reason: string; value: number; share: number };
type FamilyMix = { family: string; value: number; share: number };
type PriorityProvider = { provider: string; code: string; region: string; icb: string; discharges: number; bed_days_lost: number; average_delay_days: number; same_day_discharge_rate: number; delay_21_plus_rate: number; dominant_reason: string; dominant_reason_share: number; ownership_bucket: string; excess_bed_days_vs_median: number };

function n(value: number, dp = 0) { return value.toLocaleString("en-GB", { maximumFractionDigits: dp, minimumFractionDigits: dp }); }
function pct(value: number) { return `${n(value * 100, 1)}%`; }

const nationalReasons = (acute.national_reason_mix as ReasonMix[]).slice(0, 8);
const sourceFamilies = acute.national_source_family_mix as FamilyMix[];
const priorities = (joined.priority_providers as PriorityProvider[]).slice(0, 12);
const interfaceAndCapacityShare = sourceFamilies.filter((item) => ["Interface process", "Downstream capacity"].includes(item.family)).reduce((sum, item) => sum + item.share, 0);

export default function BottlenecksPage() {
  return (
    <>
      <section className="page-head"><div className="shell"><div className="eyebrow">Discharge bottleneck intelligence</div><h1>Move from “beds are blocked” to the constraint that needs action.</h1><p className="lede">July provider-level discharge exposure is paired with August coded delay reasons to prioritise investigation. The analysis is directional, not causal, and is never presented as a savings estimate.</p></div></section>

      <section className="section"><div className="shell metric-grid">
        <div className="metric"><span className="badge">Matched</span><strong>{joined.matched_provider_count}</strong><h3>Providers linked</h3><small>{pct(joined.join_rate)} of DRD providers matched across datasets.</small></div>
        <div className="metric"><span className="badge">Leading reason</span><strong>{pct(nationalReasons[0]?.share || 0)}</strong><h3>{nationalReasons[0]?.reason || "Leading cause"}</h3><small>Largest share of the August LOS 7+ coded reason series.</small></div>
        <div className="metric"><span className="badge">System signal</span><strong>{pct(interfaceAndCapacityShare)}</strong><h3>Interface + downstream capacity</h3><small>Share of the same coded reason series.</small></div>
        <div className="metric"><span className="badge">Rule</span><strong>Investigate</strong><h3>Do not assign blame</h3><small>Variation identifies where to ask better operational questions.</small></div>
      </div></section>

      <section className="section"><div className="shell"><div className="section-head"><div><div className="eyebrow">National cause mix</div><h2>The biggest signals sit across organisational boundaries.</h2></div><p>Only like-for-like LOS 7+ reason counts are used.</p></div><div className="card-grid">{nationalReasons.slice(0, 6).map((item, index) => <article className="card" key={item.reason}><div className="meta-row"><span className="badge">#{index + 1}</span></div><h3>{item.reason}</h3><div className="evidence-value">{pct(item.share)}</div></article>)}</div><details className="faq-item" style={{marginTop:16}}><summary>See full source-family breakdown and method</summary><div className="faq-answer"><div className="card-grid">{sourceFamilies.map((item) => <article className="card" key={item.family}><h3>{item.family}</h3><div className="evidence-value">{pct(item.share)}</div><p>{n(item.value,1)} aggregate reason-signal units.</p></article>)}</div><p>{joined.methodology_warning}</p></div></details></div></section>

      <section className="section"><div className="shell"><div className="section-head"><div><div className="eyebrow">Provider investigation screen</div><h2>High exposure paired with the next month’s dominant coded bottleneck.</h2></div><p>Ordered by a median counterfactual screen. This is not a cash or avoidable-waste estimate.</p></div><div className="table-wrap"><table><thead><tr><th>Provider</th><th>Avg delay</th><th>Bed days</th><th>Screened excess</th><th>Dominant bottleneck</th><th>Share</th><th>System bucket</th></tr></thead><tbody>{priorities.map((item) => <tr key={item.code || item.provider}><td><strong>{item.provider}</strong><br/><small>{item.region}</small></td><td>{n(item.average_delay_days,2)} days</td><td>{n(item.bed_days_lost)}</td><td>{n(item.excess_bed_days_vs_median)}</td><td>{item.dominant_reason}</td><td>{pct(item.dominant_reason_share)}</td><td>{item.ownership_bucket}</td></tr>)}</tbody></table></div></div></section>

      <section className="section"><div className="shell"><details className="faq-item"><summary>How should this analysis be interpreted?</summary><div className="faq-answer"><p>{joined.methodology_warning}</p><p>The median counterfactual is a screening tool only. It does not adjust for trust type, case mix, social-care availability, local geography, coding practice or data quality.</p><p><a className="source-link" href="https://www.england.nhs.uk/statistics/statistical-work-areas/discharge-delays/discharge-ready-date/" target="_blank" rel="noreferrer">NHS England DRD source ↗</a></p><p><a className="source-link" href="https://www.england.nhs.uk/statistics/statistical-work-areas/discharge-delays/acute-discharge-situation-report/" target="_blank" rel="noreferrer">NHS England acute discharge source ↗</a></p></div></details></div></section>
    </>
  );
}
