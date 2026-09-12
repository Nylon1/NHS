export default function MethodologyPage() {
  return (
    <>
      <section className="page-head">
        <div className="shell">
          <div className="eyebrow">Methodology</div>
          <h1>Observe first. Validate before calling something waste.</h1>
          <p className="lede">The platform is designed to avoid overstating savings. Every finding should move through a clear chain from evidence to interpretation to intervention to verified impact.</p>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="process">
            {[
              ["01", "Observe", "Record activity, spend, clinical time, capacity and materials using existing data wherever possible."],
              ["02", "Detect", "Identify unusual variation, duplication, excess supply, avoidable delay and potentially preventable escalation."],
              ["03", "Validate", "Clinical and operational experts determine whether the signal represents a real problem and whether action is safe."],
              ["04", "Intervene", "Apply the smallest feasible change with explicit governance, ownership and expected impact."],
              ["05", "Verify", "Measure actual post-intervention outcomes and separate cash savings from released capacity."]
            ].map(([n, title, body]) => (
              <div className="process-step" key={title}>
                <span>{n}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell two-col">
          <div>
            <div className="eyebrow">Evidence discipline</div>
            <h2>Four labels for every number.</h2>
            <ul className="list-clean">
              <li><strong>Measured:</strong> directly reported activity or outcome data.</li>
              <li><strong>Modelled:</strong> an estimate produced from assumptions or scenarios.</li>
              <li><strong>Sitora estimate:</strong> our own calculation from visible inputs, always showing assumptions.</li>
              <li><strong>Unknown:</strong> important but not adequately measured with available evidence.</li>
            </ul>
          </div>
          <div>
            <div className="eyebrow">Savings discipline</div>
            <h2>Not every released hour is cash.</h2>
            <ul className="list-clean">
              <li><strong>Cash-releasing:</strong> expenditure genuinely removed.</li>
              <li><strong>Capacity-releasing:</strong> existing staff or facilities can do more useful work.</li>
              <li><strong>Cost avoidance:</strong> future spending may be prevented.</li>
              <li><strong>Patient benefit:</strong> time, travel, waiting or unnecessary attendance reduced.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="callout">
            <strong>What we do not claim</strong>
            <p>We do not currently claim that the NHS wastes a single headline £ figure, that all released workforce time converts to cash, that every repeat prescription is unnecessary, or that remote care should replace face-to-face care. The purpose of the first stage is to measure the recoverable proportion accurately.</p>
          </div>
        </div>
      </section>
    </>
  );
}
