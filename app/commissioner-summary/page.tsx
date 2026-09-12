import Link from "next/link";

export default function CommissionerSummaryPage() {
  return (
    <>
      <section className="page-head">
        <div className="shell">
          <div className="eyebrow">Commissioner summary</div>
          <h1>Three medicines problems. One controlled evaluation. One decision at week 20.</h1>
          <p className="lede">Sitora proposes a governed medicines-intelligence pilot covering cross-setting medication reconciliation, preventable repeat oversupply and evidence-backed resource opportunities.</p>
          <div className="hero-actions">
            <Link className="button primary" href="/demo">See it working</Link>
            <Link className="button secondary" href="/pilot">See the pilot</Link>
          </div>
        </div>
      </section>

      <section className="section"><div className="shell metric-grid">
        <div className="metric"><span className="badge">Core workflow</span><strong>Loop</strong><h3>Medicine Loop</h3><small>Close authorised medication changes across hospital, GP, pharmacy, care-home and community workflows.</small></div>
        <div className="metric"><span className="badge">Waste prevention</span><strong>Need?</strong><h3>WasteGuard</h3><small>Identify repeat supply that may no longer be required before avoidable dispensing occurs.</small></div>
        <div className="metric"><span className="badge">Resource</span><strong>Pathway?</strong><h3>Resource Intelligence</h3><small>Identify clinically appropriate pathway changes worth measuring locally.</small></div>
        <div className="metric"><span className="badge">Decision</span><strong>20 weeks</strong><h3>Scale / modify / stop</h3><small>The evaluation ends with a commissioning decision, not an open-ended programme.</small></div>
      </div></section>

      <section className="section"><div className="shell">
        <div className="section-head"><div><div className="eyebrow">The proposition</div><h2>Fix information loss, avoid unnecessary supply, then recover capacity.</h2></div></div>
        <div className="demo-home-grid">
          <article className="card"><span className="badge">Medicine Loop</span><h3 style={{marginTop:12}}>Does every affected service reflect the same authorised medication change?</h3><p>Turn medication changes into owned events with provenance, acknowledgement, reconciliation and closure across organisational boundaries.</p></article>
          <article className="card"><span className="badge">WasteGuard</span><h3 style={{marginTop:12}}>Should this repeat item actually be supplied again now?</h3><p>Use timing, cumulative supply, stock and medication-change signals to trigger proportionate human review before unnecessary dispensing.</p></article>
          <article className="card"><span className="badge">Resource Intelligence</span><h3 style={{marginTop:12}}>If treatment is needed, is the pathway using avoidable resource?</h3><p>Use published evidence and local measurement to prioritise route, formulation, preparation and capacity opportunities.</p></article>
        </div>
      </div></section>

      <section className="section"><div className="shell">
        <div className="section-head"><div><div className="eyebrow">What Sitora is</div><h2>An intelligence and accountability layer, not a replacement prescribing system.</h2></div><Link className="button secondary" href="/technical-implementation">Technical implementation</Link></div>
        <div className="process">
          {[["01","Receive","Read the minimum required medication, supply and pathway signals."],["02","Detect","Identify a conflict, oversupply signal or resource opportunity."],["03","Route","Assign the next action to the responsible organisation or professional."],["04","Close","Record acknowledgement, reconciliation or governed implementation."],["05","Verify","Measure safety, workload, financial effect and reusable capacity."]].map(([n,t,b]) => <div className="process-step" key={t}><span>{n}</span><h3>{t}</h3><p>{b}</p></div>)}
        </div>
      </div></section>

      <section className="section"><div className="shell two-col">
        <div><div className="eyebrow">The ask</div><h2>What we need from an NHS partner.</h2><ul className="list-clean"><li>Approve a 20-week discovery and controlled pilot</li><li>Nominate one acute provider plus a limited primary-care, pharmacy and care-setting cohort</li><li>Nominate executive, clinical, pharmacy, digital/IG, finance and evaluation leads</li><li>Permit access to the minimum agreed datasets and workflow interfaces</li><li>Approve clinical-safety and intervention protocols before live action</li><li>Agree benefit definitions and balancing measures before baseline begins</li></ul></div>
        <div className="card"><span className="badge">Safety boundary</span><h3 style={{marginTop:12}}>No silent overwrite. No autonomous prescribing change.</h3><p>Conflicting medication states remain visible until an accountable professional reconciles them. Clinically significant changes remain under authorised professional control.</p></div>
      </div></section>

      <section className="section"><div className="shell">
        <div className="section-head"><div><div className="eyebrow">Success rule</div><h2>Recovery has to be demonstrated, not inferred.</h2></div></div>
        <div className="metric-grid"><div className="metric"><span className="badge">Safety</span><strong>Clinical</strong><h3>No unacceptable harm</h3><small>Medication discrepancies, missed doses and adverse effects monitored.</small></div><div className="metric"><span className="badge">Workload</span><strong>Net</strong><h3>No hidden burden</h3><small>New pharmacist, GP and nursing work is counted.</small></div><div className="metric"><span className="badge">Capacity</span><strong>Hours</strong><h3>Reusable release</h3><small>Time only counts when it is demonstrably available for other activity.</small></div><div className="metric"><span className="badge">Money</span><strong>£</strong><h3>Finance validated</h3><small>Cash release and cost avoidance remain separate.</small></div></div>
      </div></section>

      <section className="section pilot-funnel"><div className="shell two-col"><div><div className="eyebrow">Week 20</div><h2>Three legitimate outcomes: scale, modify or stop.</h2><p className="lede">The proposal is intentionally falsifiable. If the opportunity is too small, unsafe or creates more work than it removes, the correct answer is to stop.</p></div><div className="pilot-funnel-actions"><Link className="button primary" href="/pilot">Open pilot design</Link><Link className="button secondary" href="/business-case">Read business case</Link><Link className="button secondary" href="/technical-implementation">Technical implementation</Link></div></div></section>
    </>
  );
}
