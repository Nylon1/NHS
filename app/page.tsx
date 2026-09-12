import Link from "next/link";
import { investigations } from "@/lib/data";
import { headlineEvidenceIds, researchEvidence, researchTimeline } from "@/lib/research";

export default function Home() {
  const headlineEvidence = headlineEvidenceIds
    .map((id) => researchEvidence.find((item) => item.id === id))
    .filter(Boolean);

  return (
    <>
      <section className="hero">
        <div className="shell">
          <div className="eyebrow">NHS resource intelligence</div>
          <h1>Measure resource loss. Intervene before it repeats. Verify what was actually recovered.</h1>
          <p className="lede">
            Sitora connects historic reviews with current operational data to show where money, medicines, workforce time and clinical capacity are being lost. Our first flagship programme focuses on medicines: closing the repeat-supply loop and optimising the pathway around every medicine that is genuinely required.
          </p>
          <div className="hero-actions">
            <Link className="button primary" href="/medicines-proposal">Explore the medicines proposal</Link>
            <Link className="button secondary" href="/evidence">Explore the evidence</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">Two flagship solutions</div>
              <h2>Close the medicine loop, then optimise the resource pathway.</h2>
            </div>
            <p>The two solutions solve different parts of the same problem. One asks whether another supply is needed. The other asks whether a required medicine is being delivered through the most appropriate and resource-efficient clinically safe pathway.</p>
          </div>
          <div className="card-grid">
            <Link className="card card-link evidence-card" href="/medicines-proposal">
              <div className="meta-row"><span className="badge">Solution 1</span><span>Patient and prescription level</span></div>
              <h2>Medicine Loop</h2>
              <p>Connect prescribing, dispensing, expected consumption, patient-held stock and medication changes before the next repeat supply decision.</p>
              <p><strong>Core question:</strong> Should this medicine be supplied again now?</p>
            </Link>
            <Link className="card card-link evidence-card" href="/medicines-proposal">
              <div className="meta-row"><span className="badge">Solution 2</span><span>Provider and pathway level</span></div>
              <h2>Medicines Resource Intelligence</h2>
              <p>Measure the full pathway around medicines, including formulation, route, pharmacy and aseptic capacity, nursing time, chairs, beds, consumables and unused preparations.</p>
              <p><strong>Core question:</strong> If the medicine is needed, are we delivering it through the right pathway?</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">The scale of the signal</div>
              <h2>Four numbers that deserve attention.</h2>
            </div>
            <p>These figures measure different things. None should be added together. Together they show why resource intelligence needs to be treated as infrastructure, not an occasional cost-cutting exercise.</p>
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
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">Past to present</div>
              <h2>The same resource problem keeps reappearing in different forms.</h2>
            </div>
            <p>Historic reviews identified large opportunities. Current data shows the NHS still needs a system that can continuously detect, explain and verify resource loss.</p>
          </div>
          <div className="process">
            {researchTimeline.map((item, index) => (
              <div className="process-step" key={item.year}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.year}</h3>
                <strong>{item.headline}</strong>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">What we measure</div>
              <h2>Waste is bigger than a discarded item.</h2>
            </div>
            <p>We separate direct financial loss from clinical capacity, infrastructure, patient time and avoidable downstream activity.</p>
          </div>
          <div className="metric-grid">
            {[
              ["Money", "£", "Direct spend, avoidable cost and cost avoidance"],
              ["People", "Hours", "Nursing, pharmacy, specialist and admin capacity"],
              ["Capacity", "Beds / chairs", "Hospital, clinic and controlled production capacity"],
              ["Medicines", "Items / £", "Unused supply, excess stock and discarded preparations"]
            ].map(([title, value, body]) => (
              <div className="metric" key={title}>
                <span className="badge">Resource</span>
                <strong>{value}</strong>
                <h3>{title}</h3>
                <small>{body}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">Current investigations</div>
              <h2>Other pathways test the same Resource Intelligence architecture.</h2>
            </div>
            <p>Discharge, theatres, appointments and other pathways remain important. They demonstrate that the same Observe → Detect → Explain → Intervene → Verify model can extend beyond medicines.</p>
          </div>
          <div className="card-grid">
            {investigations.map((item) => (
              <Link className="card card-link" key={item.slug} href={`/investigations/${item.slug}`}>
                <span className="badge">{item.eyebrow}</span>
                <h3 style={{ marginTop: 16 }}>{item.title}</h3>
                <p>{item.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">Operating model</div>
              <h2>Measure first. Intervene second. Verify afterwards.</h2>
            </div>
          </div>
          <div className="process">
            {[
              ["01", "Observe", "Connect existing activity, cost and capacity data."],
              ["02", "Detect", "Find waste, variation, duplication and bottlenecks."],
              ["03", "Explain", "Identify why the resource is being consumed."],
              ["04", "Intervene", "Propose a governed, evidence-linked change."],
              ["05", "Verify", "Measure what was genuinely recovered afterwards."]
            ].map(([n, title, body]) => (
              <div className="process-step" key={title}>
                <span>{n}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="quote">
            Every medicine should be needed, supplied in the right quantity, delivered through the right clinically appropriate pathway, and measured through to its actual use or waste.
          </div>
        </div>
      </section>
    </>
  );
}
