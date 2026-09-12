import { evidence } from "@/lib/data";
import { researchEvidence } from "@/lib/research";

export default function EvidencePage() {
  const allEvidence = [...researchEvidence, ...evidence];

  return (
    <>
      <section className="page-head">
        <div className="shell">
          <div className="eyebrow">Evidence explorer</div>
          <h1>Past reviews identified the opportunity. Current data shows why continuous measurement still matters.</h1>
          <p className="lede">
            Every important number carries provenance, date, evidence status and a caveat. We distinguish measured activity, modelling, historic benchmarks and targets so an attention-grabbing figure never becomes a misleading claim.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">Evidence discipline</div>
              <h2>Do not add unlike numbers together.</h2>
            </div>
            <p>A £5bn historic efficiency opportunity, 16m missed appointments and 4,000 WTE of modelled capacity are different signals. The platform keeps them separate and asks what can actually be observed, avoided and recovered now.</p>
          </div>
          <div className="metric-grid">
            {[
              ["Measured", "Observed activity or reported performance"],
              ["Modelled", "Estimated opportunity based on assumptions"],
              ["Historic benchmark", "Important prior evidence, not a current loss figure"],
              ["Target", "A policy or planning requirement, not achieved savings"]
            ].map(([title, body]) => (
              <div className="metric" key={title}>
                <span className="badge">Evidence type</span>
                <h3>{title}</h3>
                <small>{body}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="card-grid">
            {allEvidence.map((item) => (
              <article className="card evidence-card" key={item.id}>
                <div className="meta-row">
                  <span className="badge">{item.status}</span>
                  <span>{item.year}</span>
                  <span>{item.geography}</span>
                  <span>Strength: {item.strength}</span>
                </div>
                <div className="evidence-value">{item.value}</div>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <div>
                  <strong>What it tells us</strong>
                  <p>{item.interpretation}</p>
                </div>
                <div>
                  <strong>Caveat</strong>
                  <p>{item.caveat}</p>
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
