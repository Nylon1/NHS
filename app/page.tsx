import Link from "next/link";
import { headlineEvidenceIds, researchEvidence } from "@/lib/research";

const demos = [
  {
    number: "01",
    badge: "Core product",
    title: "Medicine Loop",
    question: "Has every affected service acted on the same authorised medication change?",
    body: "Watch a hospital-stopped medicine move across GP, pharmacy, care-home and community workflows. The loop stays open until the downstream records and actions are reconciled.",
    proof: "Signed change → accountable action → acknowledgement → reconciliation → closure",
    href: "/demo/medicine-loop",
  },
  {
    number: "02",
    badge: "Waste prevention",
    title: "WasteGuard",
    question: "Should this repeat item actually be supplied again now?",
    body: "See how timing, expected use, patient-held stock and medication changes can identify a repeat that may no longer be needed this cycle.",
    proof: "Signal → human review → dispensing outcome → verified avoided supply",
    href: "/demo/wasteguard",
  },
  {
    number: "03",
    badge: "Evidence-backed resource intelligence",
    title: "Medicines Resource Intelligence",
    question: "If the medicine is needed, are we using the right clinically appropriate pathway?",
    body: "Explore NHS and published evidence on ready-to-administer medicines, subcutaneous treatment and dose banding, then see what must still be measured locally before benefit is claimed.",
    proof: "Published evidence → local opportunity → clinical approval → measured implementation → verified recovery",
    href: "/demo/medicines-resource-intelligence",
  },
];

export default function Home() {
  const headlineEvidence = headlineEvidenceIds.map((id) => researchEvidence.find((item) => item.id === id)).filter(Boolean);

  return (
    <>
      <section className="hero">
        <div className="shell">
          <div className="eyebrow">Independent medicines intelligence</div>
          <h1>See where medication workflows lose information, medicines and capacity. Then watch Sitora close the loop.</h1>
          <p className="lede">Three interactive product experiences show the proposition more clearly than a report: reconcile medication changes across organisations, prevent avoidable repeat supply, and identify evidence-backed opportunities to release medicines-pathway capacity.</p>
          <div className="hero-actions">
            <Link className="button primary" href="#see-it-working">See it working</Link>
            <Link className="button secondary" href="/commissioner-summary">Commissioner summary</Link>
          </div>
          <div className="meta-row" style={{marginTop:20}}><span>Clinical decisions remain with authorised professionals.</span><span>Benefits are not claimed until verified.</span></div>
        </div>
      </section>

      <section className="section" id="see-it-working">
        <div className="shell">
          <div className="section-head"><div><div className="eyebrow">See it working</div><h2>Choose the problem. Follow the workflow. See what counts as proof.</h2></div><p>The demos are the front door to Sitora. Start with the operational problem, then inspect the evidence and pilot design behind it.</p></div>
          <div className="demo-home-grid">
            {demos.map((demo) => (
              <Link className="demo-home-card" href={demo.href} key={demo.title}>
                <div className="demo-home-top"><span className="demo-home-number">{demo.number}</span><span className="badge">{demo.badge}</span></div>
                <h2>{demo.title}</h2>
                <p className="demo-home-question">{demo.question}</p>
                <p>{demo.body}</p>
                <div className="demo-home-proof"><small>What the demo shows</small><strong>{demo.proof}</strong></div>
                <span className="demo-home-cta">Open interactive demo →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head"><div><div className="eyebrow">One medicines intelligence programme</div><h2>Three different failure modes. One verification discipline.</h2></div></div>
          <div className="process">
            {[
              ["01", "Detect", "Identify a medication mismatch, avoidable supply signal or resource opportunity."],
              ["02", "Explain", "Show the source, provenance and evidence behind the signal."],
              ["03", "Own", "Route the next action to the organisation or professional responsible."],
              ["04", "Close", "Require acknowledgement, reconciliation or clinically governed implementation."],
              ["05", "Verify", "Record safety, financial effect and genuinely reusable capacity separately."],
            ].map(([n,title,body]) => <div className="process-step" key={title}><span>{n}</span><h3>{title}</h3><p>{body}</p></div>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head"><div><div className="eyebrow">Evidence behind the proposition</div><h2>The demos sit on evidence, not unsupported savings claims.</h2></div><Link className="button secondary" href="/evidence">Inspect the evidence</Link></div>
          <div className="metric-grid">
            {headlineEvidence.map((item) => item && <div className="metric" key={item.id}><span className="badge">{item.year}</span><strong>{item.value}</strong><h3>{item.title}</h3><small>{item.caveat}</small></div>)}
          </div>
          <div className="callout" style={{marginTop:20}}><strong>Evidence rule</strong><p>Published NHS evidence can establish that a problem or intervention is real. It does not prove Sitora's local effect. That requires a governed pilot with observed outcomes and pre-agreed benefit definitions.</p></div>
        </div>
      </section>

      <section className="section">
        <div className="shell two-col">
          <div><div className="eyebrow">From demo to NHS evaluation</div><h2>20 weeks to determine whether the opportunity is safely recoverable.</h2><p className="lede">The next step is not a national rollout. It is a controlled pilot with baseline measurement, governed intervention and a Scale / Modify / Stop decision.</p><div className="hero-actions"><Link className="button primary" href="/pilot">See the pilot</Link><Link className="button secondary" href="/business-case">Read the business case</Link></div></div>
          <div className="card evidence-card"><span className="badge">Commissioning principle</span><h3>Net benefit, not headline savings.</h3><p>Cash release, cost avoidance, capacity release and safety outcomes remain separate. Nothing enters a Resource Recovery Record merely because an algorithm identified an opportunity.</p></div>
        </div>
      </section>

      <section className="section"><div className="shell quote">One medication view. Every authorised change owned. Every avoidable supply questioned. Every resource claim verified.</div></section>
    </>
  );
}
