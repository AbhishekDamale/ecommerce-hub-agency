/*
  Style reminder: Editorial Growth Ledger, upgraded with Sora + Manrope,
  quiet paper neutrals, coral action moments, cobalt trust, chartreuse flashes,
  refined scroll reveals, and a founder-only local portfolio console.
*/
import { FormEvent, useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  CircleArrowOutUpRight,
  Loader2,
  Facebook,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Globe2,
  Instagram,
  Linkedin,
  LockKeyhole,
  Menu,
  MoveUpRight,
  Pencil,
  Plus,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";

const STORAGE = "/manus-storage/";
const AGENCY_LOGO = `${STORAGE}ecommerce-hub-agency-logo_5b64a04c.jpeg`;
const YASH_PHOTO = `${STORAGE}yash-mete-portrait_cf15b695.jpeg`;
const ABHISHEK_PHOTO = `${STORAGE}abhishek-damale-portrait_abc61bb6.png`;
const HIMANSHU_PHOTO = `${STORAGE}himanshu-kharwade-portrait_9e9d475c.jpeg`;
const PROJECTS_KEY = "ecommerce-hub-projects-v3";
const FOUNDER_CODE = "BDAY29052006";

type Tone = "project-coral" | "project-blue" | "project-navy" | "project-chartreuse" | "project-paper";
type Project = {
  id: string;
  number: string;
  title: string;
  type: string;
  detail: string;
  image: string | null;
  tone: Tone;
  tag: string;
  link: string;
  published: boolean;
};

type ProjectDraft = Omit<Project, "id" | "number">;
type FounderProfile = { name: string; initials: string; role: string; email?: string; phone?: string; instagram?: string; education: string; focus: string; color: "coral" | "blue" | "navy"; photo: string };

const founderProfiles: FounderProfile[] = [
  { name: "Abhishek Damale", initials: "AD", role: "Co-founder + Developer", email: "abhishekdamale67@gmail.com", phone: "9112658707", instagram: "https://www.instagram.com/abhishek_damale006?igsi=YTF1NTM3bHJ1ZDdr", education: "3rd Year Engineering Student · Computer Science · Savitribai Phule Pune University", focus: "Web development, digital systems, and turning early ideas into useful online experiences.", color: "coral", photo: ABHISHEK_PHOTO },
  { name: "Yash Mete", initials: "YM", role: "Co-founder + Developer", email: "yashmete266@gmail.com", phone: "8378976036", instagram: "https://www.instagram.com/yash_mete_patil?igsi=OGRpbXZ5OWtvcWJh", education: "3rd Year Engineering Student · Computer Science · Savitribai Phule Pune University", focus: "Web development, social growth, and the details that make a digital presence feel clear and memorable.", color: "blue", photo: YASH_PHOTO },
  { name: "Himanshu Kharwade", initials: "HK", role: "Engineering Student · Social Media & Design Head", phone: "9158515720", instagram: "https://www.instagram.com/himanshunplugged?igsi=MTNvMjhlcXk3ZjEzYQ==", education: "Engineering Student · AIDS Department", focus: "Social media coordination, visual design, and helping the studio show up with clarity and consistency.", color: "navy", photo: HIMANSHU_PHOTO },
];

const defaultProjects: Project[] = [
  { id: "pachorekar-jewellers", number: "01", title: "Pachorekar Jewellers", type: "Jewellery catalogue + customer journey", detail: "A catalogue-led jewellery experience with product categories, appointment booking, care guidance, location, FAQ, and direct contact paths.", image: null, tone: "project-coral", tag: "Jewellery / Web", link: "https://www.pachorekarjewellers.co.in/", published: true },
  { id: "angad-international", number: "02", title: "Angad International", type: "Agriculture export website", detail: "A focused export experience for fresh produce, spices, and dehydrated products, supported by product discovery, export capabilities, and inquiry CTAs.", image: null, tone: "project-blue", tag: "Agri / Export", link: "https://www.angadinternational.com/", published: true },
  { id: "sahyadri-global-traders", number: "03", title: "Sahyadri Global Traders", type: "Global agriculture trade platform", detail: "A global agriculture-trade experience centered on export products, quality assurance, cold-chain logistics, insight articles, and direct enquiries.", image: null, tone: "project-navy", tag: "Agri / Global", link: "https://www.sahyadriglobaltraders.com/", published: true },
  { id: "launch", number: "04", title: "Local brand, broader map", type: "Go-to-market direction", detail: "A future portfolio chapter for sharper positioning, stronger touchpoints, and a launch plan built around real-world momentum.", image: null, tone: "project-chartreuse", tag: "Launch", link: "", published: true },
  { id: "startup", number: "05", title: "From idea to storefront", type: "Startup growth partner", detail: "A future portfolio chapter for a founder who needs the story, system, and next move to align.", image: null, tone: "project-paper", tag: "Startup", link: "", published: true },
];

const services = [
  { number: "01", title: "Marketing that finds the signal", copy: "Positioning, content direction, and launch thinking that make the right people stop scrolling and start paying attention." },
  { number: "02", title: "Social growth with a point of view", copy: "A practical content system for showing up consistently, sounding like a real business, and earning the next click." },
  { number: "03", title: "Websites that carry the story", copy: "Clear, confident websites for businesses and startups that need to turn interest into an honest conversation." },
];

const packages = [
  { number: "01", name: "Basic", note: "A focused starting point", copy: "For businesses that need a clear first step and a reliable digital foundation.", includes: ["Discovery and direction session", "Essential marketing guidance", "Social profile improvement plan", "Clear next-step roadmap"], tone: "paper" },
  { number: "02", name: "High Level", note: "A sharper market presence", copy: "For teams ready to bring strategy, content, and customer touchpoints into one stronger system.", includes: ["Positioning and content direction", "Social media growth plan", "Website structure recommendations", "Campaign-ready content priorities"], tone: "blue" },
  { number: "03", name: "Advance", note: "Built for consistent movement", copy: "For growing businesses that want an active partner across marketing, social, and web execution.", includes: ["Integrated marketing direction", "Ongoing social growth support", "Conversion-focused website guidance", "Monthly movement review"], tone: "coral" },
  { number: "04", name: "Premium", note: "A complete growth partner", copy: "For ambitious brands that want close collaboration across the full journey from local attention to wider demand.", includes: ["Full-funnel growth direction", "Priority creative and social support", "Website strategy and build oversight", "Dedicated partnership planning"], tone: "navy" },
];

const steps = [
  { index: "A", title: "Find the signal", copy: "We listen for what makes the business matter, then turn it into a sharper story and a more useful direction." },
  { index: "B", title: "Build the system", copy: "We shape the content, campaign, and digital touchpoints so every part of the brand feels like it belongs together." },
  { index: "C", title: "Move the number", copy: "We focus on the next meaningful action — the click, enquiry, sale, or step forward that keeps the business moving." },
];

const journeySteps = [
  { index: "01", label: "Brief", copy: "We learn what needs to move." },
  { index: "02", label: "Direction", copy: "We find the clearest signal." },
  { index: "03", label: "Build", copy: "We make the system useful." },
  { index: "04", label: "Launch", copy: "We put the next move in motion." },
];

const globalSignals = [
  { label: "Origin", detail: "Local context", x: "25%", y: "67%" },
  { label: "Reach", detail: "Digital touchpoints", x: "63%", y: "37%" },
  { label: "Next", detail: "A wider audience", x: "82%", y: "58%" },
];

const faqs = [
  { question: "What does e_commerce.hub help with?", answer: "We help businesses and startups with marketing direction, social media growth, and websites built to turn attention into a useful next conversation." },
  { question: "How can I start an enquiry?", answer: "Use the enquiry form, email ecommercehub54@gmail.com, call either founder, or message Yash on WhatsApp. Share what you are building and what needs to move." },
  { question: "Who do you work with?", answer: "We are set up for businesses and startups that want a sharper digital presence, clearer positioning, or a more practical route from local attention to wider demand." },
  { question: "Can I see your past work?", answer: "Yes. The Work section includes linked projects for Pachorekar Jewellers, Angad International, and Sahyadri Global Traders, with more chapters ready to be added by the founders." },
];

const blankDraft: ProjectDraft = { title: "", type: "", detail: "", image: null, tone: "project-coral", tag: "New project", link: "", published: true };

function scrollToSection(id: string) { document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }
function loadProjects() {
  try {
    const stored = window.localStorage.getItem(PROJECTS_KEY);
    return stored ? (JSON.parse(stored) as Project[]) : defaultProjects;
  } catch { return defaultProjects; }
}
function saveProjects(items: Project[]) { window.localStorage.setItem(PROJECTS_KEY, JSON.stringify(items)); }

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("services");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success">("idle");
  const [trustVisible, setTrustVisible] = useState(false);
  const [trustCounts, setTrustCounts] = useState([0, 0, 0]);
  const [journeyVisible, setJourneyVisible] = useState(false);
  const [journeyStep, setJourneyStep] = useState(0);
  const [faqOpen, setFaqOpen] = useState(0);
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [founderOpen, setFounderOpen] = useState(false);
  const [accessOpen, setAccessOpen] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [accessError, setAccessError] = useState("");
  const [projectModal, setProjectModal] = useState<Project | null>(null);
  const [founderModal, setFounderModal] = useState<FounderProfile | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<ProjectDraft>(blankDraft);
  const [savedNotice, setSavedNotice] = useState("");

  useEffect(() => {
    setProjects(loadProjects());
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollable > 0 ? Math.min(100, Math.round((window.scrollY / scrollable) * 100)) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.14 });
    document.querySelectorAll(".reveal-on-scroll").forEach((element) => revealObserver.observe(element));
    const sectionObserver = new IntersectionObserver((entries) => entries.forEach((entry) => { if (!entry.isIntersecting) return; const navSection = entry.target.id === "work" ? "work" : entry.target.id === "about" ? "about" : entry.target.id === "contact" ? "contact" : "services"; setActiveSection(navSection); if (entry.target.id === "trust") setTrustVisible(true); if (entry.target.id === "journey") setJourneyVisible(true); }), { rootMargin: "-28% 0px -58%", threshold: 0 });
    document.querySelectorAll("main section[id]").forEach((section) => sectionObserver.observe(section));
    return () => { window.removeEventListener("scroll", onScroll); revealObserver.disconnect(); sectionObserver.disconnect(); };
  }, []);

  useEffect(() => {
    if (!trustVisible) return;
    const targets = [projects.filter((project) => project.published && project.link).length, founderProfiles.length, services.length];
    const started = performance.now();
    const duration = 680;
    const timer = window.setInterval(() => {
      const progress = Math.min(1, (performance.now() - started) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setTrustCounts(targets.map((target) => Math.round(target * eased)));
      if (progress === 1) window.clearInterval(timer);
    }, 40);
    return () => window.clearInterval(timer);
  }, [trustVisible, projects]);

  const handleNav = (id: string) => { setMenuOpen(false); scrollToSection(id); };
  const publishedProjects = projects.filter((project) => project.published);
  const verifiedProjects = publishedProjects.filter((project) => Boolean(project.link));
  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = `New e_commerce.hub enquiry from ${String(form.get("name") || "a new lead")}`;
    const body = [`Name: ${form.get("name") || ""}`, `Phone: ${form.get("phone") || ""}`, `Email: ${form.get("email") || ""}`, `Requirement: ${form.get("message") || ""}`].join("\\n");
    setFormStatus("loading");
    window.setTimeout(() => { setFormStatus("success"); window.location.href = `mailto:ecommercehub54@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`; }, 480);
  };

  const openFounderAccess = () => { setAccessCode(""); setAccessError(""); setAccessOpen(true); };
  const verifyFounder = (event: FormEvent) => {
    event.preventDefault();
    if (accessCode.trim().toUpperCase() !== FOUNDER_CODE) { setAccessError("That code does not match the founder access key."); return; }
    setAccessOpen(false); setFounderOpen(true); setAccessError("");
  };
  const openNewProject = () => { setEditingId(null); setDraft(blankDraft); };
  const editProject = (project: Project) => {
    setEditingId(project.id);
    setDraft({ title: project.title, type: project.type, detail: project.detail, image: project.image, tone: project.tone, tag: project.tag, link: project.link, published: project.published });
  };
  const updateDraft = <K extends keyof ProjectDraft>(key: K, value: ProjectDraft[K]) => setDraft((current) => ({ ...current, [key]: value }));
  const submitProject = (event: FormEvent) => {
    event.preventDefault();
    if (!draft.title.trim() || !draft.type.trim() || !draft.detail.trim()) return;
    const next = editingId
      ? projects.map((project) => project.id === editingId ? { ...project, ...draft } : project)
      : [...projects, { ...draft, id: `project-${Date.now()}`, number: String(projects.length + 1).padStart(2, "0") }];
    setProjects(next); saveProjects(next); setEditingId(null); setDraft(blankDraft); setSavedNotice(editingId ? "Project updated" : "Project added");
    window.setTimeout(() => setSavedNotice(""), 2400);
  };
  const deleteProject = (id: string) => {
    const next = projects.filter((project) => project.id !== id).map((project, index) => ({ ...project, number: String(index + 1).padStart(2, "0") }));
    setProjects(next); saveProjects(next); if (editingId === id) { setEditingId(null); setDraft(blankDraft); }
  };
  const togglePublished = (id: string) => {
    const next = projects.map((project) => project.id === id ? { ...project, published: !project.published } : project);
    setProjects(next); saveProjects(next);
  };

  return (
    <div className="site-shell">
      <div className="noise-layer" aria-hidden="true" />
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <a className="agency-lockup" href="#top" aria-label="E-CommerceHub — Local to Global"><img className="agency-logo" src={AGENCY_LOGO} alt="" /><span className="agency-name"><strong>e_commerce<span>.hub</span></strong><small>LOCAL TO GLOBAL</small></span></a>
        <nav className={`site-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
          <button className={activeSection === "services" ? "is-active" : ""} type="button" onClick={() => handleNav("services")}>Services</button><button className={activeSection === "work" ? "is-active" : ""} type="button" onClick={() => handleNav("work")}>Work</button><button className={activeSection === "about" ? "is-active" : ""} type="button" onClick={() => handleNav("about")}>About</button><button className={activeSection === "contact" ? "is-active" : ""} type="button" onClick={() => handleNav("contact")}>Contact</button>
        </nav>
        <button className="header-cta" type="button" onClick={() => handleNav("contact")}><span>Talk to us</span><ArrowUpRight size={16} strokeWidth={2.2} /></button>
        <button type="button" className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
      </header>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-grid-mark" aria-hidden="true"><span /><span /><span /></div>
          <div className="hero-copy reveal-up"><p className="eyebrow"><span className="eyebrow-dot" /> Growth partners for the next move</p><h1 id="hero-title">Make your next <em>market</em> feel closer.</h1><p className="hero-lede">e_commerce.hub helps businesses and startups move from local attention to global demand — through clear marketing, social growth, and websites built to convert.</p><div className="hero-capabilities"><span><b>01</b> Fast moves</span><span><b>02</b> Clear thinking</span><span><b>03</b> Built to grow</span></div><div className="hero-actions"><button className="button button-coral" type="button" onClick={() => handleNav("work")}>Past work <ArrowUpRight size={17} /></button><button className="button button-paper" type="button" onClick={() => handleNav("services")}>Services <ArrowDownRight size={16} /></button><button className="button button-outline-light" type="button" onClick={() => handleNav("packages")}>Packages <ArrowUpRight size={16} /></button></div><div className="hero-footnote"><span className="hero-rule" /><span>Founded by Abhishek Damale + Yash Mete</span></div></div>
          <div className="hero-visual reveal-up delay-1"><div className="hero-visual-label label-coral">built for momentum <ArrowUpRight size={14} /></div><div className="hero-image-wrap"><img src={`${STORAGE}ecommerce-hub-hero_598609b3.jpg`} alt="Abstract coral and cobalt collage representing a business moving forward" /><div className="hero-image-wash" aria-hidden="true" /><div className="hero-visual-stamp"><span>Local</span><ArrowUpRight size={18} /><span>Global</span></div></div><div className="hero-stat-card"><span className="stat-kicker">Published work</span><strong>{String(verifiedProjects.length).padStart(2, "0")}</strong><span className="stat-note">and the next one could be yours.</span></div><div className="hero-crosshair" aria-hidden="true"><span /><span /></div><div className="hero-brand-device" aria-hidden="true"><img src={`${STORAGE}ecommerce-hub-symbol_d92f1230.png`} alt="" /><span>e_commerce.hub / 01</span></div></div>
        </section>
        <div className="marquee-band" aria-label="Agency capabilities"><div className="marquee-track"><span>Strategy <b>✳</b></span><span>Social growth <b>✳</b></span><span>Websites <b>✳</b></span><span>Local to global <b>✳</b></span><span>Strategy <b>✳</b></span><span>Social growth <b>✳</b></span><span>Websites <b>✳</b></span></div></div>

        <section id="services" className="section services-section"><span className="section-stamp services-stamp">Ledger / 01</span><div className="section-intro"><p className="eyebrow"><span>01</span> What we move</p><h2>Good work is useful<br /><em>before</em> it is loud.</h2><p className="section-note">We keep the work close to the business. Every idea earns its place by making the next step clearer.</p><div className="section-callout"><MoveUpRight size={15} /> Practical ideas. Visible movement.</div></div><div className="service-list">{services.map((service) => <article className="service-row reveal-on-scroll" key={service.number}><div className="service-number">{service.number}</div><div className="service-content"><h3>{service.title}</h3><p>{service.copy}</p></div><div className="service-arrow"><ArrowUpRight size={20} /></div></article>)}</div></section>

        <section id="packages" className="packages-section" aria-labelledby="packages-title"><div className="packages-heading reveal-on-scroll"><p className="eyebrow"><span>01A</span> Ways to work together</p><h2 id="packages-title">Choose the right<br /><em>starting point.</em></h2><p>Four ways to begin. Scope can be shaped around your goals, and final pricing will be declared soon.</p></div><div className="package-grid">{packages.map((pack) => <article className={`package-card package-${pack.tone} reveal-on-scroll`} key={pack.number}><div className="package-topline"><span>{pack.number}</span><span>Price declared soon</span></div><p className="package-note">{pack.note}</p><h3>{pack.name}</h3><p className="package-copy">{pack.copy}</p><ul>{pack.includes.map((item) => <li key={item}><Check size={14} /> {item}</li>)}</ul><button className="package-cta" type="button" onClick={() => handleNav("contact")}>Ask about {pack.name} <ArrowUpRight size={15} /></button></article>)}</div></section>

        <section className="signal-section" aria-labelledby="signal-title"><div className="signal-badge"><Sparkles size={16} /> the e_commerce.hub method</div><span className="section-stamp signal-stamp">Ledger / 02</span><div className="signal-heading"><p className="eyebrow eyebrow-light"><span>02</span> How we work</p><h2 id="signal-title">From <em>signal</em><br />to momentum.</h2></div><div className="signal-steps">{steps.map((step) => <article className="signal-step reveal-on-scroll" key={step.index}><div className="step-top"><span>{step.index}</span><ArrowUpRight size={17} /></div><h3>{step.title}</h3><p>{step.copy}</p></article>)}</div><div className="signal-footer"><span>Small team. Close attention.</span><span>Made for businesses with somewhere to go <ArrowUpRight size={15} /></span></div></section>

        <section id="trust" className="trust-section" aria-labelledby="trust-title"><div className="trust-heading"><p className="eyebrow"><span>02A</span> The signal, honestly</p><h2 id="trust-title">Proof you can<br /><em>actually inspect.</em></h2><p>We keep the proof close to the work. No inflated numbers, borrowed testimonials, or vague promises — just live project links, a small senior team, and a clear way to start.</p></div><div className="trust-stats"><article className="trust-stat reveal-on-scroll"><strong>{String(trustCounts[0]).padStart(2, "0")}</strong><span>Verified project links</span></article><article className="trust-stat reveal-on-scroll"><strong>{String(trustCounts[1]).padStart(2, "0")}</strong><span>Founders at the table</span></article><article className="trust-stat reveal-on-scroll"><strong>{String(trustCounts[2]).padStart(2, "0")}</strong><span>Core service lines</span></article></div></section>

        <section id="global" className="global-section" aria-labelledby="global-title"><div className="global-copy reveal-on-scroll"><p className="eyebrow eyebrow-light"><span>02B</span> Local → global</p><h2 id="global-title">Reach further<br /><em>without losing the plot.</em></h2><p>We help ambitious businesses carry a clear point of view from local attention into wider digital conversations.</p><div className="global-legend"><span><i className="legend-dot legend-origin" /> Origin</span><span><i className="legend-dot legend-reach" /> Reach</span><span><i className="legend-dot legend-next" /> Next move</span></div></div><div className="global-visual reveal-on-scroll" aria-label="Abstract global reach visual"><div className="global-orbit global-orbit-one" /><div className="global-orbit global-orbit-two" /><svg className="global-routes" viewBox="0 0 500 300" role="img" aria-label="Animated routes from local context to wider digital reach"><path d="M105 205 C180 130 255 106 315 120 S394 178 420 146" pathLength="1" /><path d="M105 205 C172 220 244 234 320 210 S384 175 420 146" pathLength="1" /></svg>{globalSignals.map((signal, index) => <div key={signal.label} className={`global-signal global-signal-${index}`} style={{ left: signal.x, top: signal.y }}><span className="global-signal-dot" /><div><strong>{signal.label}</strong><small>{signal.detail}</small></div></div>)}<span className="global-visual-caption">strategy / system / movement</span></div></section>

        <section id="journey" className="journey-section" aria-labelledby="journey-title"><div className="journey-heading reveal-on-scroll"><p className="eyebrow"><span>02C</span> The journey</p><h2 id="journey-title">A clear path<br /><em>forward.</em></h2><p>Good work should make the next move easier to see. Explore the way we take an idea from first brief to forward motion.</p></div><div className="journey-panel reveal-on-scroll"><div className={`journey-track ${journeyVisible ? "is-active" : ""}`}><div className="journey-progress-line" />{journeySteps.map((step, index) => <button type="button" key={step.index} className={`journey-step ${journeyStep === index ? "is-current" : ""}`} onClick={() => setJourneyStep(index)} aria-pressed={journeyStep === index}><span className="journey-step-dot">{step.index}</span><strong>{step.label}</strong><small>{step.copy}</small></button>)}</div><div className="journey-selected"><span>Now viewing / {journeySteps[journeyStep].index}</span><strong>{journeySteps[journeyStep].label}</strong><p>{journeySteps[journeyStep].copy}</p></div></div></section>

        <section className="faq-section" aria-labelledby="faq-title"><div className="faq-heading reveal-on-scroll"><p className="eyebrow"><span>02D</span> Useful answers</p><h2 id="faq-title">Questions worth<br /><em>asking first.</em></h2><p>Clear answers before the first call. If your question is more specific, send it through and we will respond directly.</p></div><div className="faq-list reveal-on-scroll">{faqs.map((faq, index) => <article className={`faq-item ${faqOpen === index ? "is-open" : ""}`} key={faq.question}><button type="button" aria-expanded={faqOpen === index} onClick={() => setFaqOpen(faqOpen === index ? -1 : index)}><span><small>0{index + 1}</small>{faq.question}</span><Plus size={18} /></button>{faqOpen === index && <div className="faq-answer"><p>{faq.answer}</p></div>}</article>)}</div></section>

        <section id="work" className="section work-section"><span className="section-stamp work-stamp">Ledger / 03</span><div className="work-heading"><div><p className="eyebrow"><span>03</span> Selected work</p><h2>Proof with a<br /><em>pulse.</em></h2></div><div className="work-heading-side"><p className="work-note">A growing body of work for businesses ready to make their next market feel closer.</p><span className="work-archive-label">Archive / 01—05 / Case studies</span><span className="work-caption">Selected signals from the studio</span><button type="button" className="founder-entry" onClick={openFounderAccess}><LockKeyhole size={14} /> Founders: manage projects</button></div></div><div className="project-grid">{publishedProjects.map((project) => <article className={`project-card project-${project.id} ${project.tone} reveal-on-scroll`} key={project.id} onClick={() => setProjectModal(project)} tabIndex={0} onKeyDown={(event) => { if (event.key === "Enter") setProjectModal(project); }}><div className="project-topline"><span>{project.number}</span><span>{project.tag}</span></div>{project.image ? <div className="project-image"><img loading="lazy" src={project.image} alt={`${project.title} project visual`} /><div className="project-image-overlay" /><span className="project-image-open">View case <ArrowUpRight size={13} /></span></div> : <div className="project-abstract" aria-hidden="true"><div className="abstract-line" /><div className="abstract-block" /><div className="abstract-circle" /><img className="abstract-symbol" src={`${STORAGE}ecommerce-hub-symbol_d92f1230.png`} alt="" /><span>{project.number}</span></div>}<div className="project-copy"><p>{project.type}</p><h3>{project.title}</h3><span>{project.detail}</span><div className="project-meta"><span>Proof status</span><b>Case study details on request</b></div><button type="button" className="project-link" onClick={(event) => { event.stopPropagation(); setProjectModal(project); }}>Open project <CircleArrowOutUpRight size={16} /></button></div></article>)}</div>{publishedProjects.length === 0 && <div className="empty-portfolio"><Sparkles size={18} /> The next project is waiting to be published from the founder console.</div>}</section>

        <section id="about" className="section founders-section"><span className="section-stamp founders-stamp">Ledger / 04</span><div className="founders-aside"><p className="eyebrow"><span>04</span> The people behind it</p><div className="founders-word">three<br /><em>minds</em><br />moving<br />one idea.</div><p className="founders-note">e_commerce.hub is a three-person agency built around close collaboration, useful questions, and work that keeps its feet on the ground.</p></div><div className="founder-cards"><article className="founder-card founder-card-coral reveal-on-scroll" role="button" tabIndex={0} onClick={() => setFounderModal(founderProfiles[0])} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setFounderModal(founderProfiles[0]); } }}><div className="founder-card-top"><span>01 / Founder</span><ArrowUpRight size={18} /></div><div className="founder-photo founder-photo-abhishek"><img loading="lazy" src={ABHISHEK_PHOTO} alt="Abhishek Damale" /><span>AD / 01</span></div><div className="founder-card-bottom"><h3>Abhishek<br />Damale</h3><p>Strategy, positioning, and the question that makes the whole thing click.</p></div></article><article className="founder-card founder-card-blue reveal-on-scroll" role="button" tabIndex={0} onClick={() => setFounderModal(founderProfiles[1])} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setFounderModal(founderProfiles[1]); } }}><div className="founder-card-top"><span>02 / Founder</span><ArrowUpRight size={18} /></div><div className="founder-photo founder-photo-yash"><img loading="lazy" src={YASH_PHOTO} alt="Yash Mete" /><span>YM / 02</span></div><div className="founder-card-bottom"><h3>Yash<br />Mete</h3><p>Digital systems, social momentum, and the details people remember.</p></div></article><article className="founder-card founder-card-navy reveal-on-scroll" role="button" tabIndex={0} onClick={() => setFounderModal(founderProfiles[2])} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setFounderModal(founderProfiles[2]); } }}><div className="founder-card-top"><span>03 / Team</span><ArrowUpRight size={18} /></div><div className="founder-photo founder-photo-himanshu"><img loading="lazy" src={HIMANSHU_PHOTO} alt="Himanshu Kharwade" /><span>HK / 03</span></div><div className="founder-card-bottom"><h3>Himanshu<br />Kharwade</h3><p>Social media coordination, visual design, and a sharper public-facing signal.</p></div></article></div></section>

        <section id="about" className="section about-section"><span className="section-stamp about-stamp">Ledger / 04A</span><div className="about-visual reveal-on-scroll"><div className="about-visual-main"><img loading="lazy" src={ABHISHEK_PHOTO} alt="Abhishek Damale, e_commerce.hub co-founder" /></div><div className="about-visual-side"><img loading="lazy" src={YASH_PHOTO} alt="Yash Mete, e_commerce.hub co-founder" /><span>Built close / built to move</span></div><div className="about-visual-tag">Local → Global<br />with intent.</div></div><div className="about-copy reveal-on-scroll"><p className="eyebrow"><span>04A</span> About the studio</p><h2>Small team.<br /><em>Useful ambition.</em></h2><p>e_commerce.hub is a three-person growth studio for businesses and startups that want sharper marketing, better social presence, and a website that earns the next conversation.</p><div className="about-points"><span><b>01</b> Close collaboration</span><span><b>02</b> Practical delivery</span><span><b>03</b> Local context, global intent</span></div><button className="button button-coral" type="button" onClick={() => scrollToSection("contact")}>Tell us what you’re building <ArrowUpRight size={16} /></button></div></section>

        <section id="contact" className="contact-section contact-section-upgraded"><span className="section-stamp contact-stamp">Ledger / 05</span><div className="contact-grid-line" aria-hidden="true" /><div className="contact-copy"><p className="eyebrow"><span>05</span> Your next move</p><h2>Ready to move from <em>local</em> to global?</h2><p>Tell us what you are building, where it is stuck, or where you want it to go. We will come back with a useful first thought.</p><div className="contact-options"><a href="mailto:ecommercehub54@gmail.com"><Mail size={15} /> Email us</a><a href="tel:+919112658707"><Phone size={15} /> Call Abhishek</a><a href="https://wa.me/918378976036" target="_blank" rel="noreferrer"><MessageCircle size={15} /> WhatsApp Yash</a><span><MapPin size={15} /> Location details on request</span></div></div><form aria-label="Project enquiry form" className="enquiry-form reveal-on-scroll" onSubmit={handleContactSubmit}><div className="form-kicker">Start with the useful bit.</div><label>Name<input required name="name" autoComplete="name" placeholder="Your name" /></label><div className="form-two-col"><label>Phone<input required name="phone" autoComplete="tel" placeholder="Your phone number" /></label><label>Email<input required type="email" name="email" autoComplete="email" placeholder="you@company.com" /></label></div><label>Requirement / message<textarea required name="message" rows={4} placeholder="What are you trying to move?" /></label><button className="button button-coral" type="submit" disabled={formStatus === "loading"}>{formStatus === "loading" ? <><Loader2 size={16} className="spin" /> Preparing email…</> : <>Send enquiry <ArrowUpRight size={16} /></>}</button>{formStatus === "success" && <div className="form-success"><Check size={16} /><span>Thanks — your enquiry is prepared. Your email app should open with the details.</span></div>}</form></section>
      </main>

      <footer className="site-footer"><div className="footer-top"><a className="agency-lockup footer-agency-lockup" href="#top" aria-label="E-CommerceHub — Local to Global"><img className="agency-logo" src={AGENCY_LOGO} alt="" /><span className="agency-name"><strong>e_commerce<span>.hub</span></strong><small>LOCAL TO GLOBAL</small></span></a><div className="footer-note"><p>Small team. Big direction.<br />Local to global, by design.</p><div className="social-links" aria-label="Social media links"><a className="social-link" href="https://www.instagram.com/e_commerce_hub02?igsi=ejVlY2hldTE2dTV4" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={17} /><span>Instagram</span></a><button className="social-link social-link-soon" type="button" disabled title="Facebook link coming soon" aria-label="Facebook link coming soon"><Facebook size={17} /><span>Facebook · soon</span></button><button className="social-link social-link-soon" type="button" disabled title="LinkedIn link coming soon" aria-label="LinkedIn link coming soon"><Linkedin size={17} /><span>LinkedIn · soon</span></button></div></div><button className="footer-back" type="button" onClick={() => scrollToSection("top")}>Back to top <ArrowUpRight size={16} /></button></div><div className="footer-directory"><div><span className="footer-directory-label">Navigate</span><button type="button" onClick={() => scrollToSection("services")}>Services</button><button type="button" onClick={() => scrollToSection("work")}>Selected work</button><button type="button" onClick={() => scrollToSection("about")}>About the studio</button></div><div><span className="footer-directory-label">Capabilities</span><span>Marketing direction</span><span>Social growth</span><span>Web design + build</span></div><div><span className="footer-directory-label">Contact</span><a href="mailto:ecommercehub54@gmail.com">ecommercehub54@gmail.com</a><a href="tel:+919112658707">+91 91126 58707</a><a href="tel:+918378976036">+91 83789 76036</a></div></div><div className="footer-bottom"><span>© 2026 e_commerce.hub</span><span>Marketing / Social / Web</span><button type="button" className="footer-founder-link" onClick={openFounderAccess}>Founder console</button></div></footer>

      {scrollProgress > 8 && <button className="back-to-top" type="button" onClick={() => scrollToSection("top")} aria-label="Back to top"><ArrowUpRight size={16} /></button>}
      <a className="floating-contact" href="https://wa.me/918378976036" target="_blank" rel="noreferrer" aria-label="Chat with Yash on WhatsApp"><MessageCircle size={18} /><span>WhatsApp</span></a>
      <div className="scroll-progress" aria-hidden="true"><span style={{ width: `${scrollProgress}%` }} /></div>

      {accessOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setAccessOpen(false); }}><section className="access-modal" role="dialog" aria-modal="true" aria-labelledby="access-title"><button type="button" className="modal-close" onClick={() => setAccessOpen(false)} aria-label="Close founder access"><X size={19} /></button><span className="modal-kicker"><LockKeyhole size={14} /> Founder access</span><h2 id="access-title">Manage the<br /><em>work section.</em></h2><p>This founder console keeps your portfolio editable in the browser. Enter the private access key to continue.</p><form onSubmit={verifyFounder}><label htmlFor="founder-code">Access key</label><input id="founder-code" type="password" autoFocus value={accessCode} onChange={(event) => setAccessCode(event.target.value)} placeholder="Enter founder key" /><button className="button button-coral" type="submit">Open console <ArrowUpRight size={16} /></button>{accessError && <span className="form-error">{accessError}</span>}</form><small>Frontend-only access layer. Connect real authentication before using this as a production admin tool.</small></section></div>}

      {founderOpen && <div className="modal-backdrop manager-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setFounderOpen(false); }}><section className="manager-modal" role="dialog" aria-modal="true" aria-labelledby="manager-title"><div className="manager-header"><div><span className="modal-kicker"><Sparkles size={14} /> Founder console</span><h2 id="manager-title">Portfolio <em>control room.</em></h2></div><button type="button" className="modal-close" onClick={() => setFounderOpen(false)} aria-label="Close founder console"><X size={19} /></button></div><div className="manager-layout"><aside className="manager-list"><div className="manager-list-head"><span>{projects.length} project{projects.length === 1 ? "" : "s"}</span><button type="button" onClick={openNewProject}><Plus size={15} /> Add project</button></div>{projects.map((project) => <button type="button" className={`manager-project ${editingId === project.id ? "is-active" : ""}`} key={project.id} onClick={() => editProject(project)}><span className="manager-project-index">{project.number}</span><span><strong>{project.title}</strong><small>{project.published ? "Published" : "Hidden"}</small></span><Pencil size={14} /></button>)}</aside><form className="manager-form" onSubmit={submitProject}><div className="form-heading"><span>{editingId ? "Edit project" : "New project"}</span>{editingId && <button type="button" onClick={openNewProject}>Start fresh</button>}</div><div className="form-grid"><label>Project title<input required value={draft.title} onChange={(event) => updateDraft("title", event.target.value)} placeholder="e.g. A louder social signal" /></label><label>Category / type<input required value={draft.type} onChange={(event) => updateDraft("type", event.target.value)} placeholder="e.g. Social growth system" /></label><label className="field-wide">Short description<textarea required rows={4} value={draft.detail} onChange={(event) => updateDraft("detail", event.target.value)} placeholder="What did this project help the client move?" /></label><label>Tag<input value={draft.tag} onChange={(event) => updateDraft("tag", event.target.value)} placeholder="Commerce" /></label><label>Accent<select value={draft.tone} onChange={(event) => updateDraft("tone", event.target.value as Tone)}><option value="project-coral">Signal coral</option><option value="project-blue">Cobalt blue</option><option value="project-navy">Ink navy</option><option value="project-chartreuse">Chartreuse</option><option value="project-paper">Paper</option></select></label><label className="field-wide">Image URL <span className="field-hint">Optional — use a hosted image URL</span><input value={draft.image ?? ""} onChange={(event) => updateDraft("image", event.target.value || null)} placeholder="https://..." /></label><label className="field-wide">Project link <span className="field-hint">Optional — case study or client site</span><input type="url" value={draft.link} onChange={(event) => updateDraft("link", event.target.value)} placeholder="https://..." /></label></div><label className="publish-toggle"><input type="checkbox" checked={draft.published} onChange={(event) => updateDraft("published", event.target.checked)} /><span><strong>Publish on website</strong><small>Customers can see this project immediately.</small></span></label><div className="manager-form-actions"><button className="button button-coral" type="submit"><Check size={16} /> {editingId ? "Save changes" : "Add to portfolio"}</button>{editingId && <button className="danger-button" type="button" onClick={() => deleteProject(editingId)}><Trash2 size={15} /> Delete</button>}</div></form></div>{savedNotice && <div className="saved-notice"><Check size={15} /> {savedNotice}</div>}<p className="manager-footnote">Projects are stored in this browser only. Use a secure backend when you are ready for a shared team console.</p></section></div>}

      {founderModal && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setFounderModal(null); }}><section className={`founder-detail-modal founder-detail-${founderModal.color}`} role="dialog" aria-modal="true" aria-labelledby="founder-detail-title"><button type="button" className="modal-close" onClick={() => setFounderModal(null)} aria-label="Close founder profile"><X size={19} /></button><div className="founder-detail-photo"><img loading="lazy" src={founderModal.photo} alt={founderModal.name} /><span>{founderModal.initials} / e_commerce.hub</span></div><div className="founder-detail-copy"><span className="modal-kicker">Founder profile / {founderModal.initials}</span><h2 id="founder-detail-title">{founderModal.name}</h2><p className="founder-detail-role">{founderModal.role}</p><p>{founderModal.focus}</p><div className="founder-detail-facts"><div><small>Education</small><strong>{founderModal.education}</strong></div><div><small>Contact</small>{founderModal.email && <a href={`mailto:${founderModal.email}`}>{founderModal.email}</a>}{founderModal.phone && <a href={`tel:${founderModal.phone}`}>+91 {founderModal.phone}</a>}{founderModal.instagram && <a href={founderModal.instagram} target="_blank" rel="noreferrer"><Instagram size={14} /> Instagram profile</a>}{!founderModal.email && !founderModal.phone && !founderModal.instagram && <strong>Contact details to be added</strong>}</div></div><div className="founder-detail-actions">{founderModal.email && <a className="button button-navy" href={`mailto:${founderModal.email}`}>Email {founderModal.initials} <ArrowUpRight size={16} /></a>}{founderModal.phone && <a className="button button-coral" href={`tel:${founderModal.phone}`}>Call now <ArrowUpRight size={16} /></a>}{founderModal.instagram && <a className="button button-navy" href={founderModal.instagram} target="_blank" rel="noreferrer"><Instagram size={16} /> Instagram</a>}{!founderModal.email && !founderModal.phone && !founderModal.instagram && <button className="button button-coral" type="button" onClick={() => { setFounderModal(null); scrollToSection("contact"); }}>Contact the studio <ArrowUpRight size={16} /></button>}</div></div></section></div>}

      {projectModal && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setProjectModal(null); }}><section className={`project-detail-modal ${projectModal.tone}`} role="dialog" aria-modal="true" aria-labelledby="project-detail-title"><button type="button" className="modal-close" onClick={() => setProjectModal(null)} aria-label="Close project"><X size={19} /></button><div className="detail-media">{projectModal.image ? <img src={projectModal.image} alt="" /> : <div className="detail-abstract"><img src={`${STORAGE}ecommerce-hub-symbol_d92f1230.png`} alt="" /><span>{projectModal.number}</span></div>}</div><div className="detail-content"><span className="modal-kicker">{projectModal.number} / {projectModal.tag}</span><p className="detail-type">{projectModal.type}</p><h2 id="project-detail-title">{projectModal.title}</h2><p>{projectModal.detail}</p>{projectModal.link ? <a className="button button-navy" href={projectModal.link} target="_blank" rel="noreferrer">Visit project <ArrowUpRight size={16} /></a> : <button className="button button-navy" type="button" onClick={() => { setProjectModal(null); scrollToSection("contact"); }}>Discuss a similar move <ArrowUpRight size={16} /></button>}</div></section></div>}
    </div>
  );
}
