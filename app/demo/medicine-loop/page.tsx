"use client";

import { useMemo, useState } from "react";

const medicines = [
  { name: "Atorvastatin 20 mg", qty: 28, days: 28, lastSupplyDaysAgo: 24, change: "None", stock: 10, value: 2.1 },
  { name: "Amlodipine 5 mg", qty: 28, days: 28, lastSupplyDaysAgo: 27, change: "Dose changed to 10 mg after recent review", stock: 7, value: 1.45 },
  { name: "Omeprazole 20 mg", qty: 28, days: 28, lastSupplyDaysAgo: 13, change: "None", stock: 18, value: 1.9 },
];

type Decision = "need" | "enough" | "review";

export default function MedicineLoopDemoPage() {
  const [confirmed, setConfirmed] = useState<Record<string, Decision>>({});
  const [active, setActive] = useState(medicines[0].name);

  const rows = useMemo(() => medicines.map((m) => {
    const expectedUsed = Math.min(m.qty, Math.floor(m.lastSupplyDaysAgo * (m.qty / m.days)));
    const expectedRemaining = Math.max(0, m.qty - expectedUsed);
    const early = m.lastSupplyDaysAgo < m.days - 3;
    const changed = m.change !== "None";
    const stockMismatch = m.stock > expectedRemaining + 4;
    const status = changed ? "Clinical review" : early || stockMismatch ? "Check need" : "Routine";
    const reasons = [
      ...(early ? [`Requested ${m.days - m.lastSupplyDaysAgo} days before expected cycle end`] : []),
      ...(stockMismatch ? [`Patient-reported stock is ${m.stock - expectedRemaining} above expected remaining`] : []),
      ...(changed ? [m.change] : []),
    ];
    return { ...m, expectedRemaining, status, reasons };
  }), []);

  const current = rows.find((m) => m.name === active) || rows[0];
  const avoided = rows.filter((m) => confirmed[m.name] === "enough");
  const reviews = rows.filter((m) => confirmed[m.name] === "review");
  const completed = rows.filter((m) => confirmed[m.name]).length;
  const avoidedValue = avoided.reduce((sum, m) => sum + m.value, 0);

  const decisionCopy = confirmed[current.name] === "need"
    ? { title: "Supply remains required", body: "The request continues through the normal governed prescribing and dispensing pathway." }
    : confirmed[current.name] === "enough"
      ? { title: "Supply deferred this cycle", body: "The patient has confirmed enough stock. No automatic medicine stop has occurred; only this repeat supply event is deferred." }
      : confirmed[current.name] === "review"
        ? { title: "Professional review required", body: "The signal is escalated because a clinically meaningful change or discrepancy needs pharmacist or prescriber review." }
        : { title: "Decision pending", body: "Review the signal, then record the smallest appropriate action." };

  return (
    <>
      <section className="page-head">
        <div className="shell demo-head-grid">
          <div>
            <div className="eyebrow">Interactive prototype · fictional data</div>
            <h1>Medicine Loop</h1>
            <p className="lede">See how a repeat request moves from raw supply history to a simple, auditable decision without autonomously changing medication.</p>
          </div>
          <div className="demo-status-card">
            <span className="badge">Demo patient</span>
            <strong>DEMO-1042</strong>
            <span>3 repeat medicines requested today</span>
            <span>{completed}/3 reviewed</span>
          </div>
        </div>
      </section>

      <section className="section"><div className="shell">
        <div className="demo-stepper" aria-label="Demo flow">
          {[["1","Detect"],["2","Explain"],["3","Decide"],["4","Record"]].map(([n,t]) => <div className="demo-step" key={n}><span>{n}</span><strong>{t}</strong></div>)}
        </div>
      </div></section>

      <section className="section"><div className="shell demo-workspace">
        <aside className="demo-sidebar">
          <div className="eyebrow">Repeat request</div>
          <h3>Choose a medicine</h3>
          <div className="demo-list">
            {rows.map((m) => (
              <button key={m.name} className={`demo-list-item ${active === m.name ? "active" : ""}`} onClick={() => setActive(m.name)}>
                <span><strong>{m.name}</strong><small>{m.status}</small></span>
                <span className={`signal-dot ${m.status === "Routine" ? "ok" : m.status === "Clinical review" ? "danger" : "warn"}`} />
              </button>
            ))}
          </div>
        </aside>

        <div className="demo-main">
          <div className="demo-panel">
            <div className="meta-row"><span className="badge">{current.status}</span><span>Last supplied {current.lastSupplyDaysAgo} days ago</span></div>
            <h2>{current.name}</h2>

            <div className="demo-signal-grid">
              <div><small>Last quantity</small><strong>{current.qty}</strong><span>tablets</span></div>
              <div><small>Expected remaining</small><strong>{current.expectedRemaining}</strong><span>estimated</span></div>
              <div><small>Patient reports</small><strong>{current.stock}</strong><span>remaining</span></div>
            </div>

            <div className="demo-flag-box">
              <span className="badge">Why Sitora flagged this</span>
              {current.reasons.length ? (
                <ul className="list-clean">{current.reasons.map((r) => <li key={r}>{r}</li>)}</ul>
              ) : <p>No exceptional signal. Routine supply can continue with minimal friction.</p>}
            </div>

            <div className="demo-decision-block">
              <div><div className="eyebrow">Human decision</div><h3>What should happen next?</h3></div>
              <div className="demo-choice-grid">
                <button className={confirmed[current.name] === "need" ? "demo-choice selected" : "demo-choice"} onClick={() => setConfirmed(s => ({...s,[current.name]:"need"}))}><strong>Supply required</strong><span>Continue normal pathway</span></button>
                <button className={confirmed[current.name] === "enough" ? "demo-choice selected" : "demo-choice"} onClick={() => setConfirmed(s => ({...s,[current.name]:"enough"}))}><strong>Enough stock</strong><span>Defer this repeat cycle</span></button>
                <button className={confirmed[current.name] === "review" ? "demo-choice selected" : "demo-choice"} onClick={() => setConfirmed(s => ({...s,[current.name]:"review"}))}><strong>Send for review</strong><span>Pharmacist/prescriber check</span></button>
              </div>
            </div>
          </div>

          <div className="demo-outcome-panel">
            <span className="badge">Recorded outcome</span>
            <h3>{decisionCopy.title}</h3>
            <p>{decisionCopy.body}</p>
          </div>
        </div>
      </section></section>

      <section className="section"><div className="shell">
        <div className="section-head"><div><div className="eyebrow">Resource Recovery Record</div><h2>What this demo has actually recorded.</h2></div><p>Only explicit decisions appear here. A signal alone is not counted as recovery.</p></div>
        <div className="metric-grid">
          <div className="metric"><span className="badge">Reviewed</span><strong>{completed}</strong><h3>Items assessed</h3><small>Out of three requested medicines.</small></div>
          <div className="metric"><span className="badge">Avoided</span><strong>{avoided.length}</strong><h3>Supplies deferred</h3><small>Demo items confirmed as not needed this cycle.</small></div>
          <div className="metric"><span className="badge">Value</span><strong>£{avoidedValue.toFixed(2)}</strong><h3>Illustrative cost avoidance</h3><small>Demo only; real financial benefit requires validation.</small></div>
          <div className="metric"><span className="badge">Safety</span><strong>{reviews.length}</strong><h3>Professional reviews</h3><small>Clinically meaningful cases escalated rather than automated.</small></div>
        </div>

        <div className="recovery-record" style={{marginTop:18}}>
          <div><small>Signal</small><strong>{avoided.length ? "Stock confirms repeat not required" : reviews.length ? "Medication discrepancy requires review" : "No verified recovery yet"}</strong></div>
          <div><small>Action</small><strong>{avoided.length ? "Repeat deferred" : reviews.length ? "Escalated" : "Pending"}</strong></div>
          <div><small>Benefit type</small><strong>{avoided.length ? "Cost avoidance" : "Not yet classified"}</strong></div>
          <div><small>Autonomous medicine changes</small><strong>0</strong></div>
        </div>
      </div></section>

      <section className="section"><div className="shell quote">The innovation is not another reminder. It is a closed feedback loop between the previous supply and the next decision.</div></section>
    </>
  );
}
