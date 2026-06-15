"use client";

// app/b2b/gifting/page.tsx
// Client component — hamper builder needs useState for selections

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase/client";

interface Product {
  id: string;
  name: string;
  slug: string;
  fragrance_family: string;
  image: string;
  product_variants: { price: number }[];
}

const BOX_OPTIONS = [
  {
    id: "standard",
    label: "Standard Box",
    desc: "Kraft box with tissue paper and ribbon",
    price: 0,
    tag: "Included",
  },
  {
    id: "branded",
    label: "Branded Box",
    desc: "Custom printed with your company logo",
    price: 150,
    tag: "+₹150/unit",
  },
  {
    id: "premium",
    label: "Premium Gift Set",
    desc: "Rigid box, velvet inlay, personalised card",
    price: 350,
    tag: "+₹350/unit",
  },
];

const QTY_OPTIONS = ["25–50", "50–100", "100–200", "200–500", "500+"];

export default function GiftingPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedBox, setSelectedBox] = useState("standard");
  const [selectedQty, setSelectedQty] = useState("50–100");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase
        .from("products")
        .select("id, name, slug, fragrance_family, image, product_variants ( price )")
        .limit(8)
        .returns<Product[]>();
      if (data) setProducts(data);
      setLoading(false);
    }
    fetch();
  }, []);

  function toggleProduct(id: string) {
    setSelectedProducts((prev) =>
      prev.includes(id)
        ? prev.filter((p) => p !== id)
        : prev.length >= 3
        ? prev
        : [...prev, id]
    );
  }

  // Estimated price calc
  const basePrice = 599;
  const boxPrice = BOX_OPTIONS.find((b) => b.id === selectedBox)?.price ?? 0;
  const estPerUnit = basePrice + boxPrice;

  function handleGetQuote() {
    setSubmitted(true);
    // Redirect to main enquiry form with pre-fill
    setTimeout(() => {
      window.location.href = `/b2b#enquire`;
    }, 1200);
  }

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
            <span className="text-[#211911] font-bold">Corporate Gifting</span>
          </nav>
        </div>

        {/* ── HERO ───────────────────────────────────────────────────── */}
        <section className="px-8 lg:px-16 pt-14 pb-16 max-w-[1440px] mx-auto border-b border-[#211911]/8">
          <div className="max-w-2xl">
            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#b36619] block mb-4">
              Corporate Gifting
            </span>
            <h1
              className="font-light tracking-tight leading-[0.9] mb-5"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(44px, 6vw, 80px)" }}
            >
              Gifting That<br />
              <em>Leaves an Impression</em>
            </h1>
            <p className="text-[14px] font-light text-[#211911]/50 leading-[1.85] max-w-lg">
              From 25-unit Diwali hampers to 500-unit employee kits — we handle
              everything. Pick your scents, choose your packaging, and we deliver
              with a GST invoice.
            </p>
          </div>
        </section>

        {/* ── HAMPER BUILDER ─────────────────────────────────────────── */}
        <section className="px-8 lg:px-16 py-16 max-w-[1440px] mx-auto">
          <div className="mb-10">
            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#b36619] block mb-3">
              Build Your Hamper
            </span>
            <h2
              className="font-light tracking-tight leading-none"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 50px)" }}
            >
              Customise Your Order
            </h2>
            <p className="text-[12px] text-[#211911]/40 mt-2">
              This gives us a rough idea of your requirement — final pricing confirmed after enquiry.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-start">

            {/* LEFT — builder steps */}
            <div className="flex-1 space-y-12">

              {/* Step 1 — Pick scents */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-6 h-6 flex items-center justify-center bg-[#b36619] text-white text-[10px] font-black">
                    1
                  </span>
                  <h3 className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#211911]">
                    Choose Scents
                  </h3>
                  <span className="text-[10px] text-[#211911]/30 font-medium">
                    Pick up to 3
                  </span>
                </div>

                {loading ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="aspect-[4/5] bg-[#211911]/5 animate-pulse" />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {products.map((p) => {
                      const selected = selectedProducts.includes(p.id);
                      const disabled = !selected && selectedProducts.length >= 3;
                      return (
                        <button
                          key={p.id}
                          onClick={() => toggleProduct(p.id)}
                          disabled={disabled}
                          className={`group relative flex flex-col text-left transition-all duration-200
                            ${disabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
                        >
                          <div className={`aspect-[4/5] relative overflow-hidden mb-3 border-2 transition-all duration-200
                            ${selected ? "border-[#b36619]" : "border-transparent"}`}
                          >
                            <Image
                              src={p.image}
                              alt={p.name}
                              fill
                              sizes="(max-width: 768px) 50vw, 25vw"
                              className={`object-cover transition-all duration-500 ${selected ? "scale-[1.03]" : "grayscale group-hover:grayscale-0"}`}
                            />
                            {selected && (
                              <div className="absolute top-2 right-2 w-6 h-6 bg-[#b36619] flex items-center justify-center">
                                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#b36619] block mb-0.5">
                            {p.fragrance_family}
                          </span>
                          <span
                            className="text-[14px] font-light text-[#211911] leading-snug"
                            style={{ fontFamily: "'Cormorant Garamond', serif" }}
                          >
                            {p.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Step 2 — Packaging */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-6 h-6 flex items-center justify-center bg-[#b36619] text-white text-[10px] font-black">
                    2
                  </span>
                  <h3 className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#211911]">
                    Choose Packaging
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {BOX_OPTIONS.map((box) => (
                    <button
                      key={box.id}
                      onClick={() => setSelectedBox(box.id)}
                      className={`p-5 border text-left transition-all duration-200
                        ${selectedBox === box.id
                          ? "border-[#b36619] bg-[#b36619]/5"
                          : "border-[#211911]/10 bg-white hover:border-[#211911]/25"
                        }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#211911]">
                          {box.label}
                        </h4>
                        {selectedBox === box.id && (
                          <div className="w-4 h-4 bg-[#b36619] flex items-center justify-center flex-shrink-0">
                            <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <p className="text-[11px] font-light text-[#211911]/45 mb-3">{box.desc}</p>
                      <span className={`text-[10px] font-bold uppercase tracking-[0.2em]
                        ${box.price === 0 ? "text-[#211911]/30" : "text-[#b36619]"}`}>
                        {box.tag}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3 — Quantity */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-6 h-6 flex items-center justify-center bg-[#b36619] text-white text-[10px] font-black">
                    3
                  </span>
                  <h3 className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#211911]">
                    Approximate Quantity
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {QTY_OPTIONS.map((qty) => (
                    <button
                      key={qty}
                      onClick={() => setSelectedQty(qty)}
                      className={`px-5 py-2.5 text-[11px] font-semibold tracking-[0.15em] border transition-all duration-200
                        ${selectedQty === qty
                          ? "border-[#211911] bg-[#211911] text-white"
                          : "border-[#211911]/15 text-[#211911]/50 hover:border-[#211911]/40 hover:text-[#211911]"
                        }`}
                    >
                      {qty} units
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT — summary sticky */}
            <div className="w-full lg:w-[300px] flex-shrink-0 lg:sticky lg:top-24">
              <div className="border border-[#211911]/10 bg-white p-7">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#211911] mb-6 pb-4 border-b border-[#211911]/8">
                  Hamper Summary
                </h3>

                {/* Selected scents */}
                <div className="mb-5">
                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#211911]/35 mb-3">
                    Scents ({selectedProducts.length}/3)
                  </p>
                  {selectedProducts.length === 0 ? (
                    <p className="text-[12px] font-light text-[#211911]/25 italic">None selected</p>
                  ) : (
                    <ul className="space-y-2">
                      {selectedProducts.map((id) => {
                        const p = products.find((pr) => pr.id === id);
                        return p ? (
                          <li key={id} className="flex items-center justify-between">
                            <span
                              className="text-[13px] font-light text-[#211911]"
                              style={{ fontFamily: "'Cormorant Garamond', serif" }}
                            >
                              {p.name}
                            </span>
                            <button
                              onClick={() => toggleProduct(id)}
                              className="text-[#211911]/25 hover:text-red-400 transition-colors text-xs"
                            >
                              ×
                            </button>
                          </li>
                        ) : null;
                      })}
                    </ul>
                  )}
                </div>

                {/* Packaging */}
                <div className="mb-5 pt-4 border-t border-[#211911]/8">
                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#211911]/35 mb-2">
                    Packaging
                  </p>
                  <p className="text-[13px] font-light text-[#211911]">
                    {BOX_OPTIONS.find((b) => b.id === selectedBox)?.label}
                  </p>
                </div>

                {/* Quantity */}
                <div className="mb-6 pt-4 border-t border-[#211911]/8">
                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#211911]/35 mb-2">
                    Quantity
                  </p>
                  <p className="text-[13px] font-light text-[#211911]">{selectedQty} units</p>
                </div>

                {/* Estimate */}
                <div className="py-5 border-t border-b border-[#211911]/8 mb-6">
                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#211911]/35 mb-1">
                    Estimated Price
                  </p>
                  <div
                    className="text-[32px] font-light text-[#211911] leading-none"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    ₹{estPerUnit}
                    <span className="text-[16px] text-[#211911]/40">/unit</span>
                  </div>
                  <p className="text-[10px] text-[#211911]/30 mt-1">
                    Final price confirmed after enquiry
                  </p>
                </div>

                <button
                  onClick={handleGetQuote}
                  disabled={submitted}
                  className={`w-full py-4 text-[10px] font-bold uppercase tracking-[0.28em] text-white
                    transition-colors duration-300
                    ${submitted
                      ? "bg-[#2d6a4f] cursor-default"
                      : "bg-[#b36619] hover:bg-[#211911] cursor-pointer"
                    }`}
                >
                  {submitted ? "✓ Redirecting…" : "Get a Formal Quote"}
                </button>

                <a
                  href="https://wa.me/919999999999?text=Hi%2C%20I%27m%20interested%20in%20corporate%20gifting%20from%20Xcentia."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 mt-3 py-3 border border-[#25D366]/30
                             text-[#25D366] text-[10px] font-bold uppercase tracking-[0.2em]
                             hover:bg-[#25D366]/8 transition-all duration-200 no-underline"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.856L.054 23.5l5.79-1.467A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.502-5.2-1.378l-.374-.217-3.437.871.901-3.353-.237-.388A9.946 9.946 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                  </svg>
                  WhatsApp Instead
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}