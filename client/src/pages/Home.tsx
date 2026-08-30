/*
  Style reminder: Editorial Growth Ledger — warm paper, ink navy, signal coral,
  cobalt and chartreuse; asymmetric editorial composition; Space Grotesk + DM Sans;
  tactile collage texture; confident motion that supports clarity.
*/
import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  CircleArrowOutUpRight,
  Globe2,
  Menu,
  MoveUpRight,
  Sparkles,
  X,
} from "lucide-react";

const STORAGE = "/manus-storage/";

const projects = [
  {
    number: "01",
    title: "Retail, ready for more",
    type: "Brand + digital storefront",
    detail: "A clear, conversion-minded system for a product brand stepping beyond its first market.",
    image: `${STORAGE}ecommerce-hub-project-retail_ccd8ad52.jpg`,
    tone: "project-coral",
    tag: "Commerce",
  },
  {
    number: "02",
    title: "A louder social signal",
    type: "Social growth system",
    detail: "A repeatable content rhythm that gives a growing business more ways to be remembered.",
    image: `${STORAGE}ecommerce-hub-project-social_0a4e3731.jpg`,
    tone: "project-blue",
    tag: "Social",
  },
  {
    number: "03",
    title: "The website as a closer",
    type: "Strategy + web design",
    detail: "A digital experience built to move visitors from curious to confident, one decision at a time.",
    image: `${STORAGE}ecommerce-hub-project-web_cdd86016.jpg`,
    tone: "project-navy",
    tag: "Web",
  },
  {
    number: "04",
    title: "Local brand, broader map",
    type: "Go-to-market direction",
    detail: "Sharper positioning, stronger touchpoints, and a launch plan built around real-world momentum.",
    image: null,
    tone: "project-chartreuse",
    tag: "Launch",
  },
  {
    number: "05",
    title: "From idea to storefront",
    type: "Startup growth partner",
    detail: "The practical first chapter for a founder who needs the story, system, and next move to align.",
    image: null,
    tone: "project-paper",
    tag: "Startup",
  },
];

const services = [
  {
    number: "01",
    title: "Marketing that finds the signal",
    copy: "Positioning, content direction, and launch thinking that make the right people stop scrolling and start paying attention.",
  },
  {
    number: "02",
    title: "Social growth with a point of view",
    copy: "A practical content system for showing up consistently, sounding like a real business, and earning the next click.",
  },
  {
    number: "03",
    title: "Websites that carry the story",
    copy: "Clear, confident websites for businesses and startups that need to turn interest into an honest conversation.",
  },
];

const steps = [
  {
    index: "A",
    title: "Find the signal",
    copy: "We listen for what makes the business matter, then turn it into a sharper story and a more useful direction.",
  },
  {
    index: "B",
    title: "Build the system",
    copy: "We shape the content, campaign, and digital touchpoints so every part of the brand feels like it belongs together.",
  },
  {
    index: "C",
    title: "Move the number",
    copy: "We focus on the next meaningful action — the click, enquiry, sale, or step forward that keeps the business moving.",
  },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id: string) => {
    setMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <div className="site-shell">
      <div className="noise-layer" aria-hidden="true" />

      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <a className="wordmark" href="#top" aria-label="e_commerce.hub home">
          <span className="wordmark-mark" aria-hidden="true">
            <img src={`${STORAGE}ecommerce-hub-symbol_d92f1230.png`} alt="" />
          </span>
          <span className="wordmark-type">
            <span>e_commerce</span><b>.hub</b>
          </span>
        </a>

        <nav className={`site-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
          <button type="button" onClick={() => handleNav("services")}>Services</button>
          <button type="button" onClick={() => handleNav("work")}>Work</button>
          <button type="button" onClick={() => handleNav("about")}>About</button>
          <button type="button" onClick={() => handleNav("contact")}>Contact</button>
        </nav>

        <button className="header-cta" type="button" onClick={() => handleNav("contact")}>
          <span>Talk to us</span>
          <ArrowUpRight size={16} strokeWidth={2.2} />
        </button>

        <button
          type="button"
          className="menu-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-grid-mark" aria-hidden="true"><span /><span /><span /></div>
          <div className="hero-copy reveal-up">
            <p className="eyebrow"><span className="eyebrow-dot" /> Growth partners for the next move</p>
            <h1 id="hero-title">Make your next <em>market</em> feel closer.</h1>
            <p className="hero-lede">
              e_commerce.hub helps businesses and startups move from local attention to global demand — through clear marketing, social growth, and websites built to convert.
            </p>
            <div className="hero-actions">
              <button className="button button-coral" type="button" onClick={() => handleNav("contact")}>
                Start a conversation <ArrowUpRight size={17} />
              </button>
              <button className="text-link" type="button" onClick={() => handleNav("work")}>
                See our work <ArrowDownRight size={16} />
              </button>
            </div>
            <div className="hero-footnote">
              <span className="hero-rule" />
              <span>Founded by Abhishek Damale + Yash Mete</span>
            </div>
          </div>

          <div className="hero-visual reveal-up delay-1">
            <div className="hero-visual-label label-coral">built for momentum <ArrowUpRight size={14} /></div>
            <div className="hero-image-wrap">
              <img
                src={`${STORAGE}ecommerce-hub-hero_598609b3.jpg`}
                alt="Abstract coral and cobalt collage representing a business moving forward"
              />
              <div className="hero-image-wash" aria-hidden="true" />
              <div className="hero-visual-stamp">
                <span>Local</span>
                <ArrowUpRight size={18} />
                <span>Global</span>
              </div>
            </div>
            <div className="hero-stat-card">
              <span className="stat-kicker">Past projects</span>
              <strong>05</strong>
              <span className="stat-note">and the next one could be yours.</span>
            </div>
            <div className="hero-crosshair" aria-hidden="true"><span /><span /></div>
            <div className="hero-brand-device" aria-hidden="true">
              <img src={`${STORAGE}ecommerce-hub-symbol_d92f1230.png`} alt="" />
              <span>e_commerce.hub / 01</span>
            </div>
          </div>
        </section>

        <div className="marquee-band" aria-label="Agency capabilities">
          <div className="marquee-track">
            <span>Strategy <b>✳</b></span><span>Social growth <b>✳</b></span><span>Websites <b>✳</b></span><span>Local to global <b>✳</b></span><span>Strategy <b>✳</b></span><span>Social growth <b>✳</b></span><span>Websites <b>✳</b></span>
          </div>
        </div>

        <section id="services" className="section services-section">
          <div className="section-intro">
            <p className="eyebrow"><span>01</span> What we move</p>
            <h2>Good work is useful<br /><em>before</em> it is loud.</h2>
            <p className="section-note">We keep the work close to the business. Every idea earns its place by making the next step clearer.</p>
          </div>
          <div className="service-list">
            {services.map((service) => (
              <article className="service-row" key={service.number}>
                <div className="service-number">{service.number}</div>
                <div className="service-content">
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                </div>
                <div className="service-arrow"><ArrowUpRight size={20} /></div>
              </article>
            ))}
          </div>
        </section>

        <section className="signal-section" aria-labelledby="signal-title">
          <div className="signal-badge"><Sparkles size={16} /> the e_commerce.hub method</div>
          <div className="signal-heading">
            <p className="eyebrow eyebrow-light"><span>02</span> How we work</p>
            <h2 id="signal-title">From <em>signal</em><br />to momentum.</h2>
          </div>
          <div className="signal-steps">
            {steps.map((step) => (
              <article className="signal-step" key={step.index}>
                <div className="step-top"><span>{step.index}</span><ArrowUpRight size={17} /></div>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
          <div className="signal-footer"><span>Small team. Close attention.</span><span>Made for businesses with somewhere to go <ArrowUpRight size={15} /></span></div>
        </section>

        <section id="work" className="section work-section">
          <div className="work-heading">
            <div>
              <p className="eyebrow"><span>03</span> Selected work</p>
              <h2>Five chapters.<br /><em>One direction.</em></h2>
            </div>
            <p className="work-note">A few of the businesses and ideas we have helped shape. Real names and project details can be added here as your portfolio grows.</p>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <article className={`project-card ${project.tone}`} key={project.number}>
                <div className="project-topline"><span>{project.number}</span><span>{project.tag}</span></div>
                {project.image ? (
                  <div className="project-image"><img src={project.image} alt={`${project.title} project visual`} /><div className="project-image-overlay" /></div>
                ) : (
                  <div className="project-abstract" aria-hidden="true">
                    <div className="abstract-line" /><div className="abstract-block" /><div className="abstract-circle" /><img className="abstract-symbol" src={`${STORAGE}ecommerce-hub-symbol_d92f1230.png`} alt="" /><span>{project.number}</span>
                  </div>
                )}
                <div className="project-copy">
                  <p>{project.type}</p>
                  <h3>{project.title}</h3>
                  <span>{project.detail}</span>
                  <button type="button" className="project-link" onClick={() => handleNav("contact")}>
                    Discuss a similar move <CircleArrowOutUpRight size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="section founders-section">
          <div className="founders-aside">
            <p className="eyebrow"><span>04</span> The people behind it</p>
            <div className="founders-word">two<br /><em>minds</em><br />moving<br />one idea.</div>
            <p className="founders-note">e_commerce.hub is a two-person agency built around close collaboration, useful questions, and work that keeps its feet on the ground.</p>
          </div>
          <div className="founder-cards">
            <article className="founder-card founder-card-coral">
              <div className="founder-card-top"><span>01 / Founder</span><ArrowUpRight size={18} /></div>
              <div className="founder-initials">AD</div>
              <div className="founder-card-bottom"><h3>Abhishek<br />Damale</h3><p>Strategy, positioning, and the question that makes the whole thing click.</p></div>
            </article>
            <article className="founder-card founder-card-blue">
              <div className="founder-card-top"><span>02 / Founder</span><ArrowUpRight size={18} /></div>
              <div className="founder-initials">YM</div>
              <div className="founder-card-bottom"><h3>Yash<br />Mete</h3><p>Digital systems, social momentum, and the details people remember.</p></div>
            </article>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-grid-line" aria-hidden="true" />
          <div className="contact-copy">
            <p className="eyebrow"><span>05</span> Your next move</p>
            <h2>Ready to move from <em>local</em> to global?</h2>
            <p>Tell us what you are building, where it is stuck, or where you want it to go. We will come back with a useful first thought.</p>
            <a className="button button-navy" href="mailto:hello@ecommercehub.agency">
              hello@ecommercehub.agency <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="contact-mark" aria-hidden="true">
            <div className="contact-symbol"><img src={`${STORAGE}ecommerce-hub-symbol_d92f1230.png`} alt="" /></div>
            <Globe2 size={76} strokeWidth={1.1} />
            <span>local / global</span>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-top">
          <a className="wordmark footer-wordmark" href="#top" aria-label="e_commerce.hub home">
            <span className="wordmark-mark" aria-hidden="true"><img src={`${STORAGE}ecommerce-hub-symbol_d92f1230.png`} alt="" /></span>
            <span className="wordmark-type"><span>e_commerce</span><b>.hub</b></span>
          </a>
          <p>Small team. Big direction.<br />Local to global, by design.</p>
          <button className="footer-back" type="button" onClick={() => scrollToSection("top")}>Back to top <ArrowUpRight size={16} /></button>
        </div>
        <div className="footer-bottom"><span>© 2026 e_commerce.hub</span><span>Marketing / Social / Web</span><span>Built with intent in India</span></div>
      </footer>
    </div>
  );
}
