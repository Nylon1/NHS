"use client";

import { useMemo, useState } from "react";

const baseline = {
  drugCost: 420,
  pharmacyMinutes: 24,
  nursingMinutes: 38,
  chairMinutes: 120,
  consumables: 18,
  unusedRisk: 0.08,
};

const options = {
  current: { label: "Current IV pathway", drugCost: 420, pharmacyMinutes: 24, nursingMinutes: 38, chairMinutes: 120, consumables: 18, unusedRisk: 0.08 },
  rta: { label: "Ready-to-administer pathway", drugCost: 432, pharmacyMinutes: 8, nursingMinutes: 24, chairMinutes: 110, consumables: 13, unusedRisk: 0.05 },
  sc: { label: "Clinically eligible SC pathway", drugCost: 445, pharmacyMinutes: 4, nursingMinutes: 14, chairMinutes: 35, consumables: 8, unusedRisk: 0.03 },
};

type PathwayKey = keyof typeof options;

export default function MedicinesResourceIntelligenceDemoPage() {
  const [selected, setSelected] = useState<PathwayKey>("current");
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

  return (
    <>
      <section className="page-head"><div className="shell">
        <div className="eyebrow">Interactive prototype · demo data only</div>
        <h1>Medicines Resource Intelligence: compare the whole pathway, not just the drug price.</h1>
        <p className="lede">This fictional example shows how the same clinically required treatment can consume different amounts of pharmacy, nursing, chair and consumable resource. Clinical eligibility is assumed for demonstration only.</p>
      </div></section>

      <section className="section"><div className="shell">
        <div className="two-col">
          <div>
            <div className="eyebrow">Selected treatment</div><h2>High-resource injectable pathway</h2>
            <p className="lede">The question is not simply which formulation costs less. The question is what the safe end-to-end pathway consumes.</p>
            <div style={{display:"grid", gap:10, marginTop:20}}>
              {(Object.entries(options) as [PathwayKey, typeof options[PathwayKey]][]).map(([key,item]) => <button key={key} className={selected === key ? "button primary" : "button secondary"} onClick={() => {setSelected(key); setApproved(false);}} style={{justifyContent:"flex-start"}}>{item.label}</button>)}
            </div>
          </div>
          <div className="card evidence-card"><span className="badge">Selected pathway</span><h3>{pathway.label}</h3><p>Demo patient is assumed clinically suitable for all options shown. A live implementation would require explicit eligibility rules and professional approval.</p><button className="button primary" style={{marginTop:16}} onClick={() => setApproved(true)}>{approved ? "Clinically approved for demo" : "Simulate clinical approval"}</button></div>
        </div>
      </div></section>

      <section className="section"><div className="shell">
        <div className="section-head"><div><div className="eyebrow">Whole-pathway comparison</div><h2>See where the resource moves.</h2></div><p>A higher medicine acquisition cost can still be resource-favourable if it releases scarce clinical capacity. That does not automatically make it cash-saving.</p></div>
        <div className="metric-grid">
          <div className="metric"><span className="badge">Drug</span><strong>£{pathway.drugCost}</strong><h3>Acquisition</h3><small>{delta.drugCost === 0 ? "Baseline" : `${delta.drugCost > 0 ? "+" : ""}£${delta.drugCost} vs current`}</small></div>
          <div className="metric"><span className="badge">Pharmacy</span><strong>{pathway.pharmacyMinutes} min</strong><h3>Preparation</h3><small>{delta.pharmacyMinutes} minutes potentially released</small></div>
          <div className="metric"><span className="badge">Nursing</span><strong>{pathway.nursingMinutes} min</strong><h3>Preparation + administration</h3><small>{delta.nursingMinutes} minutes potentially released</small></div>
          <div className="metric"><span className="badge">Capacity</span><strong>{pathway.chairMinutes} min</strong><h3>Chair time</h3><small>{delta.chairMinutes} minutes potentially released</small></div>
        </div>
        <div className="metric-grid" style={{marginTop:16}}>
          <div className="metric"><span className="badge">Consumables</span><strong>£{pathway.consumables}</strong><h3>Per treatment</h3><small>£{delta.consumables} lower than current if positive.</small></div>
          <div className="metric"><span className="badge">Waste risk</span><strong>{Math.round(pathway.unusedRisk * 100)}%</strong><h3>Prepared-but-unused demo risk</h3><small>{Math.round(delta.unusedRisk * 100)} percentage points lower than current if positive.</small></div>
          <div className="metric"><span className="badge">Status</span><strong>{approved ? "Approved" : "Review"}</strong><h3>Clinical decision</h3><small>No pathway change counts until authorised.</small></div>
          <div className="metric"><span className="badge">Benefit type</span><strong>{selected === "current" ? "None" : "Mixed"}</strong><h3>Resource effect</h3><small>Drug cost, consumables and capacity remain separated.</small></div>
        </div>
      </div></section>

      <section className="section"><div className="shell">
        <div className="section-head"><div><div className="eyebrow">Resource Recovery Record</div><h2>Only approved, observed change can become verified recovery.</h2></div></div>
        <div className="card-grid">
          <article className="card"><h3>Before</h3><p>Current IV pathway</p><ul className="list-clean"><li>{baseline.pharmacyMinutes} pharmacy minutes</li><li>{baseline.nursingMinutes} nursing minutes</li><li>{baseline.chairMinutes} chair minutes</li><li>£{baseline.drugCost} medicine + £{baseline.consumables} consumables</li></ul></article>
          <article className="card"><h3>After</h3><p>{pathway.label}</p><ul className="list-clean"><li>{pathway.pharmacyMinutes} pharmacy minutes</li><li>{pathway.nursingMinutes} nursing minutes</li><li>{pathway.chairMinutes} chair minutes</li><li>£{pathway.drugCost} medicine + £{pathway.consumables} consumables</li></ul></article>
        </div>
        <details className="reveal-panel" style={{marginTop:18}} open><summary>How Sitora would classify the result</summary><div>
          <p><strong>Cash-releasing:</strong> only if a real budget line falls and finance validates it.</p>
          <p><strong>Cost avoidance:</strong> future spend prevented or consumables avoided.</p>
          <p><strong>Capacity release:</strong> pharmacy, nursing or chair minutes made genuinely reusable.</p>
          <p><strong>Net benefit:</strong> resource released minus implementation and operating cost.</p>
          <p><strong>Safety condition:</strong> clinical outcomes and unintended consequences must remain within agreed limits.</p>
        </div></details>
      </div></section>

      <section className="section"><div className="shell quote">The cheapest medicine is not always the lowest-resource pathway, and the lowest-resource pathway is not automatically the safest or the cheapest. Measure the whole pathway.</div></section>
    </>
  );
}
