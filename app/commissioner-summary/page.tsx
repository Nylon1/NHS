import Link from "next/link";

export default function CommissionerSummaryPage() {
  return (
    <>
      <section className="page-head">
        <div className="shell">
          <div className="eyebrow">Commissioner summary</div>
          <h1>A medicines intelligence pilot designed to stop avoidable supply and recover capacity from the medicines pathway.</h1>
          <p className="lede">Sitora proposes one governed 20-week NHS pilot combining two flagship solutions: Medicine Loop and Medicines Resource Intelligence. The aim is to identify, intervene on and verify recoverable medicines resource loss without compromising clinical care.</p>
          <div className="hero-actions">
            <Link className="button primary" href="/business-case">Read the full business case</Link>
            <Link className="button secondary" href="/medicines-proposal">Explore the medicines proposal</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell metric-grid">
          <div className="metric"><span className="badge">Problem 1</span><strong>Need</strong><h3>Was another supply actually required?</h3><small>Repeat systems record prescribing and supply, but do not consistently close the loop around remaining stock, dose changes, discontinuation and actual need.</small></div>
          <div className="metric"><span className="badge">Problem 2</span><strong>Pathway</strong><h3>Was the medicine delivered efficiently?</h3><small>A clinically necessary medicine can still consume avoidable pharmacy, nursing, aseptic, chair or bed resource.</small></div>
          <div className="metric"><span className="badge">Pilot</span><strong>20 weeks</strong><h3>Mobilise, baseline, intervene, verify</h3><small>Long enough to establish a baseline and test whether improvement is genuine rather than modelled.</small></div>
          <div className="metric"><span className="badge">Decision</span><strong>Scale / modify / stop</strong><h3>A commissioning decision</h3><small>The output is a decision with evidence, not another efficiency report.</small></div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head"><div><div className="eyebrow">Two flagship solutions</div><h2>One closes the supply loop. One optimises the pathway.</h2></div></div>
          <div className="card-grid">
            <article className="card evidence-card"><span className="badge">Solution 1</span><h3>Medicine Loop</h3><p><strong>Question:</strong> Should this medicine be supplied again now?</p><p>Links the current repeat list with dispensing history, expected days supply, medication changes, reconciliation and patient stock confirmation where available. Routine cases pass through with minimal friction. Anomalies are flagged for governed review.</p><p><strong>Examples:</strong> early repeat requests, likely stock accumulation, dose change, recent discontinuation, post-discharge discrepancy or duplicated supply.</p><p><strong>Proof:</strong> avoided unnecessary items, verified value avoided, discrepancies resolved, workload impact, safety and patient experience.</p></article>
            <article className="card evidence-card"><span className="badge">Solution 2</span><h3>Medicines Resource Intelligence</h3><p><strong>Question:</strong> If the medicine is required, is it using the right clinically appropriate pathway?</p><p>Measures the full resource footprint around selected medicines, including formulation, route, preparation location, aseptic production, nursing time, administration, chair or bed time, cancellations and unused preparations.</p><p><strong>Examples:</strong> ready-to-administer opportunities, IV-to-SC optimisation, dose banding, batching, preparation-location redesign and prepared-but-unused dose reduction.</p><p><strong>Proof:</strong> pharmacy and nursing minutes, aseptic preparations, chair/bed capacity, discarded doses, pathway cost and clinical outcomes.</p></article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head"><div><div className="eyebrow">How the loop works</div><h2>Do not wait until waste has already happened.</h2></div></div>
          <div className="process">
            {[
              ["01", "Validate need", "Check whether the next supply is required and reconcile meaningful changes."],
              ["02", "Supply safely", "Authorised professionals remain responsible for clinical decisions."],
              ["03", "Measure pathway", "Capture medicine, workforce, preparation and capacity inputs."],
              ["04", "Detect loss", "Identify unnecessary supply, unused preparation or higher-resource delivery."],
              ["05", "Feed back", "Use the outcome to improve the next supply or pathway decision."]
            ].map(([n,t,b]) => <div className="process-step" key={t}><span>{n}</span><h3>{t}</h3><p>{b}</p></div>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell two-col">
          <div>
            <div className="eyebrow">The pilot</div><h2>Small enough to govern. Broad enough to prove.</h2>
            <ul className="list-clean">
              <li><strong>Setting:</strong> one acute provider plus a small GP/PCN and community-pharmacy network.</li>
              <li><strong>Workstream A:</strong> selected stable repeat-medicine cohorts.</li>
              <li><strong>Workstream B:</strong> selected high-volume or resource-intensive injectable/SACT pathways.</li>
              <li><strong>Workstream C:</strong> structured capture of prepared-but-unused medicines and their root causes.</li>
              <li><strong>Duration:</strong> 4 weeks mobilisation, 4 weeks baseline, 8 weeks intervention, 4 weeks evaluation.</li>
              <li><strong>Clinical rule:</strong> no autonomous stopping, prescribing or clinically significant medicine change.</li>
            </ul>
          </div>
          <div className="card"><span className="badge">Minimum governance</span><h3 style={{marginTop:12}}>Designed for an NHS pathway</h3><ul className="list-clean"><li>Executive and senior pharmacy/clinical sponsor</li><li>Clinical safety process and hazard management</li><li>DPIA, data-flow mapping, role-based access and audit trail</li><li>Finance validation of claimed monetary benefit</li><li>Defined evaluation protocol and safety outcomes</li><li>Human review of clinically significant interventions</li></ul></div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head"><div><div className="eyebrow">What success means</div><h2>Recovery has to be demonstrated, not assumed.</h2></div><p>Gross activity reduction is not automatically a saving. Every benefit is classified and independently traceable.</p></div>
          <div className="metric-grid">
            <div className="metric"><span className="badge">Cash</span><strong>£</strong><h3>Cash-releasing</h3><small>A genuine reduction in expenditure that finance can validate.</small></div>
            <div className="metric"><span className="badge">Avoidance</span><strong>£</strong><h3>Cost avoidance</h3><small>Future or unnecessary expenditure prevented, reported separately from cash release.</small></div>
            <div className="metric"><span className="badge">Capacity</span><strong>Hours</strong><h3>Productivity release</h3><small>Pharmacy, nursing, aseptic, chair or bed capacity demonstrably available for other activity.</small></div>
            <div className="metric"><span className="badge">Safety</span><strong>Clinical</strong><h3>No deterioration</h3><small>Benefit only counts alongside agreed safety, access and patient-outcome safeguards.</small></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell two-col">
          <div className="card"><span className="badge">The ask</span><h3 style={{marginTop:12}}>What we need from an NHS partner</h3><ul className="list-clean"><li>Approve a 20-week medicines discovery and pilot</li><li>Nominate an acute site and small primary-care/pharmacy network</li><li>Nominate executive, clinical, pharmacy, digital/IG, finance and evaluation leads</li><li>Permit access to the minimum agreed datasets</li><li>Approve a governed intervention protocol</li><li>Agree benefit definitions and success thresholds before intervention begins</li></ul></div>
          <div><div className="eyebrow">The decision</div><h2>At week 20, there should be only three legitimate outcomes.</h2><ul className="list-clean"><li><strong>Scale:</strong> safe, positive net benefit, manageable workload and reproducible data.</li><li><strong>Modify:</strong> a credible value signal exists but workflow, targeting or data quality needs redesign.</li><li><strong>Stop:</strong> no credible recoverable opportunity, negative net resource benefit, or unacceptable safety/operational burden.</li></ul></div>
        </div>
      </section>

      <section className="section"><div className="shell quote">Every medicine should be needed, supplied in the right quantity, delivered through the right clinically appropriate pathway, and measured through to its actual use or waste.</div></section>
    </>
  );
}
