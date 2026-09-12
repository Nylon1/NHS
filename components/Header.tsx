import Link from "next/link";

const primary = [
  ["See it working", "/demo"],
  ["Medicines", "/medicines-proposal"],
  ["Commissioner", "/commissioner-summary"],
  ["Evidence", "/evidence"],
  ["Pilot", "/pilot"],
  ["FAQ", "/faq"],
];

const more = [
  ["Business case", "/business-case"],
  ["Technical implementation", "/technical-implementation"],
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

function SitoraMark() {
  return (
    <span className="sitora-mark" aria-hidden="true">
      <svg viewBox="0 0 48 48" role="img">
        <rect x="2" y="2" width="44" height="44" rx="12" />
        <path d="M15 17.5c2.1-3.4 5.5-5.2 9.7-5.2 4 0 7.1 1.3 9.4 3.8l-3.2 3.2c-1.5-1.6-3.6-2.5-6.1-2.5-2.7 0-4.6.9-5.6 2.5-.8 1.2-.5 2.3.8 3 1 .5 2.8.9 5.4 1.3 3.6.5 6.1 1.5 7.5 3 1.6 1.7 2 4 1.2 6.6-1 3.5-4.7 5.9-9.9 5.9-4.7 0-8.5-1.7-11.1-5l3.4-3.1c1.9 2.2 4.5 3.3 7.7 3.3 2.7 0 4.5-.8 5.1-2.2.5-1.2.2-2.2-.9-2.8-1-.6-2.9-1.1-5.8-1.5-3.5-.5-5.9-1.4-7.3-2.8-1.7-1.7-2-4.3-.3-7.5Z" />
        <circle cx="35.5" cy="12.5" r="3.5" className="sitora-mark-dot" />
      </svg>
    </span>
  );
}

export default function Header() {
  return (
    <>
      <div className="independence-bar"><div className="shell">Independent research and innovation platform. Not an NHS organisation or NHS-endorsed service.</div></div>
      <header className="site-header">
        <div className="shell header-inner">
          <Link className="brand" href="/" aria-label="Sitora home">
            <SitoraMark />
            <span className="brand-copy"><strong>Sitora</strong><small>Medicines & Resource Intelligence</small></span>
          </Link>
          <nav aria-label="Primary navigation" className="primary-nav">
            {primary.map(([label, href], index) => <Link className={index === 0 ? "nav-demo-link" : undefined} key={href} href={href}>{label}</Link>)}
            <details className="nav-more"><summary>More</summary><div className="nav-menu">{more.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</div></details>
          </nav>
        </div>
      </header>
    </>
  );
}
