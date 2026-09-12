import { lossRegister, registerSummary } from "@/lib/register";

export default function RegisterPage() {
  const records = [...lossRegister].sort((a, b) => b.priority - a.priority);

  return (
    <>
      <section className="page-head"><div className="shell"><div className="eyebrow">Resource loss register</div><h1>Turn broad NHS waste signals into accountable, testable opportunities.</h1><p className="lede">Each record shows the signal, who owns it, what is still unknown, what intervention could be tested and what evidence would be required before calling anything recovered.</p></div></section>

      <section className="section"><div className="shell metric-grid">
        <div className="metric"><span className="badge">Register</span><strong>{registerSummary.records}</strong><h3>Priority mechanisms</h3><small>Initial national opportunity register.</small></div>
        <div className="metric"><span className="badge">Recoverability</span><strong>{registerSummary.highRecoverability}</strong><h3>High-recoverability areas</h3><small>Practical intervention appears feasible now.</small></div>
        <div className="metric"><span className="badge">Evidence</span><strong>{registerSummary.highConfidence}</strong><h3>High-confidence signals</h3><small>Grounded in measured NHS or government evidence.</small></div>
        <div className="metric"><span className="badge">Top score</span><strong>{registerSummary.topPriority[0]?.priority ?? "-"}</strong><h3>Current priority</h3><small>Directional ranking, not a savings valuation.</small></div>
      </div></section>

      <section className="section"><div className="shell"><div className="section-head"><div><div className="eyebrow">Priority view</div><h2>Where should investigation start?</h2></div><p>Scale matters, but so do evidence quality, recoverability and whether success can be measured.</p></div><div className="card-grid">{registerSummary.topPriority.map((item) => <article className="card" key={item.id}><div className="meta-row"><span className="badge">Priority {item.priority}</span><span>{item.domain}</span></div><h3>{item.title}</h3><div className="evidence-value">{item.signal}</div><p><strong>Test:</strong> {item.intervention}</p></article>)}</div></div></section>

      <section className="section"><div className="shell"><div className="section-head"><div><div className="eyebrow">Full register</div><h2>Open a record only when you need the detail.</h2></div><p>The headline remains visible. Ownership, missing data, intervention and verification logic sit behind each record.</p></div><div className="faq-list">{records.map((item) => <details className="faq-item" key={item.id}><summary><span>{item.title}</span><span className="meta-row"><span className="badge">{item.priority}</span><span>{item.domain}</span></span></summary><div className="faq-answer"><div className="evidence-value">{item.signal}</div><p><strong>Period:</strong> {item.period} · <strong>Confidence:</strong> {item.confidence} · <strong>Recoverability:</strong> {item.recoverability} · <strong>Trend:</strong> {item.trend}</p><p><strong>Owner:</strong> {item.owner}</p><p><strong>Loss mechanism:</strong> {item.problem}</p><p><strong>Missing data:</strong> {item.missingData}</p><p><strong>Intervention:</strong> {item.intervention}</p><p><strong>Verification:</strong> {item.verificationMetric}</p><p><strong>Stage:</strong> {item.stage}</p><a className="source-link" href={item.sourceUrl} target="_blank" rel="noreferrer">Source: {item.sourceLabel} ↗</a></div></details>)}</div></div></section>

      <section className="section"><div className="shell quote">A loss is not recovered because a target was announced. It counts only when the baseline, intervention and verified resource release can be shown without harming care.</div></section>
    </>
  );
}
