import Link from "next/link";
import { headlineEvidenceIds, researchEvidence } from "@/lib/research";

export default function Home() {
  const headlineEvidence = headlineEvidenceIds
    .map((id) => researchEvidence.find((item) => item.id === id))
    .filter(Boolean);

  return (
    <>
      <section className="hero">
        <div className="shell">
          <div className="eyebrow">Independent healthcare resource intelligence</div>
          <h1>Stop avoidable medicine waste before it happens.</h1>
          <p className="lede">
            Sitora connects prescribing, dispensing and pathway data to answer two questions: should this medicine be supplied again, and if it is needed, are we delivering it through the right clinically appropriate pathway?
          </p>
          <div className="hero-actions">
            <Link className="button primary" href="/commissioner-summary">See the commissioner summary</Link>
            <Link className="button secondary" href="/medicines-proposal">Explore the medicines programme</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">Two flagship solutions</div>
              <h2>Close the supply loop. Then optimise the pathway.</h2>
            </div>
          </div>
          <div className="card-grid">
            <Link className="card card-link evidence-card" href="/medicines-proposal">
              <div className="meta-row"><span className="badge">Solution 1</span><span>Patient + prescription</span></div>
              <h2>Medicine Loop</h2>
              <p>Uses prescribing, dispensing, expected consumption, stock and medication changes to identify when another repeat supply may not be needed.</p>
              <p><strong>Core question:</strong> Should this medicine be supplied again now?</p>
            </Link>
            <Link className="card card-link evidence-card" href="/medicines-proposal">
              <div className="meta-row"><span className="badge">Solution 2</span><span>Provider + pathway</span></div>
              <h2>Medicines Resource Intelligence</h2>
              <p>Measures route, formulation, preparation, pharmacy and nursing time, chair or bed use, and prepared-but-unused medicines.</p>
              <p><strong>Core question:</strong> If the medicine is needed, are we using the right pathway?</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">How it works</div>
              <h2>Measure. Intervene. Verify.</h2>
            </div>
            <p>No autonomous stopping of medicines. Clinical decisions remain with authorised professionals.</p>
          </div>
          <div className="process">
            {[
              ["01", "Observe", "Connect the minimum required operational signals."],
              ["02", "Detect", "Find likely unnecessary supply or resource-heavy pathways."],
              ["03", "Explain", "Show the reason and evidence behind the signal."],
              ["04", "Intervene", "Route governed action to the right professional."],
              ["05", "Verify", "Record what resource was genuinely recovered."]
            ].map(([n, title, body]) => (
              <div className="process-step" key={title}><span>{n}</span><h3>{title}</h3><p>{body}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">Why it matters</div>
              <h2>Large signals already exist. The missing layer is continuous verification.</h2>
            </div>
            <Link className="button secondary" href="/evidence">View the full evidence base</Link>
          </div>
          <div className="metric-grid">
            {headlineEvidence.map((item) => item && (
              <div className="metric" key={item.id}>
                <span className="badge">{item.year}</span>
                <strong>{item.value}</strong>
                <h3>{item.title}</h3>
                <small>{item.caveat}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell two-col">
          <div>
            <div className="eyebrow">The pilot</div>
            <h2>20 weeks to prove whether the model creates safe, positive net benefit.</h2>
            <p className="lede">One acute provider, a small primary-care and community-pharmacy network, three medicines workstreams, and a pre-agreed Scale / Modify / Stop decision.</p>
            <div className="hero-actions">
              <Link className="button primary" href="/pilot">See the pilot</Link>
              <Link className="button secondary" href="/business-case">Read the business case</Link>
            </div>
          </div>
          <div className="card evidence-card">
            <span className="badge">Success rule</span>
            <h3>Net benefit, not gross savings.</h3>
            <p>Cash release, cost avoidance and capacity release are reported separately. A benefit only counts when the intervention and outcome can be traced.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell quote">Every medicine should be needed, supplied in the right quantity, delivered through the right clinically appropriate pathway, and measured through to its actual use or waste.</div>
      </section>
    </>
  );
}
