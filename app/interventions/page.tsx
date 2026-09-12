import { dischargeInterventions, interventions } from "@/lib/interventions";

export default function InterventionsPage() {
  return (
    <>
      <section className="page-head">
        <div className="shell">
          <div className="eyebrow">Intervention intelligence</div>
          <h1>Every bottleneck should lead to an owner, an action and a measurable test.</h1>
          <p className="lede">
            The purpose of this section is not to produce a generic improvement checklist. It translates observed waste and capacity-loss signals into operational interventions that can be tested, measured and stopped if they do not work.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="callout">
            <strong>Core rule</strong>
            <p>
              Do not claim savings because an intervention was introduced. First show that the targeted process changed. Then show that the patient pathway improved. Only after that should released capacity or financial value be estimated.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">Discharge action matrix</div>
              <h2>From coded delay reason to accountable operational response.</h2>
            </div>
            <p>
              These actions are aligned to the current NHS discharge model: identify the specific reason for delay, name the responsible owner, agree the next action and timescale, and measure whether that dependency actually cleared sooner.
            </p>
          </div>

          <div className="card-grid">
            {dischargeInterventions.map((item, index) => (
              <article className="card evidence-card" key={item.bottleneck}>
                <div className="meta-row">
                  <span className="badge">Priority {index + 1}</span>
                  <span>Evidence: {item.evidence}</span>
                </div>
                <h3>{item.bottleneck}</h3>
                <p>{item.signal}</p>

                <div>
                  <strong>Who owns the response</strong>
                  <p>{item.primaryOwners.join(" · ")}</p>
                </div>

                <div>
                  <strong>Intervention</strong>
                  <p>{item.intervention}</p>
                </div>

                <div>
                  <strong>First operational actions</strong>
                  <ul className="list-clean">
                    {item.firstActions.map((action) => <li key={action}>{action}</li>)}
                  </ul>
                </div>

                <div>
                  <strong>Leading indicators</strong>
                  <ul className="list-clean">
                    {item.leadingIndicators.map((measure) => <li key={measure}>{measure}</li>)}
                  </ul>
                </div>

                <div>
                  <strong>Outcome measures</strong>
                  <ul className="list-clean">
                    {item.outcomeMeasures.map((measure) => <li key={measure}>{measure}</li>)}
                  </ul>
                </div>

                <div>
                  <strong>How impact is verified</strong>
                  <p>{item.verification}</p>
                </div>

                <div>
                  <strong>Expected measurement horizon</strong>
                  <p>{item.expectedHorizon}</p>
                </div>

                <div>
                  <strong>Safety and interpretation guardrails</strong>
                  <ul className="list-clean">
                    {item.guardrails.map((guardrail) => <li key={guardrail}>{guardrail}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">Measurement chain</div>
              <h2>We should be able to prove the intervention worked before putting a pound sign on it.</h2>
            </div>
          </div>

          <div className="card-grid">
            <article className="card">
              <span className="badge">1</span>
              <h3>Dependency changed</h3>
              <p>Did the targeted step actually become faster or more reliable? Examples: referral triage time, TTO turnaround, funding-decision time or transport pickup time.</p>
            </article>
            <article className="card">
              <span className="badge">2</span>
              <h3>Patient pathway changed</h3>
              <p>Did patients leave hospital sooner after their Discharge Ready Date, without worsening readmissions, failed discharges or safety outcomes?</p>
            </article>
            <article className="card">
              <span className="badge">3</span>
              <h3>Capacity was genuinely released</h3>
              <p>Did the change produce usable bed capacity, chair time, pharmacy capacity, nursing time or appointments rather than simply moving work elsewhere?</p>
            </article>
            <article className="card">
              <span className="badge">4</span>
              <h3>Financial value is classified correctly</h3>
              <p>Separate cash-releasing savings, cost avoidance and productivity/capacity release. They are not interchangeable and should never be added together without clear definitions.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">Pilot design</div>
              <h2>A practical minimum standard for testing one intervention.</h2>
            </div>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Stage</th>
                  <th>What must be captured</th>
                  <th>Why it matters</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><strong>Baseline</strong></td><td>8 to 12 weeks of pre-intervention process and outcome data where available</td><td>Prevents one unusually good or bad week being mistaken for impact</td></tr>
                <tr><td><strong>Population</strong></td><td>Clear inclusion criteria and denominator</td><td>Stops selective reporting of only successful cases</td></tr>
                <tr><td><strong>Process</strong></td><td>Timestamped dependency data</td><td>Shows whether the mechanism actually changed</td></tr>
                <tr><td><strong>Outcome</strong></td><td>DRD delay, delayed bed days and relevant capacity metric</td><td>Connects process improvement to system value</td></tr>
                <tr><td><strong>Safety</strong></td><td>Readmissions, failed discharge, incidents and patient/carer concerns</td><td>Ensures speed is not purchased by transferring risk</td></tr>
                <tr><td><strong>Comparison</strong></td><td>Pre/post, matched ward/site or stepped implementation</td><td>Makes attribution more credible</td></tr>
                <tr><td><strong>Value</strong></td><td>Cash, cost avoidance and capacity release shown separately</td><td>Prevents inflated savings claims</td></tr>
                <tr><td><strong>Decision</strong></td><td>Continue, modify or stop rule agreed before the pilot starts</td><td>Turns measurement into management rather than reporting</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">Existing intervention library</div>
              <h2>Other resource-waste opportunities already identified.</h2>
            </div>
            <p>These remain separate from the discharge work but follow the same principle: detect waste, intervene safely, measure the pathway and verify the result.</p>
          </div>

          <div className="card-grid">
            {interventions.map((item) => (
              <article className="card evidence-card" key={item.slug}>
                <div className="meta-row">
                  <span className="badge">{item.domain}</span>
                  <span>Evidence: {item.evidence}</span>
                </div>
                <h3>{item.title}</h3>
                <div>
                  <strong>Problem</strong>
                  <p>{item.problem}</p>
                </div>
                <div>
                  <strong>Proposed intervention</strong>
                  <p>{item.intervention}</p>
                </div>
                <div>
                  <strong>Measure</strong>
                  <ul className="list-clean">
                    {item.measures.map((measure) => <li key={measure}>{measure}</li>)}
                  </ul>
                </div>
                <div>
                  <strong>Constraints</strong>
                  <ul className="list-clean">
                    {item.constraints.map((constraint) => <li key={constraint}>{constraint}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell card-grid">
          <article className="card">
            <span className="badge">Current NHS guidance</span>
            <h3>Model discharge pathway</h3>
            <p>Sets out the 2026 clinically-led discharge model, active management of delays, named ownership and cross-system coordination.</p>
            <a className="source-link" href="https://www.england.nhs.uk/long-read/model-discharge-pathway/" target="_blank" rel="noreferrer">Open NHS England guidance ↗</a>
          </article>
          <article className="card">
            <span className="badge">Current NHS guidance</span>
            <h3>Discharge to assess</h3>
            <p>Supports timely discharge with onward assessment and recovery support after leaving the inpatient setting where appropriate.</p>
            <a className="source-link" href="https://www.england.nhs.uk/long-read/standardising-community-health-services-core-component-descriptions/" target="_blank" rel="noreferrer">Open NHS England guidance ↗</a>
          </article>
          <article className="card">
            <span className="badge">Measurement</span>
            <h3>Discharge Ready Date guidance</h3>
            <p>Defines the national DRD measurement framework used to quantify delay after a patient is assessed as ready for discharge.</p>
            <a className="source-link" href="https://www.england.nhs.uk/long-read/discharge-ready-date-drd-guidance-and-scenarios/" target="_blank" rel="noreferrer">Open NHS England guidance ↗</a>
          </article>
        </div>
      </section>
    </>
  );
}
