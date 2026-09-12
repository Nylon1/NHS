import { researchTracker } from "@/lib/interventions";

export default function ResearchPage() {
  return (
    <>
      <section className="page-head">
        <div className="shell">
          <div className="eyebrow">Research tracker</div>
          <h1>Separate what is known, what is actionable, and what still needs measuring.</h1>
          <p className="lede">The research layer exists to prevent false certainty. Strong evidence, weak measurement and intervention readiness are shown separately so the next question is obvious.</p>
        </div>
      </section>

      <section className="section">
        <div className="shell metric-grid">
          <div className="metric"><span className="badge">Rule</span><strong>Known</strong><h3>Evidence strength</h3><small>How strong is the underlying evidence that a resource problem exists?</small></div>
          <div className="metric"><span className="badge">Rule</span><strong>Measured</strong><h3>Measurement quality</h3><small>Can the problem be observed consistently in current data?</small></div>
          <div className="metric"><span className="badge">Rule</span><strong>Actionable</strong><h3>Intervention readiness</h3><small>Is there a practical, governed change that can be tested now?</small></div>
          <div className="metric"><span className="badge">Rule</span><strong>Open</strong><h3>Research question</h3><small>What still has to be learned before scale or savings can be claimed?</small></div>
        </div>
      </section>

      <section className="section">
        <div className="shell opportunity-stack">
          {researchTracker.map((item) => (
            <details className="reveal-card" key={item.domain}>
              <summary>
                <span>{item.domain}</span>
                <span className="muted">Evidence: {item.evidenceStrength}</span>
              </summary>
              <div className="reveal-body two-col">
                <div><strong>Measurement quality</strong><p>{item.measurementQuality}</p></div>
                <div><strong>Intervention readiness</strong><p>{item.interventionReadiness}</p></div>
                <div style={{ gridColumn: "1 / -1" }}><strong>Open question</strong><p>{item.openQuestion}</p></div>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="shell two-col">
          <div><div className="eyebrow">Important limitation</div><h2>No single national waste number.</h2><p className="muted">We do not add overlapping historical models, capacity estimates and cost-avoidance figures into one headline claim. The first objective is to measure the recoverable proportion accurately.</p></div>
          <div className="callout"><strong>Working rule</strong><p>Observed waste, potential waste and recoverable waste are three different things. Verified saving only exists after an intervention has been measured.</p></div>
        </div>
      </section>
    </>
  );
}
