const phases = [
  ["0-4 weeks", "Mobilise", "Confirm sponsor, sites, information governance, clinical safety, data access, baseline definitions and named operational owners."],
  ["5-8 weeks", "Baseline", "Measure current repeat ordering, medicine changes, dispensing, injectable pathways, prepared-but-unused doses, staff time and relevant capacity."],
  ["9-16 weeks", "Intervene", "Run controlled interventions: repeat-medicine validation, reconciliation prompts, selected pathway optimisation and unused-dose root-cause action."],
  ["17-20 weeks", "Evaluate", "Compare with baseline/control where feasible, verify net resource recovery and review clinical, operational and patient outcomes."],
];

const workstreams = [
  {
    title: "1. Medicine Loop",
    aim: "Prevent avoidable repeat supply before dispensing while improving reconciliation and patient safety.",
    population: "Selected stable repeat-medicine cohorts across participating GP practices and community pharmacies.",
    data: "Current repeat list, issue/dispensing history, expected days supply, recent medication changes, admission/discharge reconciliation and patient stock confirmation where collected.",
    interventions: "Need confirmation, early-order flags, stock prompts, discrepancy detection and pharmacist/clinician review for clinically significant change.",
    outcomes: "Avoided items, avoided acquisition/reimbursement, discrepancies resolved, workload change, safety events and patient experience."
  },
  {
    title: "2. Medicines Resource Intelligence",
    aim: "Reduce avoidable pharmacy, nursing, chair, bed and aseptic resource use for medicines that remain clinically necessary.",
    population: "A defined set of high-volume or resource-intensive injectable/SACT pathways within one acute provider.",
    data: "Drug, route, formulation, preparation location, aseptic production, chair/bed time, administration time, cancellations, unused preparations, acquisition cost and staffing inputs.",
    interventions: "Ready-to-administer substitution where appropriate, route/formulation optimisation, dose banding, batching, preparation-location review and pathway redesign.",
    outcomes: "Aseptic preparations avoided, nursing/pharmacy minutes released, chair/bed capacity released, unused doses, pathway cost and clinical safety."
  },
  {
    title: "3. Prepared-but-unused Medicines",
    aim: "Turn discarded preparations into a measurable root-cause dataset and reduce recurrence.",
    population: "All selected prepared medicines that are not administered during the pilot measurement period.",
    data: "Medicine, value, preparation time, intended patient/pathway, cancellation timestamp and standardised reason for non-use.",
    interventions: "Reason-specific action such as later preparation trigger, scheduling change, improved readiness checks, dose confirmation or stock redesign.",
    outcomes: "Unused preparations per 100 doses, value discarded, repeated root causes, preventable fraction and net reduction after intervention."
  }
];

const governance = [
  ["Executive sponsor", "ICB or provider executive sponsor with authority across pharmacy, primary care and finance."],
  ["Clinical lead", "Senior pharmacist/medical lead accountable for clinical scope and escalation rules."],
  ["Clinical safety", "Supplier DCB0129 clinical-risk process and deploying organisation DCB0160 process, with Clinical Safety Officers and hazard logs."],
  ["Information governance", "DPIA, data-flow mapping, lawful basis, data minimisation, role-based access, audit logging and retention controls."],
  ["Evaluation", "Named analytical/evaluation lead independent from day-to-day intervention decisions where practical."],
  ["Finance validation", "Provider/ICB finance sign-off before any claimed cash-releasing benefit is reported."],
];

const approval = [
  "Approve a 20-week discovery-and-pilot programme focused on medicines only.",
  "Nominate one acute provider, a small group of GP practices/PCNs and participating community-pharmacy partners.",
  "Nominate executive, clinical, pharmacy, digital/IG, finance and evaluation leads.",
  "Permit access to the minimum agreed datasets required for baseline analysis and intervention evaluation.",
  "Approve governed, human-reviewed interventions within an agreed protocol; no autonomous medicine stopping or prescribing changes.",
  "Agree in advance how capacity release, cost avoidance and cash-releasing savings will be classified and signed off."
];

export default function BusinessCasePage() {
  return (
    <>
      <section className="page-head">
        <div className="shell">
          <div className="eyebrow">Commissioner-ready pilot business case</div>
          <h1>Prove whether medicines resource intelligence can recover measurable NHS capacity without compromising care.</h1>
          <p className="lede">A controlled medicines pilot combining the Medicine Loop, pathway optimisation and prepared-but-unused dose intelligence. The purpose is not to promise a headline saving. It is to establish what is genuinely recoverable, at what cost, and with what safety impact.</p>
        </div>
      </section>

      <section className="section">
        <div className="shell metric-grid">
          <div className="metric"><span className="badge">Duration</span><strong>20 weeks</strong><h3>From mobilisation to evaluation</h3><small>Allows proper baseline, governed intervention and verification rather than a short proof-of-concept.</small></div>
          <div className="metric"><span className="badge">Scope</span><strong>3</strong><h3>Medicines workstreams</h3><small>Repeat supply, pathway resource use and prepared-but-unused medicines.</small></div>
          <div className="metric"><span className="badge">Sites</span><strong>1 + small network</strong><h3>Acute trust plus primary-care/pharmacy partners</h3><small>Narrow enough to govern, broad enough to test cross-boundary medicine flows.</small></div>
          <div className="metric"><span className="badge">Decision</span><strong>Scale / modify / stop</strong><h3>Predetermined endpoint</h3><small>The pilot must generate a commissioning decision, not simply another report.</small></div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head"><div><div className="eyebrow">The case for change</div><h2>The information loop is incomplete.</h2></div></div>
          <div className="two-col">
            <div className="card"><h3>Current system</h3><p>Prescribing systems record intent. Dispensing systems record supply. Hospital systems record administration and activity. These records are often separated by organisation and purpose, making it difficult to know whether the next supply is needed or whether a clinically necessary medicine is consuming avoidable resources elsewhere in the pathway.</p></div>
            <div className="card"><h3>Proposed system</h3><p>Sitora sits above existing systems as an intelligence and verification layer. It links agreed signals, identifies candidate interventions, routes clinically significant decisions to authorised professionals and records whether the expected resource was actually recovered.</p></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head"><div><div className="eyebrow">Pilot workstreams</div><h2>Three linked tests, one medicines programme.</h2></div></div>
          <div className="card-grid">
            {workstreams.map((w) => <article className="card evidence-card" key={w.title}><h3>{w.title}</h3><p><strong>Aim:</strong> {w.aim}</p><p><strong>Population:</strong> {w.population}</p><p><strong>Minimum data:</strong> {w.data}</p><p><strong>Interventions:</strong> {w.interventions}</p><p><strong>Primary outcomes:</strong> {w.outcomes}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head"><div><div className="eyebrow">Delivery plan</div><h2>Baseline before intervention. Verification before claims.</h2></div></div>
          <div className="process">{phases.map(([time,title,body]) => <div className="process-step" key={title}><span>{time}</span><h3>{title}</h3><p>{body}</p></div>)}</div>
        </div>
      </section>

      <section className="section">
        <div className="shell two-col">
          <div>
            <div className="eyebrow">Evaluation design</div>
            <h2>What would count as success?</h2>
            <ul className="list-clean">
              <li><strong>Medicine Loop:</strong> statistically and operationally credible reduction in unnecessary supplied items without deterioration in adherence, safety or access.</li>
              <li><strong>Pathway optimisation:</strong> measurable reduction in resource inputs per treated patient while maintaining agreed clinical outcomes and safety.</li>
              <li><strong>Unused preparations:</strong> lower discarded-dose rate after cause-specific intervention.</li>
              <li><strong>Net benefit:</strong> verified resource value exceeds intervention and operating cost.</li>
              <li><strong>Operational acceptability:</strong> no unsustainable increase in GP, pharmacy or nursing workload.</li>
              <li><strong>Scale readiness:</strong> data quality, governance and workflow are strong enough for a larger controlled rollout.</li>
            </ul>
          </div>
          <div className="card">
            <span className="badge">Verification rule</span>
            <h3 style={{marginTop:12}}>No gross-savings theatre.</h3>
            <p>Every claimed benefit must be tagged as cash-releasing, cost avoidance or capacity/productivity release. Capacity is only counted as recovered where the freed resource is demonstrably available for another patient or activity.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head"><div><div className="eyebrow">Governance</div><h2>Designed for NHS deployment, not a consumer experiment.</h2></div><p>Exact regulatory applicability must be confirmed from intended use before deployment. The pilot assumes formal clinical-safety and IG governance from the start.</p></div>
          <div className="table-wrap"><table><thead><tr><th>Area</th><th>Minimum requirement</th></tr></thead><tbody>{governance.map(([a,b]) => <tr key={a}><td><strong>{a}</strong></td><td>{b}</td></tr>)}</tbody></table></div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head"><div><div className="eyebrow">Indicative resource plan</div><h2>A pilot needs enough resource to produce a trustworthy answer.</h2></div><p>These are planning assumptions, not a quotation. Local NHS salary, infrastructure and integration costs must be validated before approval.</p></div>
          <div className="table-wrap"><table><thead><tr><th>Resource</th><th>Indicative input</th><th>Purpose</th></tr></thead><tbody>
            <tr><td>Clinical/pharmacy lead</td><td>0.2-0.3 WTE</td><td>Clinical scope, pathway review, escalation and intervention approval.</td></tr>
            <tr><td>Medicines optimisation pharmacist</td><td>0.5 WTE</td><td>Repeat-medicine review, reconciliation rules and primary-care/pharmacy liaison.</td></tr>
            <tr><td>Data/analytics</td><td>0.5-1.0 WTE</td><td>Data quality, baseline, matching, evaluation and benefit verification.</td></tr>
            <tr><td>Product/integration engineering</td><td>1.0-1.5 WTE</td><td>Secure ingestion, rules, workflow, dashboards and audit trail.</td></tr>
            <tr><td>Clinical safety / IG</td><td>Sessional</td><td>DCB0129/DCB0160 artefacts, DPIA, hazard management and assurance.</td></tr>
            <tr><td>Finance/evaluation</td><td>0.1-0.2 WTE</td><td>Benefit classification, counterfactual and sign-off.</td></tr>
          </tbody></table></div>
          <div className="callout" style={{marginTop:20}}><strong>Indicative pilot cost envelope</strong><p>For planning only, a properly governed 20-week pilot is likely to sit in the broad tens-to-low-hundreds-of-thousands range depending on integration complexity, NHS staff backfill, data engineering and whether existing infrastructure can be reused. A commissioner-facing quote should only be set after technical discovery.</p></div>
        </div>
      </section>

      <section className="section">
        <div className="shell two-col">
          <div>
            <div className="eyebrow">Decision thresholds</div><h2>Pre-agree the rules before seeing the result.</h2>
            <ul className="list-clean">
              <li><strong>Scale:</strong> clinically safe, positive net benefit, manageable workload and reproducible data pipeline.</li>
              <li><strong>Modify:</strong> value signal present but workflow, data quality or intervention targeting needs redesign.</li>
              <li><strong>Stop:</strong> no credible recoverable opportunity, net resource cost is negative, or safety/operational burden is unacceptable.</li>
            </ul>
          </div>
          <div className="card"><span className="badge">Commissioner question</span><h3 style={{marginTop:12}}>What are we asking the NHS to approve?</h3><ul className="list-clean">{approval.map((a) => <li key={a}>{a}</li>)}</ul></div>
        </div>
      </section>

      <section className="section">
        <div className="shell quote">The pilot succeeds only if it can show, with clinical and financial sign-off, what changed, why it changed, what resource was genuinely released and whether the improvement can be repeated elsewhere.</div>
      </section>
    </>
  );
}
