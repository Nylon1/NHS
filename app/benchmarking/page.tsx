import { benchmarkCases, benchmarkRules, benchmarkSources } from "@/lib/benchmarking";

export default function BenchmarkingPage() {
  return (
    <>
      <section className="page-head">
        <div className="shell">
          <div className="eyebrow">Provider benchmarking</div>
          <h1>Variation should tell us where to investigate first.</h1>
          <p className="lede">
            Sitora compares providers only where the underlying data is traceable and comparable. A high or low rank is a signal for investigation, not a declaration of waste or poor care.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">Benchmark inputs</div>
              <h2>Provider-level data already exists across several resource domains.</h2>
            </div>
            <p>We prioritise open NHS data first, then clearly distinguish restricted benchmarking sources.</p>
          </div>
          <div className="card-grid">
            {benchmarkSources.map((source) => (
              <article className="card" key={source.id}>
                <div className="meta-row">
                  <span className="badge">{source.status}</span>
                  <span>{source.level}</span>
                  <span>{source.cadence}</span>
                </div>
                <h3>{source.domain}</h3>
                <p><strong>{source.metric}</strong></p>
                <p>{source.notes}</p>
                <a className="source-link" href={source.sourceUrl} target="_blank" rel="noreferrer">Source: {source.sourceLabel} ↗</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">Benchmark discipline</div>
              <h2>No crude league tables.</h2>
            </div>
          </div>
          <div className="card">
            <ul className="list-clean">
              {benchmarkRules.map((rule) => <li key={rule}>{rule}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">Verified examples</div>
              <h2>What improved performance can look like.</h2>
            </div>
            <p>These are provider case studies, not national effect estimates.</p>
          </div>
          <div className="card-grid">
            {benchmarkCases.map((item) => (
              <article className="card" key={item.id}>
                <span className="badge">{item.domain}</span>
                <h3 style={{ marginTop: 16 }}>{item.provider}</h3>
                <div className="evidence-value">{item.period}</div>
                <p><strong>{item.result}</strong></p>
                <p>{item.interpretation}</p>
                <a className="source-link" href={item.sourceUrl} target="_blank" rel="noreferrer">Source: {item.sourceLabel} ↗</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="quote">
            The purpose of benchmarking is not to shame a provider. It is to find unexplained variation quickly enough to ask the right operational question.
          </div>
        </div>
      </section>
    </>
  );
}
