import Link from "next/link";

export default function PilotPage() {
  return (
    <>
      <section className="page-head">
        <div className="shell">
          <div className="eyebrow">20-week medicines pilot</div>
          <h1>Baseline first. Test three workflows. Verify the local effect.</h1>
          <p className="lede">A controlled evaluation of cross-setting medication reconciliation, repeat oversupply prevention and evidence-backed medicines resource opportunities.</p>
          <div className="hero-actions"><Link className="button primary" href="/pilot-protocol">Open the pilot protocol</Link><Link className="button secondary" href="/data-specification">Minimum data specification</Link></div>
        </div>
      </section>

      <section className="section"><div className="shell"><div className="process">
        <div className="process-step"><span>Weeks 0-4</span><h3>Mobilise</h3><p>Confirm sites, sponsors, data flows, safety case, IG and intervention boundaries.</p></div>
        <div className="process-step"><span>Weeks 5-8</span><h3>Baseline</h3><p>Observe discrepancies, oversupply signals, pathway resource use and current workload.</p></div>
        <div className="process-step"><span>Weeks 9-16</span><h3>Intervene</h3><p>Run approved human-reviewed workflows in a limited cohort.</p></div>
        <div className="process-step"><span>Weeks 17-20</span><h3>Evaluate</h3><p>Compare outcomes, workload, safety and verified resource effects.</p></div>
        <div className="process-step"><span>Decision</span><h3>Scale / modify / stop</h3><p>End with a pre-agreed commissioning decision.</p></div>
      </div></div></section>

      <section className="section"><div className="shell demo-home-grid">
        <article className="card evidence-card"><span className="badge">Workstream A</span><h3>Medicine Loop</h3><p>Track selected medication changes from the authorising service through downstream GP, pharmacy and care workflows until reconciliation is confirmed.</p><p><strong>Primary measures:</strong> unresolved discrepancy rate, time-to-close, downstream acknowledgement, repeat-list correction, obsolete supply prevented and safety events.</p></article>
        <article className="card evidence-card"><span className="badge">Workstream B</span><h3>WasteGuard</h3><p>Identify selected repeat items where cumulative supply, stock or medication changes suggest another dispensing may not be required.</p><p><strong>Primary measures:</strong> review yield, items not supplied, intervention workload, patient impact, cost avoidance and missed-essential-medicine safeguards.</p></article>
        <article className="card evidence-card"><span className="badge">Workstream C</span><h3>Medicines Resource Intelligence</h3><p>Prioritise a small number of evidence-backed route, formulation, preparation or capacity opportunities for local measurement.</p><p><strong>Primary measures:</strong> pharmacy/nursing minutes, chair or bed time, preparation activity, cancellations, patient outcomes and reusable capacity.</p></article>
      </div></section>

      <section className="section"><div className="shell two-col"><div><div className="eyebrow">Minimum technical footprint</div><h2>Start with the data needed to answer the pilot questions, not a wholesale system replacement.</h2><ul className="list-clean"><li>Medication list and authorised medication-change events</li><li>Repeat prescribing and dispensing/supply status</li><li>Discharge/reconciliation events for the selected cohort</li><li>Care-home/eMAR or equivalent operational state where included</li><li>Selected pharmacy/aseptic and administration timestamps for resource workstreams</li><li>Role, organisation, acknowledgement, action and closure audit trail</li></ul><div className="hero-actions"><Link className="button secondary" href="/technical-implementation">Technical implementation</Link><Link className="button secondary" href="/data-specification">Field-level data spec</Link></div></div><div className="card"><span className="badge">Deployment principle</span><h3 style={{marginTop:12}}>Shadow mode before workflow change.</h3><p>The first live-data phase should detect and record opportunities without changing clinical workflow. Only after data quality, false positives and safety hazards are understood should approved interventions be enabled.</p></div></div></section>

      <section className="section"><div className="shell"><div className="section-head"><div><div className="eyebrow">What must be proven</div><h2>Each workstream has to survive the same four tests.</h2></div></div><div className="metric-grid"><div className="metric"><span className="badge">Clinical</span><strong>Safe</strong><h3>No unacceptable deterioration</h3><small>Balancing measures defined before intervention.</small></div><div className="metric"><span className="badge">Operational</span><strong>Usable</strong><h3>Fits real workflow</h3><small>Alert burden, acknowledgement and review time measured.</small></div><div className="metric"><span className="badge">Economic</span><strong>Net</strong><h3>Benefit after intervention cost</h3><small>Cash, avoidance and capacity reported separately.</small></div><div className="metric"><span className="badge">Technical</span><strong>Reliable</strong><h3>Data sufficient to reproduce</h3><small>Signals trace back to source and closure can be audited.</small></div></div></div></section>

      <section className="section"><div className="shell callout"><strong>Safety boundary</strong><p>No autonomous stopping, prescribing changes or silent record overwrite. Conflicts are surfaced with provenance and routed to the accountable professional or service for reconciliation.</p></div></section>

      <section className="section pilot-funnel"><div className="shell two-col"><div><div className="eyebrow">Pilot output</div><h2>A measured answer, not an assumed business case.</h2><p className="lede">At week 20 the partner receives the observed baseline, intervention outcomes, safety and workload results, verified benefit classification and a Scale / Modify / Stop recommendation.</p></div><div className="pilot-funnel-actions"><Link className="button primary" href="/pilot-protocol">Read the operational protocol</Link><Link className="button secondary" href="/business-case">Detailed business case</Link></div></div></section>
    </>
  );
}
