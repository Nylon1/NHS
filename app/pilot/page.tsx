export default function PilotPage() {
  const outputs = [
    "Observed waste",
    "Potentially avoidable waste",
    "Clinically validated intervention opportunity",
    "Cash-releasing opportunity",
    "Capacity-releasing opportunity",
    "Verified savings achieved",
    "Projected annual effect, clearly labelled as projected"
  ];

  return (
    <>
      <section className="page-head">
        <div className="shell">
          <div className="eyebrow">90-day NHS pilot</div>
          <h1>Measure first. Intervene second. Verify afterwards.</h1>
          <p className="lede">The first pilot should test whether connected operational data can identify recoverable waste without adding another reporting burden.</p>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="process">
            <div className="process-step"><span>Month 1</span><strong>Baseline</strong><p>Connect agreed datasets, test data quality and establish current resource use.</p></div>
            <div className="process-step"><span>Month 2</span><strong>Detect</strong><p>Identify waste signals, pathway variation and candidate interventions.</p></div>
            <div className="process-step"><span>Month 2</span><strong>Validate</strong><p>Clinical, pharmacy, operational and finance teams review whether each signal is genuine.</p></div>
            <div className="process-step"><span>Month 3</span><strong>Intervene</strong><p>Implement a small number of safe, approved changes with measurable endpoints.</p></div>
            <div className="process-step"><span>Month 3</span><strong>Verify</strong><p>Measure actual impact and separate direct cash savings from released capacity.</p></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell two-col">
          <div>
            <div className="eyebrow">Initial domains</div>
            <h2>Keep the first pilot narrow enough to prove.</h2>
            <ul className="list-clean">
              <li><strong>Repeat medicines:</strong> excess supply, discontinuation, dose change and reconciliation.</li>
              <li><strong>Aseptic / SACT:</strong> preparation, route, timing, unused doses and scarce capacity.</li>
              <li><strong>One referral or prevention pathway:</strong> selected with the participating Trust or ICB.</li>
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
        <div className="shell quote">The NHS cannot systematically reduce waste it cannot see. The pilot is designed to determine what is genuinely recoverable, not to manufacture a headline savings figure.</div>
      </section>
    </>
  );
}
