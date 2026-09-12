type EvidenceSource = { label: string; href: string };

type Props = {
  proven: string;
  adds: string;
  pilot: string;
  sources: EvidenceSource[];
  note?: string;
};

export default function DemoEvidence({ proven, adds, pilot, sources, note }: Props) {
  return (
    <section className="section demo-evidence-section">
      <div className="shell">
        <div className="section-head">
          <div><div className="eyebrow">Evidence → product → proof</div><h2>Separate what is already established from what Sitora still has to prove.</h2></div>
          <p>{note || "The published evidence supports the problem or intervention mechanism. A Sitora pilot must establish the local effect."}</p>
        </div>
        <div className="evidence-triptych">
          <article className="card evidence-card"><span className="badge">Proven already</span><h3>What existing evidence establishes</h3><p>{proven}</p></article>
          <article className="card evidence-card"><span className="badge">What Sitora adds</span><h3>The product layer</h3><p>{adds}</p></article>
          <article className="card evidence-card"><span className="badge">Pilot must prove</span><h3>No assumption allowed</h3><p>{pilot}</p></article>
        </div>
        <details className="reveal-panel" style={{ marginTop: 18 }}>
          <summary>Evidence used in this demo</summary>
          <div className="demo-source-list">
            {sources.map((source) => <a className="source-link" href={source.href} target="_blank" rel="noreferrer" key={source.href}>{source.label} ↗</a>)}
          </div>
        </details>
      </div>
    </section>
  );
}
