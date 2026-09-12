"use client";

import { useMemo, useState } from "react";

const medicines = [
  { name: "Atorvastatin 20 mg", qty: 28, days: 28, lastSupplyDaysAgo: 24, change: "None", stock: 10, value: 2.1 },
  { name: "Amlodipine 5 mg", qty: 28, days: 28, lastSupplyDaysAgo: 27, change: "Dose changed to 10 mg after recent review", stock: 7, value: 1.45 },
  { name: "Omeprazole 20 mg", qty: 28, days: 28, lastSupplyDaysAgo: 13, change: "None", stock: 18, value: 1.9 },
];

export default function MedicineLoopDemoPage() {
  const [confirmed, setConfirmed] = useState<Record<string, "need" | "enough" | "review">>({});

  const rows = useMemo(() => medicines.map((m) => {
    const expectedUsed = Math.min(m.qty, Math.floor(m.lastSupplyDaysAgo * (m.qty / m.days)));
    const expectedRemaining = Math.max(0, m.qty - expectedUsed);
    const early = m.lastSupplyDaysAgo < m.days - 3;
    const changed = m.change !== "None";
    const status = changed ? "Clinical review" : early || m.stock > expectedRemaining + 4 ? "Check need" : "Routine";
    return { ...m, expectedRemaining, status };
  }), []);

  const avoided = rows.filter((m) => confirmed[m.name] === "enough");
  const reviews = rows.filter((m) => confirmed[m.name] === "review");
  const avoidedValue = avoided.reduce((sum, m) => sum + m.value, 0);

  return (
    <>
      <section className="page-head"><div className="shell">
        <div className="eyebrow">Interactive prototype · demo data only</div>
        <h1>Medicine Loop: validate the next repeat before another supply enters the system.</h1>
        <p className="lede">This prototype shows the proposed workflow using fictional patient data. It is not connected to NHS systems and makes no autonomous prescribing decisions.</p>
      </div></section>

      <section className="section"><div className="shell">
        <div className="section-head"><div><div className="eyebrow">Patient view</div><h2>Three repeat medicines. Different signals. Different actions.</h2></div><p>Routine items pass with minimal friction. Early supply, stock accumulation or a medication change triggers the smallest appropriate check.</p></div>
        <div className="card" style={{marginBottom:18}}><div className="meta-row"><span className="badge">Demo patient</span><span>Patient ID: DEMO-1042</span><span>Stable long-term medicines</span></div><h3 style={{marginTop:12}}>Repeat request received</h3><p>Requested today for all three medicines.</p></div>
        <div className="card-grid">
          {rows.map((m) => <article className="card evidence-card" key={m.name}>
            <div className="meta-row"><span className="badge">{m.status}</span><span>Last supplied {m.lastSupplyDaysAgo} days ago</span></div>
            <h3>{m.name}</h3>
            <div className="metric-grid" style={{gridTemplateColumns:"repeat(3,1fr)", marginTop:10}}>
              <div className="metric"><small>Last quantity</small><strong>{m.qty}</strong></div>
              <div className="metric"><small>Expected remaining</small><strong>{m.expectedRemaining}</strong></div>
              <div className="metric"><small>Patient says remaining</small><strong>{m.stock}</strong></div>
            </div>
            {m.change !== "None" && <div className="callout" style={{marginTop:14}}><strong>Medication change detected</strong><p>{m.change}</p></div>}
            <div style={{display:"flex", gap:8, flexWrap:"wrap", marginTop:16}}>
              <button className="button secondary" onClick={() => setConfirmed(s => ({...s,[m.name]:"need"}))}>Still need supply</button>
              <button className="button secondary" onClick={() => setConfirmed(s => ({...s,[m.name]:"enough"}))}>Enough stock</button>
              <button className="button secondary" onClick={() => setConfirmed(s => ({...s,[m.name]:"review"}))}>Send for review</button>
            </div>
            {confirmed[m.name] && <p><strong>Recorded outcome:</strong> {confirmed[m.name] === "need" ? "Supply still required" : confirmed[m.name] === "enough" ? "No supply required this cycle" : "Escalated for pharmacist/prescriber review"}</p>}
          </article>)}
        </div>
      </div></section>

      <section className="section"><div className="shell">
        <div className="section-head"><div><div className="eyebrow">Resource Recovery Record</div><h2>The intervention must leave an auditable trail.</h2></div></div>
        <div className="metric-grid">
          <div className="metric"><span className="badge">Avoided</span><strong>{avoided.length}</strong><h3>Repeat items</h3><small>Demo items confirmed as not required this cycle.</small></div>
          <div className="metric"><span className="badge">Value</span><strong>£{avoidedValue.toFixed(2)}</strong><h3>Demo supply value avoided</h3><small>Illustrative only. Real values require finance validation.</small></div>
          <div className="metric"><span className="badge">Safety</span><strong>{reviews.length}</strong><h3>Clinical reviews</h3><small>Cases requiring professional review rather than automatic action.</small></div>
          <div className="metric"><span className="badge">Rule</span><strong>0</strong><h3>Autonomous stops</h3><small>Clinically significant medicine changes are never made automatically.</small></div>
        </div>
        <details className="reveal-panel" style={{marginTop:18}} open><summary>View example audit record</summary><div>
          <p><strong>Signal:</strong> early repeat / patient-stock mismatch / medication change.</p>
          <p><strong>Action:</strong> patient confirmation or professional review.</p>
          <p><strong>Outcome:</strong> supply, defer this cycle, or review.</p>
          <p><strong>Benefit type:</strong> cost avoidance, capacity impact, or safety/reconciliation event.</p>
          <p><strong>Verification:</strong> dispensing outcome, subsequent request, safety outcome and workload recorded.</p>
        </div></details>
      </div></section>

      <section className="section"><div className="shell quote">The key change is simple: the next repeat decision is informed by what happened in the previous cycle.</div></section>
    </>
  );
}
