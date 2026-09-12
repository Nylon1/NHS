import { lossRegister, registerSummary } from "@/lib/register";

const trendLabel = (trend: string) => trend;

export default function RegisterPage() {
  const records = [...lossRegister].sort((a, b) => b.priority - a.priority);

  return (
    <>
      <section className="page-head">
        <div className="shell">
          <div className="eyebrow">Resource Loss Register</div>
          <h1>Move from headline waste figures to accountable loss records.</h1>
          <p className="lede">
            Each record separates signal from proof, identifies what is still unknown, assigns an operational owner and defines how recovery would be verified.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="metric-grid">
            <div className="metric"><span className="badge">Register</span><strong>{registerSummary.records}</strong><h3>Priority loss mechanisms</h3><small>Initial national register, designed to expand to trust and pathway level.</small></div>
            <div className="metric"><span className="badge">Recoverability</span><strong>{registerSummary.highRecoverability}</strong><h3>High-recoverability areas</h3><small>Areas where practical interventions already exist or can be tested quickly.</small></div>
            <div className="metric"><span className="badge">Evidence</span><strong>{registerSummary.highConfidence}</strong><h3>High-confidence signals</h3><small>Records grounded in measured NHS or government data.</small></div>
            <div className="metric"><span className="badge">Priority</span><strong>{registerSummary.topPriority[0]?.priority ?? "-"}</strong><h3>Highest current score</h3><small>Priority is directional, not a financial valuation.</small></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">Prioritisation</div>
              <h2>What deserves attention first?</h2>
            </div>
            <p>Priority scores reflect scale, evidence quality, recoverability and whether a measurable intervention is available. They do not imply that the whole headline signal is avoidable.</p>
          </div>
          <div className="card-grid">
            {registerSummary.topPriority.map((item) => (
              <article className="card" key={item.id}>
                <div className="meta-row">
                  <span className="badge">Priority {item.priority}</span>
                  <span>{item.domain}</span>
                  <span>{item.period}</span>
                </div>
                <h3>{item.title}</h3>
                <div className="evidence-value">{item.signal}</div>
                <p><strong>Why now:</strong> {item.problem}</p>
                <p><strong>Test:</strong> {item.intervention}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">Full register</div>
              <h2>Every loss needs an owner, a cause and a verification rule.</h2>
            </div>
          </div>
          <div className="card-grid">
            {records.map((item) => (
              <article className="card evidence-card" key={item.id}>
                <div className="meta-row">
                  <span className="badge">Priority {item.priority}</span>
                  <span>{item.domain}</span>
                  <span>{item.period}</span>
                  <span>Confidence: {item.confidence}</span>
                  <span>Recoverability: {item.recoverability}</span>
                  <span>Trend: {trendLabel(item.trend)}</span>
                </div>
                <div className="evidence-value">{item.signal}</div>
                <h3>{item.title}</h3>
                <p><strong>Unit:</strong> {item.unit}</p>
                <p><strong>Operational owner:</strong> {item.owner}</p>
                <p><strong>Loss mechanism:</strong> {item.problem}</p>
                <p><strong>Missing data:</strong> {item.missingData}</p>
                <p><strong>Intervention:</strong> {item.intervention}</p>
                <p><strong>Verification:</strong> {item.verificationMetric}</p>
                <p><strong>Current stage:</strong> {item.stage}</p>
                <a className="source-link" href={item.sourceUrl} target="_blank" rel="noreferrer">Source: {item.sourceLabel} ↗</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="quote">
            A resource loss should not count as recovered because a target was announced. It counts when the NHS can show the baseline, intervention, counterfactual and verified resource released without harming care.
          </div>
        </div>
      </section>
    </>
  );
}
