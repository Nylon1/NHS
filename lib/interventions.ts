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

export type DischargeIntervention = {
  bottleneck: string;
  signal: string;
  primaryOwners: string[];
  intervention: string;
  firstActions: string[];
  leadingIndicators: string[];
  outcomeMeasures: string[];
  verification: string;
  expectedHorizon: string;
  evidence: "Established" | "Promising" | "Needs local validation";
  guardrails: string[];
};

export const dischargeInterventions: DischargeIntervention[] = [
  {
    bottleneck: "Community rehabilitation and reablement",
    signal: "Largest national LOS 7+ reason group in the August 2026 acute discharge dataset.",
    primaryOwners: ["ICB", "Community provider", "Local authority", "Acute trust"],
    intervention: "Create a single visible pathway 1 and pathway 2 demand-and-capacity view, use Home First and discharge-to-assess as the default where clinically appropriate, and match referrals to available rehabilitation or reablement capacity before delays accumulate.",
    firstActions: [
      "Separate waits caused by referral process from waits caused by genuine capacity shortage",
      "Track demand, accepted referrals, rejected referrals, start dates and unfilled capacity daily",
      "Review patients waiting more than 48 hours after discharge readiness with a named case owner",
      "Identify recurring day-of-week and locality capacity gaps"
    ],
    leadingIndicators: ["Referral-to-acceptance time", "Acceptance-to-service-start time", "Unfilled community capacity", "Patients waiting >48h by pathway"],
    outcomeMeasures: ["Median days from DRD to discharge", "Delayed bed days on pathways 1 and 2", "Same-day DRD discharge rate", "Readmission within agreed safety window"],
    verification: "Use a pre/post or stepped local comparison with DRD as the denominator. Separate pathway 1 and 2 effects and adjust interpretation for changes in discharge volume and case mix.",
    expectedHorizon: "Operational signals in 2 to 6 weeks; stronger outcome evidence over 8 to 12 weeks.",
    evidence: "Established",
    guardrails: ["No unsafe discharge to achieve a flow target", "Clinical eligibility remains decisive", "Monitor readmissions and post-discharge escalation", "Do not count commissioned capacity as available unless it is actually usable"]
  },
  {
    bottleneck: "Hospital discharge process",
    signal: "Hospital-process reasons represent a material share of the LOS 7+ reason series and dominate some providers.",
    primaryOwners: ["Acute trust", "Clinical divisions", "Pharmacy", "Therapy", "Patient transport"],
    intervention: "Run criteria-led discharge with early expected discharge dates, twice-daily review of patients who no longer meet criteria to reside, and a same-day exception queue for outstanding medical review, therapy, medicines, documentation and transport.",
    firstActions: [
      "Time-stamp each internal discharge dependency",
      "Create an exception list for patients discharge-ready but waiting on one hospital-controlled task",
      "Set same-day escalation rules for medicines, letters, therapy, medical review and transport",
      "Measure weekend and late-day completion separately"
    ],
    leadingIndicators: ["Time from DRD decision to discharge order", "TTO turnaround time", "Discharge-letter completion time", "Transport request-to-pickup time", "Internal tasks open after midday"],
    outcomeMeasures: ["Same-day DRD discharge rate", "Hospital-process delayed bed days", "Discharges before midday", "Average delay days after DRD"],
    verification: "Use timestamped task data to show that the targeted internal dependency shortened before attributing any change in bed days to the intervention.",
    expectedHorizon: "Process change can be visible within days; bed-day impact should be assessed over 4 to 8 weeks.",
    evidence: "Established",
    guardrails: ["Do not bypass clinical review", "Medication accuracy and reconciliation remain mandatory", "Transport suitability and safeguarding take precedence over speed", "Avoid shifting work unsafely to community teams"]
  },
  {
    bottleneck: "Residential or nursing placement",
    signal: "Residential and nursing placement is one of the largest national coded reason groups and dominates several high-delay providers.",
    primaryOwners: ["Local authority", "ICB", "Care transfer hub", "Care providers", "Acute trust"],
    intervention: "Create a live placement marketplace at system level showing required care level, funding status, referral state, provider response and realistic availability, with daily escalation of long waits and out-of-area options where appropriate.",
    firstActions: [
      "Split delays into assessment, funding, provider search, provider acceptance and move-date stages",
      "Record every provider approach and response time",
      "Escalate patients with no viable placement option after an agreed threshold",
      "Identify recurrent unmet categories such as dementia, bariatric, behavioural or complex nursing needs"
    ],
    leadingIndicators: ["Referral-to-first-provider-contact", "Providers contacted per case", "Acceptance rate", "Funding-decision time", "Cases with zero suitable offers"],
    outcomeMeasures: ["Placement-related delayed bed days", "Median DRD-to-placement time", "Long waits >7 and >21 days", "Out-of-area placement rate"],
    verification: "Compare delay stages before and after the intervention. Attribute improvement only where the specific placement stage shortened, not from overall discharge movement alone.",
    expectedHorizon: "Visibility improvements immediately; capacity-market effects usually require 6 to 16 weeks.",
    evidence: "Promising",
    guardrails: ["Patient choice and best-interest decisions remain protected", "Quality and safeguarding standards cannot be traded for speed", "Do not label lack of suitable specialist provision as a process failure"]
  },
  {
    bottleneck: "Care transfer hub process",
    signal: "Care-transfer-hub process is a major national reason group and the dominant signal for several providers.",
    primaryOwners: ["ICB", "Care transfer hub", "Acute trust", "Local authority", "Community provider"],
    intervention: "Operate one cross-system discharge queue with named case ownership, complete referral information, agreed triage rules and visible ageing so no patient waits because responsibility is unclear.",
    firstActions: [
      "Assign one named case owner for every pathway 1 to 3 patient",
      "Track referral received, triaged, accepted, funded and service-start timestamps",
      "Measure referrals returned for missing information",
      "Run daily ageing review for the longest unresolved cases"
    ],
    leadingIndicators: ["Referral-to-triage time", "Incomplete referral rate", "Cases without named owner", "Time between pathway decision and onward referral"],
    outcomeMeasures: ["Care-transfer-hub delayed bed days", "Median pathway decision-to-discharge time", "Cases >7 days", "Rework per referral"],
    verification: "Require timestamp evidence from the shared queue. Improvement should be visible first in referral handling and case ageing, then in DRD delay.",
    expectedHorizon: "2 to 4 weeks for process signals; 6 to 10 weeks for robust flow impact.",
    evidence: "Established",
    guardrails: ["Single ownership must not remove multidisciplinary input", "Data-sharing must follow information-governance rules", "Local pathway definitions must be consistent across organisations"]
  },
  {
    bottleneck: "Home care and package of care",
    signal: "Home-care/package-of-care delays account for a substantial share of the national reason mix and can trap pathway 1 patients in hospital.",
    primaryOwners: ["Local authority", "ICB", "Home-care providers", "Care transfer hub"],
    intervention: "Match required visit patterns and geography to real provider capacity, distinguish commissioning delay from workforce shortage, and use short-term bridging or reablement capacity where locally approved and clinically suitable.",
    firstActions: [
      "Record requested hours, visit pattern, location and complexity for every delayed package",
      "Track offers, refusals and reasons for refusal",
      "Map recurring geographical and time-of-day gaps",
      "Test whether temporary reablement capacity can safely bridge identified waits"
    ],
    leadingIndicators: ["Package request-to-offer time", "Offer acceptance rate", "Unfilled care hours", "Provider refusal reasons", "Geographic capacity gaps"],
    outcomeMeasures: ["Home-care-related delayed bed days", "Median wait for package start", "Pathway 1 DRD delay", "Sustained package at 7 and 30 days"],
    verification: "Link each released bed day to a completed package start or approved bridge arrangement and continue follow-up to ensure the discharge remained sustainable.",
    expectedHorizon: "4 to 12 weeks depending on whether the constraint is process or true workforce capacity.",
    evidence: "Promising",
    guardrails: ["Do not commission unsafe visit patterns", "Patient and carer needs must be represented", "Track failed packages and emergency escalation"]
  },
  {
    bottleneck: "Funding and approval",
    signal: "Funding/approval is smaller nationally than the largest capacity groups but creates avoidable administrative delay in individual systems.",
    primaryOwners: ["ICB", "Local authority", "Care transfer hub", "CHC teams"],
    intervention: "Make funding status visible early, use agreed decision thresholds and escalation routes, and remove repeated information requests where the required evidence already exists.",
    firstActions: [
      "Start eligibility screening before the patient reaches discharge readiness where possible",
      "Time-stamp every funding request, query, decision and appeal",
      "Identify cases repeatedly returned for the same missing information",
      "Create senior escalation for decisions exceeding locally agreed limits"
    ],
    leadingIndicators: ["Request-to-decision time", "Requests returned for more information", "Cases waiting solely for funding", "Fast-track decision time"],
    outcomeMeasures: ["Funding-related delayed bed days", "Median funding delay", "Long waits caused by approval", "Decision rework rate"],
    verification: "Demonstrate shorter decision-cycle time and then assess whether that translated into earlier service start or discharge.",
    expectedHorizon: "2 to 8 weeks where process is the main constraint.",
    evidence: "Promising",
    guardrails: ["Eligibility rules remain unchanged", "No pressure to approve unsuitable care", "Urgent and end-of-life pathways require appropriate priority"]
  },
  {
    bottleneck: "Equipment and housing",
    signal: "A smaller national share can still create long individual waits, especially where adaptations or specialist equipment are prerequisites for safe discharge.",
    primaryOwners: ["Local authority", "Community equipment service", "Housing", "Occupational therapy", "ICB"],
    intervention: "Track equipment and adaptation dependencies from identification to delivery, use standard equipment bundles where appropriate, and escalate housing cases separately from equipment cases because their lead times differ materially.",
    firstActions: [
      "Record exact equipment or adaptation blocking discharge",
      "Separate stock, delivery, installation, training and housing approval delays",
      "Maintain visibility of commonly unavailable items",
      "Start housing escalation before DRD where a need is predictable"
    ],
    leadingIndicators: ["Order-to-delivery time", "Equipment unavailable rate", "Installation wait", "Housing case age"],
    outcomeMeasures: ["Equipment/housing delayed bed days", "Median time from need identification to readiness", "Repeat equipment visits", "Discharge failures linked to equipment"],
    verification: "Only attribute recovered time where the relevant equipment or housing dependency completed earlier than baseline.",
    expectedHorizon: "Equipment pathways may improve in 2 to 6 weeks; structural housing constraints require longer-term tracking.",
    evidence: "Promising",
    guardrails: ["Equipment must be clinically suitable and safely installed", "Training cannot be omitted", "Housing constraints should not be misrepresented as hospital inefficiency"]
  },
  {
    bottleneck: "Patient, family and safeguarding concerns",
    signal: "These reasons are less common nationally but can generate complex and prolonged individual delays.",
    primaryOwners: ["Acute trust", "Local authority", "Safeguarding teams", "Care transfer hub", "Patient and carers"],
    intervention: "Start shared decision-making early, identify capacity or safeguarding questions promptly, document the unresolved issue precisely, and use senior multidisciplinary review for long-running cases.",
    firstActions: [
      "Distinguish patient choice, family concern, safeguarding and mental-capacity processes",
      "Record when the issue was first identified rather than only when discharge is blocked",
      "Set review dates and named decision owners",
      "Escalate cases with repeated unresolved meetings"
    ],
    leadingIndicators: ["Time from concern identification to first resolution meeting", "Cases without next action", "Mental-capacity decision time", "Safeguarding review age"],
    outcomeMeasures: ["Delayed bed days in this reason group", "Long waits >21 days", "Patient/carer experience", "Readmission or failed-discharge rate"],
    verification: "Use qualitative case review alongside time metrics. These cases should never be judged on speed alone.",
    expectedHorizon: "Case-management improvements can appear within weeks; population-level effects may take several months.",
    evidence: "Needs local validation",
    guardrails: ["Safeguarding and Mental Capacity Act duties take priority", "No coercive discharge", "Patient and carer voice must remain visible"]
  },
  {
    bottleneck: "Patient transport",
    signal: "Transport is a smaller national cause but can be highly actionable because request, booking and pickup timestamps are measurable.",
    primaryOwners: ["Acute trust", "Patient transport provider", "ICB"],
    intervention: "Predict transport needs earlier, book against an expected discharge window, separate eligibility from availability failures, and monitor late cancellations and missed pickups.",
    firstActions: [
      "Capture request time, booked time, arrival time and cancellation reason",
      "Identify repeated late booking by ward or specialty",
      "Forecast next-day demand before the morning peak",
      "Review patients medically ready but remaining overnight solely for transport"
    ],
    leadingIndicators: ["Request-to-booking time", "Booking-to-pickup time", "Cancellation rate", "Same-day unfulfilled transport requests"],
    outcomeMeasures: ["Transport-related delayed bed days", "Overnight stays solely due to transport", "On-time pickup rate", "Cost per completed journey"],
    verification: "Use timestamped transport data and count only delays where transport was the final unresolved dependency.",
    expectedHorizon: "1 to 4 weeks for operational impact where capacity is adequate.",
    evidence: "Established",
    guardrails: ["Eligibility and mobility requirements remain unchanged", "Do not discharge without a safe receiving arrangement", "Monitor failed journeys and patient experience"]
  }
];

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
