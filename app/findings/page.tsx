import Link from "next/link";
import { investigations, wasteTaxonomy } from "@/lib/data";

export default function FindingsPage() {
  return (
    <>
      <section className="page-head">
        <div className="shell">
          <div className="eyebrow">Findings</div>
          <h1>Resource loss is rarely one event. It is usually a broken connection between need, activity and outcome.</h1>
          <p className="lede">The strongest recurring finding is fragmentation: the NHS can often see activity and spend, but not always whether the activity was necessary, avoidable, duplicated or delivered through a higher-resource pathway.</p>
        </div>
      </section>

      <section className="section">
        <div className="shell metric-grid">
          <div className="metric"><span className="badge">Finding</span><strong>Fragmented</strong><h3>Data sits in separate systems</h3><small>Prescribing, dispensing, finance, workforce and outcomes are often visible independently rather than as one resource pathway.</small></div>
          <div className="metric"><span className="badge">Finding</span><strong>Hidden</strong><h3>Loss is often visible only after linking data</h3><small>A transaction can look normal until it is compared with stock, pathway, timing or outcome data.</small></div>
          <div className="metric"><span className="badge">Finding</span><strong>Different</strong><h3>Exposure is not recovery</h3><small>Observed waste, plausible opportunity and verified recovery must remain separate.</small></div>
          <div className="metric"><span className="badge">Direction</span><strong>Closed loop</strong><h3>Measure, intervene, verify</h3><small>The proposed architecture connects detection to action and then checks whether anything was genuinely recovered.</small></div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head"><div><div className="eyebrow">Current investigations</div><h2>Four pathways testing the same underlying hypothesis.</h2></div><p>Open a pathway only if you want the detailed question and evidence behind it.</p></div>
          <div className="card-grid">
            {investigations.map((item) => (
              <Link className="card card-link" href={`/investigations/${item.slug}`} key={item.slug}>
                <span className="badge">{item.eyebrow}</span>
                <h3 style={{ marginTop: 14 }}>{item.title}</h3>
                <p>{item.summary}</p>
                <p><strong>Question:</strong> {item.question}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <details className="reveal-card">
            <summary>View the resource-loss taxonomy</summary>
            <div className="reveal-body card-grid">
              {wasteTaxonomy.map(([code, label]) => (
                <div className="card" key={code}><span className="badge">{code}</span><h3 style={{ marginTop: 14 }}>{label}</h3></div>
              ))}
            </div>
          </details>
        </div>
      </section>

      <section className="section"><div className="shell quote">The central question is not how much activity happened. It is whether that activity was needed, whether it could have used less resource, and whether changing it safely releases anything useful.</div></section>
    </>
  );
}
