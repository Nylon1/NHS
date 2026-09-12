import Link from "next/link";

const primary = [
  ["Medicines", "/medicines-proposal"],
  ["Demo", "/demo"],
  ["Commissioner", "/commissioner-summary"],
  ["Evidence", "/evidence"],
  ["Pilot", "/pilot"],
  ["FAQ", "/faq"],
];

const more = [
  ["Business case", "/business-case"],
  ["Dashboard", "/dashboard"],
  ["Benchmarking", "/benchmarking"],
  ["Bottlenecks", "/bottlenecks"],
  ["Findings", "/findings"],
  ["Loss map", "/loss-map"],
  ["Opportunity register", "/opportunities"],
  ["Resource register", "/register"],
  ["Research", "/research"],
  ["Interventions", "/interventions"],
  ["Methodology", "/methodology"],
];

export default function Header() {
  return (
    <>
      <div className="independence-bar">
        <div className="shell">Independent research and innovation platform. Not an NHS organisation or NHS-endorsed service.</div>
      </div>
      <header className="site-header">
        <div className="shell header-inner">
          <Link className="brand" href="/" aria-label="Sitora home">
            <span className="brand-mark">S</span>
            <span>
              <strong>Sitora</strong>
              <small>Healthcare Resource Intelligence</small>
            </span>
          </Link>
          <nav aria-label="Primary navigation" className="primary-nav">
            {primary.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
            <details className="nav-more">
              <summary>More</summary>
              <div className="nav-menu">
                {more.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
              </div>
            </details>
          </nav>
        </div>
      </header>
    </>
  );
}
