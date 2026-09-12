export type LossMechanism = {
  id: string;
  area: string;
  signal: string;
  scale: string;
  period: string;
  evidence: "Measured" | "Modelled" | "Operational target" | "Historic benchmark";
  lossMechanism: string;
  existingData: string;
  missingData: string;
  recoverability: "High" | "Medium" | "Unknown";
  intervention: string;
  pilotMetric: string;
  sourceLabel: string;
  sourceUrl: string;
};

export const lossMechanisms: LossMechanism[] = [
  {
    id: "repeat-medicines-open-loop",
    area: "Repeat medicines",
    signal: "A national medicines-waste estimate of about £300m is still being cited while repeat ordering has become highly digital.",
    scale: "67.8m repeat prescriptions ordered through the NHS App in 12 months",
    period: "Dec 2024 to Nov 2025",
    evidence: "Measured",
    lossMechanism: "Ordering can be digitally efficient without confirming that every item is still needed. Excess stock, dose changes, discontinuations and intermittent-use medicines can remain on repeat lists.",
    existingData: "Prescription requests, prescribing records, dispensing data and electronic repeat dispensing already exist at national and local level.",
    missingData: "There is no national closed-loop measure showing what proportion of repeat items were actually needed at the point of supply, how much stock remained at home, or what was later discarded.",
    recoverability: "High",
    intervention: "Add a lightweight stock-and-need check before selected repeat requests, prioritising high-cost, high-volume and commonly returned medicines. Escalate uncertainty to a pharmacist rather than stopping autonomously.",
    pilotMetric: "Avoided items and net ingredient cost, pharmacist review rate, patient safety events, re-request rate within 30 days.",
    sourceLabel: "NHS England, Record numbers using NHS App to manage health",
    sourceUrl: "https://www.england.nhs.uk/2025/12/record-numbers-using-nhs-app-to-manage-health/"
  },
  {
    id: "gp-dna",
    area: "General practice appointments",
    signal: "A material share of booked capacity disappears through non-attendance.",
    scale: "16m GP appointments not attended",
    period: "2025",
    evidence: "Measured",
    lossMechanism: "Clinical slots are reserved but produce no patient contact. Causes include forgetting, late arrival, communication failures and appointments that are no longer required.",
    existingData: "Appointment status, booking channel, reminder channel, lead time and practice-level DNA rates are already captured in operational systems.",
    missingData: "The NHS does not routinely publish the avoidable fraction by cause, whether released slots were backfilled, or the staff-time and downstream consequences of each DNA.",
    recoverability: "High",
    intervention: "Risk-stratified reminders, one-tap cancellation, automatic wait-list backfill and targeted support for patients with repeated DNAs or known access barriers.",
    pilotMetric: "DNA rate, percentage of cancelled slots refilled, minutes of capacity recovered, inequality impact and patient complaints.",
    sourceLabel: "NHS England, NHS urges tap the app as 1 in 4 miss appointments",
    sourceUrl: "https://www.england.nhs.uk/2026/03/nhs-urges-tap-the-app-as-1-in-4-miss-appointments/"
  },
  {
    id: "elective-dna",
    area: "Outpatient and elective appointments",
    signal: "Missed hospital appointments remain a large, visible loss of scarce specialist capacity.",
    scale: "8m missed elective appointments",
    period: "2023/24",
    evidence: "Measured",
    lossMechanism: "Specialist time and diagnostic capacity are booked but unused. Long booking lead times, poor communication, transport, work and caring constraints can all contribute.",
    existingData: "Hospital scheduling systems record booked, attended, cancelled and DNA activity. NHS England already promotes two-way communication and validation.",
    missingData: "Trust-level reasons, refill success, financial impact and whether a missed appointment created another downstream contact are not consistently visible nationally.",
    recoverability: "High",
    intervention: "Two-way confirmation, predictive DNA risk, short-notice waiting lists and pathway validation before appointments are consumed.",
    pilotMetric: "DNA reduction, slots backfilled, waiting-list days avoided and specialty-level cost per recovered appointment.",
    sourceLabel: "NHS England, Reforming elective care for patients",
    sourceUrl: "https://www.england.nhs.uk/long-read/reforming-elective-care-for-patients/"
  },
  {
    id: "discharge-delay",
    area: "Hospital discharge",
    signal: "Beds remain occupied after patients are clinically ready to leave.",
    scale: "Nearly 30,000 patients a year stay 21 days beyond discharge-ready date",
    period: "2025/26 plan",
    evidence: "Measured",
    lossMechanism: "A bed that cannot turn over blocks admissions and elective flow even when acute treatment has finished. Delays can sit outside the hospital in social care, transport, equipment, housing or community capacity.",
    existingData: "Discharge-ready dates, length of stay, bed occupancy and Better Care Fund discharge metrics are available.",
    missingData: "A single cross-system causal record showing exactly which dependency blocked each day of delay, the owner of that dependency and the cost of the blocked bed day.",
    recoverability: "Medium",
    intervention: "Create a daily dependency ledger for every delayed discharge, with owner, blocker, elapsed time, next action and escalation threshold across NHS and local authority partners.",
    pilotMetric: "Bed days beyond discharge-ready date, median blocker duration, repeat blocker categories, admissions released and readmission rate.",
    sourceLabel: "NHS England, Urgent and emergency care plan 2025/26",
    sourceUrl: "https://www.england.nhs.uk/long-read/urgent-and-emergency-care-plan-2025-26/"
  },
  {
    id: "agency-spend",
    area: "Temporary workforce",
    signal: "Premium staffing remains a multi-billion-pound cost even after major reductions.",
    scale: "£2.1bn agency spend",
    period: "2024/25",
    evidence: "Measured",
    lossMechanism: "Vacancies, rota gaps, sickness, poor roster design and short-notice demand can force providers to buy labour at premium rates.",
    existingData: "Roster fill, vacancy, sickness, bank and agency spend are routinely held by providers.",
    missingData: "The avoidable share of each agency shift, its initiating cause and whether an earlier roster or recruitment intervention could have prevented premium purchase.",
    recoverability: "Medium",
    intervention: "Root-cause every premium shift: vacancy, sickness, late roster, demand spike, skill mix or establishment mismatch. Rank recurring preventable causes by cost.",
    pilotMetric: "Agency hours avoided, premium-to-substantive cost differential, rota fill lead time and patient-safety balance measures.",
    sourceLabel: "NHS England, Performance report 2024/25",
    sourceUrl: "https://www.england.nhs.uk/long-read/performance-report-24-25/"
  },
  {
    id: "theatre-utilisation",
    area: "Operating theatres",
    signal: "Theatre utilisation is improving but variation remains a core national productivity target.",
    scale: "+1.7 percentage points utilisation year-on-year",
    period: "December 2025",
    evidence: "Measured",
    lossMechanism: "Late starts, early finishes, cancellations, turnaround delays, staffing gaps and list design can leave expensive theatre capacity idle.",
    existingData: "Providers already hold list start/finish, case duration, turnaround, cancellation and utilisation data; Model Health System supports benchmarking.",
    missingData: "A standard causal attribution for every unused theatre minute and a consistent estimate of how much of that time is genuinely recoverable.",
    recoverability: "High",
    intervention: "Classify every unused theatre block by root cause and feed recurrent causes into list planning, staffing and pre-op readiness workflows.",
    pilotMetric: "Utilised minutes, late-start minutes, avoidable cancellations, turnaround time, cases per list and overtime created.",
    sourceLabel: "NHS England, Productivity plan update",
    sourceUrl: "https://www.england.nhs.uk/long-read/productivity-plan-update/"
  },
  {
    id: "aseptic-capacity",
    area: "Aseptic and injectable medicines",
    signal: "Specialist cleanroom, pharmacy and nursing capacity can be consumed by preparation models that may no longer be optimal.",
    scale: ">4,000 WTE nursing capacity and >1m bed days modelled",
    period: "2020 national review",
    evidence: "Modelled",
    lossMechanism: "Local preparation, ward preparation, bespoke doses and avoidable IV routes can consume scarce pharmacy, nursing, chair and bed capacity.",
    existingData: "Production volumes, batch data, product cost, staffing and administration activity exist locally, with national strategic reviews available.",
    missingData: "True cost per administered dose, prepared-but-unused dose rate, avoidable IV activity and the opportunity cost of occupied aseptic slots are rarely brought together.",
    recoverability: "High",
    intervention: "Measure every dose from order to administration, including labour, cleanroom time, waste and setting. Compare local manufacture, hub, commercial ready-to-administer and alternative-route options.",
    pilotMetric: "Cost per administered dose, unused prepared doses, aseptic minutes released, nursing minutes released and treatment-chair capacity released.",
    sourceLabel: "DHSC, Transforming NHS pharmacy aseptic services in England",
    sourceUrl: "https://www.gov.uk/government/publications/transforming-nhs-pharmacy-aseptic-services-in-england/"
  },
  {
    id: "patient-communications",
    area: "Patient communications",
    signal: "The NHS still spends heavily on communications while free digital channels can substitute for some traffic.",
    scale: "~£450m annual patient communications spend",
    period: "2024/25 reporting",
    evidence: "Measured",
    lossMechanism: "Letters, SMS and fragmented communication channels can create direct cost and failed-contact risk when digital alternatives are available.",
    existingData: "Message volumes, channel type, NHS App adoption and delivery status are already measurable.",
    missingData: "Provider-level cost per successful patient contact and the fraction of paid messages that could safely move to lower-cost channels.",
    recoverability: "Medium",
    intervention: "Measure cost per successful contact by channel and shift suitable traffic to NHS Notify/App while retaining non-digital routes for inclusion and safety.",
    pilotMetric: "Cost per delivered message, failed-contact rate, digital exclusion rate and downstream DNA impact.",
    sourceLabel: "NHS England, Performance report 2024/25",
    sourceUrl: "https://www.england.nhs.uk/long-read/performance-report-24-25/"
  }
];
