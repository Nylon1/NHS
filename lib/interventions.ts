export type Intervention = {
  slug: string;
  title: string;
  domain: string;
  problem: string;
  intervention: string;
  measures: string[];
  constraints: string[];
  evidence: "Established" | "Promising" | "Needs pilot";
};

export const interventions: Intervention[] = [
  {
    slug: "closed-loop-repeat-medicines",
    title: "Closed-loop repeat medicines",
    domain: "Medicines",
    problem: "Repeat supply can continue despite excess stock, discontinuation, dose changes or weak reconciliation.",
    intervention: "Join prescribing, dispensing, expected consumption, medication changes and patient or pharmacy confirmation before the next supply decision.",
    measures: ["Items not dispensed after validation", "Value of avoided supply", "Medication discrepancies resolved", "Patient safety interventions"],
    constraints: ["No autonomous stopping of clinically required medicines", "Medication records must be timely", "Pharmacist or clinician review for flagged changes"],
    evidence: "Needs pilot"
  },
  {
    slug: "ready-to-administer",
    title: "Ready-to-administer conversion",
    domain: "Aseptic services",
    problem: "Nursing and pharmacy time is consumed preparing injectable medicines that may have a suitable ready-to-administer presentation.",
    intervention: "Identify clinically suitable products where licensed or approved ready-to-administer supply can replace local preparation.",
    measures: ["Preparations avoided", "Nursing hours released", "Aseptic slots released", "Net pathway cost"],
    constraints: ["Clinical suitability", "Acquisition price", "Stability and storage", "Supply resilience"],
    evidence: "Established"
  },
  {
    slug: "iv-to-sc",
    title: "IV to subcutaneous route optimisation",
    domain: "Oncology",
    problem: "Patients may remain on resource-intensive IV pathways after a clinically suitable subcutaneous option becomes available.",
    intervention: "Continuously compare route, eligibility, pharmacy preparation burden, chair time and total pathway cost.",
    measures: ["IV administrations avoided", "Chair hours released", "Aseptic preparations avoided", "Patient time saved"],
    constraints: ["Clinical eligibility", "Combination treatments", "Commercial agreements", "Patient preference"],
    evidence: "Established"
  },
  {
    slug: "dose-banding",
    title: "Dose banding and advance preparation",
    domain: "Oncology",
    problem: "Patient-specific preparation can prevent batching, create delay and increase the risk of unused preparations.",
    intervention: "Use nationally supported standardised dose bands where clinically appropriate and measure the effect on production, waiting and waste.",
    measures: ["Batch utilisation", "Prepared-but-unused doses", "Production time", "Patient waiting time"],
    constraints: ["National protocol", "Clinical tolerance", "Stability", "Inventory management"],
    evidence: "Established"
  },
  {
    slug: "image-first-triage",
    title: "Image-first specialist triage",
    domain: "Dermatology",
    problem: "Specialist appointments can be consumed before high-quality visual information has been captured and reviewed.",
    intervention: "Capture standardised images in an appropriate community setting and route suitable cases for remote specialist review before outpatient booking.",
    measures: ["Face-to-face appointments avoided or reprioritised", "Time to specialist opinion", "Re-referral rate", "Diagnostic safety"],
    constraints: ["Image quality", "Consent and information governance", "Clinical escalation rules", "Specialist review capacity"],
    evidence: "Established"
  },
  {
    slug: "school-dental-detection",
    title: "School and community dental detection",
    domain: "Dental prevention",
    problem: "Preventable decay may only enter the system after progression to more expensive treatment.",
    intervention: "Test scheduled structured checks, supported imaging where appropriate, and defined escalation to qualified dental review.",
    measures: ["High-risk children identified", "Completed dental referrals", "Treatment at earlier stage", "Hospital extraction rate over time"],
    constraints: ["Not a substitute for dental diagnosis", "Parental consent", "Workforce pathway", "Referral capacity"],
    evidence: "Needs pilot"
  }
];

export const researchTracker = [
  {
    domain: "Repeat medicines",
    evidenceStrength: "High that waste exists",
    measurementQuality: "Low nationally",
    interventionReadiness: "High",
    openQuestion: "What is the current avoidable value when prescribing, dispensing and stock are measured together?"
  },
  {
    domain: "Aseptic and injectable medicines",
    evidenceStrength: "High",
    measurementQuality: "Medium",
    interventionReadiness: "High",
    openQuestion: "Which products and sites offer the largest cash and capacity opportunity today?"
  },
  {
    domain: "Oncology route optimisation",
    evidenceStrength: "High for selected medicines",
    measurementQuality: "Medium to high",
    interventionReadiness: "High",
    openQuestion: "How quickly are new lower-resource routes adopted across providers?"
  },
  {
    domain: "Dental prevention",
    evidenceStrength: "High for downstream burden",
    measurementQuality: "High for hospital activity, lower for preventability",
    interventionReadiness: "Needs pilot",
    openQuestion: "Can a scalable school or community pathway reduce downstream extraction activity without adding a new bottleneck?"
  },
  {
    domain: "Dermatology imaging",
    evidenceStrength: "High",
    measurementQuality: "Medium",
    interventionReadiness: "High",
    openQuestion: "Where does image-first triage still have avoidable implementation variation?"
  }
];
