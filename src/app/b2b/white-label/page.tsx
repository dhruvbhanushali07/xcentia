"use client";

// app/b2b/white-label/page.tsx

import { useState } from "react";
import Link from "next/link";

const STEPS = [
  { num: "01", title: "You Share Your Vision", desc: "Tell us the scent profile you want — fresh, oud-heavy, floral, woody. Send references if you have them." },
  { num: "02", title: "We Send Samples", desc: "We pick 3–5 oils that match your brief and ship sample vials. You pick the one that feels right." },
  { num: "03", title: "Label & Packaging", desc: "Send us your logo and brand guidelines. We handle the bottle, cap, label, and outer box." },
  { num: "04", title: "Production & Delivery", desc: "Minimum 100 units. We bottle, quality check, and deliver with full GST invoice." },
];

const FAQS = [
  { q: "What's the minimum order quantity for white label?", a: "100 units per SKU. If you want multiple scents, each one needs its own MOQ of 100 units." },
  { q: "Do you make the fragrance oil or import it?", a: "We import premium fragrance oils from established global suppliers. We do the blending, bottling, and finishing in Dombivli." },
  { q: "Can I use my own bottle design?", a: "Yes, if you supply the bottles. Otherwise we have a range of standard bottle shapes you can choose from." },
  { q: "How long does the full process take?", a: "From confirmed order to delivery: typically 3–4 weeks. First-time orders take longer due to sampling." },
  { q: "Is GST invoice provided?", a: "Yes. All orders come with a proper GST invoice. We are GST registered." },
  { q: "Can I sell the product under my own brand name?", a: "Completely. Once you take delivery, it's your product. We don't put Xcentia branding on white label orders." },
];

export default function WhiteLabelPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@200;300;400;500;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');
        body { font-family: 'Work Sans', sans-serif; }
        ::selection { background: #b36619; color: #f8f7f6; }
      `}</style>

      <div className="bg-[#f8f7f6] text-[#211911] min-h-screen">

        {/* ── BREADCRUMB ─────────────────────────────────────────────── */}
        <div className="px-8 lg:px-16 pt-8">
          <nav className="flex items-center gap-2 text-[9px] uppercase tracking-[0.35em] text-[#b36619]/55">
            <Link href="/" className="hover:text-[#b36619] transition-colors">Home</Link>
            <span className="text-[#211911]/20">›</span>
            <Link href="/b2b" className="hover:text-[#b36619] transition-colors">Business Orders</Link>
            <span className="text-[#211911]/20">›</span>
            <span className="text-[#211911] font-bold">White Label</span>
          </nav>
        </div>

        {/* ── HERO ───────────────────────────────────────────────────── */}
        <section className="px-8 lg:px-16 pt-14 pb-20 max-w-[1440px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 border-b border-[#211911]/8 pb-16">
            <div className="max-w-2xl">
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#b36619] block mb-4">
                White Label Programme
              </span>
              <h1
                className="font-light tracking-tight leading-[0.9] mb-5"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(44px, 6vw, 80px)" }}
              >
                Your Brand.<br />
                <em>Our Expertise.</em>
              </h1>
              <p className="text-[14px] font-light text-[#211911]/50 leading-[1.85] max-w-lg mb-8">
                Want to launch your own fragrance line without building a factory?
                We import the oils, blend to your brief, and bottle it under your label.
                You take all the credit. We stay in the background.
              </p>
              <a
                href="/b2b#enquire"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#b36619] text-white
                           text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#211911]
                           transition-colors duration-300 no-underline"
              >
                Start a Conversation
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* What's included */}
            <div className="flex-shrink-0 space-y-4 w-full lg:w-[300px]">
              <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-[#211911]/35">
                What's included
              </p>
              {[
                "Premium imported fragrance oil",
                "EDP formulation (20% concentration)",
                "Bottle & cap sourcing",
                "Custom label printing",
                "Outer box / packaging",
                "GST invoice",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-4 h-4 border border-[#b36619]/40 flex items-center justify-center flex-shrink-0">
                    <svg className="w-2.5 h-2.5 text-[#b36619]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[12px] font-light text-[#211911]/70">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ───────────────────────────────────────────── */}
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
                From Brief to Shelf
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
              {STEPS.map((step, i) => (
                <div
                  key={step.num}
                  className="flex flex-col gap-4 py-8 pr-8 border-b lg:border-b-0 lg:border-r border-[#f8f7f6]/8 last:border-0"
                >
                  <span
                    className="font-light text-[#b36619] leading-none"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "40px" }}
                  >
                    {step.num}
                  </span>
                  <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#f8f7f6]">
                    {step.title}
                  </h3>
                  <p className="text-[12px] font-light text-[#f8f7f6]/40 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICING SIMPLE ─────────────────────────────────────────── */}
        <section className="px-8 lg:px-16 py-20 max-w-[1440px] mx-auto border-b border-[#211911]/8">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="flex-1">
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#b36619] block mb-4">
                Pricing
              </span>
              <h2
                className="font-light tracking-tight leading-none mb-6"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 50px)" }}
              >
                No Hidden Costs
              </h2>
              <p className="text-[14px] font-light text-[#211911]/50 leading-relaxed max-w-lg">
                White label pricing depends on the oil chosen, bottle type, and label complexity.
                We'll give you an exact per-unit cost after a 15-minute conversation.
                The range is typically ₹400–₹900 per unit at 100-unit MOQ.
              </p>
            </div>
            <div className="w-full lg:w-[340px] flex-shrink-0 space-y-4">
              {[
                { label: "Minimum Order Quantity", value: "100 units / SKU" },
                { label: "Typical Per-Unit Cost", value: "₹400 – ₹900" },
                { label: "Lead Time", value: "3–4 weeks" },
                { label: "Sampling Turnaround", value: "5–7 days" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between py-4 border-b border-[#211911]/8">
                  <span className="text-[11px] font-medium text-[#211911]/45 uppercase tracking-[0.15em]">{label}</span>
                  <span className="text-[13px] font-semibold text-[#211911]">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ────────────────────────────────────────────────────── */}
        <section className="px-8 lg:px-16 py-20 max-w-[1440px] mx-auto">
          <div className="mb-12">
            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#b36619] block mb-3">
              FAQ
            </span>
            <h2
              className="font-light tracking-tight leading-none"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 50px)" }}
            >
              Common Questions
            </h2>
          </div>

          <div className="max-w-3xl divide-y divide-[#211911]/8">
            {FAQS.map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-start justify-between gap-4 py-6 text-left group"
                >
                  <span className={`text-[14px] font-medium leading-snug transition-colors duration-200
                    ${openFaq === i ? "text-[#b36619]" : "text-[#211911] group-hover:text-[#b36619]"}`}>
                    {faq.q}
                  </span>
                  <span className={`flex-shrink-0 text-[#211911]/30 transition-transform duration-200 mt-0.5
                    ${openFaq === i ? "rotate-45 text-[#b36619]" : ""}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </button>
                {openFaq === i && (
                  <p className="text-[13px] font-light text-[#211911]/55 leading-relaxed pb-6">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ────────────────────────────────────────────────────── */}
        <section className="bg-[#b36619] px-8 lg:px-16 py-16">
          <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2
                className="font-light text-white tracking-tight leading-[0.92]"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 48px)" }}
              >
                Ready to Launch<br />Your Own Scent?
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-4 flex-shrink-0">
              <Link
                href="/b2b#enquire"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#211911]
                           text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#211911]
                           hover:text-white transition-colors duration-300 no-underline"
              >
                Send an Enquiry
              </Link>
              <a
                href="https://wa.me/919999999999?text=Hi%2C%20I%27m%20interested%20in%20white%20label%20from%20Xcentia."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-4 border border-white/40 text-white
                           text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white/10
                           transition-all duration-200 no-underline"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}