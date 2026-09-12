import { notFound } from "next/navigation";
import { investigations } from "@/lib/data";

export function generateStaticParams() {
  return investigations.map((item) => ({ slug: item.slug }));
}

export default async function InvestigationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = investigations.find((entry) => entry.slug === slug);
  if (!item) notFound();

  return (
    <>
      <section className="page-head">
        <div className="shell">
          <div className="eyebrow">{item.eyebrow}</div>
          <h1>{item.title}</h1>
          <p className="lede">{item.summary}</p>
        </div>
      </section>

      <section className="section">
        <div className="shell two-col">
          <div>
            <div className="eyebrow">Question</div>
            <h2>{item.question}</h2>
          </div>
          <div className="callout">
            <strong>Resource intelligence principle</strong>
            <p>Do not assume activity is waste. Connect the data, identify the signal, validate it clinically and operationally, then measure what can actually be recovered.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell two-col">
          <div className="card">
            <span className="badge">Observed</span>
            <h2 style={{ marginTop: 14 }}>What we have found</h2>
            <ul className="list-clean">
              {item.observations.map((observation) => <li key={observation}>{observation}</li>)}
            </ul>
          </div>
          <div className="card">
            <span className="badge">Intervention</span>
            <h2 style={{ marginTop: 14 }}>What we would test</h2>
            <ul className="list-clean">
              {item.solutions.map((solution) => <li key={solution}>{solution}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">Pilot measurement</div>
              <h2>What success must prove.</h2>
            </div>
          </div>
          <div className="metric-grid">
            {[
              ["Observed", "What actually happened?"],
              ["Avoidable", "Which part could plausibly have been prevented?"],
              ["Recoverable", "What safe intervention exists?"],
              ["Verified", "What changed after implementation?"]
            ].map(([title, body]) => (
              <div className="metric" key={title}>
                <span className="badge">{title}</span>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
