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
          <div className="eyebrow">NHS resource waste observatory</div>
          <h1>The NHS has known where major efficiency opportunities sit for a decade. The missing layer is continuous measurement.</h1>
          <p className="lede">
            Sitora NHS Resource Intelligence connects historic reviews with current operational data to show where money, medicines, workforce time and clinical capacity are being lost, where an intervention is plausible, and whether anything was genuinely recovered.
          </p>
          <div className="hero-actions">
            <Link className="button primary" href="/evidence">Explore the evidence</Link>
            <Link className="button secondary" href="/pilot">See the 90 day pilot</Link>
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
              <h2>Four pathways, one recurring problem.</h2>
            </div>
            <p>Different specialties repeatedly show the same pattern: fragmented information makes resource loss hard to detect before it occurs.</p>
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
            The question is not only “what did the NHS spend?” It is “did this activity need to happen, did it need to happen here, and did it need this level of resource?”
          </div>
        </div>
      </section>
    </>
  );
}
