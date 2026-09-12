import { benchmarkCases, benchmarkRules, benchmarkSources } from "@/lib/benchmarking";
import drd from "@/data/generated/drd-latest.json";

type ProviderSignal = {
  provider: string;
  code: string;
  region: string;
  icb: string;
  discharges: number;
  bed_days_lost: number;
  average_delay_days: number;
  same_day_discharge_rate: number;
  delay_21_plus_rate: number;
  excess_bed_days_vs_national_median?: number;
};

const delayDistribution = drd.derived_distributions.average_delay_days;
const bedDayDistribution = drd.derived_distributions.bed_days_lost;
const sameDayDistribution = drd.derived_distributions.same_day_discharge_rate;
const topSignals = (drd.rankings.highest_average_delay_days as ProviderSignal[]).slice(0, 10);
const opportunitySignals = (drd.median_opportunity_screen as ProviderSignal[]).slice(0, 10);

function n(value: number, dp = 0) {
  return value.toLocaleString("en-GB", { maximumFractionDigits: dp, minimumFractionDigits: dp });
}

function pct(value: number) {
  return `${n(value * 100, 1)}%`;
}

export default function BenchmarkingPage() {
  return (
    <>
      <section className="page-head">
        <div className="shell">
          <div className="eyebrow">Provider benchmarking</div>
          <h1>Variation should tell us where to investigate first.</h1>
          <p className="lede">
            Sitora compares providers only where the underlying data is traceable and comparable. A high or low rank is a signal for investigation, not a declaration of waste or poor care.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">First national provider study</div>
              <h2>July 2026 discharge-ready-date variation across 128 NHS providers.</h2>
            </div>
            <p>Source: NHS England official statistics. Only rows explicitly marked Data Type = Provider are used.</p>
          </div>
          <div className="metric-grid">
            <div className="metric">
              <span className="badge">Providers</span>
              <strong>{drd.provider_count}</strong>
              <h3>True provider records</h3>
              <small>{n(drd.provider_row_count)} provider-level measure rows from {n(drd.row_count)} total source rows.</small>
            </div>
            <div className="metric">
              <span className="badge">Median</span>
              <strong>{n(delayDistribution.median, 2)} days</strong>
              <h3>Average discharge delay</h3>
              <small>Median provider value, calculated as delayed bed days divided by total discharges.</small>
            </div>
            <div className="metric">
              <span className="badge">Upper quartile</span>
              <strong>{n(delayDistribution.p75, 2)} days</strong>
              <h3>Average discharge delay</h3>
              <small>25% of included providers are above this level in July 2026.</small>
            </div>
            <div className="metric">
              <span className="badge">Median</span>
              <strong>{pct(sameDayDistribution.median)}</strong>
              <h3>Same-day after DRD</h3>
              <small>Median proportion discharged on their recorded discharge-ready date.</small>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">Investigation signals</div>
              <h2>Providers with the highest average delay in July 2026.</h2>
            </div>
            <p>Minimum 100 discharges. These are not labelled poor performers or waste; they are prioritised for operational investigation.</p>
          </div>
          <div className="card-grid">
            {topSignals.map((item, index) => (
              <article className="card" key={item.provider}>
                <div className="meta-row">
                  <span className="badge">Signal #{index + 1}</span>
                  <span>{item.region}</span>
                </div>
                <h3>{item.provider}</h3>
                <div className="evidence-value">{n(item.average_delay_days, 2)} days</div>
                <p>{n(item.bed_days_lost)} delayed bed days across {n(item.discharges)} discharges.</p>
                <p><strong>Same-day discharge:</strong> {pct(item.same_day_discharge_rate)}</p>
                <p><strong>21+ day delay:</strong> {pct(item.delay_21_plus_rate)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">Counterfactual screen</div>
              <h2>What if providers above the national median matched the median?</h2>
            </div>
            <p>This is an investigative screen only. It is not a savings forecast and does not adjust for case mix, trust type, local authority capacity or data quality.</p>
          </div>
          <div className="card-grid">
            {opportunitySignals.map((item) => (
              <article className="card" key={item.provider}>
                <span className="badge">Review signal</span>
                <h3 style={{ marginTop: 16 }}>{item.provider}</h3>
                <div className="evidence-value">{n(item.excess_bed_days_vs_national_median || 0)}</div>
                <p>Bed days above a simple national-median counterfactual for this month.</p>
                <p><strong>Observed delay:</strong> {n(item.average_delay_days, 2)} days</p>
                <p><strong>National provider median:</strong> {n(delayDistribution.median, 2)} days</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="callout">
            <strong>What this first analysis already tells us</strong>
            <p>
              The national median hides wide provider variation. In July 2026 the median provider recorded about {n(delayDistribution.median, 2)} days between discharge readiness and actual discharge, while the highest provider-level signals exceeded two days. The correct next question is not “who is worst?” but “what explains the excess days, and which causes are actually recoverable?”
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">Benchmark inputs</div>
              <h2>Provider-level data already exists across several resource domains.</h2>
            </div>
            <p>We prioritise open NHS data first, then clearly distinguish restricted benchmarking sources.</p>
          </div>
          <div className="card-grid">
            {benchmarkSources.map((source) => (
              <article className="card" key={source.id}>
                <div className="meta-row">
                  <span className="badge">{source.status}</span>
                  <span>{source.level}</span>
                  <span>{source.cadence}</span>
                </div>
                <h3>{source.domain}</h3>
                <p><strong>{source.metric}</strong></p>
                <p>{source.notes}</p>
                <a className="source-link" href={source.sourceUrl} target="_blank" rel="noreferrer">Source: {source.sourceLabel} ↗</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">Benchmark discipline</div>
              <h2>No crude league tables.</h2>
            </div>
          </div>
          <div className="card">
            <ul className="list-clean">
              {benchmarkRules.map((rule) => <li key={rule}>{rule}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">Verified examples</div>
              <h2>What improved performance can look like.</h2>
            </div>
            <p>These are provider case studies, not national effect estimates.</p>
          </div>
          <div className="card-grid">
            {benchmarkCases.map((item) => (
              <article className="card" key={item.id}>
                <span className="badge">{item.domain}</span>
                <h3 style={{ marginTop: 16 }}>{item.provider}</h3>
                <div className="evidence-value">{item.period}</div>
                <p><strong>{item.result}</strong></p>
                <p>{item.interpretation}</p>
                <a className="source-link" href={item.sourceUrl} target="_blank" rel="noreferrer">Source: {item.sourceLabel} ↗</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="quote">
            The purpose of benchmarking is not to shame a provider. It is to find unexplained variation quickly enough to ask the right operational question.
          </div>
        </div>
      </section>
    </>
  );
}
