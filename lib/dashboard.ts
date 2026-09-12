export type DashboardDomain = {
  id: string;
  title: string;
  domain: string;
  observed: string;
  opportunity: string;
  verified: string;
  observedLabel: string;
  opportunityLabel: string;
  verifiedLabel: string;
  interpretation: string;
  confidence: "High" | "Medium" | "Developing";
  sourceLabel: string;
  sourceUrl: string;
};

export const dashboardDomains: DashboardDomain[] = [
  {
    id: "outpatients",
    title: "Missed elective appointments",
    domain: "Outpatients",
    observed: "8m",
    opportunity: "~£1.2bn",
    verified: "377",
    observedLabel: "missed elective appointments in 2023/24",
    opportunityLabel: "historic NHS England annual cost estimate for outpatient DNAs",
    verifiedLabel: "DNAs avoided in a six-month AI pilot",
    interpretation: "This is one of the clearest examples where an observed loss, a quantified financial exposure and a tested intervention already exist.",
    confidence: "High",
    sourceLabel: "NHS England, elective care reform and AI DNA pilots",
    sourceUrl: "https://www.england.nhs.uk/long-read/reforming-elective-care-for-patients/"
  },
  {
    id: "primary-care",
    title: "Missed GP appointments",
    domain: "Primary care",
    observed: "16m",
    opportunity: "Unknown",
    verified: "Not yet national",
    observedLabel: "GP appointments not attended in 2025",
    opportunityLabel: "recoverable component still needs local causality and backfill data",
    verifiedLabel: "national verified recovery not yet established",
    interpretation: "The scale is measured, but a credible recoverable-value estimate requires practice-level causes, notice periods and whether appointments could actually have been backfilled.",
    confidence: "High",
    sourceLabel: "NHS England, Tap the NHS App",
    sourceUrl: "https://www.england.nhs.uk/2026/03/nhs-urges-tap-the-app-as-1-in-4-miss-appointments/"
  },
  {
    id: "discharge",
    title: "Delayed discharge",
    domain: "Hospital flow",
    observed: "~30,000",
    opportunity: "500,000",
    verified: "To verify locally",
    observedLabel: "patients a year staying at least 21 days beyond discharge-ready date",
    opportunityLabel: "bed days NHS England says could potentially be released annually",
    verifiedLabel: "must be measured as actual bed days released after intervention",
    interpretation: "The national opportunity is significant, but the dashboard keeps modelled releasable bed days separate from verified capacity actually recovered.",
    confidence: "High",
    sourceLabel: "NHS England, Urgent and emergency care plan 2025/26",
    sourceUrl: "https://www.england.nhs.uk/long-read/urgent-and-emergency-care-plan-2025-26/"
  },
  {
    id: "aseptic",
    title: "Aseptic and injectable medicines",
    domain: "Pharmacy / nursing / beds",
    observed: "£3.8bn",
    opportunity: ">4,000 WTE / >1m bed days",
    verified: "To verify by pathway",
    observedLabel: "injectable medicines pathway scale identified in national review",
    opportunityLabel: "modelled nursing-capacity and bed-day opportunity",
    verifiedLabel: "actual released nursing time, aseptic capacity and bed days must be measured locally",
    interpretation: "This domain shows why the dashboard cannot collapse everything into pounds: the valuable resource may be nursing time, cleanroom capacity or beds rather than cash alone.",
    confidence: "High",
    sourceLabel: "DHSC, Transforming NHS pharmacy aseptic services in England",
    sourceUrl: "https://www.gov.uk/government/publications/transforming-nhs-pharmacy-aseptic-services-in-england/transforming-nhs-pharmacy-aseptic-services-in-england"
  },
  {
    id: "agency",
    title: "Agency staffing",
    domain: "Workforce",
    observed: "£1.2bn",
    opportunity: "Improving",
    verified: "~£0.9bn lower YoY",
    observedLabel: "agency spend in 2025/26",
    opportunityLabel: "further recoverability depends on safe substitution and vacancy causes",
    verifiedLabel: "observed reduction versus about £2.1bn in 2024/25, not attributed here to one intervention",
    interpretation: "The register distinguishes observed improvement from causal proof. A lower national spend is real, but it should not be claimed as Sitora-style verified recovery without intervention-level attribution.",
    confidence: "High",
    sourceLabel: "NHS England, Month 12 financial position 2025/26",
    sourceUrl: "https://www.england.nhs.uk/long-read/month-12-financial-position-2025-26-4-june-2026/"
  },
  {
    id: "repeat-medicines",
    title: "Repeat medicines",
    domain: "Medicines",
    observed: "67.8m",
    opportunity: "~£300m historic benchmark",
    verified: "Unknown nationally",
    observedLabel: "repeat prescriptions ordered through the NHS App in 12 months to Nov 2025",
    opportunityLabel: "historic unused-medicines estimate still cited by the NHS",
    verifiedLabel: "current national verified avoidable waste figure is missing",
    interpretation: "The gap is the story: ordering volume is current and measurable, but the national waste figure remains historic because stock-at-home, consumption and item-level avoidability are not continuously measured.",
    confidence: "Medium",
    sourceLabel: "NHS England medicines waste and NHS App reporting",
    sourceUrl: "https://www.england.nhs.uk/london/2026/03/23/only-order-what-you-need-how-londoners-with-prescriptions-can-reduce-nhs-medicine-waste/"
  }
];

export const dashboardPrinciples = [
  ["Observed exposure", "A measured activity, cost or capacity signal. It is not automatically waste."],
  ["Plausibly recoverable", "The component supported by modelling, operational evidence or a tested intervention."],
  ["Verified recovery", "Resource actually recovered after an intervention, with a defined counterfactual and safety checks."]
];
