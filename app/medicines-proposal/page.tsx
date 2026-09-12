import Link from "next/link";

const loopSteps = [
  ["01", "Prescribed", "Confirm the current authorised medication and relevant recent clinical changes."],
  ["02", "Need checked", "Compare the repeat request with previous supply, expected consumption, stock confirmation and medication changes."],
  ["03", "Reconciled", "Resolve dose changes, discontinuations, admission or discharge changes and potential duplication before supply."],
  ["04", "Dispensed", "Supply the clinically required medicine and record the actual quantity and timing."],
  ["05", "Used or unused", "Capture the strongest available signal of consumption, remaining stock, non-use, return or disposal."],
  ["06", "Next cycle informed", "Feed the previous cycle into the next repeat decision so the system learns rather than starting blind again."]
];

const pathwayQuestions = [
  "Is the medicine still required?",
  "Is another supply required now?",
  "Is the quantity appropriate?",
  "Is the current formulation and route clinically optimal?",
  "Could ready-to-administer supply reduce preparation burden?",
  "Could dose banding or advance preparation reduce production waste?",
  "Could an approved subcutaneous or other lower-resource route replace IV treatment for an eligible patient?",
  "Where should preparation occur: ward, hospital pharmacy, aseptic unit, regional hub or commercial supply?",
  "How much nursing, pharmacy, chair and bed capacity does the pathway consume?",
  "Was any prepared or dispensed medicine subsequently unused, and why?"
];

const pilotStreams = [
  {
    title: "Workstream A: Closed-loop repeat medicines",
    scope: "A selected group of high-volume repeat medicines across participating GP practices and community pharmacy pathways.",
    baseline: "Ordering frequency, dispensing history, early requests, medication changes, patient-held stock signals, reconciliation failures and current intervention workload.",
    intervention: "Need confirmation, stock-aware prompts, change reconciliation, anomaly detection and pharmacist or prescriber review where clinically required.",
    outcomes: "Items not unnecessarily dispensed, verified value avoided, discrepancies resolved, additional staff workload, safety events and patient experience."
  },
  {
    title: "Workstream B: Medicines pathway optimisation",
    scope: "A focused set of high-volume or resource-intensive injectable, infusion or aseptic medicines.",
    baseline: "Drug cost, pharmacy production time, nurse preparation time, aseptic slots, chair time, bed use, consumables, cancellations and unused preparations.",
    intervention: "Clinically governed review of formulation, route, ready-to-administer options, dose banding, batching, preparation location and scheduling.",
    outcomes: "Aseptic preparations avoided, nursing and pharmacy minutes released, chair or bed capacity released, pathway cost change, patient time and safety."
  },
  {
    title: "Workstream C: Prepared-but-unused medicines",
    scope: "A time-limited observational and intervention study in selected aseptic or infusion pathways.",
    baseline: "Every unused prepared dose recorded with medicine, value, production stage, cancellation timing and coded reason.",
    intervention: "Earlier readiness confirmation, preparation-timing rules, scheduling integration and targeted pathway redesign around repeated causes.",
    outcomes: "Unused preparations, value discarded, avoidable cause share, production capacity released and reduction after intervention."
  }
];

const safetyRules = [
  "No autonomous stopping of clinically required medicines.",
  "Clinical eligibility and prescribing authority remain with appropriate healthcare professionals.",
  "Rules should be deterministic where possible and transparent to users.",
  "AI may prioritise and explain signals, but safety-critical action requires governed clinical logic and appropriate review.",
  "Every claimed benefit must be linked to a recorded intervention and an observed outcome.",
  "Clinical outcomes, medication errors, delays and unintended consequences are measured alongside resource benefit."
];

export default function MedicinesProposalPage() {
  return (
    <>
      <section className="page-head">
        <div className="shell">
          <div className="eyebrow">Flagship medicines programme</div>
          <h1>Close the medicine loop, then optimise the resource pathway around every medicine.</h1>
          <p className="lede">
            Sitora proposes two connected solutions. Medicine Loop asks whether another supply is actually needed. Medicines Resource Intelligence asks whether a medicine that is needed is being delivered through the most clinically appropriate and resource-efficient pathway.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#pilot">See the pilot design</a>
            <Link className="button secondary" href="/evidence">Review the evidence base</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">The core gap</div>
              <h2>The NHS records prescribing and dispensing. The feedback loop after supply is much weaker.</h2>
            </div>
            <p>A prescription records intent. A dispensing record confirms supply. Neither necessarily proves that the next repeat is required, that the quantity is right, or that the medicine is being delivered through the lowest-resource clinically suitable pathway.</p>
          </div>
          <div className="metric-grid">
            <div className="metric"><span className="badge">Question 1</span><strong>Need?</strong><h3>Should it be supplied again?</h3><small>Medicine Loop closes the repeat-supply feedback gap.</small></div>
            <div className="metric"><span className="badge">Question 2</span><strong>Route?</strong><h3>How should it be delivered?</h3><small>Resource Intelligence tests formulation, route and preparation pathway.</small></div>
            <div className="metric"><span className="badge">Question 3</span><strong>Resource?</strong><h3>What does the pathway consume?</h3><small>Measure pharmacy, nursing, chairs, beds, consumables and patient time.</small></div>
            <div className="metric"><span className="badge">Question 4</span><strong>Outcome?</strong><h3>What was genuinely recovered?</h3><small>Do not count theoretical savings. Verify the actual item, time, capacity or cost avoided.</small></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell two-col">
          <article className="card evidence-card">
            <span className="badge">Solution 1</span>
            <h2>Medicine Loop</h2>
            <p><strong>Purpose:</strong> prevent unnecessary repeat supply before it enters the system.</p>
            <p>Bring together the strongest available signals from prescribing, dispensing, expected consumption, recent medication changes, hospital discharge reconciliation and patient confirmation.</p>
            <p>The default pathway should remain low-friction. Stable patients should not face unnecessary questioning. The system intervenes more strongly when timing, stock, medication changes or other signals suggest the next supply decision deserves checking.</p>
          </article>
          <article className="card evidence-card">
            <span className="badge">Solution 2</span>
            <h2>Medicines Resource Intelligence</h2>
            <p><strong>Purpose:</strong> optimise the whole resource pathway for medicines that are genuinely required.</p>
            <p>Model acquisition, preparation, aseptic capacity, consumables, nursing time, administration, chair or bed use, patient time and unused preparation.</p>
            <p>The system identifies opportunities such as ready-to-administer supply, dose banding, route optimisation, batching, preparation-location change and recurring prepared-but-unused doses, subject to clinical governance.</p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">Closed-loop design</div>
              <h2>Do not restart the repeat-prescription decision from zero every month.</h2>
            </div>
            <p>The previous cycle should inform the next one. That turns repeat prescribing from an open transaction into a learning loop.</p>
          </div>
          <div className="process">
            {loopSteps.slice(0, 5).map(([n, title, body]) => (
              <div className="process-step" key={title}>
                <span>{n}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
          <div className="card" style={{ marginTop: 16 }}>
            <span className="badge">06</span>
            <h3 style={{ marginTop: 12 }}>{loopSteps[5][1]}</h3>
            <p>{loopSteps[5][2]}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">Whole-pathway intelligence</div>
              <h2>Once the medicine is needed, test the pathway around it.</h2>
            </div>
            <p>Drug price alone is an incomplete measure. The relevant question is the total clinical and operational resource consumed by safe delivery.</p>
          </div>
          <div className="card-grid">
            {pathwayQuestions.map((question, index) => (
              <article className="card" key={question}>
                <div className="meta-row"><span className="badge">{String(index + 1).padStart(2, "0")}</span><span>Pathway question</span></div>
                <h3 style={{ marginTop: 14 }}>{question}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="quote">Prescribe → validate need → dispense → use → measure → optimise → reconcile → inform the next supply decision.</div>
        </div>
      </section>

      <section className="section" id="pilot">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">Pilot proposal</div>
              <h2>Start narrow enough to prove causality, but broad enough to measure the whole pathway.</h2>
            </div>
            <p>Recommended structure: one ICB or system partnership, one acute provider, a defined group of GP practices and community pharmacy participation where required.</p>
          </div>
          <div className="card-grid">
            {pilotStreams.map((stream) => (
              <article className="card evidence-card" key={stream.title}>
                <h3>{stream.title}</h3>
                <p><strong>Scope:</strong> {stream.scope}</p>
                <p><strong>Baseline:</strong> {stream.baseline}</p>
                <p><strong>Intervention:</strong> {stream.intervention}</p>
                <p><strong>Primary outcomes:</strong> {stream.outcomes}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell two-col">
          <div>
            <div className="eyebrow">Verification</div>
            <h2>Only count recovery when the intervention and outcome can be traced.</h2>
            <p className="lede">A reduction in activity is not automatically a saving. Sitora should maintain a Resource Recovery Record linking the signal, intervention, outcome and benefit type.</p>
          </div>
          <div className="card evidence-card">
            <p><strong>Example record</strong></p>
            <p>Repeat requested → stock signal suggests adequate remaining supply → patient confirms no new supply needed → item not dispensed → value avoided recorded → safety outcome monitored.</p>
            <p>A pathway intervention follows the same logic: clinically approved change → preparation or administration step removed → released minutes or capacity measured → actual reuse or financial consequence recorded.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">Economic discipline</div>
              <h2>Net benefit matters more than gross savings.</h2>
            </div>
            <p>If avoiding £20 of medicine creates £35 of additional professional workload, the intervention has failed economically. The platform should measure the cost of intervention as well as the resource avoided.</p>
          </div>
          <div className="metric-grid">
            <div className="metric"><span className="badge">Benefit</span><strong>£</strong><h3>Cash releasing</h3><small>Actual expenditure no longer incurred and demonstrably removed from the cost base.</small></div>
            <div className="metric"><span className="badge">Benefit</span><strong>£</strong><h3>Cost avoidance</h3><small>Future or additional expenditure prevented without necessarily reducing an existing budget.</small></div>
            <div className="metric"><span className="badge">Benefit</span><strong>Hours</strong><h3>Capacity release</h3><small>Nursing, pharmacy, aseptic, chair or bed capacity made available for another use.</small></div>
            <div className="metric"><span className="badge">Rule</span><strong>Net</strong><h3>Resource recovery</h3><small>Gross benefit minus the operational cost of generating and managing the intervention.</small></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell two-col">
          <div>
            <div className="eyebrow">Clinical safety</div>
            <h2>Resource optimisation must never become autonomous rationing.</h2>
            <p className="lede">The programme supports safer, better-informed decisions. It does not replace prescribing authority or clinical judgement.</p>
          </div>
          <article className="card">
            <ul className="list-clean">
              {safetyRules.map((rule) => <li key={rule}>{rule}</li>)}
            </ul>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">Why this works</div>
              <h2>It intervenes before waste occurs and measures the full pathway after the decision.</h2>
            </div>
          </div>
          <div className="card-grid">
            <article className="card"><h3>It is preventative</h3><p>Medicine Loop attempts to stop unnecessary supply before the NHS pays for, dispenses and eventually destroys an unused item.</p></article>
            <article className="card"><h3>It uses existing systems</h3><p>The proposal is an intelligence layer above prescribing, dispensing, EPR and pharmacy systems rather than a wholesale replacement programme.</p></article>
            <article className="card"><h3>It is measurable</h3><p>Medicines are discrete transactions. Supply, preparation, administration, route and outcome can be tied to timestamps and resource use.</p></article>
            <article className="card"><h3>It separates safety from automation</h3><p>Rules can identify anomalies automatically while clinical decisions remain governed by professionals and approved pathways.</p></article>
            <article className="card"><h3>It values capacity properly</h3><p>Released nursing time or chair capacity is not falsely labelled as cash. It is tracked as capacity until it is demonstrably reused or converted into financial benefit.</p></article>
            <article className="card"><h3>It can scale</h3><p>Once the model is proven in medicines, the same Observe → Detect → Explain → Intervene → Verify architecture can extend into theatres, discharge, appointments and workforce.</p></article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="callout">
            <strong>Proposed programme thesis</strong>
            <p>Every medicine should be needed, supplied in the right quantity, delivered through the right clinically appropriate pathway, and measured through to its actual use or waste.</p>
          </div>
        </div>
      </section>
    </>
  );
}
