const faqs = [
  {
    q: "What is Sitora NHS Resource Intelligence?",
    a: "Sitora is a proposed intelligence layer designed to sit above existing NHS systems. It does not replace prescribing, dispensing, EPR or pharmacy platforms. It connects agreed operational signals, identifies candidate resource-loss events, supports governed interventions and records whether any resource was genuinely recovered."
  },
  {
    q: "What are the two flagship medicines solutions?",
    a: "Medicine Loop asks whether another repeat supply is actually required before it is dispensed. Medicines Resource Intelligence asks whether a clinically necessary medicine is being delivered through the most appropriate resource pathway, including route, formulation, preparation location, aseptic production, nursing time, chair time, bed use and unused preparations."
  },
  {
    q: "Does Medicine Loop automatically stop medicines?",
    a: "No. The proposed model does not autonomously stop clinically required medicines, alter a prescription or make a clinically significant medication decision. It identifies anomalies or missing information and routes clinically significant cases to an authorised pharmacist, prescriber or other appropriate professional."
  },
  {
    q: "Is this just another medicines-waste campaign?",
    a: "No. Campaigns rely mainly on patient behaviour and awareness. Medicine Loop is intended to make the system itself more intelligent by using prescribing, dispensing, expected consumption, medication changes, reconciliation and patient-stock signals to intervene before avoidable supply occurs."
  },
  {
    q: "Why is the repeat-medicines loop currently incomplete?",
    a: "Prescribing systems record intent and dispensing systems record supply, but these records do not consistently prove that the next supply is needed. Remaining stock, changed doses, discontinuations, hospital discharge changes and actual consumption can sit outside the next repeat decision unless someone actively reconciles them."
  },
  {
    q: "What does Medicines Resource Intelligence look for?",
    a: "It looks for whole-pathway opportunities such as ready-to-administer products, clinically appropriate route changes, dose banding, batching, preparation-location redesign, avoidable local preparation, unnecessary chair or bed time, repeated cancellations and prepared-but-unused doses."
  },
  {
    q: "Will this system use AI?",
    a: "Potentially, but AI is not required for every function. Many early use cases are better handled by deterministic rules, thresholds and data matching. AI may help with prioritisation, pattern detection, explanation and complex combinations of signals. Safety-critical decisions remain governed by clinical rules and authorised professional review."
  },
  {
    q: "Would Sitora replace NHS clinical systems?",
    a: "No. The proposed architecture is intentionally additive. Sitora should consume the minimum permitted data from existing systems, generate intelligence and feed governed actions back into existing workflows rather than forcing the NHS to replace core clinical infrastructure."
  },
  {
    q: "What data would a pilot need?",
    a: "The minimum dataset depends on scope, but likely includes repeat-prescribing data, issue and dispensing history, medication changes, reconciliation events, expected days supply, selected patient-stock confirmation, injectable or SACT pathway data, preparation records, administration timing, cancellations, unused preparations, staffing inputs and relevant finance data."
  },
  {
    q: "Would patient-identifiable data be required?",
    a: "Only where necessary for the agreed use case and under the appropriate lawful basis, governance and access controls. The pilot design should minimise personal data, pseudonymise where feasible, restrict role-based access, maintain audit logs and document data flows through a DPIA."
  },
  {
    q: "How would clinical safety be handled?",
    a: "Clinical safety must be built in from the start. The intended use would need to be assessed to determine the exact regulatory and clinical-safety obligations. The current pilot model assumes formal NHS clinical-risk management, named Clinical Safety Officers, hazard logs, escalation rules and human review of clinically significant interventions."
  },
  {
    q: "Could this increase workload for GPs or pharmacists?",
    a: "It could if designed badly, which is why workload is a core pilot outcome. The system should aim to let routine cases pass with minimal friction and only escalate cases where there is a meaningful anomaly or potential safety/resource issue. A solution that saves medicine cost but creates more professional workload than it releases has failed economically."
  },
  {
    q: "How do you avoid generating too many alerts?",
    a: "The pilot should use conservative thresholds, exception-based review, suppression of repeated low-value alerts and continuous measurement of alert acceptance and workload. The objective is not maximum detection. It is high-value, actionable detection with a manageable signal-to-noise ratio."
  },
  {
    q: "How will savings be calculated?",
    a: "They will not be rolled into one headline number. Each benefit must be classified as cash-releasing, cost avoidance or capacity/productivity release. Finance validation is required for monetary claims, and capacity only counts as recovered where the freed resource is demonstrably available for another patient or activity."
  },
  {
    q: "What is a Resource Recovery Record?",
    a: "It is the proposed audit unit for each verified intervention. It records the original signal, intervention, clinical approval where relevant, avoided or changed activity, resource effect, safety outcome, benefit type and verification status. This creates a traceable evidence base instead of relying on top-down estimates."
  },
  {
    q: "What does the prepared-but-unused medicines workstream do?",
    a: "It records selected prepared medicines that are not administered and classifies why they became unused, for example cancellation, deterioration, dose change, scheduling issue, expiry or readiness failure. Repeated causes can then be targeted with specific operational interventions."
  },
  {
    q: "Why focus on aseptic and injectable medicines?",
    a: "These pathways can consume several scarce resources at once, including pharmacy production, nursing preparation, infusion-chair time and bed capacity. National work has already identified substantial potential from transforming aseptic and injectable-medicine pathways, so this is a credible area for a measurable pilot."
  },
  {
    q: "What would the pilot look like?",
    a: "The current proposal is a 20-week programme: 4 weeks mobilisation, 4 weeks baseline measurement, 8 weeks controlled intervention and 4 weeks evaluation. It would involve one acute provider plus a small primary-care and community-pharmacy network."
  },
  {
    q: "What are the three pilot workstreams?",
    a: "A: Medicine Loop for selected repeat-medicine cohorts. B: Medicines Resource Intelligence for selected high-volume or resource-intensive injectable/SACT pathways. C: Prepared-but-unused medicines with structured root-cause capture and intervention."
  },
  {
    q: "What would count as a successful pilot?",
    a: "Success means clinically safe, measurable and reproducible net benefit. That includes evidence of unnecessary supply prevented, resource use reduced, unused preparations lowered, workload remaining manageable, data quality being sufficient for scale and the value of recovered resources exceeding the intervention cost."
  },
  {
    q: "What if the pilot shows little or no recoverable opportunity?",
    a: "That is a valid result. The programme has an explicit Scale / Modify / Stop decision. If the opportunity is small, the operational burden is too high or safety concerns outweigh benefit, the correct decision is to stop rather than manufacture a business case."
  },
  {
    q: "How is this different from a dashboard?",
    a: "A dashboard shows what happened. Sitora is intended to connect detection to action and verification: observe the signal, explain the likely cause, trigger a governed intervention and then prove whether anything changed afterwards."
  },
  {
    q: "Who would need to sponsor a pilot?",
    a: "The ideal structure includes an executive sponsor, senior pharmacy or clinical lead, medicines-optimisation representation, digital and information-governance leads, a Clinical Safety Officer, finance, analytics/evaluation and operational owners from the participating acute and primary-care pathways."
  },
  {
    q: "What exactly are you asking an NHS organisation to approve?",
    a: "Approval for a governed 20-week medicines discovery-and-pilot programme, nomination of participating sites and accountable leads, access to the minimum agreed datasets, an approved intervention protocol, and pre-agreed definitions for safety, workload, capacity release and financial benefit."
  },
  {
    q: "Could this be expanded beyond medicines?",
    a: "Yes. The wider Sitora research applies the same Observe, Detect, Explain, Intervene and Verify model to discharge delays, missed appointments, theatres, workforce and other NHS resource-loss areas. Medicines is proposed as the first focused vertical because it has clear transactions, identifiable owners and measurable resource pathways."
  }
];

export default function FAQPage() {
  return (
    <>
      <section className="page-head">
        <div className="shell">
          <div className="eyebrow">Frequently asked questions</div>
          <h1>What an NHS commissioner, pharmacist, clinician or digital lead is likely to ask first.</h1>
          <p className="lede">The medicines programme is intentionally designed around governance, measurable benefit and existing NHS workflows. These answers set out what the proposal does, what it does not do, and what still has to be proven in a pilot.</p>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="card-grid">
            {faqs.map((item) => (
              <article className="card evidence-card" key={item.q}>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell quote">The point of the pilot is not to assume the system works. It is to test whether it can reduce avoidable medicines resource use safely, measurably and at a positive net benefit.</div>
      </section>
    </>
  );
}
