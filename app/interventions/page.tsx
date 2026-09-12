import { interventions } from "@/lib/interventions";

export default function InterventionsPage() {
  return (
    <>
      <section className="page-head">
        <div className="shell">
          <div className="eyebrow">Intervention library</div>
          <h1>Finding waste is only useful if there is a safe way to act on it.</h1>
          <p className="lede">Each intervention is tied to a specific resource problem, measurable outcomes and explicit constraints. Clinical governance remains part of the pathway.</p>
        </div>
      </section>

      <section className="section">
        <div className="shell card-grid">
          {interventions.map((item) => (
            <article className="card evidence-card" key={item.slug}>
              <div className="meta-row">
                <span className="badge">{item.domain}</span>
                <span>Evidence: {item.evidence}</span>
              </div>
              <h3>{item.title}</h3>
              <div>
                <strong>Problem</strong>
                <p>{item.problem}</p>
              </div>
              <div>
                <strong>Proposed intervention</strong>
                <p>{item.intervention}</p>
              </div>
              <div>
                <strong>Measure</strong>
                <ul className="list-clean">
                  {item.measures.map((measure) => <li key={measure}>{measure}</li>)}
                </ul>
              </div>
              <div>
                <strong>Constraints</strong>
                <ul className="list-clean">
                  {item.constraints.map((constraint) => <li key={constraint}>{constraint}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
