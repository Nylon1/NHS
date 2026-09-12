import Link from "next/link";

export default function CommissionerSummaryPage() {
  return (
    <>
      <section className="page-head">
        <div className="shell">
          <div className="eyebrow">Commissioner summary</div>
          <h1>One medicines pilot. Two linked solutions. One decision at week 20.</h1>
          <p className="lede">Sitora proposes a governed NHS pilot to prevent avoidable repeat supply and reduce unnecessary resource use around medicines that are still clinically required.</p>
          <div className="hero-actions">
            <Link className="button primary" href="/business-case">View the business case</Link>
            <Link className="button secondary" href="/pilot">See the pilot</Link>
          </div>
        </div>
      </section>

      <section className="section"><div className="shell metric-grid">
        <div className="metric"><span className="badge">Solution 1</span><strong>Need?</strong><h3>Medicine Loop</h3><small>Check whether another supply is actually required before it is dispensed.</small></div>
        <div className="metric"><span className="badge">Solution 2</span><strong>Pathway?</strong><h3>Medicines Resource Intelligence</h3><small>Check whether a required medicine is using the right clinically appropriate pathway.</small></div>
        <div className="metric"><span className="badge">Duration</span><strong>20 weeks</strong><h3>Baseline → intervene → verify</h3><small>Long enough to produce a credible answer.</small></div>
        <div className="metric"><span className="badge">Decision</span><strong>3 outcomes</strong><h3>Scale / modify / stop</h3><small>The pilot ends with a commissioning decision.</small></div>
      </div></section>

      <section className="section"><div className="shell">
        <div className="section-head"><div><div className="eyebrow">The proposition</div><h2>Close the supply loop, then optimise the resource pathway.</h2></div></div>
        <div className="card-grid">
          <article className="card"><span className="badge">Medicine Loop</span><h3 style={{marginTop:12}}>Should this medicine be supplied again now?</h3><p>Use repeat history, expected consumption, medication changes, reconciliation and stock signals to identify cases that deserve checking before supply.</p></article>
          <article className="card"><span className="badge">Resource Intelligence</span><h3 style={{marginTop:12}}>If it is needed, is the pathway right?</h3><p>Measure route, formulation, preparation, aseptic capacity, nursing time, chair/bed use, cancellations and unused preparation.</p></article>
        </div>
      </div></section>

      <section className="section"><div className="shell">
        <div className="section-head"><div><div className="eyebrow">How it works</div><h2>Detect earlier. Act safely. Verify afterwards.</h2></div></div>
        <div className="process">
          {[["01","Validate need","Check whether the next supply is required."],["02","Reconcile","Resolve meaningful medication changes."],["03","Measure pathway","Capture the resources used to deliver treatment."],["04","Intervene","Apply governed, human-reviewed changes."],["05","Verify","Prove what was actually recovered."]].map(([n,t,b]) => <div className="process-step" key={t}><span>{n}</span><h3>{t}</h3><p>{b}</p></div>)}
        </div>
      </div></section>

      <section className="section"><div className="shell two-col">
        <div>
          <div className="eyebrow">The ask</div><h2>What we need from an NHS partner.</h2>
          <ul className="list-clean"><li>Approve a 20-week medicines pilot</li><li>Nominate one acute site plus a small primary-care/pharmacy network</li><li>Nominate executive, clinical, pharmacy, digital/IG, finance and evaluation leads</li><li>Permit access to the minimum agreed datasets</li><li>Approve the governed intervention protocol</li><li>Agree benefit definitions before intervention begins</li></ul>
        </div>
        <div className="card"><span className="badge">Non-negotiable</span><h3 style={{marginTop:12}}>No autonomous prescribing changes.</h3><p>Clinical decisions remain with authorised healthcare professionals. The system identifies signals, supports review and records outcomes.</p></div>
      </div></section>

      <section className="section"><div className="shell">
        <div className="section-head"><div><div className="eyebrow">Success rule</div><h2>Recovery has to be demonstrated, not assumed.</h2></div></div>
        <div className="metric-grid">
          <div className="metric"><span className="badge">Cash</span><strong>£</strong><h3>Cash-releasing</h3><small>Finance-validated expenditure genuinely removed.</small></div>
          <div className="metric"><span className="badge">Avoidance</span><strong>£</strong><h3>Cost avoidance</h3><small>Future or unnecessary expenditure prevented.</small></div>
          <div className="metric"><span className="badge">Capacity</span><strong>Hours</strong><h3>Productivity release</h3><small>Time or capacity demonstrably available for other activity.</small></div>
          <div className="metric"><span className="badge">Safety</span><strong>0 harm</strong><h3>No deterioration</h3><small>Benefits only count alongside agreed safety safeguards.</small></div>
        </div>
      </div></section>

      <section className="section"><div className="shell two-col">
        <div><div className="eyebrow">Week 20</div><h2>Three legitimate outcomes.</h2><ul className="list-clean"><li><strong>Scale:</strong> safe, positive net benefit, manageable workload and reproducible data.</li><li><strong>Modify:</strong> value exists but workflow, targeting or data quality needs redesign.</li><li><strong>Stop:</strong> the opportunity is too small, net benefit is negative, or operational/safety burden is unacceptable.</li></ul></div>
        <div className="card"><span className="badge">Next step</span><h3 style={{marginTop:12}}>Review the detailed business case</h3><p>The full case covers workstreams, governance, staffing, evaluation and decision thresholds.</p><div className="hero-actions"><Link className="button primary" href="/business-case">Open business case</Link><Link className="button secondary" href="/faq">Read FAQ</Link></div></div>
      </div></section>
    </>
  );
}
