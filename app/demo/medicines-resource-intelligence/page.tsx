"use client";

import { useMemo, useState } from "react";

const baseline = { drugCost: 420, pharmacyMinutes: 24, nursingMinutes: 38, chairMinutes: 120, consumables: 18, unusedRisk: 0.08 };
const options = {
  current: { label: "Current IV pathway", drugCost: 420, pharmacyMinutes: 24, nursingMinutes: 38, chairMinutes: 120, consumables: 18, unusedRisk: 0.08, note: "Existing baseline pathway." },
  rta: { label: "Ready-to-administer", drugCost: 432, pharmacyMinutes: 8, nursingMinutes: 24, chairMinutes: 110, consumables: 13, unusedRisk: 0.05, note: "Less local preparation and lower handling burden." },
  sc: { label: "Clinically eligible SC", drugCost: 445, pharmacyMinutes: 4, nursingMinutes: 14, chairMinutes: 35, consumables: 8, unusedRisk: 0.03, note: "Illustrative lower-resource route for an eligible patient." },
};

type PathwayKey = keyof typeof options;
type PathwayOption = (typeof options)[PathwayKey];

export default function MedicinesResourceIntelligenceDemoPage() {
  const [selected, setSelected] = useState<PathwayKey>("rta");
  const [approved, setApproved] = useState(false);
  const pathway = options[selected];

  const delta = useMemo(() => ({
    drugCost: pathway.drugCost - baseline.drugCost,
    pharmacyMinutes: baseline.pharmacyMinutes - pathway.pharmacyMinutes,
    nursingMinutes: baseline.nursingMinutes - pathway.nursingMinutes,
    chairMinutes: baseline.chairMinutes - pathway.chairMinutes,
    consumables: baseline.consumables - pathway.consumables,
    unusedRisk: baseline.unusedRisk - pathway.unusedRisk,
  }), [pathway]);

  const totalClinicalMinutes = baseline.pharmacyMinutes + baseline.nursingMinutes + baseline.chairMinutes;
  const selectedClinicalMinutes = pathway.pharmacyMinutes + pathway.nursingMinutes + pathway.chairMinutes;
  const capacityRelease = totalClinicalMinutes - selectedClinicalMinutes;
  const acquisitionDelta = delta.drugCost - delta.consumables;

  return (
    <>
      <section className="page-head">
        <div className="shell demo-head-grid">
          <div>
            <div className="eyebrow">Interactive prototype · fictional data</div>
            <h1>Medicines Resource Intelligence</h1>
            <p className="lede">Compare the whole treatment pathway, not just the medicine price. The demo separates acquisition cost from scarce clinical capacity and requires explicit approval before any change counts.</p>
          </div>
          <div className="demo-status-card">
            <span className="badge">Demo treatment</span>
            <strong>Injectable pathway</strong>
            <span>3 pathway options</span>
            <span>Clinical eligibility assumed for demonstration</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="demo-stepper">
            {[["1","Baseline"],["2","Compare"],["3","Approve"],["4","Verify"]].map(([n,t]) => <div className="demo-step" key={n}><span>{n}</span><strong>{t}</strong></div>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell demo-workspace">
          <aside className="demo-sidebar">
            <div className="eyebrow">Pathway options</div>
            <h3>Select a scenario</h3>
            <div className="demo-list">
              {(Object.entries(options) as [PathwayKey, PathwayOption][]).map(([key,item]) => (
                <button key={key} className={`demo-list-item ${selected === key ? "active" : ""}`} onClick={() => { setSelected(key); setApproved(false); }}>
                  <span><strong>{item.label}</strong><small>{item.note}</small></span>
                  <span className={`signal-dot ${key === "current" ? "ok" : "warn"}`} />
                </button>
              ))}
            </div>
          </aside>

          <div className="demo-main">
            <div className="demo-panel">
              <div className="meta-row"><span className="badge">Selected pathway</span><span>{pathway.label}</span></div>
              <h2>What changes compared with today?</h2>
              <div className="comparison-grid">
                <div className="comparison-card baseline"><span>Current</span><strong>£{baseline.drugCost + baseline.consumables}</strong><small>medicine + consumables</small><p>{baseline.pharmacyMinutes} pharmacy min · {baseline.nursingMinutes} nursing min · {baseline.chairMinutes} chair min</p></div>
                <div className="comparison-arrow">→</div>
                <div className="comparison-card selected"><span>{pathway.label}</span><strong>£{pathway.drugCost + pathway.consumables}</strong><small>medicine + consumables</small><p>{pathway.pharmacyMinutes} pharmacy min · {pathway.nursingMinutes} nursing min · {pathway.chairMinutes} chair min</p></div>
              </div>

              <div className="demo-signal-grid four">
                <div><small>Drug cost change</small><strong>{delta.drugCost >= 0 ? "+" : ""}£{delta.drugCost}</strong><span>vs baseline</span></div>
                <div><small>Pharmacy time</small><strong>{delta.pharmacyMinutes} min</strong><span>potentially released</span></div>
                <div><small>Nursing time</small><strong>{delta.nursingMinutes} min</strong><span>potentially released</span></div>
                <div><small>Chair capacity</small><strong>{delta.chairMinutes} min</strong><span>potentially released</span></div>
              </div>

              <div className="demo-flag-box">
                <span className="badge">Why this deserves review</span>
                <p>The selected pathway changes more than acquisition price. It may release <strong>{capacityRelease} clinical minutes</strong> while changing medicine and consumable spend by <strong>{acquisitionDelta >= 0 ? "+" : ""}£{acquisitionDelta}</strong> per treatment in this fictional example.</p>
                <p>Unused-dose risk changes from {Math.round(baseline.unusedRisk * 100)}% to {Math.round(pathway.unusedRisk * 100)}%.</p>
              </div>

              <div className="demo-decision-block">
                <div><div className="eyebrow">Clinical governance</div><h3>Can this pathway be used?</h3></div>
                <button className={approved ? "button primary" : "button secondary"} onClick={() => setApproved(!approved)}>{approved ? "Approved for demo ✓" : "Simulate clinical approval"}</button>
              </div>
            </div>

            <div className={`demo-outcome-panel ${approved ? "success" : ""}`}>
              <span className="badge">Verification status</span>
              <h3>{approved ? "Eligible for measured implementation" : "Not yet a recovery claim"}</h3>
              <p>{approved ? "The pathway can now move into a measured implementation where actual resource reuse and safety outcomes are recorded." : "A modelled comparison is only an opportunity signal. No capacity or financial benefit should be claimed until clinically approved and observed."}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head"><div><div className="eyebrow">Resource Recovery Record</div><h2>Keep money, capacity and safety separate.</h2></div></div>
          <div className="recovery-record">
            <div><small>Clinical status</small><strong>{approved ? "Approved for demo" : "Awaiting approval"}</strong></div>
            <div><small>Acquisition impact</small><strong>{selected === "current" ? "No change" : `${acquisitionDelta >= 0 ? "+" : ""}£${acquisitionDelta}`}</strong></div>
            <div><small>Capacity signal</small><strong>{capacityRelease} min</strong></div>
            <div><small>Benefit classification</small><strong>{approved && selected !== "current" ? "Capacity / cost avoidance" : "Not verified"}</strong></div>
          </div>
          <details className="reveal-panel" style={{marginTop:18}}>
            <summary>How Sitora would verify this in a real pilot</summary>
            <div><p>Record the clinical eligibility decision, actual route/formulation used, preparation and administration timestamps, chair/bed utilisation, cancellations, unused doses, patient outcome and any additional staff work created. Only then classify observed capacity release, cost avoidance or cash-releasing benefit.</p></div>
          </details>
        </div>
      </section>

      <section className="section"><div className="shell quote">A medicine can cost more and still consume less NHS resource. The job is to measure the whole pathway and prove whether the released capacity is real.</div></section>
    </>
  );
}
