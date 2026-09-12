import Link from "next/link";
import { investigations, wasteTaxonomy } from "@/lib/data";

export default function FindingsPage() {
  return (
    <>
      <section className="page-head">
        <div className="shell">
          <div className="eyebrow">Our investigation</div>
          <h1>Where resources appear to be lost, and what might be recoverable.</h1>
          <p className="lede">We separate observed waste from potential waste and from genuinely recoverable waste. The distinction matters because not every inefficiency can be converted into cash or capacity.</p>
        </div>
      </section>

      <section className="section">
        <div className="shell two-col">
          <div>
            <div className="eyebrow">Core observation</div>
            <h2>Fragmentation hides the full pathway cost.</h2>
            <p className="muted">Prescribing, dispensing, finance, workforce, appointments, production and outcomes are often visible in separate systems. Waste frequently emerges only when those datasets are connected.</p>
          </div>
          <div className="callout">
            <strong>Working thesis</strong>
            <p>The NHS has extensive information about activity and spend, but limited continuous visibility of whether each activity, medicine, specialist hour or piece of capacity was necessary, could have been delivered differently, or could have been prevented.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">Waste taxonomy</div>
              <h2>A common language for different forms of loss.</h2>
            </div>
          </div>
          <div className="card-grid">
            {wasteTaxonomy.map(([code, label]) => (
              <div className="card" key={code}>
                <span className="badge">{code}</span>
                <h3 style={{ marginTop: 14 }}>{label}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">Case studies</div>
              <h2>Initial pathways under investigation.</h2>
            </div>
          </div>
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
    </>
  );
}
