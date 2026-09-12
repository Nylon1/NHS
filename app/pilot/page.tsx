import Link from "next/link";

export default function PilotPage() {
  const outputs = [
    "Observed medicines resource loss",
    "Potentially avoidable component",
    "Clinically validated intervention opportunity",
    "Cash-releasing benefit",
    "Cost avoidance",
    "Capacity/productivity release",
    "Net resource benefit after intervention cost",
    "Scale / modify / stop recommendation"
  ];

  return (
    <>
      <section className="page-head">
        <div className="shell">
          <div className="eyebrow">20-week medicines pilot</div>
          <h1>Baseline first. Intervene safely. Verify what was actually recovered.</h1>
          <p className="lede">The first formal pilot should focus on medicines: repeat supply, high-resource medicine pathways and prepared-but-unused doses. The aim is to establish real recoverability, not manufacture a headline savings number.</p>
          <div className="hero-actions">
            <Link className="button primary" href="/business-case">Read the commissioner business case</Link>
            <Link className="button secondary" href="/medicines-proposal">Read the full medicines proposal</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="process">
            <div className="process-step"><span>Weeks 0-4</span><strong>Mobilise</strong><p>Confirm sponsor, sites, governance, datasets, owners and clinical-safety boundaries.</p></div>
            <div className="process-step"><span>Weeks 5-8</span><strong>Baseline</strong><p>Measure current repeat supply, pathway resource use, unused preparations and workload.</p></div>
            <div className="process-step"><span>Weeks 9-16</span><strong>Intervene</strong><p>Run agreed human-reviewed interventions against defined medicines cohorts.</p></div>
            <div className="process-step"><span>Weeks 17-20</span><strong>Evaluate</strong><p>Compare outcomes with baseline/control where feasible and calculate net benefit.</p></div>
            <div className="process-step"><span>Decision</span><strong>Scale / modify / stop</strong><p>Commissioners receive a clear decision with clinical, operational and financial evidence.</p></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell two-col">
          <div>
            <div className="eyebrow">Three workstreams</div>
            <h2>Keep the first implementation narrow enough to prove.</h2>
            <ul className="list-clean">
              <li><strong>Medicine Loop:</strong> validate repeat need, stock accumulation, dose changes, discontinuation and reconciliation before further supply.</li>
              <li><strong>Medicines Resource Intelligence:</strong> optimise route, formulation, preparation location, aseptic burden, nursing time and chair/bed use.</li>
              <li><strong>Prepared-but-unused doses:</strong> record every selected unused preparation, classify why it became unused and reduce repeated causes.</li>
            </ul>
          </div>
          <div className="card">
            <span className="badge">Pilot outputs</span>
            <ul className="list-clean" style={{ marginTop: 12 }}>
              {outputs.map((output) => <li key={output}>{output}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell callout">
          <strong>Safety boundary</strong>
          <p>The platform does not autonomously stop medication, change prescribing or make unsupervised clinical decisions. Clinically significant interventions remain within agreed professional review and governance pathways.</p>
        </div>
      </section>

      <section className="section">
        <div className="shell quote">A medicine only counts as resource recovery when the baseline, intervention, outcome and net benefit can be shown without worsening safety, access or workload elsewhere.</div>
      </section>
    </>
  );
}
