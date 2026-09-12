export type BenchmarkSource = {
  id: string;
  domain: string;
  metric: string;
  level: "Trust" | "ICB" | "Trust + ICB";
  cadence: string;
  status: "Public" | "Open benchmark" | "NHS login";
  sourceLabel: string;
  sourceUrl: string;
  notes: string;
};

export type BenchmarkCase = {
  id: string;
  provider: string;
  domain: string;
  result: string;
  period: string;
  interpretation: string;
  sourceLabel: string;
  sourceUrl: string;
};

export const latestDischargeDataset = {
  month: "August 2026",
  format: "CSV",
  level: "Regional, ICB/system and provider organisation",
  status: "Published",
  sourceLabel: "NHS England, Acute Discharge Situation Report - August 2026",
  sourceUrl: "https://www.england.nhs.uk/statistics/statistical-work-areas/discharge-delays/acute-discharge-situation-report/",
  scope: "Adults in acute trusts with a type 1 A&E department; excludes paediatrics, maternity, deceased patients, mental health and specialist trusts.",
  caveat: "Management information with rapid turnaround and minimal validation. Definitions for discharge pathways and delay reasons changed from 27 May 2024.",
};

export const dischargeMetrics = [
  {
    metric: "Patients no longer meeting criteria to reside",
    use: "Measures the population clinically ready to leave acute care.",
    benchmark: "Rate against relevant inpatient / discharge denominator and peer group, not raw count alone."
  },
  {
    metric: "Patients not discharged by end of day",
    use: "Shows how much discharge-ready capacity remains blocked each day.",
    benchmark: "Compare as a proportion of patients no longer meeting criteria to reside."
  },
  {
    metric: "Delay reasons for patients with 14+ day length of stay",
    use: "Moves analysis from a total delay count toward causal attribution.",
    benchmark: "Compare reason mix within peer groups and flag repeated excess causes."
  },
  {
    metric: "Additional days after no-longer-meeting-criteria decision",
    use: "Measures accumulated bed-day exposure after clinical readiness for discharge.",
    benchmark: "Use 7+, 14+ and 21+ day cohorts and normalise for relevant activity."
  }
];

export const benchmarkSources: BenchmarkSource[] = [
  {
    id: "discharge-ready-date",
    domain: "Hospital flow",
    metric: "Bed days after discharge-ready date and threshold-based discharge performance",
    level: "Trust + ICB",
    cadence: "Monthly",
    status: "Public",
    sourceLabel: "NHS England, Discharge Ready Date",
    sourceUrl: "https://www.england.nhs.uk/statistics/statistical-work-areas/discharge-delays/discharge-ready-date/",
    notes: "Official statistics with provider-level data. Suitable for peer benchmarking once monthly files are ingested and denominator rules are applied."
  },
  {
    id: "acute-discharge",
    domain: "Hospital flow",
    metric: "Patients no longer meeting criteria to reside, non-discharges, delay reasons and additional days",
    level: "Trust + ICB",
    cadence: "Monthly",
    status: "Public",
    sourceLabel: "NHS England, Acute Discharge Situation Report",
    sourceUrl: "https://www.england.nhs.uk/statistics/statistical-work-areas/discharge-delays/acute-discharge-situation-report/",
    notes: "Provider-level management information. August 2026 is currently published in CSV and Excel. Definitions changed in May 2024, so trend analysis must respect the break in series."
  },
  {
    id: "rtt",
    domain: "Elective care",
    metric: "Referral-to-treatment waiting list activity and pathway performance",
    level: "Trust + ICB",
    cadence: "Monthly",
    status: "Public",
    sourceLabel: "NHS England, Consultant-led RTT Waiting Times",
    sourceUrl: "https://www.england.nhs.uk/statistics/statistical-work-areas/rtt-waiting-times/rtt-data-2026-27/",
    notes: "Provider-level extracts can be used to normalise elective pressure and avoid misreading raw activity without case-mix or waiting-list context."
  },
  {
    id: "open-model-health-system",
    domain: "Cross-domain productivity",
    metric: "Selected quality, productivity and responsiveness benchmarks across specialties and workforce",
    level: "Trust + ICB",
    cadence: "Varies by metric",
    status: "Open benchmark",
    sourceLabel: "NHS England, Open Model Health System",
    sourceUrl: "https://www.england.nhs.uk/applications/model-hospital/",
    notes: "Open benchmarking exists alongside the fuller NHS-login Model Health System. Peer-group comparison should be preferred over crude national ranking."
  },
  {
    id: "model-health-system",
    domain: "Theatres and productivity",
    metric: "Theatre utilisation, cancellations, length of stay and specialty productivity metrics",
    level: "Trust + ICB",
    cadence: "Varies by metric",
    status: "NHS login",
    sourceLabel: "NHS England, Model Health System",
    sourceUrl: "https://www.england.nhs.uk/applications/model-hospital/",
    notes: "The most detailed benchmarking environment requires NHS access. The public Sitora layer should cite only metrics that can be independently sourced or explicitly labelled as restricted-source evidence."
  },
  {
    id: "better-care-fund",
    domain: "System flow",
    metric: "Average discharge delay, non-elective admissions and long-term care admissions",
    level: "ICB",
    cadence: "Annual planning dataset",
    status: "Public",
    sourceLabel: "NHS England, Better Care Fund 2026/27 planning data",
    sourceUrl: "https://www.england.nhs.uk/publication/better-care-fund-2026-27-planning-data/",
    notes: "Useful for system-level context and planned performance, but should not be mixed directly with trust-level operational measures."
  }
];

export const benchmarkCases: BenchmarkCase[] = [
  {
    id: "chesterfield-theatres",
    provider: "Chesterfield Royal Hospital NHS Foundation Trust",
    domain: "Theatres",
    result: "232 additional patients treated between April and December 2024; daily cases rose from 2.8 to 3.5; lists overrunning materially reduced",
    period: "2024",
    interpretation: "This is evidence that better scheduling and visibility can convert theatre time into additional treated patients. It is a case study, not a national effect estimate.",
    sourceLabel: "NHS England, Chesterfield theatre efficiency with NHS FDP",
    sourceUrl: "https://www.england.nhs.uk/long-read/chesterfield-royal-hospital-drives-theatre-efficiency-with-help-from-new-digital-tool-2/"
  },
  {
    id: "kingston-theatres",
    provider: "Kingston Hospital NHS Foundation Trust",
    domain: "Theatres",
    result: "Scheduling information was consolidated from fragmented spreadsheets and systems, reducing manual administrative work and improving theatre planning",
    period: "2023-2026 case study",
    interpretation: "The operational lesson is that data fragmentation itself consumes staff time and weakens scheduling decisions even before clinical capacity loss is counted.",
    sourceLabel: "NHS England, Kingston hospital improving theatre use with NHS FDP",
    sourceUrl: "https://www.england.nhs.uk/long-read/kingston-hospital-improving-use-of-surgical-theatres-with-nhs-fdp/"
  }
];

export const benchmarkRules = [
  "Compare like with like: acute teaching trusts, district general hospitals, specialist trusts and community providers should not be ranked as one undifferentiated group.",
  "Use rates and denominators, not raw counts alone.",
  "Require a minimum activity volume before flagging an outlier.",
  "Separate case-mix and structural constraints from avoidable operational variation.",
  "Show trend alongside current position so improving providers are not labelled solely by historic performance.",
  "Never convert statistical variation directly into cashable savings without pathway-level validation.",
  "Flag data-quality limitations and methodology breaks explicitly.",
  "Use benchmark variation to trigger investigation, not to declare poor care."
];

export const benchmarkPipeline = [
  ["01", "Ingest", "Load the latest NHS monthly provider file and preserve the source month, publication URL and raw values."],
  ["02", "Validate", "Reject malformed rows, flag missing providers and retain NHS management-information caveats."],
  ["03", "Normalise", "Create rates using defensible denominators and assign comparable provider peer groups."],
  ["04", "Benchmark", "Calculate peer median, percentile, distance from peer median and multi-month trend."],
  ["05", "Investigate", "Flag material, persistent variation for causal review rather than labelling it waste."],
  ["06", "Quantify", "Estimate excess resource exposure only after the operational cause and avoidability are understood."],
  ["07", "Intervene", "Attach an owner, intervention and pre-agreed verification metric."],
  ["08", "Verify", "Record actual bed days, hours, appointments or pounds recovered after implementation."]
];
