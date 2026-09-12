import Link from "next/link";

export default function DemoHubPage() {
  return (
    <>
      <section className="page-head"><div className="shell">
        <div className="eyebrow">Working prototypes · fictional data</div>
        <h1>See the medicines intelligence model working, not just described.</h1>
        <p className="lede">Choose one of the two flagship workflows. Both prototypes use fictional data and are designed to demonstrate the proposed decision logic, governance and Resource Recovery Record.</p>
      </div></section>

      <section className="section"><div className="shell card-grid">
        <Link className="card card-link evidence-card" href="/demo/medicine-loop">
          <div className="meta-row"><span className="badge">Prototype 1</span><span>Repeat medicines</span></div>
          <h2>Medicine Loop</h2>
          <p>Follow a repeat request through expected stock, medication changes, patient confirmation, professional review and a traceable recovery record.</p>
          <p><strong>Core question:</strong> Should this medicine be supplied again now?</p>
        </Link>
        <Link className="card card-link evidence-card" href="/demo/medicines-resource-intelligence">
          <div className="meta-row"><span className="badge">Prototype 2</span><span>Whole pathway</span></div>
          <h2>Medicines Resource Intelligence</h2>
          <p>Compare alternative medicine pathways across acquisition cost, pharmacy time, nursing time, chair capacity, consumables and unused-dose risk.</p>
          <p><strong>Core question:</strong> If the medicine is needed, are we delivering it through the right clinically appropriate pathway?</p>
        </Link>
      </section>

      <section className="section"><div className="shell callout"><strong>Important</strong><p>These are product demonstrations using fictional data. They are not clinical tools, do not connect to NHS patient records and do not make prescribing decisions.</p></div></section>
    </>
  );
}
