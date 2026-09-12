import { rankedOpportunities, opportunityScore } from "@/lib/opportunities";

function scoreBar(label: string, value: number) {
  return (
    <div className="score-row" key={label}>
      <div className="score-label"><span>{label}</span><strong>{value}</strong></div>
      <div className="score-track"><div className="score-fill" style={{ width: `${value}%` }} /></div>
    </div>
  );
}

export default function OpportunitiesPage() {
  const top = rankedOpportunities.slice(0, 5);

  return (
    <>
      <section className="page-head">
        <div className="shell">
          <div className="eyebrow">NHS-wide Opportunity Register</div>
          <h1>Which resource problems deserve action first, and what would count as proof?</h1>
          <p className="lede">
            This register combines scale, evidence, recoverability, intervention readiness and measurability. It separates observed exposure from recoverable opportunity and from verified benefit.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="callout">
            <strong>How the ranking works</strong>
            <p>Each opportunity receives five 0–100 component scores. The overall score weights scale 25%, evidence 20%, recoverability 20%, readiness 20% and measurability 15%. The score is a prioritisation tool, not an estimate of money available to save.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">Highest current priorities</div>
              <h2>Large problems with evidence, an actionable intervention and a way to verify recovery.</h2>
            </div>
          </div>
          <div className="card-grid">
            {top.map((item, index) => (
              <article className="card" key={item.id}>
                <div className="meta-row">
                  <span className="badge">#{index + 1}</span>
                  <span>{item.domain}</span>
                  <span>{item.benefitType}</span>
                </div>
                <div className="evidence-value">{opportunityScore(item)}</div>
                <h3>{item.title}</h3>
                <p>{item.opportunityStatement}</p>
                <p><strong>Pilot readiness:</strong> {item.pilotReadiness}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">Full opportunity register</div>
              <h2>Every opportunity is explicit about what we know, what we do not know and what would prove value.</h2>
            </div>
          </div>

          <div className="opportunity-stack">
            {rankedOpportunities.map((item, index) => (
              <article className="card opportunity-card" key={item.id}>
                <div className="opportunity-head">
                  <div>
                    <div className="meta-row">
                      <span className="badge">Rank {index + 1}</span>
                      <span>{item.domain}</span>
                      <span>{item.benefitType}</span>
                      <span>Evidence: {item.evidence}</span>
                    </div>
                    <h2>{item.title}</h2>
                  </div>
                  <div className="opportunity-score">
                    <strong>{opportunityScore(item)}</strong>
                    <small>priority score</small>
                  </div>
                </div>

                <div className="opportunity-grid">
                  <div>
                    <h3>Observed signal</h3>
                    <p>{item.observedSignal}</p>
                    <h3>Opportunity</h3>
                    <p>{item.opportunityStatement}</p>
                    <h3>Operational owner</h3>
                    <p>{item.owner}</p>
                    <h3>Intervention</h3>
                    <p>{item.intervention}</p>
                  </div>

                  <div>
                    {scoreBar("Scale", item.scores.scale)}
                    {scoreBar("Evidence", item.scores.evidence)}
                    {scoreBar("Recoverability", item.scores.recoverability)}
                    {scoreBar("Readiness", item.scores.readiness)}
                    {scoreBar("Measurability", item.scores.measurability)}
                    <p><strong>Pilot readiness:</strong> {item.pilotReadiness}</p>
                  </div>
                </div>

                <div className="opportunity-grid">
                  <div>
                    <h3>Minimum data needed</h3>
                    <ul className="list-clean">{item.firstDataNeeded.map((x) => <li key={x}>{x}</li>)}</ul>
                  </div>
                  <div>
                    <h3>What proves recovery</h3>
                    <ul className="list-clean">{item.verification.map((x) => <li key={x}>{x}</li>)}</ul>
                  </div>
                  <div>
                    <h3>Safety / interpretation guardrails</h3>
                    <ul className="list-clean">{item.safeguards.map((x) => <li key={x}>{x}</li>)}</ul>
                  </div>
                </div>

                <a className="source-link" href={item.sourceUrl} target="_blank" rel="noreferrer">Source: {item.sourceLabel} ↗</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="quote">
            The objective is not to produce the biggest possible waste number. It is to identify the largest credible, recoverable opportunities and then prove what was actually recovered.
          </div>
        </div>
      </section>
    </>
  );
}
