import Link from "next/link";

export default function PilotPage() {
  return (
    <>
      <section className="page-head">
        <div className="shell">
          <div className="eyebrow">20-week medicines pilot</div>
          <h1>Baseline first. Intervene safely. Verify what was actually recovered.</h1>
          <p className="lede">A focused pilot across repeat supply, resource-intensive medicines pathways and prepared-but-unused doses.</p>
          <div className="hero-actions"><Link className="button primary" href="/business-case">Read the business case</Link><Link className="button secondary" href="/commissioner-summary">Commissioner summary</Link></div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="process">
            <div className="process-step"><span>Weeks 0-4</span><h3>Mobilise</h3><p>Confirm sponsor, sites, governance, data and safety boundaries.</p></div>
            <div className="process-step"><span>Weeks 5-8</span><h3>Baseline</h3><p>Measure supply, pathway resource use, unused doses and workload.</p></div>
            <div className="process-step"><span>Weeks 9-16</span><h3>Intervene</h3><p>Run agreed human-reviewed interventions.</p></div>
            <div className="process-step"><span>Weeks 17-20</span><h3>Evaluate</h3><p>Compare outcomes and calculate net benefit.</p></div>
            <div className="process-step"><span>Decision</span><h3>Scale / modify / stop</h3><p>End with a clear commissioning decision.</p></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell card-grid">
          <article className="card evidence-card"><span className="badge">A</span><h3>Medicine Loop</h3><p>Validate repeat need, stock accumulation, dose changes, discontinuation and reconciliation before further supply.</p></article>
          <article className="card evidence-card"><span className="badge">B</span><h3>Medicines Resource Intelligence</h3><p>Optimise route, formulation, preparation location, aseptic burden, nursing time and chair/bed use.</p></article>
          <article className="card evidence-card"><span className="badge">C</span><h3>Prepared-but-unused doses</h3><p>Record selected unused preparations, classify why they became unused and reduce repeated causes.</p></article>
        </div>
      </section>

      <section className="section"><div className="shell"><details className="reveal-panel"><summary>What the pilot must prove</summary><div className="reveal-body"><ul className="list-clean"><li>Observed resource loss and the plausibly avoidable component</li><li>Clinically validated intervention opportunity</li><li>Cash-releasing benefit, cost avoidance and capacity release reported separately</li><li>Net resource benefit after intervention cost</li><li>No unacceptable deterioration in safety, access or workload</li><li>A defensible scale / modify / stop recommendation</li></ul></div></details></div></section>

      <section className="section"><div className="shell callout"><strong>Safety boundary</strong><p>No autonomous stopping, prescribing changes or unsupervised clinical decisions. Clinically significant interventions remain within agreed professional review and governance pathways.</p></div></section>

      <section className="section"><div className="shell quote">A medicine only counts as resource recovery when the baseline, intervention, outcome and net benefit can be shown without worsening safety, access or workload elsewhere.</div></section>
    </>
  );
}
