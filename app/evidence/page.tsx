import { evidence } from "@/lib/data";

export default function EvidencePage() {
  return (
    <>
      <section className="page-head">
        <div className="shell">
          <div className="eyebrow">Evidence explorer</div>
          <h1>Every important number needs provenance and a warning label.</h1>
          <p className="lede">We distinguish measured data, modelling, Sitora calculations and unknowns. Historic modelling is never presented as current realised savings.</p>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="card-grid">
            {evidence.map((item) => (
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
                  <strong>Interpretation</strong>
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
