import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-brand-row">
        <div className="footer-brand-block">
          <div className="footer-brand-mark" aria-hidden="true">S</div>
          <div><div className="footer-kicker">Sitora</div><strong>Medicines & Resource Intelligence</strong></div>
        </div>
        <p className="footer-summary">Closing medication changes across organisations, preventing avoidable supply and verifying where medicines pathways can safely release resource.</p>
      </div>

      <div className="shell footer-links-grid">
        <div><span className="footer-label">Products</span><Link href="/demo/medicine-loop">Medicine Loop</Link><Link href="/demo/wasteguard">WasteGuard</Link><Link href="/demo/medicines-resource-intelligence">Resource Intelligence</Link></div>
        <div><span className="footer-label">Evaluation</span><Link href="/demo">See it working</Link><Link href="/evidence">Evidence</Link><Link href="/pilot">Pilot</Link><Link href="/business-case">Business case</Link></div>
        <div><span className="footer-label">For decision-makers</span><Link href="/commissioner-summary">Commissioner summary</Link><Link href="/medicines-proposal">Medicines proposal</Link><Link href="/faq">FAQ</Link></div>
        <div><span className="footer-label">Independent status</span><p className="footer-note">Sitora is an independent research and innovation platform. It is not an NHS organisation and does not imply NHS endorsement. Content is proposal and research material, not clinical guidance.</p></div>
      </div>

      <div className="shell footer-bottom"><span>© 2026 Sitora</span><span>Evidence first · clinically governed · benefit verified</span></div>
    </footer>
  );
}
