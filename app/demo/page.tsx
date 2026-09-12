import Link from "next/link";

export default function DemoHubPage() {
  return (
    <>
      <section className="page-head">
        <div className="shell">
          <div className="eyebrow">Working prototypes · synthetic workflows + published evidence</div>
          <h1>See the medicines intelligence model working across care settings.</h1>
          <p className="lede">The core Medicine Loop closes medication changes across organisations. WasteGuard tackles repeat oversupply. Medicines Resource Intelligence uses published NHS and peer-reviewed evidence to identify resource opportunities that still require local verification.</p>
        </div>
      </section>

      <section className="section">
        <div className="shell card-grid">
          <Link className="card card-link evidence-card" href="/demo/medicine-loop">
            <div className="meta-row"><span className="badge">Core demo</span><span>Synthetic patient workflow</span></div>
            <h2>Medicine Loop</h2>
            <p>Follow a hospital-stopped medicine through GP, community pharmacy, care home and community care workflows until every required action is acknowledged and reconciled.</p>
            <p><strong>Core question:</strong> Does every affected service now reflect the same authorised medication change?</p>
          </Link>

          <Link className="card card-link evidence-card" href="/demo/wasteguard">
            <div className="meta-row"><span className="badge">WasteGuard</span><span>Synthetic repeat-supply workflow</span></div>
            <h2>WasteGuard</h2>
            <p>Compare timing, expected use, patient-held stock and medication changes to identify repeat supply that may not be needed this cycle.</p>
            <p><strong>Core question:</strong> Should this repeat item be supplied again now?</p>
          </Link>

          <Link className="card card-link evidence-card" href="/demo/medicines-resource-intelligence">
            <div className="meta-row"><span className="badge">Evidence demo</span><span>NHS + published evidence</span></div>
            <h2>Medicines Resource Intelligence</h2>
            <p>Explore evidence-backed examples showing how route, formulation, preparation and delivery model can change nursing, pharmacy, chair and other NHS resource use.</p>
            <p><strong>Core question:</strong> Which locally relevant pathway opportunities deserve a measured pilot?</p>
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="shell callout">
          <strong>Important</strong>
          <p>Medicine Loop and WasteGuard use synthetic patient/workflow data. The resource demo uses published evidence with source links and limitations. None of the demos are clinical tools, and published effects are never presented as verified local savings.</p>
        </div>
      </section>
    </>
  );
}
