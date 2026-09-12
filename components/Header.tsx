import Link from "next/link";

const nav = [
  ["Dashboard", "/dashboard"],
  ["Benchmarking", "/benchmarking"],
  ["Bottlenecks", "/bottlenecks"],
  ["Opportunities", "/opportunities"],
  ["Findings", "/findings"],
  ["Loss map", "/loss-map"],
  ["Register", "/register"],
  ["Evidence", "/evidence"],
  ["Research", "/research"],
  ["Interventions", "/interventions"],
  ["Pilot", "/pilot"],
  ["Methodology", "/methodology"],
];

export default function Header() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/">
          <span className="brand-mark">S</span>
          <span>
            <strong>Sitora</strong>
            <small>NHS Resource Intelligence</small>
          </span>
        </Link>
        <nav aria-label="Primary navigation">
          {nav.map(([label, href]) => (
            <Link key={href} href={href}>{label}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
