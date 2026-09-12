import Link from "next/link";

export default function DemoHubPage() {
  return (
    <>
      <section className="page-head">
        <div className="shell">
          <div className="eyebrow">Working prototypes · fictional data</div>
          <h1>See the medicines intelligence model working across care settings.</h1>
          <p className="lede">The core Medicine Loop closes medication changes across organisations. WasteGuard tackles repeat oversupply. Medicines Resource Intelligence examines whole-pathway resource use.</p>
        </div>
      </section>

      <section className="section">
        <div className="shell card-grid">
          <Link className="card card-link evidence-card" href="/demo/medicine-loop">
            <div className="meta-row"><span className="badge">Core demo</span><span>Cross-setting reconciliation</span></div>
            <h2>Medicine Loop</h2>
            <p>Follow a hospital-stopped medicine through GP, community pharmacy, care home and community care workflows until every required action is acknowledged and reconciled.</p>
            <p><strong>Core question:</strong> Does every affected service now reflect the same authorised medication change?</p>
          </Link>

          <Link className="card card-link evidence-card" href="/demo/wasteguard">
            <div className="meta-row"><span className="badge">WasteGuard</span><span>Repeat oversupply</span></div>
            <h2>WasteGuard</h2>
            <p>Compare timing, expected use, patient-held stock and medication changes to identify repeat supply that may not be needed this cycle.</p>
            <p><strong>Core question:</strong> Should this repeat item be supplied again now?</p>
          </Link>

          <Link className="card card-link evidence-card" href="/demo/medicines-resource-intelligence">
            <div className="meta-row"><span className="badge">Pathway demo</span><span>Whole resource pathway</span></div>
            <h2>Medicines Resource Intelligence</h2>
            <p>Compare alternative medicine pathways across acquisition cost, pharmacy time, nursing time, chair capacity, consumables and unused-dose risk.</p>
            <p><strong>Core question:</strong> If the medicine is needed, are we delivering it through the right clinically appropriate pathway?</p>
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="shell callout">
          <strong>Important</strong>
          <p>These are product demonstrations using fictional data. They are not clinical tools, do not connect to NHS patient records and do not make prescribing decisions.</p>
        </div>
      </section>
    </>
  );
}
