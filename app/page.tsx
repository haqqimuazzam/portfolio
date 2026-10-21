"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useState, type ReactNode } from "react";

type Locale = "id" | "en";

const copy = {
  id: {
    navWork: "Karya",
    navAbout: "Tentang",
    available: "Terbuka untuk ide baru",
    intro: "Web developer independen · Sukabumi, Indonesia",
    headline: ["Ide kecil.", "Website nyata."],
    summary:
      "Saya suka mengubah rasa penasaran jadi sesuatu yang bisa dibuka, dicoba, dan dibagikan. AI agent adalah partner saya dalam prosesnya.",
    viewWork: "Lihat karya",
    aboutLink: "Sedikit tentang saya",
    scroll: "Gulir untuk menjelajah",
    featured: "Proyek pilihan",
    projectTitle: "What's the Project?",
    projectDescription:
      "Kehabisan ide untuk dibuat? Website ini membantu memilih random dari 100 ide yang tersedia.",
    visit: "Kunjungi proyek",
    openProject: "Buka proyek",
    screenshotAlt: "Tangkapan layar halaman What's the Project? tanpa bilah browser",
    projectType: "Eksperimen web pribadi",
    aboutLabel: "Tentang saya",
    aboutTitle: "Belajar paling cepat dengan cara membuat.",
    aboutBody:
      "Saya Haqqi, developer muda dari Sukabumi yang senang bereksperimen dengan website dan AI agent. Saya belum punya satu jalur yang pasti—dan justru itu yang membuat saya terus mencoba hal baru.",
    aboutExtra:
      "Banyak ide saya berhenti di tengah jalan. Setiap percobaan tetap mengajarkan sesuatu: cara memulai, mengubah arah, dan menyelesaikan bagian kecil berikutnya.",
    approachLabel: "Cara saya berkarya",
    approachTitle: "Dari penasaran sampai bisa dicoba.",
    steps: [
      ["01", "Cari pemicu", "Mulai dari hal yang sedang membuat saya penasaran."],
      ["02", "Bangun bersama AI", "Gunakan AI agent untuk mengeksplorasi ide dan membuat versi pertama."],
      ["03", "Rapikan dan bagikan", "Bentuk jadi pengalaman web yang enak digunakan, lalu publish."],
    ],
    contactLabel: "Ada ide menarik?",
    contactTitle: "Mari mulai dari satu percakapan.",
    contactBody: "Saya selalu terbuka untuk melihat ide baru dan belajar dari prosesnya.",
    contactCta: "Lihat proyek saya",
    footer: "Dibuat sambil terus belajar.",
  },
  en: {
    navWork: "Work",
    navAbout: "About",
    available: "Open to new ideas",
    intro: "Independent web developer · Sukabumi, Indonesia",
    headline: ["Small ideas.", "Real websites."],
    summary:
      "I like turning curiosity into something you can open, try, and share. AI agents are my partners along the way.",
    viewWork: "Explore work",
    aboutLink: "A little about me",
    scroll: "Scroll to explore",
    featured: "Selected project",
    projectTitle: "What's the Project?",
    projectDescription:
      "Out of ideas to build? This website helps you pick a random idea from 100 available ideas.",
    visit: "Visit project",
    openProject: "Open project",
    screenshotAlt: "Screenshot of the What's the Project? website without browser chrome",
    projectType: "Personal web experiment",
    aboutLabel: "About me",
    aboutTitle: "The fastest way to learn is to make.",
    aboutBody:
      "I'm Haqqi, a young developer from Sukabumi who enjoys experimenting with websites and AI agents. I don't have one set path yet—and that's what keeps me trying new things.",
    aboutExtra:
      "Many of my ideas stop halfway. Every attempt still teaches me something: how to begin, change direction, and finish the next small piece.",
    approachLabel: "How I make things",
    approachTitle: "From curiosity to something you can try.",
    steps: [
      ["01", "Find a spark", "Start with something I'm curious about."],
      ["02", "Build with AI", "Use AI agents to explore an idea and make a first version."],
      ["03", "Polish and share", "Shape it into a useful web experience, then publish."],
    ],
    contactLabel: "Have an interesting idea?",
    contactTitle: "Let's start with a conversation.",
    contactBody: "I'm always open to seeing new ideas and learning from the process.",
    contactCta: "Explore my project",
    footer: "Made while learning, always.",
  },
} as const;

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className={diagonal ? "arrow diagonal" : "arrow"}>
      <path d="M3.75 10h12.5M10.5 4.25 16.25 10l-5.75 5.75" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExternalMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="external-mark">
      <path d="M6 14 14 6M6.5 6H14v7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function MagneticLink({ href, children }: { href: string; children: ReactNode }) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 100, damping: 20 });
  const springY = useSpring(y, { stiffness: 100, damping: 20 });
  const offsetX = useTransform(springX, (value) => value * 0.18);
  const offsetY = useTransform(springY, (value) => value * 0.18);

  return (
    <motion.a
      className="button button-primary"
      href={href}
      style={{ x: offsetX, y: offsetY }}
      onMouseMove={(event) => {
        if (reduceMotion) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - bounds.left - bounds.width / 2);
        y.set(event.clientY - bounds.top - bounds.height / 2);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.a>
  );
}

export default function Home() {
  const [locale, setLocale] = useState<Locale>("id");
  const t = copy[locale];
  const reduceMotion = useReducedMotion();

  return (
    <main>
      <div className="noise" aria-hidden="true" />
      <header className="topbar shell">
        <a className="wordmark" href="#home" aria-label="Haqqi Muazzam, home">
          <span className="wordmark-icon">h.</span>
          <span>haqqi muazzam</span>
        </a>
        <nav className="nav-links" aria-label={locale === "id" ? "Navigasi utama" : "Main navigation"}>
          <a href="#work">{t.navWork}</a>
          <a href="#about">{t.navAbout}</a>
          <button className="locale-switch" onClick={() => setLocale(locale === "id" ? "en" : "id")} aria-label={locale === "id" ? "Switch language to English" : "Ubah bahasa ke Indonesia"}>
            <span className={locale === "id" ? "locale-active" : ""}>ID</span>
            <span className="locale-divider">/</span>
            <span className={locale === "en" ? "locale-active" : ""}>EN</span>
          </button>
        </nav>
      </header>

      <section id="home" className="hero shell">
        <div className="hero-copy">
          <Reveal className="availability">
            <span className="availability-dot" />
            {t.available}
          </Reveal>
          <Reveal delay={0.08}>
            <p className="eyebrow hero-eyebrow">{t.intro}</p>
          </Reveal>
          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            key={`headline-${locale}`}
          >
            {t.headline[0]}<br /><span>{t.headline[1]}</span>
          </motion.h1>
          <Reveal delay={0.26}>
            <p className="hero-summary">{t.summary}</p>
          </Reveal>
          <Reveal delay={0.34}>
            <div className="hero-actions">
              <MagneticLink href="#work">{t.viewWork}<Arrow /></MagneticLink>
              <a className="text-link" href="#about">{t.aboutLink}<Arrow diagonal /></a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.24} className="hero-art-wrap">
          <div className="hero-art" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit orbit-three" />
            <motion.div className="hero-core" animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 42, ease: "linear", repeat: Infinity }}>
              <span className="core-ring" />
              <span className="core-letter">h</span>
              <span className="core-spark">✳</span>
            </motion.div>
            <span className="orbit-label label-top">IDEA <i>01</i></span>
            <span className="orbit-label label-bottom">BUILT WITH CURIOSITY</span>
            <span className="orbit-point point-a" />
            <span className="orbit-point point-b" />
            <span className="orbit-point point-c" />
          </div>
        </Reveal>

        <div className="hero-foot">
          <span>01 — 03</span>
          <span className="scroll-cue"><span />{t.scroll}</span>
          <span>SUKABUMI, ID</span>
        </div>
      </section>

      <section id="work" className="work-section section shell">
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow"><span className="section-index">01</span>{t.featured}</p>
            <h2>{t.projectTitle}</h2>
          </div>
          <a className="section-link" href="https://whatstheproject.vercel.app" target="_blank" rel="noreferrer">{t.visit}<Arrow diagonal /></a>
        </Reveal>

        <Reveal delay={0.1}>
          <a className="project-preview" href="https://whatstheproject.vercel.app" target="_blank" rel="noreferrer" aria-label={`${t.openProject}: What's the Project?`}>
            <Image
              src="/images/whatstheproject-preview.png"
              width={1200}
              height={600}
              alt={t.screenshotAlt}
              className="project-screenshot"
            />
          </a>
        </Reveal>

        <div className="project-meta">
          <p>{t.projectDescription}</p>
          <span>{t.projectType}</span>
        </div>
      </section>

      <section id="about" className="about-section section shell">
        <Reveal className="about-aside">
          <p className="eyebrow"><span className="section-index">02</span>{t.aboutLabel}</p>
          <span className="about-coordinate">SUKABUMI<br />WEST JAVA, ID</span>
        </Reveal>
        <div className="about-copy">
          <Reveal><h2>{t.aboutTitle}</h2></Reveal>
          <Reveal delay={0.1}><p>{t.aboutBody}</p></Reveal>
          <Reveal delay={0.16}><p className="about-extra">{t.aboutExtra}</p></Reveal>
          <Reveal delay={0.22}>
            <div className="skill-line"><span>EXPLORING</span><span>AI AGENTS <i>·</i> WEB <i>·</i> IDEAS</span></div>
          </Reveal>
        </div>
      </section>

      <section className="approach-section section shell">
        <Reveal className="approach-heading">
          <p className="eyebrow"><span className="section-index">03</span>{t.approachLabel}</p>
          <h2>{t.approachTitle}</h2>
        </Reveal>
        <div className="steps-list">
          {t.steps.map(([number, title, description], index) => (
            <Reveal key={`${locale}-${number}`} delay={index * 0.08} className="step-row">
              <span className="step-number">{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
              <span className="step-mark">↗</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="contact-section shell">
        <Reveal className="contact-inner">
          <p className="eyebrow"><span className="availability-dot" />{t.contactLabel}</p>
          <h2>{t.contactTitle}</h2>
          <p className="contact-body">{t.contactBody}</p>
          <MagneticLink href="https://whatstheproject.vercel.app">{t.contactCta}<Arrow diagonal /></MagneticLink>
          <span className="contact-index">HAQQI MUAZZAM · SUKABUMI</span>
        </Reveal>
      </section>

      <footer className="footer shell">
        <a className="wordmark" href="#home"><span className="wordmark-icon">h.</span><span>haqqi muazzam</span></a>
        <p>{t.footer}</p>
        <div className="footer-socials">
          <a href="https://www.instagram.com/qiwiwiwi_/" target="_blank" rel="noreferrer">Instagram · @qiwiwiwi_</a>
          <a href="mailto:haqqimuazzam18@gmail.com">Email · haqqimuazzam18@gmail.com</a>
        </div>
        <a className="back-top" href="#home" aria-label={locale === "id" ? "Kembali ke atas" : "Back to top"}><Arrow diagonal /></a>
      </footer>
      <AnimatePresence>
        <motion.div key={locale} className="locale-caption" initial={{ opacity: 0 }} animate={{ opacity: 0.45 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} aria-hidden="true">
          {locale.toUpperCase()}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
