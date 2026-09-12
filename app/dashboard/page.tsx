import { dashboardDomains, dashboardPrinciples } from "@/lib/dashboard";

export default function DashboardPage() {
  return (
    <>
      <section className="page-head">
        <div className="shell">
          <div className="eyebrow">National resource dashboard</div>
          <h1>Separate exposure, opportunity and verified recovery.</h1>
          <p className="lede">The dashboard keeps pounds, appointments, bed days and workforce capacity in their own units so large numbers are not mistaken for savings.</p>
        </div>
      </section>

      <section className="section">
        <div className="shell metric-grid">
          {dashboardPrinciples.map(([title, body]) => (
            <div className="metric" key={title}><span className="badge">Rule</span><h3>{title}</h3><small>{body}</small></div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head"><div><div className="eyebrow">Current domains</div><h2>National signals without false aggregation.</h2></div><p>Each domain preserves its own unit, evidence status and caveat.</p></div>
          <div className="opportunity-stack">
            {dashboardDomains.map((item) => (
              <article className="card evidence-card" key={item.id}>
                <div className="meta-row"><span className="badge">{item.domain}</span><span>Confidence: {item.confidence}</span></div>
                <h2>{item.title}</h2>
                <div className="metric-grid">
                  <div className="metric"><span className="badge">Observed</span><strong>{item.observed}</strong><small>{item.observedLabel}</small></div>
                  <div className="metric"><span className="badge">Opportunity</span><strong>{item.opportunity}</strong><small>{item.opportunityLabel}</small></div>
                  <div className="metric"><span className="badge">Verified</span><strong>{item.verified}</strong><small>{item.verifiedLabel}</small></div>
                </div>
                <details className="reveal-panel"><summary>Interpretation and source</summary><div className="reveal-body"><p>{item.interpretation}</p><a className="source-link" href={item.sourceUrl} target="_blank" rel="noreferrer">Source: {item.sourceLabel} ↗</a></div></details>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section"><div className="shell quote">A large number is not a saving. Recovery is only verified when the resource is genuinely released after intervention and safety is maintained.</div></section>
    </>
  );
}
