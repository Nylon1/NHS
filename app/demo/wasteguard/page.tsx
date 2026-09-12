"use client";

import { useMemo, useState } from "react";
import DemoEvidence from "@/components/DemoEvidence";

const medicines = [
  { name: "Atorvastatin 20 mg", qty: 28, days: 28, lastSupplyDaysAgo: 24, change: "None", stock: 10, value: 2.1 },
  { name: "Amlodipine 5 mg", qty: 28, days: 28, lastSupplyDaysAgo: 27, change: "Dose changed to 10 mg after recent review", stock: 7, value: 1.45 },
  { name: "Omeprazole 20 mg", qty: 28, days: 28, lastSupplyDaysAgo: 13, change: "None", stock: 18, value: 1.9 },
];

type Decision = "need" | "enough" | "review";

export default function WasteGuardDemoPage() {
  const [confirmed, setConfirmed] = useState<Record<string, Decision>>({});
  const [active, setActive] = useState(medicines[0].name);
  const rows = useMemo(() => medicines.map((m) => {
    const expectedUsed = Math.min(m.qty, Math.floor(m.lastSupplyDaysAgo * (m.qty / m.days)));
    const expectedRemaining = Math.max(0, m.qty - expectedUsed);
    const early = m.lastSupplyDaysAgo < m.days - 3;
    const changed = m.change !== "None";
    const mismatch = m.stock > expectedRemaining + 4;
    const status = changed ? "Clinical review" : early || mismatch ? "Check need" : "Routine";
    const reasons = [
      ...(early ? [`Requested ${m.days - m.lastSupplyDaysAgo} days before the expected cycle end.`] : []),
      ...(mismatch ? [`Patient-reported stock (${m.stock}) is higher than the modelled remainder (${expectedRemaining}).`] : []),
      ...(changed ? [m.change] : []),
    ];
    return { ...m, expectedRemaining, status, reasons };
  }), []);
  const current = rows.find((m) => m.name === active) || rows[0];
  const avoided = rows.filter((m) => confirmed[m.name] === "enough");
  const reviews = rows.filter((m) => confirmed[m.name] === "review");
  const completed = Object.keys(confirmed).length;
  const avoidedValue = avoided.reduce((sum, m) => sum + m.value, 0);
  const decision = confirmed[current.name];

  return (
    <>
      <section className="page-head demo-head"><div className="shell demo-head-grid"><div><div className="eyebrow">WasteGuard · fictional workflow, real oversupply problem</div><h1>Prevent repeat oversupply before dispensing.</h1><p className="lede">WasteGuard compares supply timing, expected use, stock and medication changes to identify repeat items that may not be needed this cycle. The system flags; an authorised human decides.</p></div><div className="demo-status-card"><span className="badge">Demo patient</span><strong>DEMO-1042</strong><span>3 repeat medicines</span><span>{completed}/3 reviewed</span></div></div></section>

      <section className="section"><div className="shell demo-workspace"><aside className="demo-sidebar"><div className="eyebrow">Repeat request</div><h3>Choose a medicine</h3><div className="demo-list">{rows.map((m)=><button key={m.name} className={`demo-list-item ${active===m.name?"active":""}`} onClick={()=>setActive(m.name)}><span><strong>{m.name}</strong><small>{m.status}</small></span><span className={`signal-dot ${m.status==="Routine"?"ok":m.status==="Clinical review"?"danger":"warn"}`} /></button>)}</div></aside><div className="demo-main"><div className="demo-panel"><div className="meta-row"><span className="badge">{current.status}</span><span>Last supplied {current.lastSupplyDaysAgo} days ago</span></div><h2>{current.name}</h2><div className="demo-signal-grid"><div><small>Last quantity</small><strong>{current.qty}</strong><span>tablets</span></div><div><small>Expected remaining</small><strong>{current.expectedRemaining}</strong><span>estimated</span></div><div><small>Patient reports</small><strong>{current.stock}</strong><span>remaining</span></div></div><div className="demo-flag-box"><span className="badge">Why flagged</span>{current.reasons.length?<ul className="list-clean">{current.reasons.map((r)=><li key={r}>{r}</li>)}</ul>:<p>No exceptional signal.</p>}</div><div className="demo-choice-grid"><button className={decision==="need"?"demo-choice selected":"demo-choice"} onClick={()=>setConfirmed(s=>({...s,[current.name]:"need"}))}><strong>Supply required</strong><span>Continue</span></button><button className={decision==="enough"?"demo-choice selected":"demo-choice"} onClick={()=>setConfirmed(s=>({...s,[current.name]:"enough"}))}><strong>Enough stock</strong><span>Defer cycle</span></button><button className={decision==="review"?"demo-choice selected":"demo-choice"} onClick={()=>setConfirmed(s=>({...s,[current.name]:"review"}))}><strong>Review</strong><span>Professional check</span></button></div></div></div></div></section>

      <section className="section"><div className="shell"><div className="section-head"><div><div className="eyebrow">Recovery record</div><h2>Only verified actions count.</h2></div><p>The demo values are illustrative. In a pilot, only a confirmed dispensing outcome can become a recovery record.</p></div><div className="metric-grid"><div className="metric"><strong>{avoided.length}</strong><h3>Supplies deferred</h3></div><div className="metric"><strong>£{avoidedValue.toFixed(2)}</strong><h3>Illustrative cost avoidance</h3></div><div className="metric"><strong>{reviews.length}</strong><h3>Professional reviews</h3></div><div className="metric"><strong>0</strong><h3>Autonomous stops</h3></div></div></div></section>

      <DemoEvidence
        proven="NHSBSA already operates an Oversupply Dashboard because prescribers often see prescriptions one at a time rather than cumulative quantities actually dispensed. Repeat prescriptions make up around three-quarters of prescription items. A UK community-pharmacy study also found that 66% of study patients did not require their full quota of prescribed repeat medicines; the associated cost figure is historic and should not be treated as a current NHS estimate."
        adds="Move from retrospective population-level oversupply signals to an individual, governed intervention before the next unnecessary supply is dispensed, using timing, cumulative supply, medication changes and optional stock confirmation."
        pilot="How many flagged items are truly unnecessary; how many supplies are actually prevented; the workload created for patients, pharmacies and prescribers; missed-essential-medicine risk; net financial effect; and whether targeting is precise enough for routine use."
        sources={[
          { label: "NHSBSA Oversupply Dashboard: cumulative quantity dispensed and repeat-prescribing comparators", href: "https://www.nhsbsa.nhs.uk/access-our-data-products/epact2/dashboards-and-specifications/oversupply-dashboard" },
          { label: "UK community-pharmacy repeat-prescribing study: 66% did not require full quota", href: "https://pubmed.ncbi.nlm.nih.gov/10897509/" },
          { label: "NHS England care-home proxy ordering: fewer repeat-medication risks, errors and queries", href: "https://www.england.nhs.uk/ourwork/clinical-policy/ordering-medication-using-proxy-access/evaluation-and-benefits/" },
        ]}
      />
    </>
  );
}
