import { lossMechanisms } from "@/lib/loss-map";

export default function LossMapPage() {
  return (
    <>
      <section className="page-head">
        <div className="shell">
          <div className="eyebrow">Resource loss map</div>
          <h1>See where resource may be leaking, then open the mechanism only when you need the detail.</h1>
          <p className="lede">Each mechanism separates the visible signal from the missing data, the intervention and the proof required before anything can be called recoverable.</p>
        </div>
      </section>

      <section className="section">
        <div className="shell metric-grid">
          <div className="metric"><span className="badge">Map</span><strong>{lossMechanisms.length}</strong><h3>Priority mechanisms</h3><small>Selected for scale, measurability and intervention potential.</small></div>
          <div className="metric"><span className="badge">Step 1</span><strong>Signal</strong><h3>What can we already see?</h3><small>Measured exposure, variation or blocked capacity.</small></div>
          <div className="metric"><span className="badge">Step 2</span><strong>Cause</strong><h3>Why did it happen?</h3><small>Root-cause attribution before intervention.</small></div>
          <div className="metric"><span className="badge">Step 3</span><strong>Proof</strong><h3>Did anything improve?</h3><small>Verified outcome with safety and workload guardrails.</small></div>
        </div>
      </section>

      <section className="section">
        <div className="shell opportunity-stack">
          {lossMechanisms.map((item) => (
            <details className="reveal-card" key={item.id}>
              <summary>
                <span><span className="badge">{item.area}</span> {item.signal}</span>
                <strong>{item.scale}</strong>
              </summary>
              <div className="reveal-body">
                <div className="meta-row"><span>Evidence: {item.evidence}</span><span>{item.period}</span><span>Recoverability: {item.recoverability}</span></div>
                <div className="opportunity-grid">
                  <div><strong>How the loss happens</strong><p>{item.lossMechanism}</p></div>
                  <div><strong>Existing data</strong><p>{item.existingData}</p></div>
                  <div><strong>Missing data</strong><p>{item.missingData}</p></div>
                  <div><strong>Intervention to test</strong><p>{item.intervention}</p></div>
                  <div><strong>Pilot proof</strong><p>{item.pilotMetric}</p></div>
                </div>
                <a className="source-link" href={item.sourceUrl} target="_blank" rel="noreferrer">Source: {item.sourceLabel} ↗</a>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="section"><div className="shell quote">A resource-loss signal is only the start. The useful output is a traceable chain from signal to cause to intervention to verified recovery.</div></section>
    </>
  );
}
