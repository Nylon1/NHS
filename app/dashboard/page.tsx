import { dashboardDomains, dashboardPrinciples } from "@/lib/dashboard";

export default function DashboardPage() {
  return (
    <>
      <section className="page-head">
        <div className="shell">
          <div className="eyebrow">National resource loss dashboard</div>
          <h1>Separate what is exposed, what may be recoverable, and what has actually been recovered.</h1>
          <p className="lede">
            The dashboard avoids one misleading NHS waste total. Pounds, appointments, bed days and workforce capacity are tracked in their own units, with a clear line between observed exposure, plausible opportunity and verified recovery.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="metric-grid">
            {dashboardPrinciples.map(([title, body]) => (
              <div className="metric" key={title}>
                <span className="badge">Dashboard rule</span>
                <h3>{title}</h3>
                <small>{body}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">Current domains</div>
              <h2>National signals, without false aggregation.</h2>
            </div>
            <p>Each domain keeps its own resource unit and evidence status.</p>
          </div>

          <div className="card-grid">
            {dashboardDomains.map((item) => (
              <article className="card" key={item.id}>
                <div className="meta-row">
                  <span className="badge">{item.domain}</span>
                  <span>Confidence: {item.confidence}</span>
                </div>
                <h2 style={{ marginTop: 14 }}>{item.title}</h2>

                <div className="metric-grid" style={{ marginTop: 18 }}>
                  <div className="metric">
                    <span className="badge">Observed exposure</span>
                    <strong>{item.observed}</strong>
                    <small>{item.observedLabel}</small>
                  </div>
                  <div className="metric">
                    <span className="badge">Plausibly recoverable</span>
                    <strong>{item.opportunity}</strong>
                    <small>{item.opportunityLabel}</small>
                  </div>
                  <div className="metric">
                    <span className="badge">Verified recovery</span>
                    <strong>{item.verified}</strong>
                    <small>{item.verifiedLabel}</small>
                  </div>
                </div>

                <div style={{ marginTop: 18 }}>
                  <strong>Interpretation</strong>
                  <p>{item.interpretation}</p>
                </div>
                <a className="source-link" href={item.sourceUrl} target="_blank" rel="noreferrer">
                  Source: {item.sourceLabel} ↗
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="quote">
            A large number is not a saving. A saving is only verified when the resource was genuinely recovered after intervention, with safety and service quality maintained.
          </div>
        </div>
      </section>
    </>
  );
}
