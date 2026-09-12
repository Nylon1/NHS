import { benchmarkCases, benchmarkRules, benchmarkSources } from "@/lib/benchmarking";
import drd from "@/data/generated/drd-latest.json";

type ProviderSignal = { provider: string; code: string; region: string; icb: string; discharges: number; bed_days_lost: number; average_delay_days: number; same_day_discharge_rate: number; delay_21_plus_rate: number; excess_bed_days_vs_national_median?: number };
const delayDistribution = drd.derived_distributions.average_delay_days;
const sameDayDistribution = drd.derived_distributions.same_day_discharge_rate;
const topSignals = (drd.rankings.highest_average_delay_days as ProviderSignal[]).slice(0, 10);
const opportunitySignals = (drd.median_opportunity_screen as ProviderSignal[]).slice(0, 10);
function n(value:number, dp=0){return value.toLocaleString("en-GB",{maximumFractionDigits:dp,minimumFractionDigits:dp});}
function pct(value:number){return `${n(value*100,1)}%`;}

export default function BenchmarkingPage(){
  return <>
    <section className="page-head"><div className="shell"><div className="eyebrow">Provider benchmarking</div><h1>Use variation to decide where to investigate, not who to blame.</h1><p className="lede">The first national study uses July 2026 NHS England discharge-ready-date data. Rankings are investigation signals only and do not prove waste, poor care or recoverable savings.</p></div></section>

    <section className="section"><div className="shell metric-grid">
      <div className="metric"><span className="badge">Providers</span><strong>{drd.provider_count}</strong><h3>Provider records</h3><small>{n(drd.provider_row_count)} provider measure rows used.</small></div>
      <div className="metric"><span className="badge">Median</span><strong>{n(delayDistribution.median,2)} days</strong><h3>Average delay</h3><small>Provider median after discharge readiness.</small></div>
      <div className="metric"><span className="badge">Upper quartile</span><strong>{n(delayDistribution.p75,2)} days</strong><h3>Average delay</h3><small>25% of included providers sit above this level.</small></div>
      <div className="metric"><span className="badge">Same day</span><strong>{pct(sameDayDistribution.median)}</strong><h3>Median rate</h3><small>Discharged on the recorded ready date.</small></div>
    </div></section>

    <section className="section"><div className="shell"><div className="section-head"><div><div className="eyebrow">Investigation signals</div><h2>Where is delay materially above the national pattern?</h2></div><p>Minimum 100 discharges. These are prompts for operational investigation.</p></div><div className="table-wrap"><table><thead><tr><th>Provider</th><th>Average delay</th><th>Delayed bed days</th><th>Same day</th><th>21+ days</th></tr></thead><tbody>{topSignals.map((item)=><tr key={item.provider}><td><strong>{item.provider}</strong><br/><small>{item.region}</small></td><td>{n(item.average_delay_days,2)} days</td><td>{n(item.bed_days_lost)}</td><td>{pct(item.same_day_discharge_rate)}</td><td>{pct(item.delay_21_plus_rate)}</td></tr>)}</tbody></table></div></div></section>

    <section className="section"><div className="shell"><div className="section-head"><div><div className="eyebrow">Counterfactual screen</div><h2>What sits above a simple national-median scenario?</h2></div><p>This is an investigative screen only, not a savings forecast.</p></div><div className="card-grid">{opportunitySignals.slice(0,6).map((item)=><article className="card" key={item.provider}><span className="badge">Review signal</span><h3 style={{marginTop:14}}>{item.provider}</h3><div className="evidence-value">{n(item.excess_bed_days_vs_national_median||0)}</div><p>Bed days above the simple monthly median counterfactual.</p></article>)}</div></div></section>

    <section className="section"><div className="shell"><details className="faq-item"><summary>Benchmarking rules, source coverage and verified examples</summary><div className="faq-answer"><h3>No crude league tables</h3><ul className="list-clean">{benchmarkRules.map((rule)=><li key={rule}>{rule}</li>)}</ul><h3 style={{marginTop:28}}>Available benchmark sources</h3><div className="card-grid">{benchmarkSources.map((source)=><article className="card" key={source.id}><div className="meta-row"><span className="badge">{source.status}</span><span>{source.level}</span></div><h3>{source.domain}</h3><p>{source.metric}</p><a className="source-link" href={source.sourceUrl} target="_blank" rel="noreferrer">Source: {source.sourceLabel} ↗</a></article>)}</div><h3 style={{marginTop:28}}>Examples of improvement</h3><div className="card-grid">{benchmarkCases.map((item)=><article className="card" key={item.id}><span className="badge">{item.domain}</span><h3 style={{marginTop:14}}>{item.provider}</h3><p><strong>{item.result}</strong></p><p>{item.interpretation}</p><a className="source-link" href={item.sourceUrl} target="_blank" rel="noreferrer">Source ↗</a></article>)}</div></div></details></div></section>

    <section className="section"><div className="shell quote">Benchmarking should answer one question: where is variation large enough that somebody should investigate why?</div></section>
  </>;
}
