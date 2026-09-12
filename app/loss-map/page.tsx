import { lossMechanisms } from "@/lib/loss-map";

export default function LossMapPage() {
  return (
    <>
      <section className="page-head">
        <div className="shell">
          <div className="eyebrow">NHS resource loss map</div>
          <h1>Where resource disappears, what we can already see, and what is still invisible.</h1>
          <p className="lede">
            The purpose of this map is not to label all activity as waste. It is to identify where measurable resource loss, avoidable variation or blocked capacity may exist, then define the data and intervention needed to test it safely.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="metric-grid">
            <div className="metric"><span className="badge">Map</span><strong>{lossMechanisms.length}</strong><h3>Priority mechanisms</h3><small>Selected for scale, measurability and realistic intervention potential.</small></div>
            <div className="metric"><span className="badge">Question</span><strong>Cause</strong><h3>Why did the loss occur?</h3><small>Every signal needs root-cause attribution before it can become a savings claim.</small></div>
            <div className="metric"><span className="badge">Question</span><strong>Recovery</strong><h3>What can be safely recovered?</h3><small>Capacity release, cost avoidance and cash savings are tracked separately.</small></div>
            <div className="metric"><span className="badge">Question</span><strong>Proof</strong><h3>Did the intervention work?</h3><small>Every pilot requires a balance measure so apparent efficiency does not create harm elsewhere.</small></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="card-grid">
            {lossMechanisms.map((item) => (
              <article className="card evidence-card" key={item.id}>
                <div className="meta-row">
                  <span className="badge">{item.evidence}</span>
                  <span>{item.period}</span>
                  <span>Recoverability: {item.recoverability}</span>
                </div>
                <div className="eyebrow" style={{ marginTop: 14 }}>{item.area}</div>
                <div className="evidence-value">{item.scale}</div>
                <h3>{item.signal}</h3>

                <div>
                  <strong>How the loss happens</strong>
                  <p>{item.lossMechanism}</p>
                </div>

                <div>
                  <strong>Data that already exists</strong>
                  <p>{item.existingData}</p>
                </div>

                <div>
                  <strong>What is still missing</strong>
                  <p>{item.missingData}</p>
                </div>

                <div>
                  <strong>Intervention to test</strong>
                  <p>{item.intervention}</p>
                </div>

                <div>
                  <strong>Pilot proof</strong>
                  <p>{item.pilotMetric}</p>
                </div>

                <a className="source-link" href={item.sourceUrl} target="_blank" rel="noreferrer">Source: {item.sourceLabel} ↗</a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
