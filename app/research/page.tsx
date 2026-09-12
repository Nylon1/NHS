import { researchTracker } from "@/lib/interventions";

export default function ResearchPage() {
  return (
    <>
      <section className="page-head">
        <div className="shell">
          <div className="eyebrow">Research tracker</div>
          <h1>What we know, what we can act on, and what still needs measuring.</h1>
          <p className="lede">The purpose of the observatory is not to force certainty. It is to show where evidence is strong, where measurement is weak and which questions a pilot should answer.</p>
        </div>
      </section>

      <section className="section">
        <div className="shell table-wrap">
          <table>
            <thead>
              <tr>
                <th>Domain</th>
                <th>Evidence strength</th>
                <th>Measurement quality</th>
                <th>Intervention readiness</th>
                <th>Open question</th>
              </tr>
            </thead>
            <tbody>
              {researchTracker.map((item) => (
                <tr key={item.domain}>
                  <td><strong>{item.domain}</strong></td>
                  <td>{item.evidenceStrength}</td>
                  <td>{item.measurementQuality}</td>
                  <td>{item.interventionReadiness}</td>
                  <td>{item.openQuestion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section">
        <div className="shell two-col">
          <div>
            <div className="eyebrow">Important limitation</div>
            <h2>No single national waste number.</h2>
            <p className="muted">We do not add overlapping historical models, capacity estimates and cost-avoidance figures into a headline claim that the NHS wastes a specific number of billions. The first objective is to measure recoverable waste accurately.</p>
          </div>
          <div className="callout">
            <strong>Working rule</strong>
            <p>Observed waste, potential waste and recoverable waste are three different things. Verified saving only exists after an intervention has been measured.</p>
          </div>
        </div>
      </section>
    </>
  );
}
