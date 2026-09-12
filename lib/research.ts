export type ResearchRecord = {
  id: string;
  title: string;
  value: string;
  status: "Measured" | "Modelled" | "Target" | "Historic benchmark";
  strength: "High" | "Medium";
  year: string;
  geography: string;
  summary: string;
  interpretation: string;
  caveat: string;
  sourceLabel: string;
  sourceUrl: string;
  category: string;
};

export const researchEvidence: ResearchRecord[] = [
  {
    id: "carter-2016-total",
    title: "Unwarranted variation across acute hospitals",
    value: "£5bn / year opportunity",
    status: "Historic benchmark",
    strength: "High",
    year: "2016",
    geography: "England, non-specialist acute trusts",
    summary: "Lord Carter's final review estimated that reducing unwarranted variation in productivity and resource use could release around £5 billion a year by 2020/21.",
    interpretation: "The NHS has known for a decade that large resource opportunities sit across workforce, medicines, procurement, diagnostics, estates and administration.",
    caveat: "This was an efficiency opportunity, not £5 billion of cash proven to be wasted or recoverable today.",
    sourceLabel: "DHSC, Operational productivity and performance in English NHS acute hospitals",
    sourceUrl: "https://www.gov.uk/government/publications/productivity-in-nhs-hospitals",
    category: "System productivity"
  },
  {
    id: "carter-2016-medicines",
    title: "Hospital pharmacy and medicines optimisation opportunity",
    value: "£0.8bn",
    status: "Historic benchmark",
    strength: "High",
    year: "2016",
    geography: "England, non-specialist acute trusts",
    summary: "The Carter review's minimum estimated savings opportunity included £0.8 billion from hospital pharmacy and medicines optimisation.",
    interpretation: "Medicines waste is not just unused tablets. Product choice, stockholding, prescribing, preparation, administration and pathway design all affect resource use.",
    caveat: "Historic modelling across acute trusts; it should not be treated as a current annual loss figure.",
    sourceLabel: "Lord Carter review, Figure 1.3",
    sourceUrl: "https://assets.publishing.service.gov.uk/media/5a80bdfae5274a2e87dbb8f5/Operational_productivity_A.pdf",
    category: "Medicines"
  },
  {
    id: "carter-2016-workforce",
    title: "Clinical workforce productivity opportunity",
    value: "£2.0bn",
    status: "Historic benchmark",
    strength: "High",
    year: "2016",
    geography: "England, non-specialist acute trusts",
    summary: "Carter estimated a £2 billion opportunity from optimising use of the clinical workforce.",
    interpretation: "Resource intelligence needs to count clinical minutes and hours, not only cash expenditure.",
    caveat: "Capacity release is not automatically a cash saving and the figure is historic.",
    sourceLabel: "Lord Carter review, Figure 1.3",
    sourceUrl: "https://assets.publishing.service.gov.uk/media/5a80bdfae5274a2e87dbb8f5/Operational_productivity_A.pdf",
    category: "Workforce"
  },
  {
    id: "aseptic-2020-spend",
    title: "Aseptically produced injectable medicines",
    value: "£3.8bn annual cost",
    status: "Historic benchmark",
    strength: "High",
    year: "2020 review",
    geography: "England",
    summary: "The national aseptic services review reported an annual cost of £3.8 billion for aseptically produced injectable medicines.",
    interpretation: "Aseptic services sit at the intersection of high medicine spend, specialist workforce, cleanroom infrastructure and treatment capacity.",
    caveat: "This is pathway spend reported by the 2020 review, not waste.",
    sourceLabel: "DHSC, Transforming NHS pharmacy aseptic services in England",
    sourceUrl: "https://www.gov.uk/government/publications/transforming-nhs-pharmacy-aseptic-services-in-england/transforming-nhs-pharmacy-aseptic-services-in-england",
    category: "Aseptic services"
  },
  {
    id: "aseptic-2020-nursing",
    title: "Nursing capacity potentially released by ready-to-administer injectables",
    value: ">4,000 WTE",
    status: "Modelled",
    strength: "High",
    year: "2020 review",
    geography: "England",
    summary: "National modelling proposed that wider use of ready-to-administer injectable medicines could release more than 4,000 whole-time-equivalent nursing staff capacity.",
    interpretation: "Preparation design can move thousands of staff-equivalent hours back toward direct patient care.",
    caveat: "Modelled capacity release is not the same as reducing 4,000 posts or generating equivalent cash savings.",
    sourceLabel: "DHSC, Transforming NHS pharmacy aseptic services in England",
    sourceUrl: "https://www.gov.uk/government/publications/transforming-nhs-pharmacy-aseptic-services-in-england/transforming-nhs-pharmacy-aseptic-services-in-england",
    category: "Aseptic services"
  },
  {
    id: "aseptic-2020-beddays",
    title: "Hospital bed-day opportunity from aseptic pathway transformation",
    value: ">1m bed days",
    status: "Modelled",
    strength: "High",
    year: "2020 review",
    geography: "England",
    summary: "The aseptic review modelled release of more than one million hospital bed days, valued in the review at £346 million a year.",
    interpretation: "Medicine formulation and delivery setting can have consequences far beyond the pharmacy budget.",
    caveat: "Historic national modelling; actual recoverability depends on implementation and local pathways.",
    sourceLabel: "DHSC, Transforming NHS pharmacy aseptic services in England",
    sourceUrl: "https://www.gov.uk/government/publications/transforming-nhs-pharmacy-aseptic-services-in-england/transforming-nhs-pharmacy-aseptic-services-in-england",
    category: "Hospital capacity"
  },
  {
    id: "medicines-waste-2026",
    title: "Unused medicines estimate still cited nationally",
    value: "~£300m / year",
    status: "Historic benchmark",
    strength: "Medium",
    year: "Historic estimate, still cited in 2025/26",
    geography: "England",
    summary: "NHS campaigns continue to cite approximately £300 million a year of unused medicines waste in England.",
    interpretation: "The striking issue is not only the size of the estimate. It is that a historic national estimate is still being used because continuous national measurement of unused medicines remains weak.",
    caveat: "Do not present £300 million as a newly measured 2026 loss. The underlying national estimate is historic.",
    sourceLabel: "NHS England, Only Order What You Need campaign",
    sourceUrl: "https://www.england.nhs.uk/south/wp-content/uploads/sites/6/2025/11/20251128-South-West-Community-Pharmacy-Bulletin.pdf",
    category: "Repeat medicines"
  },
  {
    id: "gp-dna-2025",
    title: "GP appointments not attended",
    value: "16m appointments",
    status: "Measured",
    strength: "High",
    year: "2025",
    geography: "England",
    summary: "NHS England reported 16 million GP appointments were not attended in 2025, equal to 4.3% of appointments.",
    interpretation: "A small percentage loss at national scale consumes a very large amount of appointment capacity.",
    caveat: "Missed appointments have many causes, including access barriers and health inequalities. They should not be framed simply as patient fault or all as avoidable.",
    sourceLabel: "NHS England, NHS urges tap the app as 1 in 4 miss appointments",
    sourceUrl: "https://www.england.nhs.uk/2026/03/nhs-urges-tap-the-app-as-1-in-4-miss-appointments/",
    category: "Appointments"
  },
  {
    id: "outpatient-dna-2021-22",
    title: "Outpatient appointments missed",
    value: "~7.5m appointments",
    status: "Measured",
    strength: "High",
    year: "2021/22",
    geography: "England",
    summary: "NHS England states that nearly 7.5 million outpatient appointments were missed in 2021/22.",
    interpretation: "DNA reduction is a capacity intervention: recovered slots can shorten waits without constructing a new clinic.",
    caveat: "This is a historical year and missed appointments can reflect barriers beyond patient control.",
    sourceLabel: "NHS England, Did Not Attends",
    sourceUrl: "https://www.england.nhs.uk/outpatient-transformation-programme/did-not-attends-dnas/",
    category: "Appointments"
  },
  {
    id: "repeat-app-time-2024",
    title: "GP time estimated to be saved by NHS App repeat prescription ordering",
    value: "1.85m hours",
    status: "Modelled",
    strength: "High",
    year: "2024 estimate",
    geography: "England",
    summary: "NHS England estimated that repeat prescriptions ordered through the NHS App could save GP practices the equivalent of 1.85 million hours in 2024, based on three minutes saved per electronic request.",
    interpretation: "Digital redesign can release administrative capacity at national scale even when each transaction only saves minutes.",
    caveat: "This is a modelled time-saving estimate, not measured cash released.",
    sourceLabel: "NHS England, Digital prescriptions go live in NHS App",
    sourceUrl: "https://www.england.nhs.uk/2024/01/digital-prescriptions-go-live-in-nhs-app/",
    category: "Repeat medicines"
  },
  {
    id: "discharge-2025-26",
    title: "Very long discharge delays targeted for reduction",
    value: "~30,000 patients / year",
    status: "Measured",
    strength: "High",
    year: "2025/26 plan",
    geography: "England",
    summary: "NHS England's urgent and emergency care plan identified nearly 30,000 patients a year staying at least 21 days beyond their discharge-ready date and set an ambition that could save up to half a million bed days annually.",
    interpretation: "Resource waste can be created by pathway coordination failure even when every individual clinical decision is reasonable.",
    caveat: "The half-million bed days are a planned opportunity, not a verified saving already delivered.",
    sourceLabel: "NHS England, Urgent and emergency care plan 2025/26",
    sourceUrl: "https://www.england.nhs.uk/long-read/urgent-and-emergency-care-plan-2025-26/",
    category: "Hospital capacity"
  },
  {
    id: "procurement-8bn",
    title: "Annual NHS medical equipment and consumables purchasing",
    value: "~£8bn spend",
    status: "Historic benchmark",
    strength: "High",
    year: "NAO 2024 report",
    geography: "England",
    summary: "The National Audit Office reported NHS Supply Chain's estimate that the NHS collectively spends about £8 billion a year on medical equipment and consumables.",
    interpretation: "Even modest variation in price, utilisation, stockholding or expiry across an £8 billion purchasing base can be material.",
    caveat: "£8 billion is procurement spend, not waste.",
    sourceLabel: "National Audit Office, NHS Supply Chain and efficiencies in procurement",
    sourceUrl: "https://www.nao.org.uk/reports/nhs-supply-chain-and-efficiencies-in-procurement/",
    category: "Procurement"
  },
  {
    id: "productivity-target-2026",
    title: "NHS annual productivity requirement",
    value: "2% every year",
    status: "Target",
    strength: "High",
    year: "2026/27 to 2028/29",
    geography: "England",
    summary: "The Spending Review settlement requires the NHS to deliver sustained 2% year-on-year productivity improvement over the next three years.",
    interpretation: "The system now needs repeatable measurement of where capacity and money can actually be recovered, not one-off efficiency exercises.",
    caveat: "A national target is not evidence that every organisation can safely reduce every category of input by 2%.",
    sourceLabel: "NHS England, Medium Term Planning Framework 2026/27 to 2028/29",
    sourceUrl: "https://www.england.nhs.uk/long-read/medium-term-planning-framework-delivering-change-together-2026-27-to-2028-29/",
    category: "System productivity"
  },
  {
    id: "productivity-growth-2025-26",
    title: "Acute-sector productivity growth",
    value: "+2.6%",
    status: "Measured",
    strength: "High",
    year: "H1 2025/26 vs H1 2024/25",
    geography: "England",
    summary: "NHS England reported 2.6% productivity growth in the acute sector in the first half of 2025/26 compared with the same period a year earlier.",
    interpretation: "Productivity can improve while major local waste and variation remain. The purpose of resource intelligence is to show where the remaining opportunity is.",
    caveat: "In-year productivity estimates are subject to data quality and methodology limitations and do not directly measure patient outcomes.",
    sourceLabel: "NHS England, Productivity plan update February 2026",
    sourceUrl: "https://www.england.nhs.uk/long-read/productivity-plan-update/",
    category: "System productivity"
  }
];

export const researchTimeline = [
  { year: "2016", headline: "£5bn opportunity identified", body: "Carter maps unwarranted variation across workforce, medicines, procurement, diagnostics, estates and administration." },
  { year: "2020", headline: "Aseptic transformation quantified", body: "National modelling identifies >4,000 WTE nursing capacity and >1m bed days potentially released through pathway redesign." },
  { year: "2021/22", headline: "~7.5m outpatient DNAs", body: "Millions of outpatient slots are lost, with NHS guidance stressing that causes include inequality and barriers to access." },
  { year: "2024", headline: "Digital repeat prescribing scales", body: "NHS England estimates 1.85m GP-practice hours could be saved in a year through electronic repeat prescription requests." },
  { year: "2025", headline: "16m GP appointments missed", body: "A 4.3% non-attendance rate translates into millions of lost primary-care appointments." },
  { year: "2026", headline: "2% annual productivity now required", body: "The national challenge moves from periodic reviews toward continuous productivity measurement and delivery." }
];

export const headlineEvidenceIds = [
  "carter-2016-total",
  "aseptic-2020-nursing",
  "gp-dna-2025",
  "medicines-waste-2026"
];
