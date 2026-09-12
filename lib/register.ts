export type Confidence = "High" | "Medium" | "Developing";
export type Trend = "Improving" | "Worsening" | "Mixed" | "Unknown";
export type Recoverability = "High" | "Medium" | "Low";
export type Stage = "Observe" | "Detect" | "Intervene" | "Verify";

export type LossRegisterRecord = {
  id: string;
  title: string;
  domain: string;
  signal: string;
  unit: string;
  period: string;
  confidence: Confidence;
  trend: Trend;
  recoverability: Recoverability;
  stage: Stage;
  owner: string;
  problem: string;
  missingData: string;
  intervention: string;
  verificationMetric: string;
  sourceLabel: string;
  sourceUrl: string;
  priority: number;
};

export const lossRegister: LossRegisterRecord[] = [
  {
    id: "outpatient-dna",
    title: "Missed elective appointments",
    domain: "Outpatients",
    signal: "8m missed elective appointments; NHS England previously estimated ~£1.2bn annual cost for outpatient DNAs",
    unit: "appointments / £",
    period: "2023/24 benchmark",
    confidence: "High",
    trend: "Mixed",
    recoverability: "High",
    stage: "Intervene",
    owner: "Provider elective operations",
    problem: "Clinical slots are created, staffed and scheduled but remain unused when patients do not attend and capacity cannot be backfilled.",
    missingData: "Reason for each DNA, notice period, reminder exposure, transport or access barrier, whether slot was backfilled, specialty-level avoidability.",
    intervention: "Two-way reminders, cancellation friction reduction, risk prediction, intelligent backfill and specialty-specific access support.",
    verificationMetric: "DNA rate, backfill rate, extra patients seen, avoided idle clinician minutes and cost per recovered slot.",
    sourceLabel: "NHS England, Reforming elective care / AI expansion",
    sourceUrl: "https://www.england.nhs.uk/long-read/reforming-elective-care-for-patients/",
    priority: 96
  },
  {
    id: "gp-dna",
    title: "Missed GP appointments",
    domain: "Primary care",
    signal: "16m GP appointments not attended in 2025 (4.3%)",
    unit: "appointments",
    period: "2025",
    confidence: "High",
    trend: "Unknown",
    recoverability: "High",
    stage: "Detect",
    owner: "Primary care networks and practices",
    problem: "Millions of booked primary-care appointments are lost after capacity has already been reserved.",
    missingData: "Reasons for non-attendance, reminder status, lead time, patient access barriers and whether slots could be reallocated.",
    intervention: "Push alerts, easier cancellation, short-notice waitlists and risk-based reminder intensity.",
    verificationMetric: "DNA rate, reclaimed appointments, same-day backfill, clinician minutes recovered and patient wait reduction.",
    sourceLabel: "NHS England, Tap the NHS App",
    sourceUrl: "https://www.england.nhs.uk/2026/03/nhs-urges-tap-the-app-as-1-in-4-miss-appointments/",
    priority: 92
  },
  {
    id: "delayed-discharge",
    title: "Delayed discharge beyond readiness",
    domain: "Hospital flow",
    signal: "~30,000 patients a year staying 21 days beyond discharge-ready date; up to 500,000 bed days targeted for release",
    unit: "bed days",
    period: "2025/26 plan",
    confidence: "High",
    trend: "Mixed",
    recoverability: "High",
    stage: "Intervene",
    owner: "Acute, community and social care system",
    problem: "Beds remain occupied after acute need has ended because downstream care, transport, medicines, equipment or coordination is not ready.",
    missingData: "Primary delay reason per patient-day, responsible dependency, avoidability, handoff latency and repeated causes by locality.",
    intervention: "Daily discharge constraint coding, cross-system escalation, predictive discharge planning and earlier activation of downstream services.",
    verificationMetric: "Bed days beyond ready date, median delay by cause, same-day discharge after readiness and verified bed capacity released.",
    sourceLabel: "NHS England, Urgent and emergency care plan 2025/26",
    sourceUrl: "https://www.england.nhs.uk/long-read/urgent-and-emergency-care-plan-2025-26/",
    priority: 95
  },
  {
    id: "aseptic-rta",
    title: "Injectable medicines and aseptic pathway",
    domain: "Pharmacy / nursing / beds",
    signal: ">4,000 WTE nursing capacity and >1m bed days modelled as potentially releasable; ~£100m/year aseptic productivity opportunity",
    unit: "WTE / bed days / £",
    period: "2020 model",
    confidence: "High",
    trend: "Unknown",
    recoverability: "Medium",
    stage: "Detect",
    owner: "Pharmacy aseptic services and clinical pathways",
    problem: "Injectable medicines can consume scarce pharmacy, nursing, cleanroom and bed capacity when preparation, presentation or treatment setting is suboptimal.",
    missingData: "True cost per administered dose, prepared-but-unused doses, waiting time, local procurement variation, nurse preparation time and suitability for ready-to-administer routes.",
    intervention: "True pathway costing, route/formulation substitution, dose banding, standardisation, hub-and-spoke supply and prepared-dose waste detection.",
    verificationMetric: "Nursing minutes released, aseptic capacity released, bed days avoided, unused doses and verified cash/capacity benefit.",
    sourceLabel: "DHSC, Transforming NHS pharmacy aseptic services in England",
    sourceUrl: "https://www.gov.uk/government/publications/transforming-nhs-pharmacy-aseptic-services-in-england/transforming-nhs-pharmacy-aseptic-services-in-england",
    priority: 91
  },
  {
    id: "agency",
    title: "Agency staffing premium",
    domain: "Workforce",
    signal: "Agency spend fell from ~£2.1bn in 2024/25 to ~£1.2bn in 2025/26",
    unit: "£",
    period: "2024/25 to 2025/26",
    confidence: "High",
    trend: "Improving",
    recoverability: "Medium",
    stage: "Verify",
    owner: "Trust workforce and finance",
    problem: "Temporary staffing can be necessary, but avoidable reliance creates premium spend and workforce instability.",
    missingData: "Shift-level reason for agency use, failed bank fill, roster gap cause, specialty premium, vacancy age and avoidable versus clinically necessary agency use.",
    intervention: "Shift-level causality, bank-first rules, predictive rostering, retention actions and targeted recruitment in repeated hot spots.",
    verificationMetric: "Agency spend, premium over bank/substantive rate, unfilled shifts, repeated gap causes and sustained reduction without safety deterioration.",
    sourceLabel: "NHS England, Month 12 financial position 2025/26",
    sourceUrl: "https://www.england.nhs.uk/long-read/month-12-financial-position-2025-26-4-june-2026/",
    priority: 77
  },
  {
    id: "repeat-meds",
    title: "Repeat medicines open loop",
    domain: "Medicines",
    signal: "Historic ~£300m unused-medicines estimate still cited; 67.8m repeat prescriptions ordered through the NHS App in 12 months to Nov 2025",
    unit: "items / £",
    period: "Historic waste estimate + current ordering scale",
    confidence: "Medium",
    trend: "Unknown",
    recoverability: "High",
    stage: "Observe",
    owner: "Primary care, pharmacy and medicines optimisation",
    problem: "Repeat supply can continue despite stock remaining at home, dose changes, discontinuation, admission/discharge changes or duplicated ordering.",
    missingData: "Patient-held stock, actual consumption, recent dose changes, discontinuation timing, hospital discharge reconciliation and item-level avoidability.",
    intervention: "Closed-loop repeat ordering with stock confirmation, medication-change reconciliation and pharmacist review of flagged anomalies.",
    verificationMetric: "Avoided items, avoided spend, intervention acceptance, patient safety events and verified reduction in unused medicines.",
    sourceLabel: "NHS England medicines waste / NHS App repeat prescription reporting",
    sourceUrl: "https://www.england.nhs.uk/london/2026/03/23/only-order-what-you-need-how-londoners-with-prescriptions-can-reduce-nhs-medicine-waste/",
    priority: 94
  },
  {
    id: "theatre",
    title: "Operating theatre lost minutes",
    domain: "Surgery",
    signal: "Theatre productivity remains a national focus despite recent utilisation improvement",
    unit: "theatre minutes / cases",
    period: "2025/26",
    confidence: "Medium",
    trend: "Improving",
    recoverability: "High",
    stage: "Detect",
    owner: "Surgical divisions and theatre operations",
    problem: "Lists lose capacity through late starts, overruns, cancellations, turnaround delay, staffing constraints and missing pre-op readiness.",
    missingData: "Minute-level loss reason with ownership, preventability, patient readiness, staffing/equipment cause and whether lost time could have been converted into another case.",
    intervention: "Standard minute-level delay taxonomy, predictive list planning, readiness checks and real-time escalation for recoverable gaps.",
    verificationMetric: "Touch-time utilisation, late-start minutes, cancellation rate, cases per list and recovered theatre minutes.",
    sourceLabel: "NHS England productivity updates",
    sourceUrl: "https://www.england.nhs.uk/long-read/nhs-productivity-update-feb-25/",
    priority: 89
  },
  {
    id: "drug-overspend",
    title: "Provider drugs cost above plan",
    domain: "Medicines finance",
    signal: "2024/25 provider drugs costs £11.86bn versus £10.85bn plan, ~£1.01bn adverse variance",
    unit: "£",
    period: "2024/25",
    confidence: "High",
    trend: "Worsening",
    recoverability: "Low",
    stage: "Observe",
    owner: "Provider pharmacy, finance and commissioning",
    problem: "A large adverse variance exists, but it should not be labelled waste without separating demand, price, innovation, case-mix and avoidable variation.",
    missingData: "Price-volume-mix decomposition, new therapy impact, procurement variance, unwarranted clinical variation and avoidable versus clinically justified growth.",
    intervention: "Decompose variance before action; then target procurement variation, biosimilar uptake, pathway redesign and unwarranted prescribing variation where evidenced.",
    verificationMetric: "Variance explained, avoidable component identified, procurement savings and prescribing change with outcome safeguards.",
    sourceLabel: "NHS England, Financial performance report 2024/25 Q4",
    sourceUrl: "https://www.england.nhs.uk/long-read/financial-performance-report-2024-25-quarter-4/",
    priority: 74
  }
];

export const registerSummary = {
  records: lossRegister.length,
  highRecoverability: lossRegister.filter((r) => r.recoverability === "High").length,
  highConfidence: lossRegister.filter((r) => r.confidence === "High").length,
  topPriority: [...lossRegister].sort((a, b) => b.priority - a.priority).slice(0, 4),
};
