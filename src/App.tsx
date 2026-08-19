import { useEffect, useRef, useState } from 'react';
import { EmailForm } from '@/components/EmailForm';
import { SocialProof } from '@/components/SocialProof';
import { PriceProbabilityConverter } from '@/components/PriceProbabilityConverter';
import { GlossaryStrip } from '@/components/GlossaryStrip';
import { MythsFacts } from '@/components/MythsFacts';
import { PlatformComparison, HistoricalExample } from '@/components/PlatformComparison';
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  Gift,
  LineChart,
  Mail,
  Menu,
  Scale,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  X,
} from 'lucide-react';

const LESSONS = [
  { num: '01', title: 'What Is a Prediction Market?' },
  { num: '02', title: 'How Odds and Prices Are Set' },
  { num: '03', title: 'How Payouts Actually Work' },
  { num: '04', title: 'Five Minute Markets' },
];

const FAQ_ITEMS = [
  {
    question: 'Is this really free?',
    answer:
      'Yes, completely. There is no paid upsell, no trial period, and no hidden tier. The guide is free because the goal is to help people understand this space clearly — not to charge them for it. The "catch," if you can call it that, is that we hope you find it useful enough to stay on the email list for future guides.',
  },
  {
    question: 'Will I get spammed?',
    answer:
      'No. You will receive the guide, then occasional emails when we publish a new lesson or guide — roughly once or twice a month at most. No daily blasts, no third party offers, no rented lists. You can unsubscribe at any time with a single click.',
  },
  {
    question: 'Who\'s behind this?',
    answer:
      'This guide is built by the team behind Playmatez — people who actually run a prediction market platform, not content marketers. That means the explanations come from real operational experience with how these markets work in practice, not from someone who read a summary online. The goal is to share what we\'ve learned in a calm, honest, no hype way.',
  },
  {
    question: 'Do I need any background knowledge?',
    answer:
      'None at all. The guide is written for complete beginners. If you\'ve heard the term "prediction markets" but aren\'t sure what they are or how they work, this is for you. No finance, math, or trading background required.',
  },
];

const STATS = [
  { value: '$24B', label: 'Monthly trading volume (April 2026)' },
  { value: '$2B', label: 'NYSE parent company investment in Polymarket' },
  { value: '$63B', label: 'Total industry volume across 2025' },
];

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-14">
      <h2 className="font-serif text-2xl sm:text-3xl text-navy text-center">
        {children}
      </h2>
      <div className="mx-auto mt-4 h-px w-12 bg-teal/40" />
    </div>
  );
}

function FaqItem({ item }: { item: (typeof FAQ_ITEMS)[number] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-navy/10 bg-white px-6 shadow-card hover:shadow-card-hover hover:border-navy/20 transition-all duration-300">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-serif text-lg text-navy pr-4">{item.question}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-navy-light transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? 'max-h-96 pb-5' : 'max-h-0'
        }`}
      >
        <p className="text-charcoal/80 leading-relaxed">{item.answer}</p>
      </div>
    </div>
  );
}

function NavBar() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: 'About', href: '/about' },
    { label: 'Articles', href: '/articles' },
    { label: 'Investors', href: '/investors' },
  ];

  return (
    <header
      className="sticky top-0 z-50 px-6 py-2.5 sm:py-3 bg-navy"
    >
      <div className="mx-auto max-w-5xl flex items-center justify-between">
        <a href="/" className="inline-block">
          <img
            src="https://pub-85e8da6f6b3443da89cb72ca8b6938ec.r2.dev/academy-assets/ChatGPT%20Image%20Aug%2017%2C%202026%2C%2007_17_30%20PM.png"
            alt="Prediction Markets 101"
            className="h-16 sm:h-20 w-auto"
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-white/85 hover:text-white font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#get-the-guide"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal px-5 py-2.5 text-sm font-semibold text-white shadow-card hover:bg-teal-dark hover:shadow-card-hover active:scale-[0.98] transition-all duration-200"
          >
            <BookOpen className="h-4 w-4" />
            Get the Free Guide
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="sm:hidden inline-flex items-center justify-center h-9 w-9 rounded-lg text-white hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="sm:hidden mt-3 pb-2 flex flex-col gap-1 border-t border-white/10 pt-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm text-white/85 hover:text-white hover:bg-white/10 font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#get-the-guide"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-teal px-5 py-3 text-sm font-semibold text-white shadow-card active:scale-[0.98] transition-all duration-200"
          >
            <BookOpen className="h-4 w-4" />
            Get the Free Guide
          </a>
        </nav>
      )}
    </header>
  );
}

function App() {
  const [hasConverted, setHasConverted] = useState(false);
  const [guideVisible, setGuideVisible] = useState(false);
  const faqRef = useRef<HTMLDivElement>(null);
  const guideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = guideRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGuideVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-canvas text-charcoal font-sans">
      {/* ─────────────── NAV BAR ─────────────── */}
      <NavBar />

      {/* ─────────────── HERO ─────────────── */}
      <section className="relative overflow-hidden px-6 pt-28 pb-32 sm:pt-36 sm:pb-40">
        {/* Background: Cambridge-style architectural line illustration (desktop only) */}
        <div className="hero-illustration absolute inset-0 pointer-events-none" />
        {/* Background: mobile-only architectural illustration */}
        <div className="hero-mobile-bg lg:hidden absolute inset-0 pointer-events-none" />

        <div className="relative mx-auto max-w-5xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left column: headline + CTAs + trust badges */}
            <div className="text-center lg:text-left">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-navy/5 px-4 py-1.5 text-xs font-medium text-navy-light uppercase tracking-[0.15em]">
                <BookOpen className="h-3.5 w-3.5" />
                <span>A Free Educational Guide</span>
              </div>
              <h1 className="font-serif text-hero sm:text-hero-lg lg:text-hero-xl font-semibold text-navy leading-[1.05]">
                Learn to Predict.
                <br />
                <span className="text-navy-light">Get Paid When You're Right.</span>
              </h1>
              <p className="mt-8 text-lg sm:text-xl text-charcoal/75 leading-relaxed max-w-xl mx-auto lg:mx-0">
                A free, plain English guide for anyone curious about how these
                markets function — no jargon, no sales pitch, just clear
                explanations.
              </p>

              {/* Three CTAs */}
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  href="#get-the-guide"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal px-6 py-3.5 text-sm font-semibold text-white shadow-card hover:bg-teal-dark hover:shadow-card-hover active:scale-[0.98] transition-all duration-200 w-full sm:w-auto"
                >
                  <BookOpen className="h-4 w-4" />
                  Get the Free Guide
                </a>
                <a
                  href="/articles"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-navy/30 bg-white px-6 py-3.5 text-sm font-semibold text-navy shadow-card hover:border-navy/50 hover:bg-navy/5 active:scale-[0.98] transition-all duration-200 w-full sm:w-auto"
                >
                  <BookOpen className="h-4 w-4" />
                  Read Articles
                </a>
                <a
                  href="/investors"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-terracotta/40 bg-white px-6 py-3.5 text-sm font-semibold text-terracotta shadow-card hover:border-terracotta hover:bg-terracotta/5 active:scale-[0.98] transition-all duration-200 w-full sm:w-auto"
                >
                  <LineChart className="h-4 w-4" />
                  For Investors
                </a>
              </div>

              {/* Trust signals */}
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white px-4 py-2 shadow-card">
                  <ShieldCheck className="h-4 w-4 text-teal" />
                  <span className="text-xs font-medium text-navy">Licensed and regulated</span>
                </div>
              </div>
            </div>

            {/* Right column: animated probability panel */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md rounded-xl border border-navy/10 bg-white p-8 sm:p-10 shadow-card">
                <div className="mb-6 text-center">
                  <h3 className="font-serif text-xl text-navy">
                    How a market price reflects probability
                  </h3>
                  <p className="mt-2 text-sm text-charcoal/60">
                    As money moves toward one side, the price shifts to reflect the
                    crowd's expectation. Watch the bar move.
                  </p>
                </div>

                {/* Probability bar */}
                <div className="relative">
                  <div className="mb-2 flex items-center justify-between text-sm font-medium">
                    <span className="text-navy">YES</span>
                    <span className="text-red">NO</span>
                  </div>
                  <div className="relative h-12 w-full overflow-hidden rounded-lg shadow-inner">
                    {/* YES side (left, gold) — width animated 50% → 65% */}
                    <div className="prob-bar-yes absolute left-0 top-0 h-full bg-navy">
                      <span className="prob-label-start absolute inset-0 flex items-center justify-center text-white text-sm font-semibold">50%</span>
                      <span className="prob-label-end absolute inset-0 flex items-center justify-center text-white text-sm font-semibold">65%</span>
                    </div>
                    {/* NO side (right, burgundy) — width animated 50% → 35% */}
                    <div className="prob-bar-no absolute right-0 top-0 h-full bg-red">
                      <span className="prob-label-start absolute inset-0 flex items-center justify-center text-white text-sm font-semibold">50%</span>
                      <span className="prob-label-end absolute inset-0 flex items-center justify-center text-white text-sm font-semibold">35%</span>
                    </div>
                    {/* Round white handle at the split point — left animated 50% → 65% */}
                    <div className="prob-handle absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-6 w-6 rounded-full bg-white shadow-md border border-navy/10 z-10" />
                  </div>
                  <p className="mt-4 text-center text-xs text-charcoal/50">
                    More money on YES pushes the price — and the implied probability — higher.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── WHAT ARE PREDICTION MARKETS? ─────────────── */}
      <section className="px-6 py-24 bg-white/50">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-navy mb-4">
                What Are Prediction Markets?
              </h2>
              <div className="mb-6 h-px w-12 bg-teal/40" />
              <p className="text-charcoal/80 leading-relaxed text-lg">
                A prediction market is a place where people buy and sell
                shares tied to whether a specific outcome will happen. The
                price of those shares reflects what the crowd collectively
                believes is likely — and it shifts as more people take a
                position. No jargon, no sales pitch, just clear
                explanations of how the whole thing works.
              </p>
              <a
                href="#get-the-guide"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-teal px-6 py-3.5 text-sm font-semibold text-white shadow-card hover:bg-teal-dark hover:shadow-card-hover active:scale-[0.98] transition-all duration-200"
              >
                <BookOpen className="h-4 w-4" />
                Learn the Basics
              </a>
            </div>
            <div>
              {/* Image placeholder — illustration to be added separately */}
              <div className="aspect-[4/3] w-full rounded-xl border-2 border-dashed border-navy/15 bg-navy/[0.02] flex items-center justify-center">
                <div className="text-center px-6">
                  <div className="mx-auto mb-3 inline-flex items-center justify-center h-12 w-12 rounded-full bg-navy/5">
                    <LineChart className="h-6 w-6 text-navy-light/50" />
                  </div>
                  <p className="text-sm text-navy-light/50">
                    Illustration to be added
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── HOW IT WORKS ─────────────── */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHeading>How It Works</SectionHeading>
          <div className="grid gap-4 sm:grid-cols-4">
            {[
              {
                icon: Users,
                accent: 'text-navy-light',
                step: '1',
                title: 'People Trade',
                caption: 'Participants buy and sell shares on an outcome.',
              },
              {
                icon: TrendingUp,
                accent: 'text-teal',
                step: '2',
                title: 'Prices Move',
                caption: 'As more people take sides, the price shifts.',
              },
              {
                icon: LineChart,
                accent: 'text-terracotta',
                step: '3',
                title: 'Prices Reflect Probability',
                caption: 'A 60¢ share implies a 60% chance of that outcome.',
              },
              {
                icon: Target,
                accent: 'text-slateblue',
                step: '4',
                title: 'Better Decisions',
                caption: 'Understanding the signal helps you think clearly.',
              },
            ].map(({ icon: Icon, accent, step, title, caption }, i, arr) => (
              <div key={title} className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-0">
                <div className="flex sm:flex-col items-center gap-3 sm:gap-4 flex-1">
                  <div className="relative inline-flex items-center justify-center h-14 w-14 rounded-full bg-white border border-navy/10 shadow-card shrink-0">
                    <Icon className={`h-6 w-6 ${accent}`} />
                    <span className="absolute -top-2 -right-2 flex items-center justify-center h-5 w-5 rounded-full bg-navy text-white text-[0.65rem] font-semibold">
                      {step}
                    </span>
                  </div>
                  <div className="sm:mt-1">
                    <h3 className="font-serif text-lg text-navy">{title}</h3>
                    <p className="mt-1 text-sm text-charcoal/65 leading-relaxed">
                      {caption}
                    </p>
                  </div>
                </div>
                {i < arr.length - 1 && (
                  <ArrowRight className="hidden sm:block h-5 w-5 text-navy-light/30 shrink-0 mx-auto mt-7" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── VALUE PROPOSITION ─────────────── */}
      <section className="relative overflow-hidden px-6 py-28 bg-white/50">
        <div className="section-bg-teal absolute inset-0 pointer-events-none" />
        <div className="relative mx-auto max-w-3xl">
          <SectionHeading>What the guide covers</SectionHeading>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              {
                icon: BookOpen,
                accent: 'text-navy-light',
                title: 'What a prediction market is',
                text: 'A clear, jargon free explanation of what these markets are and how they function.',
              },
              {
                icon: LineChart,
                accent: 'text-teal',
                title: 'How prices and probability work',
                text: 'The relationship between a market price and the likelihood of an outcome.',
              },
              {
                icon: TrendingUp,
                accent: 'text-terracotta',
                title: 'How they differ from traditional betting',
                text: 'The structural and practical differences that set prediction markets apart.',
              },
              {
                icon: ShieldCheck,
                accent: 'text-slateblue',
                title: 'What to know before exploring one',
                text: 'Basic strategies and tactics more experienced participants use, explained plainly.',
              },
            ].map(({ icon: Icon, accent, title, text }) => (
              <div
                key={title}
                className="flex gap-4 rounded-xl border border-navy/10 bg-white p-6 shadow-card hover:shadow-card-hover hover:border-navy/20 transition-all duration-300"
              >
                <div className="mt-0.5 shrink-0">
                  <Icon className={`h-6 w-6 ${accent}`} />
                </div>
                <div>
                  <h3 className="font-medium text-navy mb-1.5">{title}</h3>
                  <p className="text-charcoal/70 text-sm leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── WHY THIS ACTUALLY MATTERS ─────────────── */}
      <section className="relative overflow-hidden px-6 py-28">
        <div className="section-bg-navy absolute inset-0 pointer-events-none" />
        <div className="relative mx-auto max-w-3xl">
          <SectionHeading>Why this actually matters</SectionHeading>
          <div className="space-y-5 text-charcoal/80 leading-relaxed text-lg">
            <p>
              Real money moves through these markets every day. The people who
              understand the mechanics before participating are protected from
              the mistakes that cost uninformed participants the most —
              misreading odds, not understanding probability pricing, and not
              knowing what determines settlement.
            </p>
            <p>
              Beyond the mechanics, the guide also covers the practical
              approaches people use once they understand the basics — basic
              strategies and tactics that more experienced participants rely
              on, explained in the same plain, no hype way.
            </p>
            <p>
              This guide exists to close that gap before you risk anything.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────── GUIDE PREVIEW ─────────────── */}
      <section className="px-6 py-28 bg-white/50">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-12 sm:grid-cols-[280px_1fr] sm:items-center">
            {/* Cover */}
            <div className="mx-auto sm:mx-0">
              <a href="#get-the-guide" className="group block rounded-xl transition-transform duration-200 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal" aria-label="Get the free guide">
                <div className="guide-cover-texture aspect-[3/4] w-full max-w-[280px] rounded-xl shadow-card-lg ring-1 ring-navy/10 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden group-hover:shadow-card-lg group-focus-visible:ring-2 group-focus-visible:ring-teal">
                {/* Chart-line motif echoing the logo */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-[0.08]"
                  viewBox="0 0 280 373"
                  fill="none"
                  preserveAspectRatio="xMidYMid slice"
                  aria-hidden="true"
                >
                  <path
                    d="M30 280 L80 200 L130 240 L200 120 L250 150"
                    stroke="#3D8B6D"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="250" cy="150" r="6" fill="#3D8B6D" />
                  <path
                    d="M30 320 L90 260 L150 290 L220 200"
                    stroke="#B97A4F"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="220" cy="200" r="5" fill="#B97A4F" />
                </svg>

                {/* Accent corner marks */}
                <div className="absolute top-4 left-4 h-8 w-8 border-t-2 border-l-2 border-teal/30 rounded-tl-lg" />
                <div className="absolute bottom-4 right-4 h-8 w-8 border-b-2 border-r-2 border-terracotta/30 rounded-br-lg" />

                <div className="guide-icon-float relative flex items-center justify-center h-14 w-14 rounded-full bg-teal/15 ring-1 ring-teal/20 mb-5">
                  <BookOpen className="h-7 w-7 text-teal" />
                </div>
                <span className="relative font-serif text-2xl text-white leading-snug">
                  Prediction
                  <br />
                  Markets 101
                </span>
                <div className="relative mt-5 h-px w-16 bg-teal/50" />
                <span className="relative mt-5 text-[0.65rem] text-white/50 uppercase tracking-[0.2em]">
                  Free Guide
                </span>
              </div>
              </a>
            </div>

            {/* Details */}
            <div>
              <h2 className="font-serif text-3xl text-navy mb-2">
                Prediction Markets 101
              </h2>
              <p className="text-xs text-navy-light mb-8 uppercase tracking-[0.15em]">
                4 Short Lessons · About 10 Minute Read
              </p>

              <ul className="space-y-4 mb-8">
                {LESSONS.map(({ num, title }) => (
                  <li key={title} className="flex items-start gap-4">
                    <span className="flex items-center justify-center h-7 w-7 shrink-0 rounded-full bg-navy/5 text-xs font-semibold text-navy-light tabular-nums">
                      {num}
                    </span>
                    <span className="text-charcoal/85 pt-0.5">{title}</span>
                  </li>
                ))}
              </ul>

              {/* ─────────────── EXPLORE FREE CONTENT ─────────────── */}
              <div className="mb-8">
                <h3 className="font-serif text-lg text-navy mb-4">
                  Explore free content
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    {
                      icon: BookOpen,
                      accent: 'text-navy-light',
                      title: 'Articles',
                      text: 'Short, practical pieces on how prediction markets really work.',
                      href: '/articles',
                    },
                    {
                      icon: BookOpen,
                      accent: 'text-teal',
                      title: 'Guide',
                      text: 'Four short lessons covering the fundamentals, start to finish.',
                      href: '#get-the-guide',
                    },
                    {
                      icon: Users,
                      accent: 'text-terracotta',
                      title: 'Key Concepts',
                      text: 'How experienced participants think before they take a position.',
                      href: '#how-experienced-participants-think',
                    },
                    {
                      icon: ShieldCheck,
                      accent: 'text-slateblue',
                      title: 'Myths vs Facts',
                      text: 'Common misconceptions about prediction markets, corrected.',
                      href: '#myths-vs-facts',
                    },
                  ].map(({ icon: Icon, accent, title, text, href }) => (
                    <a
                      key={title}
                      href={href}
                      className="group flex gap-4 rounded-xl border border-navy/10 bg-white p-5 shadow-card hover:shadow-card-hover hover:border-navy/20 transition-all duration-300"
                    >
                      <div className="mt-0.5 shrink-0">
                        <Icon className={`h-5 w-5 ${accent}`} />
                      </div>
                      <div>
                        <h4 className="font-medium text-navy mb-1 group-hover:text-navy-dark transition-colors">
                          {title}
                        </h4>
                        <p className="text-charcoal/65 text-sm leading-relaxed">
                          {text}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-white/70 border border-navy/10 p-6 shadow-card">
                <h3 className="font-medium text-navy mb-2">About this guide</h3>
                <p className="text-sm text-charcoal/75 leading-relaxed">
                  We made this guide because most content in this space is
                  either overhyped, sales driven, or buried in jargon. We
                  wanted a calm, honest starting point for people who are
                  simply curious — something that explains the mechanics
                  clearly without pushing you toward any particular
                  platform or action.
                </p>
                <p className="mt-4 text-sm text-navy-light font-medium">
                  — The Playmatez team
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── PRICE TO PROBABILITY CONVERTER ─────────────── */}
      <section className="relative overflow-hidden px-6 py-28">
        <div className="section-bg-navy absolute inset-0 pointer-events-none" />
        <div className="relative mx-auto max-w-3xl">
          <SectionHeading>Try it yourself</SectionHeading>
          <p className="-mt-8 mb-12 text-center text-charcoal/60 text-lg">
            See how a market price becomes a probability
          </p>
          <PriceProbabilityConverter />
        </div>
      </section>

      {/* ─────────────── HOW EXPERIENCED PARTICIPANTS THINK ─────────────── */}
      <section id="how-experienced-participants-think" className="relative overflow-hidden px-6 py-28">
        <div className="section-bg-terracotta absolute inset-0 pointer-events-none" />
        <div className="relative mx-auto max-w-3xl">
          <SectionHeading>How Experienced Participants Think</SectionHeading>
          <p className="-mt-8 mb-12 text-center text-charcoal/60 text-lg">
            A few concepts worth understanding before you start
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              {
                icon: Users,
                accent: 'text-navy-light',
                title: 'Reading the Crowd',
                text: 'Market prices reflect what everyone collectively expects to happen. Learning to read that signal — without assuming the crowd is always right — is a foundational skill.',
                meta: 'Best for: everyone. Level: beginner.',
              },
              {
                icon: LineChart,
                accent: 'text-teal',
                title: 'Understanding Implied Probability',
                text: 'A market price is also a probability. A 60 cent share implies a 60% chance of that outcome. Knowing how to convert between price and likelihood helps you evaluate whether something is worth engaging with.',
                meta: 'Best for: everyone. Level: beginner.',
              },
              {
                icon: Scale,
                accent: 'text-terracotta',
                title: 'Position Sizing',
                text: 'No single outcome should be large enough to cause outsized harm. Position sizing is the practice of deciding how much to commit relative to what you can afford, so that any one result stays manageable.',
                meta: 'Best for: everyone, especially newer participants. Level: beginner.',
              },
              {
                icon: ShieldCheck,
                accent: 'text-slateblue',
                title: 'Avoiding Emotional Decisions',
                text: 'Markets move quickly and it is easy to react on feeling rather than reasoning. Recognizing when an impulse is emotional — and waiting before acting — is one of the most useful habits to develop.',
                meta: 'Best for: active participants. Level: intermediate.',
              },
              {
                icon: Target,
                accent: 'text-navy-light',
                title: 'Play to Your Knowledge',
                text: 'Markets in categories you genuinely understand well — a sport you follow closely, a topic you already know — tend to be where informed participants have a real edge over the crowd. Starting in a category you know is a stronger foundation than starting in one you don’t.',
                meta: 'Best for: beginners. Level: beginner.',
              },
            ].map(({ icon: Icon, accent, title, text, meta }) => (
              <div
                key={title}
                className="flex gap-4 rounded-xl border border-navy/10 bg-white p-6 shadow-card hover:shadow-card-hover hover:border-navy/20 transition-all duration-300"
              >
                <div className="mt-0.5 shrink-0">
                  <Icon className={`h-6 w-6 ${accent}`} />
                </div>
                <div>
                  <h3 className="font-medium text-navy mb-1.5">{title}</h3>
                  <p className="text-charcoal/70 text-sm leading-relaxed">{text}</p>
                  <p className="mt-2 text-xs text-charcoal/45">{meta}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-charcoal/70 text-lg">
            These fundamentals, and more, are covered in the free guide.
          </p>
        </div>
      </section>

      {/* ─────────────── GLOSSARY STRIP ─────────────── */}
      <section id="key-terms" className="relative overflow-hidden px-6 py-28">
        <div className="section-bg-teal absolute inset-0 pointer-events-none" />
        <div className="relative mx-auto max-w-5xl">
          <SectionHeading>Key terms, in plain language</SectionHeading>
          <GlossaryStrip />
        </div>
      </section>

      {/* ─────────────── MYTHS VS FACTS ─────────────── */}
      <section id="myths-vs-facts" className="relative overflow-hidden px-6 py-28">
        <div className="section-bg-navy absolute inset-0 pointer-events-none" />
        <div className="relative mx-auto max-w-3xl">
          <SectionHeading>Myths vs facts</SectionHeading>
          <MythsFacts />
        </div>
      </section>

      {/* ─────────────── BIG MONEY IS WATCHING ─────────────── */}
      <section className="relative overflow-hidden px-6 py-28">
        <div className="section-bg-slateblue absolute inset-0 pointer-events-none" />
        <div className="relative mx-auto max-w-3xl">
          <SectionHeading>Big money is watching this space</SectionHeading>

          {/* Stat callout cards */}
          <div className="grid gap-4 sm:grid-cols-3 mb-12">
            {STATS.map((stat) => (
              <div
                key={stat.value}
                className="rounded-xl border border-navy/10 bg-white p-6 text-center shadow-card"
              >
                <div className="font-serif text-3xl text-navy font-semibold">
                  {stat.value}
                </div>
                <div className="mt-2 text-xs text-navy-light leading-snug">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-5 text-charcoal/80 leading-relaxed text-lg">
            <p>
              Prediction markets have moved well beyond a niche curiosity.
              The numbers tell the story clearly.
            </p>
            <p>
              Combined monthly trading volume across the two leading
              prediction market platforms grew from under $5 billion in
              September 2025 to roughly $24 billion in April 2026 — larger
              than the entire US legal sportsbook industry's monthly
              handle, which sits around $14 billion.
            </p>
            <p>
              In October 2025, the New York Stock Exchange's parent company
              announced a strategic investment of up to $2 billion in
              Polymarket, valuing the platform at $8 billion. Total industry
              trading volume exceeded $63 billion across 2025 alone.
            </p>
            <p>
              Some analysts project the space could reach $1 trillion in
              volume by 2030 — a projection, not a certainty.
            </p>
            <p>
              The integration is already underway. Google Finance now
              displays live prediction market odds directly, and Robinhood
              has partnered with a major platform to bring prediction
              markets to its tens of millions of users.
            </p>
          </div>

          {/* Credibility line */}
          <p className="mt-8 text-xs text-navy-light/60 uppercase tracking-[0.12em]">
            As covered by CNN, Reuters, and the Wall Street Journal
          </p>

          <p className="mt-4 text-xs text-charcoal/50 italic">
            This content is for educational purposes only and does not
            constitute investment advice.
          </p>
        </div>
      </section>

      {/* ─────────────── FEATURED CALLOUT BANNER ─────────────── */}
      <section className="px-6 py-20 bg-navy">
        <div className="mx-auto max-w-3xl text-center">
          <blockquote className="font-serif text-2xl sm:text-3xl text-white leading-snug">
            &ldquo;A market price isn&rsquo;t a promise — it&rsquo;s what
            the crowd believes right now.&rdquo;
          </blockquote>
          <p className="mt-6 text-sm text-white/60">
            Ten percent chances happen all the time. Understanding that
            distinction is one of the most common mistakes newcomers make.
          </p>
          <a
            href="/articles/common-mistakes-to-avoid.html"
            className="mt-8 inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 active:scale-[0.98] transition-all duration-200"
          >
            Read the article &rarr;
          </a>
        </div>
      </section>

      {/* ─────────────── OUR MISSION ─────────────── */}
      <section className="px-6 py-24 bg-white/50">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              {/* Image placeholder — illustration to be added separately */}
              <div className="aspect-[4/3] w-full rounded-xl border-2 border-dashed border-navy/15 bg-navy/[0.02] flex items-center justify-center">
                <div className="text-center px-6">
                  <div className="mx-auto mb-3 inline-flex items-center justify-center h-12 w-12 rounded-full bg-navy/5">
                    <Target className="h-6 w-6 text-navy-light/50" />
                  </div>
                  <p className="text-sm text-navy-light/50">
                    Illustration to be added
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-navy mb-4">
                Our Mission
              </h2>
              <div className="mb-6 h-px w-12 bg-teal/40" />
              <p className="text-charcoal/80 leading-relaxed text-lg">
                The guide is the starting point, not the end. The aim is
                to keep building clear, no hype explanations as this
                space grows — more lessons, more articles, the same plain
                language throughout — so that anyone curious about
                prediction markets has a trustworthy place to learn the
                mechanics before they risk anything.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── PLATFORM COMPARISON ─────────────── */}
      <section className="relative overflow-hidden px-6 py-28">
        <div className="section-bg-teal absolute inset-0 pointer-events-none" />
        <div className="relative mx-auto max-w-4xl">
          <SectionHeading>How the main platforms compare</SectionHeading>
          <p className="-mt-8 mb-10 text-center text-charcoal/60 text-lg">
            Factual attributes only, side by side
          </p>
          <PlatformComparison />
          <div className="mt-6">
            <HistoricalExample />
          </div>
        </div>
      </section>

      {/* ─────────────── FAQ ─────────────── */}
      <section id="faq" ref={faqRef} className="px-6 py-28 bg-white/50">
        <div className="mx-auto max-w-2xl">
          <SectionHeading>Frequently asked questions</SectionHeading>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item) => (
              <FaqItem key={item.question} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── NEXT UP TEASER ─────────────── */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-xl border border-navy/10 bg-white p-6 shadow-card">
            <div className="mb-2 text-xs font-medium text-teal-dark uppercase tracking-[0.12em]">
              Next up
            </div>
            <h3 className="font-serif text-lg text-navy mb-1">
              Coming soon
            </h3>
            <p className="text-sm text-charcoal/70 leading-relaxed">
              The next guide in this series is being written. Stay on the email list and you&apos;ll get it the moment it&apos;s ready.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────── PRIMARY EMAIL CAPTURE ─────────────── */}
      <section id="get-the-guide" className="px-6 py-28">
        <div
          ref={guideRef}
          className={`mx-auto max-w-3xl transition-all duration-[550ms] ease-out ${
            guideVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[15px]'
          }`
          }
        >
          {/* Path 1: New here — the guide (primary, largest visual weight) */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-teal/10 mb-6">
              <Mail className="h-7 w-7 text-teal" />
            </div>
            <h2 className="font-serif text-3xl text-navy mb-2">
              New here? Start with the guide
            </h2>
            <p className="text-charcoal/75 mb-8 leading-relaxed">
              Enter your email and we&apos;ll send the guide straight to your inbox.
              More lessons and guides are planned, so there&apos;s more to come.
            </p>
            <SocialProof />
            <EmailForm variant="primary" onConverted={() => setHasConverted(true)} />
          </div>

          {/* Path 2: Already know the basics — live markets (secondary, medium weight) */}
          <div className="mt-12 rounded-xl border border-navy/15 bg-white/60 p-6 text-center">
            <h3 className="font-serif text-xl text-navy mb-2">
              Already understand the basics?
            </h3>
            <p className="text-sm text-charcoal/70 mb-5">
              Skip ahead and see live prediction markets in action.
            </p>
            <a
              href="https://picks.playmatez.cc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-navy/20 bg-white px-5 py-2.5 text-sm font-medium text-navy hover:border-navy/40 hover:bg-navy/5 active:scale-[0.98] transition-all duration-200"
            >
              <TrendingUp className="h-4 w-4" />
              See live markets
            </a>
            <p className="mt-4 inline-flex items-center justify-center gap-1.5 text-xs text-charcoal/55">
              <Gift className="h-3.5 w-3.5 text-teal" />
              If you sign up at Playmatez, use the code{' '}
              <span className="font-semibold text-navy rounded bg-navy/5 px-1.5 py-0.5">GUIDE</span>{' '}
              for a small welcome bonus on your first market.
            </p>
          </div>

          <p className="mt-4 text-center text-xs text-charcoal/50 italic">
            This content is for educational purposes only and does not
            constitute investment advice.
          </p>
        </div>
      </section>

      {/* ─────────────── STAY INFORMED ─────────────── */}
      <section className="px-6 py-20 bg-navy">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-white/10 mb-6">
            <Mail className="h-7 w-7 text-white" />
          </div>
          <h2 className="font-serif text-3xl text-white mb-2">
            Stay Informed
          </h2>
          <p className="text-white/70 mb-8 leading-relaxed">
            Get the guide and occasional emails when we publish new
            lessons or articles — roughly once or twice a month at most.
            No daily blasts, no third party offers. Unsubscribe anytime.
          </p>
          <EmailForm variant="primary" onConverted={() => setHasConverted(true)} />
        </div>
      </section>

      {/* ─────────────── FOOTER ─────────────── */}
      <footer className="px-6 py-12 border-t border-navy/10">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 sm:grid-cols-3">
            {/* Explore */}
            <div>
              <h4 className="font-serif text-sm text-navy mb-4 uppercase tracking-[0.12em]">Explore</h4>
              <ul className="space-y-2 text-sm text-navy-light/70">
                <li><a href="/articles" className="hover:text-navy underline decoration-navy-light/30 hover:decoration-navy-light transition-colors">Articles</a></li>
                <li><a href="#get-the-guide" className="hover:text-navy underline decoration-navy-light/30 hover:decoration-navy-light transition-colors">Guide</a></li>
                <li><a href="/about" className="hover:text-navy underline decoration-navy-light/30 hover:decoration-navy-light transition-colors">About</a></li>
              </ul>
            </div>
            {/* Resources */}
            <div>
              <h4 className="font-serif text-sm text-navy mb-4 uppercase tracking-[0.12em]">Resources</h4>
              <ul className="space-y-2 text-sm text-navy-light/70">
                <li><a href="#key-terms" className="hover:text-navy underline decoration-navy-light/30 hover:decoration-navy-light transition-colors">Glossary</a></li>
                <li><a href="#faq" className="hover:text-navy underline decoration-navy-light/30 hover:decoration-navy-light transition-colors">FAQ</a></li>
                <li><a href="/privacy" className="hover:text-navy underline decoration-navy-light/30 hover:decoration-navy-light transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            {/* Connect */}
            <div>
              <h4 className="font-serif text-sm text-navy mb-4 uppercase tracking-[0.12em]">Connect</h4>
              <ul className="space-y-2 text-sm text-navy-light/70">
                <li><a href="mailto:hello@predictionmarkets101.academy" className="hover:text-navy underline decoration-navy-light/30 hover:decoration-navy-light transition-colors">hello@predictionmarkets101.academy</a></li>
              </ul>
              <p className="mt-4 text-xs text-navy-light/50">
                Parent company address: 167-169 Great Portland Street,
                London, W1W 5PF, United Kingdom
              </p>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-navy/10 text-center space-y-3 text-sm text-navy-light/70">
            <p>
              Brought to you by{' '}
              <a
                href="https://playmatez.cc"
                className="text-navy-light hover:text-navy underline decoration-navy-light/30 hover:decoration-navy-light transition-colors"
              >
                Playmatez
              </a>
            </p>
            <p className="text-xs italic text-charcoal/50">
              This content is for educational purposes only and does not
              constitute investment advice.
            </p>
            <p className="text-xs">
              © {new Date().getFullYear()} Prediction Markets 101. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
