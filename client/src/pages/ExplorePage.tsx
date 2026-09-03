/* Style reminder: Editorial Growth Ledger — this is the second static home screen: spacious, practical, and clearly navigational without a carousel or sliding interaction. */
import { ArrowDownRight, ArrowUpRight, BriefcaseBusiness, Contact, Globe2, Info, Layers3, ListChecks, LockKeyhole, Route, Sparkles, Users } from "lucide-react";
import { Link } from "wouter";

const destinations = [
  { number: "01", label: "Past Work", title: "Proof with a pulse.", copy: "Open the client archive and inspect the first three live project chapters.", href: "/work", icon: BriefcaseBusiness, tone: "coral" },
  { number: "02", label: "Services", title: "Clear services. Useful movement.", copy: "See every capability e_commerce.hub brings to businesses and startups.", href: "/services", icon: Sparkles, tone: "blue" },
  { number: "03", label: "Packages", title: "Choose your starting point.", copy: "Compare Basic, High Level, Advance, and Premium scopes. Pricing is declared soon.", href: "/packages", icon: Layers3, tone: "navy" },
];

const studioLinks = [
  { label: "About", copy: "Read the studio story and how we work.", href: "/studio#about", icon: Info },
  { label: "Team", copy: "Meet Abhishek, Yash, and Himanshu.", href: "/team", icon: Users },
  { label: "Contact", copy: "Send an enquiry or reach the team directly.", href: "/studio#contact", icon: Contact },
  { label: "Founder Console", copy: "Open Work to access project management.", href: "/studio#work", icon: LockKeyhole },
  { label: "Method", copy: "See the three-part operating approach.", href: "/studio#signal", icon: Route },
  { label: "Trust", copy: "Inspect the honest proof section.", href: "/studio#trust", icon: ListChecks },
  { label: "Global Reach", copy: "Explore the local-to-global visual.", href: "/studio#global", icon: Globe2 },
  { label: "Journey", copy: "Walk through the studio process.", href: "/studio#journey", icon: Sparkles },
  { label: "FAQ", copy: "Get practical answers before enquiry.", href: "/studio#faq", icon: Info },
];

export default function ExplorePage() {
  return <div className="explore-page"><header className="explore-nav"><Link className="detail-back" href="/">e_commerce<span>.hub</span></Link><Link className="detail-home-link" href="/"><ArrowDownRight size={16} /> Back to home</Link></header><main><section className="explore-hero"><div><p className="eyebrow"><span>e_commerce.hub / 02</span> Explore the studio</p><h1>Choose the<br /><em>next page.</em></h1><p>Two home screens, no carousel. Use the heading buttons below to open a dedicated page with the full detail.</p></div><div className="explore-index"><span>Navigation / 01—03</span><strong>02</strong><small>static studio directory</small></div></section><section className="explore-destinations" aria-label="Explore e_commerce.hub"><div className="explore-section-heading"><p className="eyebrow"><span>Directory</span> The important bits</p><h2>Open the section<br /><em>you came for.</em></h2></div><div className="explore-grid">{destinations.map((destination) => { const Icon = destination.icon; return <Link className={`explore-card explore-card-${destination.tone}`} href={destination.href} key={destination.number}><div className="explore-card-top"><span>{destination.number} / {destination.label}</span><Icon size={20} /></div><div><h3>{destination.title}</h3><p>{destination.copy}</p></div><span className="explore-card-link">Open page <ArrowUpRight size={16} /></span></Link>; })}</div></section><section className="explore-studio-links" aria-labelledby="studio-links-title"><div className="explore-section-heading"><p className="eyebrow"><span>Directory / 04—07</span> More from the studio</p><h2 id="studio-links-title">Keep the rest<br /><em>within reach.</em></h2></div><div className="studio-links-grid">{studioLinks.map((link) => { const Icon = link.icon; return <Link className="studio-link-card" href={link.href} key={link.label}><div><Icon size={18} /><span>{link.label}</span></div><p>{link.copy}</p><ArrowUpRight size={17} /></Link>; })}</div></section><section className="explore-footer-cta"><span>Need a recommendation?</span><h2>Start with the<br /><em>useful question.</em></h2><Link href="/#contact" className="button button-coral">Talk to the studio <ArrowUpRight size={16} /></Link></section></main><footer className="detail-page-footer"><div><strong>e_commerce<span>.hub</span></strong><p>Marketing, social growth, and websites for the next move.</p></div><Link href="/">Return to homepage <ArrowDownRight size={16} /></Link></footer></div>;
}
