import acute from "@/data/generated/acute-discharge-latest.json";
import joined from "@/data/generated/discharge-bottlenecks.json";

type ReasonMix = {
  reason: string;
  value: number;
  share: number;
};

type FamilyMix = {
  family: string;
  value: number;
  share: number;
};

type PriorityProvider = {
  provider: string;
  code: string;
  region: string;
  icb: string;
  discharges: number;
  bed_days_lost: number;
  average_delay_days: number;
  same_day_discharge_rate: number;
  delay_21_plus_rate: number;
  dominant_reason: string;
  dominant_reason_share: number;
  ownership_bucket: string;
  excess_bed_days_vs_median: number;
};

function n(value: number, dp = 0) {
  return value.toLocaleString("en-GB", {
    maximumFractionDigits: dp,
    minimumFractionDigits: dp,
  });
}

function pct(value: number) {
  return `${n(value * 100, 1)}%`;
}

const nationalReasons = (acute.national_reason_mix as ReasonMix[]).slice(0, 10);
const sourceFamilies = acute.national_source_family_mix as FamilyMix[];
const priorities = (joined.priority_providers as PriorityProvider[]).slice(0, 12);
const interfaceAndCapacityShare = sourceFamilies
  .filter((item) => ["Interface process", "Downstream capacity"].includes(item.family))
  .reduce((sum, item) => sum + item.share, 0);

export default function BottlenecksPage() {
  return (
    <>
      <section className="page-head">
        <div className="shell">
          <div className="eyebrow">Discharge bottleneck intelligence</div>
          <h1>Where is hospital capacity being lost, and what constraint appears alongside it?</h1>
          <p className="lede">
            This analysis joins July 2026 provider-level Discharge Ready Date performance with August 2026 acute-discharge delay-reason data. It is designed to prioritise investigation, not to prove causation or assign blame.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="metric-grid">
            <div className="metric">
              <span className="badge">Matched</span>
              <strong>{joined.matched_provider_count}</strong>
              <h3>Providers linked across both datasets</h3>
              <small>{joined.drd_provider_count} DRD providers and {joined.acute_provider_count} acute-discharge providers were available.</small>
            </div>
            <div className="metric">
              <span className="badge">Coverage</span>
              <strong>{pct(joined.join_rate)}</strong>
              <h3>DRD provider join rate</h3>
              <small>ODS organisation code is used first, with normalised organisation name as a fallback.</small>
            </div>
            <div className="metric">
              <span className="badge">National signal</span>
              <strong>{pct(nationalReasons[0]?.share || 0)}</strong>
              <h3>{nationalReasons[0]?.reason || "Leading cause"}</h3>
              <small>Largest share of the August LOS 7+ delay-reason count series.</small>
            </div>
            <div className="metric">
              <span className="badge">System layer</span>
              <strong>{pct(interfaceAndCapacityShare)}</strong>
              <h3>Interface + downstream-capacity signal</h3>
              <small>Share of the same LOS 7+ reason series grouped into these two broad source families.</small>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">National cause mix</div>
              <h2>The largest coded delay signals sit beyond a single hospital process.</h2>
            </div>
            <p>Only the provider-level “Delay reason LOS 7+” count series is used. Cost fields and the separate LOS 14+ series are excluded.</p>
          </div>

          <div className="card-grid">
            {nationalReasons.map((item, index) => (
              <article className="card" key={item.reason}>
                <div className="meta-row">
                  <span className="badge">#{index + 1}</span>
                  <span>LOS 7+ reason series</span>
                </div>
                <h3>{item.reason}</h3>
                <div className="evidence-value">{pct(item.share)}</div>
                <p>{n(item.value, 1)} aggregate reason-signal units in the source series.</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">Where the constraint sits</div>
              <h2>About {pct(interfaceAndCapacityShare)} of the national reason signal is in interface processes or downstream capacity.</h2>
            </div>
            <p>This does not mean that share is “outside the NHS” or automatically avoidable. It shows where operational investigation should begin.</p>
          </div>

          <div className="card-grid">
            {sourceFamilies.map((item) => (
              <article className="card" key={item.family}>
                <h3>{item.family}</h3>
                <div className="evidence-value">{pct(item.share)}</div>
                <p>{n(item.value, 1)} aggregate reason-signal units.</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">Provider investigation screen</div>
              <h2>High delay exposure, paired with the next month’s dominant coded bottleneck.</h2>
            </div>
            <p>Ordered by a simple excess-bed-day screen versus the July national provider median. This is not a savings estimate.</p>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Provider</th>
                  <th>Avg delay</th>
                  <th>Bed days lost</th>
                  <th>Median counterfactual</th>
                  <th>Dominant August bottleneck</th>
                  <th>Share</th>
                  <th>System bucket</th>
                </tr>
              </thead>
              <tbody>
                {priorities.map((item) => (
                  <tr key={item.code || item.provider}>
                    <td>
                      <strong>{item.provider}</strong><br />
                      <small>{item.region}</small>
                    </td>
                    <td>{n(item.average_delay_days, 2)} days</td>
                    <td>{n(item.bed_days_lost)}</td>
                    <td>{n(item.excess_bed_days_vs_median)}</td>
                    <td>{item.dominant_reason}</td>
                    <td>{pct(item.dominant_reason_share)}</td>
                    <td>{item.ownership_bucket}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="callout">
            <strong>How to read this analysis</strong>
            <p>{joined.methodology_warning}</p>
            <p>
              The median counterfactual asks what the July bed-day total would look like if a provider above the national provider median had matched that median. It is a screening tool only. It does not adjust for trust type, case mix, social-care availability, local geography, coding practice or data quality, and it must not be interpreted as cashable savings or proven avoidable waste.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="card-grid">
            <article className="card">
              <span className="badge">Source</span>
              <h3>NHS England Discharge Ready Date</h3>
              <p>July 2026 official provider-level discharge-ready-date statistics.</p>
              <a className="source-link" href="https://www.england.nhs.uk/statistics/statistical-work-areas/discharge-delays/discharge-ready-date/" target="_blank" rel="noreferrer">Open NHS England source ↗</a>
            </article>
            <article className="card">
              <span className="badge">Source</span>
              <h3>NHS England Acute Discharge Situation Report</h3>
              <p>August 2026 management information used for the delay-reason mix.</p>
              <a className="source-link" href="https://www.england.nhs.uk/statistics/statistical-work-areas/discharge-delays/acute-discharge-situation-report/" target="_blank" rel="noreferrer">Open NHS England source ↗</a>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
