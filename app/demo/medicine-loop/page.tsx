"use client";

import { useMemo, useState } from "react";

type Status = "pending" | "acknowledged" | "reconciled" | "conflict";

type Service = {
  name: string;
  role: string;
  currentState: string;
  targetState: string;
  startingStatus: Status;
};

const services: Service[] = [
  { name: "Acute hospital", role: "Authorised change source", currentState: "Amlodipine stopped at discharge", targetState: "Signed stop event issued", startingStatus: "reconciled" },
  { name: "GP / PCN", role: "Repeat list owner", currentState: "Amlodipine 10 mg still active on repeat", targetState: "Repeat list reconciled", startingStatus: "conflict" },
  { name: "Community pharmacy", role: "Dispensing workflow", currentState: "Next supply still scheduled", targetState: "Old supply held / cancelled", startingStatus: "pending" },
  { name: "Care home", role: "Administration workflow", currentState: "eMAR still shows amlodipine", targetState: "eMAR updated after signed instruction", startingStatus: "pending" },
  { name: "Community nursing", role: "Care-team visibility", currentState: "Old medication list still visible", targetState: "Current medication state acknowledged", startingStatus: "pending" },
];

const statusLabel: Record<Status, string> = {
  pending: "Pending action",
  acknowledged: "Acknowledged",
  reconciled: "Reconciled",
  conflict: "Conflict detected",
};

export default function MedicineLoopDemoPage() {
  const [states, setStates] = useState<Record<string, Status>>(() => Object.fromEntries(services.map((s) => [s.name, s.startingStatus])));
  const [active, setActive] = useState(services[1].name);

  const current = services.find((s) => s.name === active) || services[0];
  const currentStatus = states[current.name];
  const closed = useMemo(() => services.every((s) => states[s.name] === "reconciled"), [states]);
  const reconciledCount = services.filter((s) => states[s.name] === "reconciled").length;
  const conflictCount = services.filter((s) => states[s.name] === "conflict").length;

  function nextAction(name: string) {
    setStates((prev) => ({ ...prev, [name]: "reconciled" }));
  }

  return (
    <>
      <section className="page-head demo-head">
        <div className="shell demo-head-grid">
          <div>
            <div className="eyebrow">Medicine Loop Core · fictional data</div>
            <h1>One medication change. Every affected service aligned.</h1>
            <p className="lede">A hospital has stopped amlodipine. The clinical decision is correct, but the loop is still open because GP, pharmacy and care workflows have not all caught up. CareGrid tracks the change from signed decision to confirmed downstream reconciliation.</p>
          </div>
          <div className="demo-status-card">
            <span className="badge">Demo patient</span>
            <strong>DEMO-2048</strong>
            <span>Amlodipine 10 mg stopped in hospital</span>
            <span>{reconciledCount}/{services.length} services reconciled</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="demo-stepper" aria-label="Medicine Loop flow">
            {[["1","Authorise"],["2","Notify"],["3","Reconcile"],["4","Acknowledge"],["5","Close"]].map(([n,t]) => <div className="demo-step" key={n}><span>{n}</span><strong>{t}</strong></div>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell two-col">
          <div className="card evidence-card">
            <div className="meta-row"><span className="badge">Signed medication change</span><span>Source: acute discharge</span></div>
            <h2>Amlodipine 10 mg → STOP</h2>
            <p><strong>Authorised by:</strong> hospital prescriber</p>
            <p><strong>Reason:</strong> fictional adverse-effect review</p>
            <p><strong>Effective:</strong> today, 14:30</p>
            <p><strong>Follow-up:</strong> GP medication review within 7 days</p>
          </div>
          <div className={`callout ${closed ? "" : ""}`}>
            <strong>{closed ? "Loop closed" : "Loop still open"}</strong>
            <p>{closed ? "Every affected workflow has acknowledged and reconciled the authorised change." : `${services.length - reconciledCount} service workflow(s) still need action. A notification alone is not closure.`}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell demo-workspace">
          <aside className="demo-sidebar">
            <div className="eyebrow">Affected services</div>
            <h3>Choose a workflow</h3>
            <div className="demo-list">
              {services.map((s) => (
                <button key={s.name} className={`demo-list-item ${active === s.name ? "active" : ""}`} onClick={() => setActive(s.name)}>
                  <span><strong>{s.name}</strong><small>{statusLabel[states[s.name]]}</small></span>
                  <span className={`signal-dot ${states[s.name] === "reconciled" ? "ok" : states[s.name] === "conflict" ? "danger" : "warn"}`} />
                </button>
              ))}
            </div>
          </aside>

          <div className="demo-main">
            <div className="demo-panel">
              <div className="meta-row"><span className="badge">{statusLabel[currentStatus]}</span><span>{current.role}</span></div>
              <h2>{current.name}</h2>
              <div className="comparison-grid">
                <div className="comparison-card baseline"><span>Current local state</span><strong>{current.currentState}</strong><small>Before reconciliation</small></div>
                <div className="comparison-arrow">→</div>
                <div className="comparison-card selected"><span>Required state</span><strong>{current.targetState}</strong><small>After authorised change is actioned</small></div>
              </div>

              <div className="demo-flag-box">
                <span className="badge">Why this matters</span>
                <p>{currentStatus === "conflict" ? "The hospital record says STOPPED while this service still has the medicine active. CareGrid shows both sources and requires an accountable reconciliation rather than silently overwriting one with the other." : currentStatus === "pending" ? "The service has been affected by the authorised medication change but has not yet confirmed that its local workflow reflects it." : currentStatus === "acknowledged" ? "The service has seen the change, but acknowledgement alone does not prove the local medication workflow was corrected." : "This service has reconciled its local workflow with the authorised change."}</p>
              </div>

              <div className="demo-decision-block">
                <div><div className="eyebrow">Accountable next action</div><h3>{currentStatus === "reconciled" ? "This service is complete" : "Reconcile this workflow"}</h3></div>
                {currentStatus !== "reconciled" && <button className="button primary" onClick={() => nextAction(current.name)}>Mark reconciled for demo</button>}
              </div>
            </div>

            <div className={`demo-outcome-panel ${currentStatus === "reconciled" ? "success" : ""}`}>
              <span className="badge">Workflow status</span>
              <h3>{statusLabel[currentStatus]}</h3>
              <p>{currentStatus === "reconciled" ? "The service has confirmed its local repeat, supply, administration or care workflow reflects the signed change." : "CareGrid keeps this action visible and owned until the responsible service resolves it."}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head"><div><div className="eyebrow">Closed-loop record</div><h2>Visibility is not enough. The action has to close.</h2></div><p>Every service has its own role and permissions. CareGrid records provenance, ownership, acknowledgement and resolution.</p></div>
          <div className="metric-grid">
            <div className="metric"><span className="badge">Affected</span><strong>{services.length}</strong><h3>Service workflows</h3><small>Different settings, one medication-change event.</small></div>
            <div className="metric"><span className="badge">Reconciled</span><strong>{reconciledCount}</strong><h3>Confirmed complete</h3><small>Local workflow now reflects the authorised change.</small></div>
            <div className="metric"><span className="badge">Conflict</span><strong>{conflictCount}</strong><h3>Unresolved discrepancies</h3><small>Conflicting medication states remain visible until resolved.</small></div>
            <div className="metric"><span className="badge">Loop</span><strong>{closed ? "Closed" : "Open"}</strong><h3>Overall status</h3><small>The loop closes only when all required downstream actions are complete.</small></div>
          </div>
          <div className="recovery-record" style={{marginTop:18}}>
            <div><small>Change</small><strong>STOP amlodipine 10 mg</strong></div>
            <div><small>Source</small><strong>Hospital discharge</strong></div>
            <div><small>Accountability</small><strong>{closed ? "All actions closed" : "Outstanding actions remain"}</strong></div>
            <div><small>Silent overwrite</small><strong>Never</strong></div>
          </div>
        </div>
      </section>

      <section className="section"><div className="shell quote">One medication view. Every change signed. Every service notified. Every action acknowledged. Every loop closed.</div></section>
    </>
  );
}
