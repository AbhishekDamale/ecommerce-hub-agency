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
  Globe2,
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
const YASH_PHOTO = `${STORAGE}yash-mete-portrait_cf15b695.jpeg`;
const ABHISHEK_PHOTO = `${STORAGE}abhishek-damale-portrait_abc61bb6.png`;
const PROJECTS_KEY = "ecommerce-hub-projects-v2";
const FOUNDER_CODE = "HUB-FOUNDERS";

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

const defaultProjects: Project[] = [
  { id: "retail", number: "01", title: "Retail, ready for more", type: "Brand + digital storefront", detail: "A clear, conversion-minded system for a product brand stepping beyond its first market.", image: `${STORAGE}ecommerce-hub-project-retail_ccd8ad52.jpg`, tone: "project-coral", tag: "Commerce", link: "", published: true },
  { id: "social", number: "02", title: "A louder social signal", type: "Social growth system", detail: "A repeatable content rhythm that gives a growing business more ways to be remembered.", image: `${STORAGE}ecommerce-hub-project-social_0a4e3731.jpg`, tone: "project-blue", tag: "Social", link: "", published: true },
  { id: "web", number: "03", title: "The website as a closer", type: "Strategy + web design", detail: "A digital experience built to move visitors from curious to confident, one decision at a time.", image: `${STORAGE}ecommerce-hub-project-web_cdd86016.jpg`, tone: "project-navy", tag: "Web", link: "", published: true },
  { id: "launch", number: "04", title: "Local brand, broader map", type: "Go-to-market direction", detail: "Sharper positioning, stronger touchpoints, and a launch plan built around real-world momentum.", image: null, tone: "project-chartreuse", tag: "Launch", link: "", published: true },
  { id: "startup", number: "05", title: "From idea to storefront", type: "Startup growth partner", detail: "The practical first chapter for a founder who needs the story, system, and next move to align.", image: null, tone: "project-paper", tag: "Startup", link: "", published: true },
];

const services = [
  { number: "01", title: "Marketing that finds the signal", copy: "Positioning, content direction, and launch thinking that make the right people stop scrolling and start paying attention." },
  { number: "02", title: "Social growth with a point of view", copy: "A practical content system for showing up consistently, sounding like a real business, and earning the next click." },
  { number: "03", title: "Websites that carry the story", copy: "Clear, confident websites for businesses and startups that need to turn interest into an honest conversation." },
];

const steps = [
  { index: "A", title: "Find the signal", copy: "We listen for what makes the business matter, then turn it into a sharper story and a more useful direction." },
  { index: "B", title: "Build the system", copy: "We shape the content, campaign, and digital touchpoints so every part of the brand feels like it belongs together." },
  { index: "C", title: "Move the number", copy: "We focus on the next meaningful action — the click, enquiry, sale, or step forward that keeps the business moving." },
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
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [founderOpen, setFounderOpen] = useState(false);
  const [accessOpen, setAccessOpen] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [accessError, setAccessError] = useState("");
  const [projectModal, setProjectModal] = useState<Project | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<ProjectDraft>(blankDraft);
  const [savedNotice, setSavedNotice] = useState("");

  useEffect(() => {
    setProjects(loadProjects());
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.14 });
    document.querySelectorAll(".reveal-on-scroll").forEach((element) => revealObserver.observe(element));
    return () => { window.removeEventListener("scroll", onScroll); revealObserver.disconnect(); };
  }, []);

  const handleNav = (id: string) => { setMenuOpen(false); scrollToSection(id); };
  const publishedProjects = projects.filter((project) => project.published);

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
        <a className="wordmark" href="#top" aria-label="e_commerce.hub home"><span className="wordmark-mark" aria-hidden="true"><img src={`${STORAGE}ecommerce-hub-symbol_d92f1230.png`} alt="" /></span><span className="wordmark-type"><span>e_commerce</span><b>.hub</b></span></a>
        <nav className={`site-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
          <button type="button" onClick={() => handleNav("services")}>Services</button><button type="button" onClick={() => handleNav("work")}>Work</button><button type="button" onClick={() => handleNav("about")}>About</button><button type="button" onClick={() => handleNav("contact")}>Contact</button>
        </nav>
        <button className="header-cta" type="button" onClick={() => handleNav("contact")}><span>Talk to us</span><ArrowUpRight size={16} strokeWidth={2.2} /></button>
        <button type="button" className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
      </header>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-grid-mark" aria-hidden="true"><span /><span /><span /></div>
          <div className="hero-copy reveal-up"><p className="eyebrow"><span className="eyebrow-dot" /> Growth partners for the next move</p><h1 id="hero-title">Make your next <em>market</em> feel closer.</h1><p className="hero-lede">e_commerce.hub helps businesses and startups move from local attention to global demand — through clear marketing, social growth, and websites built to convert.</p><div className="hero-actions"><button className="button button-coral" type="button" onClick={() => handleNav("contact")}>Start a conversation <ArrowUpRight size={17} /></button><button className="text-link" type="button" onClick={() => handleNav("work")}>See our work <ArrowDownRight size={16} /></button></div><div className="hero-footnote"><span className="hero-rule" /><span>Founded by Abhishek Damale + Yash Mete</span></div></div>
          <div className="hero-visual reveal-up delay-1"><div className="hero-visual-label label-coral">built for momentum <ArrowUpRight size={14} /></div><div className="hero-image-wrap"><img src={`${STORAGE}ecommerce-hub-hero_598609b3.jpg`} alt="Abstract coral and cobalt collage representing a business moving forward" /><div className="hero-image-wash" aria-hidden="true" /><div className="hero-visual-stamp"><span>Local</span><ArrowUpRight size={18} /><span>Global</span></div></div><div className="hero-stat-card"><span className="stat-kicker">Published work</span><strong>{String(publishedProjects.length).padStart(2, "0")}</strong><span className="stat-note">and the next one could be yours.</span></div><div className="hero-crosshair" aria-hidden="true"><span /><span /></div><div className="hero-brand-device" aria-hidden="true"><img src={`${STORAGE}ecommerce-hub-symbol_d92f1230.png`} alt="" /><span>e_commerce.hub / 01</span></div></div>
        </section>
        <div className="marquee-band" aria-label="Agency capabilities"><div className="marquee-track"><span>Strategy <b>✳</b></span><span>Social growth <b>✳</b></span><span>Websites <b>✳</b></span><span>Local to global <b>✳</b></span><span>Strategy <b>✳</b></span><span>Social growth <b>✳</b></span><span>Websites <b>✳</b></span></div></div>

        <section id="services" className="section services-section"><span className="section-stamp services-stamp">Ledger / 01</span><div className="section-intro"><p className="eyebrow"><span>01</span> What we move</p><h2>Good work is useful<br /><em>before</em> it is loud.</h2><p className="section-note">We keep the work close to the business. Every idea earns its place by making the next step clearer.</p></div><div className="service-list">{services.map((service) => <article className="service-row reveal-on-scroll" key={service.number}><div className="service-number">{service.number}</div><div className="service-content"><h3>{service.title}</h3><p>{service.copy}</p></div><div className="service-arrow"><ArrowUpRight size={20} /></div></article>)}</div></section>

        <section className="signal-section" aria-labelledby="signal-title"><div className="signal-badge"><Sparkles size={16} /> the e_commerce.hub method</div><span className="section-stamp signal-stamp">Ledger / 02</span><div className="signal-heading"><p className="eyebrow eyebrow-light"><span>02</span> How we work</p><h2 id="signal-title">From <em>signal</em><br />to momentum.</h2></div><div className="signal-steps">{steps.map((step) => <article className="signal-step reveal-on-scroll" key={step.index}><div className="step-top"><span>{step.index}</span><ArrowUpRight size={17} /></div><h3>{step.title}</h3><p>{step.copy}</p></article>)}</div><div className="signal-footer"><span>Small team. Close attention.</span><span>Made for businesses with somewhere to go <ArrowUpRight size={15} /></span></div></section>

        <section id="work" className="section work-section"><span className="section-stamp work-stamp">Ledger / 03</span><div className="work-heading"><div><p className="eyebrow"><span>03</span> Selected work</p><h2>Proof with a<br /><em>pulse.</em></h2></div><div className="work-heading-side"><p className="work-note">A growing body of work for businesses ready to make their next market feel closer.</p><span className="work-archive-label">Archive / 01—05 / Case studies</span><button type="button" className="founder-entry" onClick={openFounderAccess}><LockKeyhole size={14} /> Founders: manage projects</button></div></div><div className="project-grid">{publishedProjects.map((project) => <article className={`project-card ${project.tone} reveal-on-scroll`} key={project.id} onClick={() => setProjectModal(project)} tabIndex={0} onKeyDown={(event) => { if (event.key === "Enter") setProjectModal(project); }}><div className="project-topline"><span>{project.number}</span><span>{project.tag}</span></div>{project.image ? <div className="project-image"><img src={project.image} alt={`${project.title} project visual`} /><div className="project-image-overlay" /><span className="project-image-open">View case <ArrowUpRight size={13} /></span></div> : <div className="project-abstract" aria-hidden="true"><div className="abstract-line" /><div className="abstract-block" /><div className="abstract-circle" /><img className="abstract-symbol" src={`${STORAGE}ecommerce-hub-symbol_d92f1230.png`} alt="" /><span>{project.number}</span></div>}<div className="project-copy"><p>{project.type}</p><h3>{project.title}</h3><span>{project.detail}</span><div className="project-meta"><span>Proof status</span><b>Case study details on request</b></div><button type="button" className="project-link" onClick={(event) => { event.stopPropagation(); setProjectModal(project); }}>Open project <CircleArrowOutUpRight size={16} /></button></div></article>)}</div>{publishedProjects.length === 0 && <div className="empty-portfolio"><Sparkles size={18} /> The next project is waiting to be published from the founder console.</div>}</section>

        <section id="about" className="section founders-section"><span className="section-stamp founders-stamp">Ledger / 04</span><div className="founders-aside"><p className="eyebrow"><span>04</span> The people behind it</p><div className="founders-word">two<br /><em>minds</em><br />moving<br />one idea.</div><p className="founders-note">e_commerce.hub is a two-person agency built around close collaboration, useful questions, and work that keeps its feet on the ground.</p></div><div className="founder-cards"><article className="founder-card founder-card-coral reveal-on-scroll"><div className="founder-card-top"><span>01 / Founder</span><ArrowUpRight size={18} /></div><div className="founder-photo founder-photo-abhishek"><img src={ABHISHEK_PHOTO} alt="Abhishek Damale" /><span>AD / 01</span></div><div className="founder-card-bottom"><h3>Abhishek<br />Damale</h3><p>Strategy, positioning, and the question that makes the whole thing click.</p></div></article><article className="founder-card founder-card-blue reveal-on-scroll"><div className="founder-card-top"><span>02 / Founder</span><ArrowUpRight size={18} /></div><div className="founder-photo founder-photo-yash"><img src={YASH_PHOTO} alt="Yash Mete" /><span>YM / 02</span></div><div className="founder-card-bottom"><h3>Yash<br />Mete</h3><p>Digital systems, social momentum, and the details people remember.</p></div></article></div></section>

        <section id="contact" className="contact-section"><span className="section-stamp contact-stamp">Ledger / 05</span><div className="contact-grid-line" aria-hidden="true" /><div className="contact-copy"><p className="eyebrow"><span>05</span> Your next move</p><h2>Ready to move from <em>local</em> to global?</h2><p>Tell us what you are building, where it is stuck, or where you want it to go. We will come back with a useful first thought.</p><a className="button button-navy" href="mailto:ecommercehub54@gmail.com">ecommercehub54@gmail.com <ArrowUpRight size={17} /></a></div><div className="contact-mark" aria-hidden="true"><div className="contact-symbol"><img src={`${STORAGE}ecommerce-hub-symbol_d92f1230.png`} alt="" /></div><Globe2 size={76} strokeWidth={1.1} /><span>local / global</span></div></section>
      </main>

      <footer className="site-footer"><div className="footer-top"><a className="wordmark footer-wordmark" href="#top" aria-label="e_commerce.hub home"><span className="wordmark-mark" aria-hidden="true"><img src={`${STORAGE}ecommerce-hub-symbol_d92f1230.png`} alt="" /></span><span className="wordmark-type"><span>e_commerce</span><b>.hub</b></span></a><p>Small team. Big direction.<br />Local to global, by design.</p><button className="footer-back" type="button" onClick={() => scrollToSection("top")}>Back to top <ArrowUpRight size={16} /></button></div><div className="footer-bottom"><span>© 2026 e_commerce.hub</span><span>Marketing / Social / Web</span><button type="button" className="footer-founder-link" onClick={openFounderAccess}>Founder console</button></div></footer>

      {accessOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setAccessOpen(false); }}><section className="access-modal" role="dialog" aria-modal="true" aria-labelledby="access-title"><button type="button" className="modal-close" onClick={() => setAccessOpen(false)} aria-label="Close founder access"><X size={19} /></button><span className="modal-kicker"><LockKeyhole size={14} /> Founder access</span><h2 id="access-title">Manage the<br /><em>work section.</em></h2><p>This founder console keeps your portfolio editable in the browser. Enter the private access key to continue.</p><form onSubmit={verifyFounder}><label htmlFor="founder-code">Access key</label><input id="founder-code" type="password" autoFocus value={accessCode} onChange={(event) => setAccessCode(event.target.value)} placeholder="Enter founder key" /><button className="button button-coral" type="submit">Open console <ArrowUpRight size={16} /></button>{accessError && <span className="form-error">{accessError}</span>}</form><small>Frontend-only access layer. Connect real authentication before using this as a production admin tool.</small></section></div>}

      {founderOpen && <div className="modal-backdrop manager-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setFounderOpen(false); }}><section className="manager-modal" role="dialog" aria-modal="true" aria-labelledby="manager-title"><div className="manager-header"><div><span className="modal-kicker"><Sparkles size={14} /> Founder console</span><h2 id="manager-title">Portfolio <em>control room.</em></h2></div><button type="button" className="modal-close" onClick={() => setFounderOpen(false)} aria-label="Close founder console"><X size={19} /></button></div><div className="manager-layout"><aside className="manager-list"><div className="manager-list-head"><span>{projects.length} project{projects.length === 1 ? "" : "s"}</span><button type="button" onClick={openNewProject}><Plus size={15} /> Add project</button></div>{projects.map((project) => <button type="button" className={`manager-project ${editingId === project.id ? "is-active" : ""}`} key={project.id} onClick={() => editProject(project)}><span className="manager-project-index">{project.number}</span><span><strong>{project.title}</strong><small>{project.published ? "Published" : "Hidden"}</small></span><Pencil size={14} /></button>)}</aside><form className="manager-form" onSubmit={submitProject}><div className="form-heading"><span>{editingId ? "Edit project" : "New project"}</span>{editingId && <button type="button" onClick={openNewProject}>Start fresh</button>}</div><div className="form-grid"><label>Project title<input required value={draft.title} onChange={(event) => updateDraft("title", event.target.value)} placeholder="e.g. A louder social signal" /></label><label>Category / type<input required value={draft.type} onChange={(event) => updateDraft("type", event.target.value)} placeholder="e.g. Social growth system" /></label><label className="field-wide">Short description<textarea required rows={4} value={draft.detail} onChange={(event) => updateDraft("detail", event.target.value)} placeholder="What did this project help the client move?" /></label><label>Tag<input value={draft.tag} onChange={(event) => updateDraft("tag", event.target.value)} placeholder="Commerce" /></label><label>Accent<select value={draft.tone} onChange={(event) => updateDraft("tone", event.target.value as Tone)}><option value="project-coral">Signal coral</option><option value="project-blue">Cobalt blue</option><option value="project-navy">Ink navy</option><option value="project-chartreuse">Chartreuse</option><option value="project-paper">Paper</option></select></label><label className="field-wide">Image URL <span className="field-hint">Optional — use a hosted image URL</span><input value={draft.image ?? ""} onChange={(event) => updateDraft("image", event.target.value || null)} placeholder="https://..." /></label><label className="field-wide">Project link <span className="field-hint">Optional — case study or client site</span><input type="url" value={draft.link} onChange={(event) => updateDraft("link", event.target.value)} placeholder="https://..." /></label></div><label className="publish-toggle"><input type="checkbox" checked={draft.published} onChange={(event) => updateDraft("published", event.target.checked)} /><span><strong>Publish on website</strong><small>Customers can see this project immediately.</small></span></label><div className="manager-form-actions"><button className="button button-coral" type="submit"><Check size={16} /> {editingId ? "Save changes" : "Add to portfolio"}</button>{editingId && <button className="danger-button" type="button" onClick={() => deleteProject(editingId)}><Trash2 size={15} /> Delete</button>}</div></form></div>{savedNotice && <div className="saved-notice"><Check size={15} /> {savedNotice}</div>}<p className="manager-footnote">Projects are stored in this browser only. Use a secure backend when you are ready for a shared team console.</p></section></div>}

      {projectModal && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setProjectModal(null); }}><section className={`project-detail-modal ${projectModal.tone}`} role="dialog" aria-modal="true" aria-labelledby="project-detail-title"><button type="button" className="modal-close" onClick={() => setProjectModal(null)} aria-label="Close project"><X size={19} /></button><div className="detail-media">{projectModal.image ? <img src={projectModal.image} alt="" /> : <div className="detail-abstract"><img src={`${STORAGE}ecommerce-hub-symbol_d92f1230.png`} alt="" /><span>{projectModal.number}</span></div>}</div><div className="detail-content"><span className="modal-kicker">{projectModal.number} / {projectModal.tag}</span><p className="detail-type">{projectModal.type}</p><h2 id="project-detail-title">{projectModal.title}</h2><p>{projectModal.detail}</p>{projectModal.link ? <a className="button button-navy" href={projectModal.link} target="_blank" rel="noreferrer">Visit project <ArrowUpRight size={16} /></a> : <button className="button button-navy" type="button" onClick={() => { setProjectModal(null); scrollToSection("contact"); }}>Discuss a similar move <ArrowUpRight size={16} /></button>}</div></section></div>}
    </div>
  );
}
