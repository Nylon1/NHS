export default function MethodologyPage() {
  return (
    <>
      <section className="page-head">
        <div className="shell">
          <div className="eyebrow">Methodology</div>
          <h1>Observe first. Validate before calling something waste.</h1>
          <p className="lede">Every finding follows the same chain: evidence, interpretation, governed intervention and verified impact.</p>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="process">
            {[
              ["01", "Observe", "Use existing activity, spend, time and capacity data."],
              ["02", "Detect", "Find unusual variation, duplication, excess supply or avoidable delay."],
              ["03", "Validate", "Clinical and operational experts confirm whether the signal is real and safe to act on."],
              ["04", "Intervene", "Apply the smallest governed change with a named owner."],
              ["05", "Verify", "Measure what changed and classify the benefit correctly."]
            ].map(([n, title, body]) => <div className="process-step" key={title}><span>{n}</span><h3>{title}</h3><p>{body}</p></div>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell two-col">
          <article className="card"><div className="eyebrow">Evidence discipline</div><h2>Every number has a label.</h2><ul className="list-clean"><li><strong>Measured:</strong> directly reported activity or outcome data.</li><li><strong>Modelled:</strong> estimate based on assumptions.</li><li><strong>Sitora estimate:</strong> our calculation with assumptions shown.</li><li><strong>Unknown:</strong> important but not adequately measured.</li></ul></article>
          <article className="card"><div className="eyebrow">Benefit discipline</div><h2>Not every released hour is cash.</h2><ul className="list-clean"><li><strong>Cash-releasing:</strong> expenditure genuinely removed.</li><li><strong>Capacity-releasing:</strong> staff or facilities can do more useful work.</li><li><strong>Cost avoidance:</strong> future spending may be prevented.</li><li><strong>Patient benefit:</strong> time, travel, waiting or unnecessary attendance reduced.</li></ul></article>
        </div>
      </section>

      <section className="section"><div className="shell"><details className="reveal-panel"><summary>What Sitora does not claim</summary><div className="reveal-body"><p>We do not claim that the NHS wastes one single headline £ figure, that all released workforce time becomes cash, that every repeat prescription is unnecessary, or that remote care should replace face-to-face care. The purpose of the first stage is to measure the recoverable proportion accurately.</p></div></details></div></section>
    </>
  );
}
