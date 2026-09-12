export type EvidenceStatus = "Measured" | "Modelled" | "Sitora estimate" | "Unknown";
export type EvidenceStrength = "High" | "Medium" | "Developing";

export type EvidenceRecord = {
  id: string;
  title: string;
  value: string;
  status: EvidenceStatus;
  strength: EvidenceStrength;
  year: string;
  geography: string;
  summary: string;
  interpretation: string;
  caveat: string;
  sourceLabel: string;
  sourceUrl: string;
  category: string;
};

export const evidence: EvidenceRecord[] = [
  {
    id: "medicines-waste-300m",
    title: "Unused medicines in England",
    value: "~£300m",
    status: "Modelled",
    strength: "Medium",
    year: "2009 data / still cited in 2026",
    geography: "England",
    summary: "The NHS continues to cite an historic estimate of around £300 million per year for unused medicines.",
    interpretation: "The persistence of an old national figure is itself evidence that medicines waste is not measured continuously at national level.",
    caveat: "This is not a current measured 2026 loss. The original estimate is historic and only part was considered potentially avoidable.",
    sourceLabel: "NHS England London, Only order what you need",
    sourceUrl: "https://www.england.nhs.uk/london/2026/03/23/only-order-what-you-need-how-londoners-with-prescriptions-can-reduce-nhs-medicine-waste/",
    category: "Repeat medicines"
  },
  {
    id: "aseptic-productivity-100m",
    title: "Aseptic services productivity opportunity",
    value: "~£100m / year",
    status: "Modelled",
    strength: "High",
    year: "2020 review",
    geography: "England",
    summary: "The national aseptic services review identified a large productivity opportunity from standardisation, scale and better operating models.",
    interpretation: "Aseptic services are a credible high-value test bed for resource intelligence because medicine, workforce and infrastructure costs intersect in one pathway.",
    caveat: "Historic national modelling, not a statement of current realised savings.",
    sourceLabel: "DHSC, Transforming NHS pharmacy aseptic services in England",
    sourceUrl: "https://www.gov.uk/government/publications/transforming-nhs-pharmacy-aseptic-services-in-england/transforming-nhs-pharmacy-aseptic-services-in-england",
    category: "Aseptic services"
  },
  {
    id: "nursing-capacity-aseptic",
    title: "Nursing time linked to injectable preparation",
    value: ">4,000 WTE equivalent",
    status: "Modelled",
    strength: "High",
    year: "2020 review",
    geography: "England",
    summary: "National modelling estimated that wider use of ready-to-administer injectable medicines could release nursing capacity equivalent to more than 4,000 WTE staff.",
    interpretation: "Resource waste cannot be understood only in pounds. Clinical time released may be more valuable than a nominal cash saving.",
    caveat: "Capacity release is not the same as cash-releasing savings and the estimate is historical modelling.",
    sourceLabel: "DHSC, Transforming NHS pharmacy aseptic services in England",
    sourceUrl: "https://www.gov.uk/government/publications/transforming-nhs-pharmacy-aseptic-services-in-england/transforming-nhs-pharmacy-aseptic-services-in-england",
    category: "Workforce"
  },
  {
    id: "bed-days-aseptic",
    title: "Potentially releasable bed days",
    value: ">1m bed days",
    status: "Modelled",
    strength: "High",
    year: "2020 review",
    geography: "England",
    summary: "The aseptic review modelled more than one million bed days potentially releasable through wider pathway transformation and ready-to-administer products.",
    interpretation: "Changing medicine presentation or treatment setting can affect hospital capacity as well as pharmacy workload.",
    caveat: "Historic modelling and not automatically cash-releasing.",
    sourceLabel: "DHSC, Transforming NHS pharmacy aseptic services in England",
    sourceUrl: "https://www.gov.uk/government/publications/transforming-nhs-pharmacy-aseptic-services-in-england/transforming-nhs-pharmacy-aseptic-services-in-england",
    category: "Hospital capacity"
  },
  {
    id: "dental-decay-extractions",
    title: "Hospital tooth extraction episodes primarily for decay",
    value: "33,976 episodes",
    status: "Measured",
    strength: "High",
    year: "2024/25",
    geography: "England, ages 0 to 19",
    summary: "Official reporting identified tens of thousands of hospital tooth extraction episodes where decay was the primary diagnosis.",
    interpretation: "Preventable disease can consume expensive downstream hospital capacity when upstream detection and prevention fail.",
    caveat: "The figure does not prove that every extraction episode was preventable by one intervention.",
    sourceLabel: "UK Government / OHID reporting",
    sourceUrl: "https://www.gov.uk/government/publications/31st-march-2026-committee-on-toxicity-meeting/potential-health-risks-from-fluoride-at-uk-exposure-levels",
    category: "Dental prevention"
  },
  {
    id: "dental-decay-cost",
    title: "Estimated hospital cost of decay-related extractions",
    value: "£51.2m",
    status: "Modelled",
    strength: "High",
    year: "2024/25",
    geography: "England, ages 0 to 19",
    summary: "Official reporting estimated the hospital cost associated with decay-related extraction admissions at £51.2 million.",
    interpretation: "The cost provides a strong reason to test whether lower-cost upstream prevention and imaging pathways can reduce downstream demand.",
    caveat: "This should not be described as fully recoverable or directly preventable spend.",
    sourceLabel: "UK Government / OHID reporting",
    sourceUrl: "https://www.gov.uk/government/publications/31st-march-2026-committee-on-toxicity-meeting/potential-health-risks-from-fluoride-at-uk-exposure-levels",
    category: "Dental prevention"
  },
  {
    id: "pembro-sc",
    title: "Pembrolizumab pathway change",
    value: "~14,000 new patients / year",
    status: "Measured",
    strength: "High",
    year: "2026",
    geography: "England",
    summary: "NHS England announced rollout of a subcutaneous pembrolizumab formulation that can reduce administration time and remove sterile IV bag preparation for suitable patients.",
    interpretation: "A pathway can become inefficient when a new route or formulation appears. Resource intelligence should continuously re-evaluate the optimal pathway.",
    caveat: "Not every patient will be eligible and direct financial impact depends on confidential NHS pricing and local operations.",
    sourceLabel: "NHS England, 1-minute immunotherapy jab rollout",
    sourceUrl: "https://www.england.nhs.uk/2026/05/1-minute-immunotherapy-jab-rolled-out-on-nhs-for-tens-of-thousands-with-cancer/",
    category: "Oncology"
  },
  {
    id: "aseptic-review-2026",
    title: "Aseptic capacity remains a live national issue",
    value: "National review published Aug 2026",
    status: "Measured",
    strength: "High",
    year: "2026",
    geography: "England",
    summary: "A new national review examined aseptic capacity, resilience, outsourcing, hubs and future demand.",
    interpretation: "The problem is not merely historical. Capacity and operating-model questions remain active at national level.",
    caveat: "The review should be read in full before assigning savings to any individual recommendation.",
    sourceLabel: "NHS Transformation Unit, strategic development of aseptic services",
    sourceUrl: "https://transformationunit.nhs.uk/supporting-the-strategic-development-of-aseptic-services-in-england/",
    category: "Aseptic services"
  }
];

export const investigations = [
  {
    slug: "repeat-medicines",
    title: "Repeat medicines",
    eyebrow: "Open-loop prescribing",
    summary: "Where repeat supply continues despite excess stock, dose changes, discontinuation or weak reconciliation.",
    question: "Was this medicine still needed when it was dispensed?",
    observations: [
      "Historic national waste estimates are still being cited because continuous national measurement is weak.",
      "Repeat prescribing, dispensing and actual consumption are not always joined into one closed loop.",
      "Dose changes, hospital discharge changes and excess stock can create avoidable supply if records are not reconciled quickly."
    ],
    solutions: [
      "Estimate remaining stock before the next repeat supply.",
      "Flag discontinuations, dose changes and duplicate supply before dispensing.",
      "Use pharmacist or clinician review for any intervention rather than autonomous stopping.",
      "Measure avoided supply in pounds and items, then verify whether the intervention was appropriate."
    ]
  },
  {
    slug: "aseptic-medicines",
    title: "Aseptic and injectable medicines",
    eyebrow: "Scarce specialist capacity",
    summary: "Where medicine cost, pharmacist time, nursing time, cleanroom capacity and treatment capacity intersect.",
    question: "Does this dose need making here, now, in this form?",
    observations: [
      "National reviews identify meaningful productivity opportunities in aseptic services.",
      "The true cost of a dose can include facilities, QA, cleaning, equipment and scarce capacity as well as medicine and labour.",
      "Ready-to-administer products, dose banding and route changes can alter the optimal pathway."
    ],
    solutions: [
      "Calculate true pathway cost per successfully administered dose.",
      "Compare local manufacture, hub supply, commercial supply and licensed ready-to-administer options.",
      "Detect prepared-but-unused doses, poor timing and avoidable IV activity.",
      "Track released aseptic and nursing capacity separately from cash savings."
    ]
  },
  {
    slug: "dental-prevention",
    title: "Dental prevention",
    eyebrow: "Downstream cost of late detection",
    summary: "Hospital treatment for preventable dental disease shows the cost of intervention occurring too late.",
    question: "Could lower-cost upstream checks prevent expensive downstream treatment?",
    observations: [
      "Decay-related hospital extraction episodes remain substantial in children and young people.",
      "The hospital cost burden is visible, while the value of scalable upstream screening remains less directly measured.",
      "A workable pathway must fit schools, parents, children and dental teams rather than creating another bottleneck."
    ],
    solutions: [
      "Scheduled school or community checks with structured imaging where clinically appropriate.",
      "Trained image capture with escalation to qualified dental review.",
      "Track referral completion and progression, not just screening volume.",
      "Test whether earlier intervention actually reduces hospital extraction demand."
    ]
  },
  {
    slug: "dermatology-imaging",
    title: "Dermatology and imaging",
    eyebrow: "Move information before people",
    summary: "Image-first triage can help protect specialist capacity when high-quality capture and governance are in place.",
    question: "Does every referral require a physical specialist appointment first?",
    observations: [
      "Teledermatology is already recognised in NHS pathways for triage, diagnosis, monitoring and assessment.",
      "The resource opportunity depends on image quality, workflow design and timely specialist review.",
      "The goal is not to remove face-to-face care but to direct it to patients who actually need it."
    ],
    solutions: [
      "Standardise image acquisition and minimum quality requirements.",
      "Capture in GP, pharmacy or community settings where appropriate.",
      "Route suitable cases for remote specialist review before outpatient booking.",
      "Measure consultant time, avoided visits, re-referrals and diagnostic safety."
    ]
  }
];

export const wasteTaxonomy = [
  ["W1", "Medicine waste"],
  ["W2", "Workforce waste"],
  ["W3", "Infrastructure and capacity waste"],
  ["W4", "Administrative duplication"],
  ["W5", "Avoidable downstream treatment"],
  ["W6", "Pathway and setting inefficiency"],
  ["W7", "Procurement and product variation"],
  ["W8", "Patient-time waste"],
  ["W9", "Information failure"],
  ["W10", "Preventable clinical escalation"]
];
