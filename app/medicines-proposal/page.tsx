import Link from "next/link";

const loopSteps = [
  ["01", "Prescribed", "Confirm the current authorised medication and relevant recent changes."],
  ["02", "Need checked", "Compare the repeat request with supply timing, expected consumption, stock and medication changes."],
  ["03", "Reconciled", "Resolve dose changes, discontinuations, admissions, discharge changes and duplication before supply."],
  ["04", "Dispensed", "Supply the clinically required medicine and record quantity and timing."],
  ["05", "Used or unused", "Capture the strongest available signal of use, remaining stock, return or disposal."],
  ["06", "Next cycle informed", "Feed the previous cycle into the next repeat decision instead of starting blind again."]
];

const pilotStreams = [
  ["A", "Medicine Loop", "Selected repeat-medicine cohorts across participating GP and pharmacy pathways.", "Avoided unnecessary items, discrepancies resolved, workload, safety and patient experience."],
  ["B", "Medicines Resource Intelligence", "Selected high-volume or resource-intensive injectable/SACT pathways.", "Pharmacy and nursing minutes, aseptic preparations, chair/bed capacity, pathway cost and safety."],
  ["C", "Prepared-but-unused medicines", "Structured capture of selected prepared medicines that are not administered.", "Unused-dose rate, discarded value, repeated root causes and post-intervention reduction."]
];

export default function MedicinesProposalPage() {
  return (
    <>
      <section className="page-head">
        <div className="shell">
          <div className="eyebrow">Flagship medicines programme</div>
          <h1>Close the medicine loop. Optimise the pathway. Verify the recovery.</h1>
          <p className="lede">Two connected solutions: Medicine Loop asks whether another supply is needed. Medicines Resource Intelligence asks whether a clinically necessary medicine is being delivered through the right resource pathway.</p>
          <div className="hero-actions">
            <Link className="button primary" href="/commissioner-summary">Commissioner summary</Link>
            <a className="button secondary" href="#pilot">See the pilot design</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell metric-grid">
          <div className="metric"><span className="badge">Question 1</span><strong>Need?</strong><h3>Should it be supplied again?</h3><small>Close the repeat-supply feedback gap.</small></div>
          <div className="metric"><span className="badge">Question 2</span><strong>Route?</strong><h3>How should it be delivered?</h3><small>Test formulation, route and preparation pathway.</small></div>
          <div className="metric"><span className="badge">Question 3</span><strong>Resource?</strong><h3>What does the pathway consume?</h3><small>Measure pharmacy, nursing, chair, bed and aseptic capacity.</small></div>
          <div className="metric"><span className="badge">Question 4</span><strong>Outcome?</strong><h3>What was actually recovered?</h3><small>Trace the intervention to an observed outcome.</small></div>
        </div>
      </section>

      <section className="section">
        <div className="shell card-grid">
          <article className="card evidence-card"><span className="badge">Solution 1</span><h2>Medicine Loop</h2><p>Prevent unnecessary repeat supply before it enters the system.</p><p><strong>Uses:</strong> prescribing, dispensing, expected consumption, medication changes, reconciliation and stock signals.</p><details><summary>How the intervention works</summary><p>Routine stable cases should pass with minimal friction. Stronger checks only appear where timing, stock, medication change or reconciliation signals suggest that another supply decision deserves review.</p></details></article>
          <article className="card evidence-card"><span className="badge">Solution 2</span><h2>Medicines Resource Intelligence</h2><p>Optimise the resource pathway for medicines that are genuinely required.</p><p><strong>Looks at:</strong> route, formulation, preparation, aseptic production, nursing time, chairs, beds, consumables and unused preparations.</p><details><summary>Typical opportunities</summary><p>Ready-to-administer supply, route optimisation, dose banding, batching, preparation-location redesign and repeated prepared-but-unused doses, all subject to clinical governance.</p></details></article>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head"><div><div className="eyebrow">Closed loop</div><h2>Each cycle informs the next one.</h2></div><p>Repeat prescribing should not restart from zero every month.</p></div>
          <div className="process">
            {loopSteps.slice(0,5).map(([n,title,body]) => <div className="process-step" key={title}><span>{n}</span><h3>{title}</h3><p>{body}</p></div>)}
          </div>
          <div className="callout" style={{marginTop:16}}><strong>06 · {loopSteps[5][1]}</strong><p>{loopSteps[5][2]}</p></div>
        </div>
      </section>

      <section className="section">
        <div className="shell two-col">
          <div><div className="eyebrow">Whole-pathway intelligence</div><h2>Drug price is only one part of the resource footprint.</h2><p className="lede">A clinically necessary medicine may still consume avoidable preparation, administration, chair, bed or staffing resource.</p></div>
          <div className="card evidence-card"><details open><summary>Core pathway questions</summary><ul className="list-clean"><li>Is another supply required now?</li><li>Is the quantity appropriate?</li><li>Is the current route/formulation clinically optimal?</li><li>Can preparation burden be reduced?</li><li>Where should preparation occur?</li><li>Was anything prepared or dispensed but later unused?</li></ul></details></div>
        </div>
      </section>

      <section className="section" id="pilot">
        <div className="shell">
          <div className="section-head"><div><div className="eyebrow">Pilot</div><h2>Three workstreams. One 20-week decision.</h2></div><Link className="button secondary" href="/business-case">Full business case</Link></div>
          <div className="card-grid">
            {pilotStreams.map(([id,title,scope,outcome]) => <article className="card evidence-card" key={title}><div className="meta-row"><span className="badge">Workstream {id}</span></div><h3>{title}</h3><p>{scope}</p><p><strong>Primary proof:</strong> {outcome}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell two-col">
          <div><div className="eyebrow">Verification</div><h2>Only count recovery when the intervention and outcome can be traced.</h2><p className="lede">Every benefit should have a Resource Recovery Record: signal, intervention, approval where relevant, observed outcome, benefit type and verification status.</p></div>
          <div className="card evidence-card"><span className="badge">Rule</span><h3>Net benefit matters more than gross savings.</h3><p>Cash release, cost avoidance and capacity release stay separate. If the intervention costs more professional time than it releases, it has failed economically.</p></div>
        </div>
      </section>

      <section className="section">
        <div className="shell two-col">
          <div><div className="eyebrow">Clinical safety</div><h2>Resource optimisation must never become autonomous rationing.</h2><p className="lede">The programme supports better-informed decisions. It does not replace prescribing authority or clinical judgement.</p></div>
          <div className="card"><details open><summary>Safety principles</summary><ul className="list-clean"><li>No autonomous stopping of clinically required medicines.</li><li>Clinical eligibility and prescribing authority remain with authorised professionals.</li><li>Deterministic, transparent rules are preferred where possible.</li><li>AI may prioritise or explain, but safety-critical action remains governed.</li><li>Clinical outcomes and unintended consequences are measured alongside resource benefit.</li></ul></details></div>
        </div>
      </section>

      <section className="section"><div className="shell quote">Every medicine should be needed, supplied in the right quantity, delivered through the right clinically appropriate pathway, and measured through to its actual use or waste.</div></section>
    </>
  );
}
