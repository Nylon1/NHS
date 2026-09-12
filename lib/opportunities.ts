export type BenefitType = "Cash-releasing" | "Cost avoidance" | "Capacity release" | "Mixed";
export type EvidenceLevel = "High" | "Medium" | "Developing";
export type PilotReadiness = "Ready now" | "Ready with data" | "Needs design";

export type Opportunity = {
  id: string;
  title: string;
  domain: string;
  observedSignal: string;
  opportunityStatement: string;
  benefitType: BenefitType;
  evidence: EvidenceLevel;
  pilotReadiness: PilotReadiness;
  owner: string;
  intervention: string;
  firstDataNeeded: string[];
  verification: string[];
  safeguards: string[];
  scores: {
    scale: number;
    evidence: number;
    recoverability: number;
    readiness: number;
    measurability: number;
  };
  sourceLabel: string;
  sourceUrl: string;
};

export function opportunityScore(item: Opportunity) {
  const s = item.scores;
  return Math.round(
    s.scale * 0.25 +
    s.evidence * 0.2 +
    s.recoverability * 0.2 +
    s.readiness * 0.2 +
    s.measurability * 0.15
  );
}

export const opportunities: Opportunity[] = [
  {
    id: "discharge",
    title: "Delayed discharge after clinical readiness",
    domain: "Hospital flow",
    observedSignal: "~30,000 patients per year staying at least 21 days beyond discharge-ready date; NHS England identified up to 500,000 bed days for release.",
    opportunityStatement: "Reduce avoidable days after discharge readiness by identifying the active constraint, assigning a named owner and escalating unresolved cross-system dependencies in real time.",
    benefitType: "Capacity release",
    evidence: "High",
    pilotReadiness: "Ready now",
    owner: "Acute trust + community provider + ICB + local authority",
    intervention: "Daily constraint coding, named ownership, care-transfer-hub escalation, early downstream activation and verified closure of the blocking dependency.",
    firstDataNeeded: ["Discharge-ready timestamp", "Primary delay reason", "Named dependency owner", "Resolution timestamp", "Destination/pathway", "Additional bed days"],
    verification: ["Bed days after readiness", "Median delay by cause", "Same-day discharge after readiness", "Recurrent cause rate", "Capacity actually reused"],
    safeguards: ["No unsafe acceleration of discharge", "Track readmission and safeguarding outcomes", "Do not treat social-care constraints as provider failure"],
    scores: { scale: 98, evidence: 95, recoverability: 88, readiness: 94, measurability: 96 },
    sourceLabel: "NHS England urgent and emergency care / discharge guidance",
    sourceUrl: "https://www.england.nhs.uk/long-read/urgent-and-emergency-care-plan-2025-26/"
  },
  {
    id: "outpatient-dna",
    title: "Missed outpatient appointments",
    domain: "Elective care",
    observedSignal: "Millions of elective appointments are missed each year; NHS England has described DNAs as a major recoverable capacity problem and has published interventions that can reduce them quickly.",
    opportunityStatement: "Recover booked clinical capacity before it becomes idle by reducing cancellation friction, identifying high-risk appointments and filling released slots rapidly.",
    benefitType: "Capacity release",
    evidence: "High",
    pilotReadiness: "Ready now",
    owner: "Trust elective operations + specialty teams",
    intervention: "Two-way reminders, easy cancellation, short-notice waiting lists, risk-based reminder intensity and same-day backfill workflows.",
    firstDataNeeded: ["Appointment date", "Booking lead time", "Reminder delivery", "Cancellation timing", "DNA reason", "Whether slot was backfilled"],
    verification: ["DNA rate", "Backfill rate", "Additional patients seen", "Unused clinician minutes", "Waiting-time effect"],
    safeguards: ["Do not penalise vulnerable patients", "Monitor inequalities by deprivation, disability and language", "Separate patient access barriers from behavioural assumptions"],
    scores: { scale: 94, evidence: 94, recoverability: 92, readiness: 96, measurability: 95 },
    sourceLabel: "NHS England Did Not Attends guidance",
    sourceUrl: "https://www.england.nhs.uk/outpatient-transformation-programme/did-not-attends-dnas/"
  },
  {
    id: "repeat-medicines",
    title: "Repeat medicines open loop",
    domain: "Medicines",
    observedSignal: "NHS services continue to campaign against unnecessary repeat ordering, while digital repeat ordering has reached very large scale. The current national avoidable value is not measured robustly.",
    opportunityStatement: "Close the gap between prescribing, dispensing and actual patient need so avoidable repeat supply can be prevented before dispensing rather than discovered as returned waste.",
    benefitType: "Mixed",
    evidence: "Medium",
    pilotReadiness: "Ready with data",
    owner: "Primary care + community pharmacy + ICB medicines optimisation",
    intervention: "Patient stock confirmation, medication-change reconciliation, anomaly detection and pharmacist review before repeat items are authorised or dispensed.",
    firstDataNeeded: ["Repeat item ordered", "Last dispense date", "Expected consumption", "Patient-held stock", "Recent medication changes", "Hospital discharge changes"],
    verification: ["Items safely not dispensed", "Avoided acquisition cost", "Pharmacist interventions", "Emergency re-supply", "Medication safety events"],
    safeguards: ["Never auto-stop essential medication", "Clinical/pharmacy review for exceptions", "Monitor under-supply and adherence harms"],
    scores: { scale: 91, evidence: 76, recoverability: 91, readiness: 84, measurability: 86 },
    sourceLabel: "NHS England London, Only order what you need, March 2026",
    sourceUrl: "https://www.england.nhs.uk/london/2026/03/23/only-order-what-you-need-how-londoners-with-prescriptions-can-reduce-nhs-medicine-waste/"
  },
  {
    id: "aseptic",
    title: "Aseptic and injectable pathway redesign",
    domain: "Pharmacy / nursing",
    observedSignal: "National modelling identified >4,000 WTE nursing capacity and >1 million bed days potentially releasable, alongside major aseptic productivity opportunity.",
    opportunityStatement: "Move suitable medicines away from unnecessarily labour-intensive preparation and administration while reducing prepared-but-unused doses and cleanroom bottlenecks.",
    benefitType: "Mixed",
    evidence: "High",
    pilotReadiness: "Ready with data",
    owner: "Chief pharmacist + aseptic service + clinical divisions",
    intervention: "Ready-to-administer conversion, dose banding, route optimisation, hub-and-spoke supply and prepared-dose waste measurement.",
    firstDataNeeded: ["Product and presentation", "Preparation time", "Nursing administration time", "Prepared-but-unused doses", "Chair/bed time", "Acquisition cost"],
    verification: ["Nursing minutes released", "Aseptic slots released", "Unused doses", "Chair/bed time released", "Net pathway cost"],
    safeguards: ["Clinical equivalence first", "Supply resilience", "Stability/storage controls", "Do not count modelled capacity as realised until reused"],
    scores: { scale: 93, evidence: 91, recoverability: 83, readiness: 83, measurability: 89 },
    sourceLabel: "DHSC, Transforming NHS pharmacy aseptic services",
    sourceUrl: "https://www.gov.uk/government/publications/transforming-nhs-pharmacy-aseptic-services-in-england/transforming-nhs-pharmacy-aseptic-services-in-england"
  },
  {
    id: "theatres",
    title: "Operating theatre lost minutes",
    domain: "Surgery",
    observedSignal: "Theatre utilisation has improved, but NHS England continues to identify theatre productivity and variation as a major source of further productivity gain.",
    opportunityStatement: "Convert unexplained list-time loss into a minute-level operational dataset so repeated causes can be acted on and recovered time can be shown as additional usable surgical capacity.",
    benefitType: "Capacity release",
    evidence: "High",
    pilotReadiness: "Ready now",
    owner: "Theatre operations + surgical divisions",
    intervention: "Common delay taxonomy, list-readiness checks, predictive scheduling, turnaround tracking and live escalation of recoverable gaps.",
    firstDataNeeded: ["Planned and actual start", "Case duration", "Turnaround", "Cancellation reason", "Staff/equipment readiness", "List finish"],
    verification: ["Touch-time utilisation", "Late-start minutes", "Turnaround minutes", "Cases per list", "Cancelled cases", "Recovered minutes converted to activity"],
    safeguards: ["Do not incentivise unsafe speed", "Track overruns and staff fatigue", "Case-mix adjust comparisons"],
    scores: { scale: 92, evidence: 90, recoverability: 86, readiness: 92, measurability: 96 },
    sourceLabel: "NHS England Productivity plan update, February 2026",
    sourceUrl: "https://www.england.nhs.uk/long-read/productivity-plan-update/"
  },
  {
    id: "agency",
    title: "Avoidable agency staffing premium",
    domain: "Workforce",
    observedSignal: "Agency spend fell from about £2.1bn in 2024/25 to about £1.2bn in 2025/26, proving that this cost base can change materially while leaving a substantial residual spend to understand.",
    opportunityStatement: "Separate clinically necessary temporary staffing from recurrent avoidable premium use and target the specific roster, vacancy, retention or bank-fill causes.",
    benefitType: "Cash-releasing",
    evidence: "High",
    pilotReadiness: "Ready now",
    owner: "Trust workforce + finance + divisional management",
    intervention: "Shift-level causal coding, bank-first escalation, roster analytics, hotspot recruitment and retention interventions.",
    firstDataNeeded: ["Agency shift", "Premium vs bank/substantive", "Reason agency used", "Bank fill attempts", "Vacancy age", "Specialty"],
    verification: ["Agency spend", "Premium avoided", "Bank fill rate", "Unfilled shifts", "Safety/quality indicators"],
    safeguards: ["Do not create unsafe gaps", "Track staff workload", "Attribute savings only where premium use is actually displaced"],
    scores: { scale: 88, evidence: 98, recoverability: 72, readiness: 94, measurability: 97 },
    sourceLabel: "NHS England Month 12 financial position 2025/26",
    sourceUrl: "https://www.england.nhs.uk/long-read/month-12-financial-position-2025-26-4-june-2026/"
  },
  {
    id: "gp-dna",
    title: "Missed GP appointments",
    domain: "Primary care",
    observedSignal: "16 million GP appointments were not attended in 2025, equivalent to 4.3% of appointments.",
    opportunityStatement: "Recover primary-care capacity by identifying preventable non-attendance and making cancellation/rebooking and short-notice refill substantially easier.",
    benefitType: "Capacity release",
    evidence: "High",
    pilotReadiness: "Ready now",
    owner: "Practices + PCNs + ICB primary care",
    intervention: "App/push reminders, one-tap cancellation, short-notice wait lists and targeted reminder intensity.",
    firstDataNeeded: ["Appointment type", "Lead time", "Reminder delivery", "DNA", "Cancellation timing", "Backfill status"],
    verification: ["DNA rate", "Appointments backfilled", "Clinician minutes reused", "Waiting-time change"],
    safeguards: ["Protect access for vulnerable groups", "Do not use punitive cancellation rules", "Analyse inequality effects"],
    scores: { scale: 90, evidence: 97, recoverability: 89, readiness: 96, measurability: 95 },
    sourceLabel: "NHS England, March 2026 GP appointment campaign",
    sourceUrl: "https://www.england.nhs.uk/2026/03/nhs-urges-tap-the-app-as-1-in-4-miss-appointments/"
  },
  {
    id: "drug-variance",
    title: "Provider medicines cost variation",
    domain: "Medicines finance",
    observedSignal: "Provider drug spending has shown material adverse variance to plan, but the amount that is genuinely avoidable cannot be inferred from overspend alone.",
    opportunityStatement: "Decompose drug-cost growth into price, volume, case mix, new therapies and potentially unwarranted variation before targeting procurement or prescribing change.",
    benefitType: "Cost avoidance",
    evidence: "High",
    pilotReadiness: "Ready with data",
    owner: "Chief pharmacist + finance + commissioning",
    intervention: "Price-volume-mix decomposition, biosimilar/brand analysis, procurement comparison and pathway-level prescribing variation review.",
    firstDataNeeded: ["Drug spend by molecule", "Volume", "Unit price", "Indication", "Case mix", "Contract price", "Comparator providers"],
    verification: ["Variance explained", "Avoidable component", "Unit-price change", "Prescribing change", "Clinical outcome safeguards"],
    safeguards: ["Never equate overspend with waste", "Protect access to clinically indicated innovation", "Case-mix adjust comparisons"],
    scores: { scale: 95, evidence: 93, recoverability: 61, readiness: 78, measurability: 84 },
    sourceLabel: "NHS England financial performance reporting",
    sourceUrl: "https://www.england.nhs.uk/long-read/financial-performance-report-2024-25-quarter-4/"
  },
  {
    id: "patient-comms",
    title: "Patient communications channel cost",
    domain: "Administration / digital",
    observedSignal: "NHS England has identified substantial annual patient-communications expenditure while promoting lower-cost NHS App messaging and digital-by-default workflows.",
    opportunityStatement: "Shift suitable communications from paid channels to secure digital delivery while protecting patients who require paper, phone or accessible formats.",
    benefitType: "Cash-releasing",
    evidence: "Medium",
    pilotReadiness: "Ready now",
    owner: "Provider digital + communications + outpatient operations",
    intervention: "Channel-cost measurement, consent/availability routing, NHS App-first messaging and automatic fallback only where required.",
    firstDataNeeded: ["Message type", "Channel", "Unit cost", "Delivery status", "Digital eligibility", "Fallback reason"],
    verification: ["Paid messages avoided", "Net communications cost", "Delivery/read rate", "Failure/fallback rate", "Access complaints"],
    safeguards: ["No digital exclusion", "Accessible-format support", "Clinical urgency must override cheapest channel"],
    scores: { scale: 75, evidence: 77, recoverability: 90, readiness: 94, measurability: 98 },
    sourceLabel: "NHS England performance/productivity reporting",
    sourceUrl: "https://www.england.nhs.uk/long-read/performance-report-24-25/"
  },
  {
    id: "dental-prevention",
    title: "Preventable dental escalation in children",
    domain: "Prevention",
    observedSignal: "Hospital treatment for preventable dental disease remains a substantial downstream burden, but the resource benefit of a new school/community detection pathway requires prospective evaluation.",
    opportunityStatement: "Detect risk and visible disease earlier, complete referral loops and test whether earlier intervention reduces later urgent and hospital treatment without creating a new referral bottleneck.",
    benefitType: "Cost avoidance",
    evidence: "Developing",
    pilotReadiness: "Needs design",
    owner: "ICB dental commissioning + schools + community dental services",
    intervention: "Structured periodic check, appropriate imaging where validated, parent communication and closed-loop referral to qualified dental review.",
    firstDataNeeded: ["Baseline oral-health risk", "Screen finding", "Referral", "Attendance", "Treatment completed", "Later urgent/hospital activity"],
    verification: ["Completed referrals", "Earlier-stage treatment", "Urgent attendance", "Hospital extraction rate", "Net pathway cost"],
    safeguards: ["Screening is not diagnosis", "Parental consent", "Avoid overwhelming existing dental capacity", "Clinical governance and device regulation"],
    scores: { scale: 76, evidence: 66, recoverability: 72, readiness: 55, measurability: 70 },
    sourceLabel: "Sitora research programme - requires prospective NHS pilot evidence",
    sourceUrl: "https://www.england.nhs.uk/primary-care/dentistry/"
  }
];

export const rankedOpportunities = [...opportunities].sort((a, b) => opportunityScore(b) - opportunityScore(a));
