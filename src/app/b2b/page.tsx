"use client";

// app/b2b/page.tsx
// Client component — needs useState for the enquiry form
// All static content rendered immediately, form is the only interactive part

import { useState } from "react";
import Link from "next/link";
import B2BEnquiryForm from "./components/B2BEnquiryForm";

const USE_CASES = [
  {
    num: "01",
    title: "Corporate Gifting",
    desc: "Diwali hampers, onboarding kits, employee milestones, client appreciation. We handle everything from picking the right scents to custom packaging.",
    href: "/b2b/gifting",
    cta: "Explore Gifting",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "White Label",
    desc: "Want to sell perfumes under your own brand? We source premium imported oils, bottle them, and put your label on it. Your brand, our expertise.",
    href: "/b2b/white-label",
    cta: "Learn More",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Reseller / Retail",
    desc: "Own a gift shop, salon, or boutique? Stock Xcentia products at wholesale pricing. Consistent supply, proper invoicing, and GST-compliant billing.",
    href: "/b2b#enquire",
    cta: "Become a Reseller",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

const STEPS = [
  { num: "01", title: "Enquire", desc: "Fill the form below or WhatsApp us with your requirement — quantity, occasion, and timeline." },
  { num: "02", title: "Sample & Quote", desc: "We send you a sample kit and a detailed quote with pricing tiers within 48 hours." },
  { num: "03", title: "Confirm & Deliver", desc: "Approve the order, we handle production and deliver with GST invoice. Simple." },
];

const MOQ_TIERS = [
  { tier: "Starter", units: "25–50 units", price: "₹599/unit onwards", tag: "Corporate gifting, small teams" },
  { tier: "Business", units: "50–200 units", price: "₹499/unit onwards", tag: "Diwali hampers, mid-size offices", highlight: true },
  { tier: "Enterprise", units: "200+ units", price: "Custom pricing", tag: "Large corporates, white label" },
];

export default function B2BPage() {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@200;300;400;500;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');
        body { font-family: 'Work Sans', sans-serif; }
        ::selection { background: #b36619; color: #f8f7f6; }
      `}</style>

      <div className="bg-[#f8f7f6] text-[#211911] min-h-screen">

        {/* ── BREADCRUMB ─────────────────────────────────────────────────── */}
        <div className="px-8 lg:px-16 pt-8">
          <nav className="flex items-center gap-2 text-[9px] uppercase tracking-[0.35em] text-[#b36619]/55">
            <Link href="/" className="hover:text-[#b36619] transition-colors">Home</Link>
            <span className="text-[#211911]/20">›</span>
            <span className="text-[#211911] font-bold">Business Orders</span>
          </nav>
        </div>

        {/* ── HERO ───────────────────────────────────────────────────────── */}
        <section className="px-8 lg:px-16 pt-14 pb-20 max-w-[1440px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="max-w-2xl">
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#b36619] block mb-4">
                Bulk Orders · Corporate Gifting · White Label
              </span>
              <h1
                className="font-light tracking-tight leading-[0.9] mb-6"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(48px, 6vw, 88px)" }}
              >
                Fragrance,<br />
                <em>at Scale.</em>
              </h1>
              <p className="text-[14px] font-light text-[#211911]/50 leading-[1.85] max-w-lg mb-10">
                One bulk order changed everything for us. Now we've built a proper system for it.
                Whether you're gifting 30 employees or launching your own fragrance brand,
                we've got the infrastructure — and the pricing — to make it work.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#enquire"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-[#b36619] text-white
                             text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#211911]
                             transition-colors duration-300 no-underline"
                >
                  Send an Enquiry
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/919999999999?text=Hi%2C%20I%27m%20interested%20in%20a%20bulk%20order%20from%20Xcentia.%20Company%3A%20___%2C%20Quantity%3A%20___%2C%20Occasion%3A%20___"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-4 border border-[#211911]/15
                             text-[10px] font-bold uppercase tracking-[0.3em] text-[#211911]/60
                             hover:border-[#25D366] hover:text-[#25D366] transition-all duration-200 no-underline"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.856L.054 23.5l5.79-1.467A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.502-5.2-1.378l-.374-.217-3.437.871.901-3.353-.237-.388A9.946 9.946 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                  </svg>
                  WhatsApp Us
                </a>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-row lg:flex-col gap-8 lg:gap-6 flex-shrink-0">
              {[
                ["48hrs", "Quote turnaround"],
                ["25 units", "Minimum order"],
                ["GST", "Compliant billing"],
              ].map(([num, label]) => (
                <div key={label} className="flex flex-col gap-1">
                  <span
                    className="font-light text-[#211911] leading-none"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 3vw, 40px)" }}
                  >
                    {num}
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#211911]/35">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── USE CASES ──────────────────────────────────────────────────── */}
        <section className="border-t border-[#211911]/8 px-8 lg:px-16 py-20 max-w-[1440px] mx-auto">
          <div className="mb-12">
            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#b36619] block mb-3">
              What We Offer
            </span>
            <h2
              className="font-light tracking-tight leading-none"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 4.5vw, 56px)" }}
            >
              Three Ways to Work With Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {USE_CASES.map((uc) => (
              <div key={uc.num} className="group border border-[#211911]/8 bg-white p-8 flex flex-col gap-6 hover:border-[#b36619]/30 transition-colors duration-300">
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 flex items-center justify-center border border-[#b36619]/20 text-[#b36619]">
                    {uc.icon}
                  </div>
                  <span className="text-[10px] font-bold tracking-widest text-[#211911]/15">{uc.num}</span>
                </div>
                <div className="flex-1">
                  <h3
                    className="text-[22px] font-light tracking-tight text-[#211911] mb-3 leading-snug"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {uc.title}
                  </h3>
                  <p className="text-[13px] font-light text-[#211911]/50 leading-relaxed">
                    {uc.desc}
                  </p>
                </div>
                <Link
                  href={uc.href}
                  className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em]
                             text-[#b36619] hover:gap-3 transition-all duration-200 no-underline w-fit"
                >
                  {uc.cta}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ── HOW IT WORKS ───────────────────────────────────────────────── */}
        <section className="bg-[#211911] px-8 lg:px-16 py-20">
          <div className="max-w-[1440px] mx-auto">
            <div className="mb-14">
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#b36619] block mb-3">
                The Process
              </span>
              <h2
                className="font-light text-[#f8f7f6] tracking-tight leading-none"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 4.5vw, 56px)" }}
              >
                Simple. No Runaround.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {STEPS.map((step, i) => (
                <div key={step.num} className="flex flex-col gap-5 py-10 pr-10 border-b md:border-b-0 md:border-r border-[#f8f7f6]/8 last:border-0">
                  <span
                    className="font-light text-[#b36619] leading-none"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px, 4vw, 56px)" }}
                  >
                    {step.num}
                  </span>
                  <div>
                    <h3 className="text-[14px] font-bold uppercase tracking-[0.2em] text-[#f8f7f6] mb-3">
                      {step.title}
                    </h3>
                    <p className="text-[13px] font-light text-[#f8f7f6]/45 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="hidden md:block mt-auto">
                      <svg className="w-5 h-5 text-[#b36619]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICING TIERS ──────────────────────────────────────────────── */}
        <section className="px-8 lg:px-16 py-20 max-w-[1440px] mx-auto">
          <div className="mb-12">
            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#b36619] block mb-3">
              Pricing
            </span>
            <h2
              className="font-light tracking-tight leading-none"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 4.5vw, 56px)" }}
            >
              Transparent. No Surprises.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {MOQ_TIERS.map((tier) => (
              <div
                key={tier.tier}
                className={`flex flex-col gap-6 p-8 border transition-all duration-200
                  ${tier.highlight
                    ? "border-[#b36619] bg-[#b36619]/4"
                    : "border-[#211911]/8 bg-white hover:border-[#211911]/20"
                  }`}
              >
                {tier.highlight && (
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#b36619] -mt-2">
                    Most Popular
                  </span>
                )}
                <div>
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#211911]/40 mb-2">
                    {tier.tier}
                  </h3>
                  <div
                    className="font-light text-[#211911] leading-none mb-1"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 3vw, 38px)" }}
                  >
                    {tier.units}
                  </div>
                </div>
                <div className="border-t border-[#211911]/8 pt-5">
                  <div className="text-[15px] font-semibold text-[#211911] mb-1">{tier.price}</div>
                  <div className="text-[11px] font-light text-[#211911]/45">{tier.tag}</div>
                </div>
                <a
                  href="#enquire"
                  className={`mt-auto py-3 text-center text-[10px] font-bold uppercase tracking-[0.25em]
                    transition-colors duration-200 no-underline
                    ${tier.highlight
                      ? "bg-[#b36619] text-white hover:bg-[#211911]"
                      : "border border-[#211911]/15 text-[#211911]/60 hover:border-[#b36619] hover:text-[#b36619]"
                    }`}
                >
                  Get a Quote
                </a>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-[#211911]/30 mt-6 font-light">
            * Prices are indicative and vary based on fragrance selection, packaging, and customisation requirements.
            Final pricing shared after enquiry.
          </p>
        </section>

        {/* ── OCCASIONS ──────────────────────────────────────────────────── */}
        <section className="border-t border-[#211911]/8 px-8 lg:px-16 py-20 max-w-[1440px] mx-auto">
          <div className="mb-12">
            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#b36619] block mb-3">
              Popular Use Cases
            </span>
            <h2
              className="font-light tracking-tight leading-none"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 4.5vw, 56px)" }}
            >
              Built for Every Occasion
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { emoji: "🪔", title: "Diwali Hampers", desc: "The most popular gifting season. We start taking orders from September." },
              { emoji: "🎯", title: "Employee Onboarding", desc: "Make a great first impression. A scent in the welcome kit lands differently." },
              { emoji: "🤝", title: "Client Appreciation", desc: "Something premium without the designer price tag. Clients notice the quality." },
              { emoji: "🏆", title: "Awards & Milestones", desc: "Work anniversaries, performance rewards, team achievements." },
              { emoji: "💍", title: "Wedding Favours", desc: "Custom-labelled bottles as return gifts. MOQ 50 units." },
              { emoji: "🏢", title: "Corporate Events", desc: "Conferences, product launches, annual days. Branded packaging available." },
              { emoji: "🎓", title: "Graduation Gifts", desc: "Institutes gifting students or alumni gifting batches." },
              { emoji: "🛍️", title: "Retail Stocking", desc: "Gift shops, salons, boutiques. We supply consistently on wholesale terms." },
            ].map((occ) => (
              <div key={occ.title} className="p-5 border border-[#211911]/8 bg-white hover:border-[#b36619]/25 transition-colors duration-200 group">
                <div className="text-2xl mb-3">{occ.emoji}</div>
                <h4 className="text-[12px] font-bold text-[#211911] mb-2 uppercase tracking-[0.15em]">
                  {occ.title}
                </h4>
                <p className="text-[11px] font-light text-[#211911]/45 leading-relaxed">
                  {occ.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── ENQUIRY FORM ───────────────────────────────────────────────── */}
        <section id="enquire" className="bg-[#211911] px-8 lg:px-16 py-20">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex flex-col lg:flex-row gap-16 items-start">

              {/* Left — copy */}
              <div className="w-full lg:w-[38%] flex-shrink-0">
                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#b36619] block mb-4">
                  Get in Touch
                </span>
                <h2
                  className="font-light text-[#f8f7f6] tracking-tight leading-[0.92] mb-6"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 4vw, 52px)" }}
                >
                  Tell Us What<br />
                  <em>You Need.</em>
                </h2>
                <p className="text-[13px] font-light text-[#f8f7f6]/40 leading-relaxed mb-10">
                  Fill the form and we'll get back within 48 hours with a sample kit
                  and a detailed quote. No commitment required.
                </p>

                {/* WhatsApp shortcut */}
                <a
                  href="https://wa.me/919999999999?text=Hi%2C%20I%27m%20interested%20in%20a%20bulk%20order%20from%20Xcentia.%20Company%3A%20___%2C%20Quantity%3A%20___%2C%20Occasion%3A%20___"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3.5 border border-[#25D366]/30
                             text-[#25D366] text-[10px] font-bold uppercase tracking-[0.25em]
                             hover:bg-[#25D366]/10 transition-all duration-200 no-underline"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.856L.054 23.5l5.79-1.467A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.502-5.2-1.378l-.374-.217-3.437.871.901-3.353-.237-.388A9.946 9.946 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                  </svg>
                  Prefer WhatsApp? Message Us
                </a>

                <div className="mt-10 pt-10 border-t border-[#f8f7f6]/8 space-y-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#f8f7f6]/20">
                    Xcentia Fragrances
                  </p>
                  <p className="text-[12px] font-light text-[#f8f7f6]/35">Dombivli, Maharashtra</p>
                  <p className="text-[12px] font-light text-[#f8f7f6]/35">b2b@xcentiafragrances.com</p>
                </div>
              </div>

              {/* Right — form (client island) */}
              <div className="w-full flex-1">
                <B2BEnquiryForm />
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}