"use client";

import { useEffect, useRef, useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Product {
  id: string;
  name: string;
  notes: string;
  price: string;
  img: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const PRODUCTS: Product[] = [
  {
    id: "01",
    name: "Alpine Air",
    notes: "Ozone · Mineral · Ice",
    price: "CHF 180",
    img: "https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80",
  },
  {
    id: "02",
    name: "Glacial Rock",
    notes: "Slate · Cold Water · Flint",
    price: "CHF 195",
    img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80",
  },
  {
    id: "03",
    name: "Cedar Mist",
    notes: "Evergreen · Dew · Bark",
    price: "CHF 175",
    img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80",
  },
  {
    id: "04",
    name: "Terroir",
    notes: "Wet Earth · Hay · Rain",
    price: "CHF 210",
    img: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=600&q=80",
  },
];

// ─── Custom Cursor ────────────────────────────────────────────────────────────
function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      if (dot.current) dot.current.style.transform = `translate(${x - 4}px, ${y - 4}px)`;
      if (ring.current) ring.current.style.transform = `translate(${x - 20}px, ${y - 20}px)`;
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setIsHovering(!!(t.closest("a,button,[data-hover]")));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#b36619] pointer-events-none z-[9999] transition-transform duration-75"
      />
      <div
        ref={ring}
        className={`fixed top-0 left-0 w-10 h-10 rounded-full border border-[#b36619]/60 pointer-events-none z-[9998] transition-all duration-300 ${
          isHovering ? "scale-[2.2] border-[#b36619]/25" : "scale-100"
        }`}
      />
    </>
  );
}

// ─── Ticker ───────────────────────────────────────────────────────────────────
const TICKER_ITEMS = ["Swiss Perfumery", "Grasse Sourced", "Handcrafted Botanicals", "Limited Editions", "Natural Ingredients", "Est. 1924", "Free Shipping CHF 200+"];

function Ticker() {
  return (
    <div className="overflow-hidden border-t border-b border-[#b36619]/12 bg-[#211911] py-[14px]">
      <div className="flex gap-0 animate-ticker whitespace-nowrap" style={{ width: "max-content" }}>
        {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-6 px-8">
            <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-[#f8f7f6]/38">
              {item}
            </span>
            <span className="text-[#b36619]/50 text-[10px]">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ product, index }: { product: Product; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (!ref.current) return;
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          delay: index * 0.1,
          scrollTrigger: { trigger: ref.current, start: "top 90%" },
        }
      );
    })();
  }, [index]);

  return (
    <div ref={ref} data-hover className="group flex flex-col gap-5 cursor-none opacity-0">
      <div className="aspect-[3/4] bg-[#f0ebe3] overflow-hidden relative">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-5 left-5 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
          <button className="text-[9px] font-bold uppercase tracking-[0.28em] text-white bg-[#b36619] px-5 py-2.5 cursor-none">
            Add to Bag
          </button>
        </div>
        <span className="absolute top-4 right-4 font-black text-[10px] tracking-[0.3em] text-[#211911]/25">
          N°{product.id}
        </span>
      </div>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-[16px] font-bold tracking-tight text-[#211911]">
            N° {product.id} {product.name}
          </h3>
          <p className="text-[10px] text-[#211911]/40 uppercase tracking-[0.2em] mt-1 font-medium">
            {product.notes}
          </p>
        </div>
        <span className="text-[#b36619] font-bold text-sm">{product.price}</span>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function XcentiaHomePage() {
  const heroHeadRef = useRef<HTMLDivElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const heroCtaRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const heroEyebrowRef = useRef<HTMLSpanElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const heritageImgRef = useRef<HTMLDivElement>(null);
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hero entrance timeline
  useEffect(() => {
    (async () => {
      const { gsap } = await import("gsap");
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(navRef.current, { y: -16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 })
        .fromTo(heroImgRef.current, { scale: 1.05, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.3 }, "-=0.4")
        .fromTo(heroEyebrowRef.current, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.9")
        .fromTo(
          heroHeadRef.current?.querySelectorAll(".word-line") ?? [],
          { yPercent: 105, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.1 },
          "-=0.7"
        )
        .fromTo(heroSubRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.5")
        .fromTo(heroCtaRef.current, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4");
    })();
  }, []);

  // Heritage parallax
  useEffect(() => {
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (!heritageImgRef.current) return;
      gsap.fromTo(
        heritageImgRef.current.querySelector("img"),
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: heritageImgRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );
    })();
  }, []);

  const HERO_WORDS = ["THE", "ESSENCE", "OF", "PRECISION"];

  return (
    <div className="bg-[#f8f7f6] text-[#211911] min-h-screen overflow-x-hidden cursor-none">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,200;0,300;0,400;0,500;0,700;0,900;1,300&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700&display=swap');
        body { font-family: 'Work Sans', sans-serif; }
        * { cursor: none !important; box-sizing: border-box; }
        ::selection { background: #b36619; color: #f8f7f6; }
        html { scroll-behavior: smooth; }
        @keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .animate-ticker { animation: ticker 30s linear infinite; }
        .line-clip { overflow: hidden; display: block; }
        .word-line { display: block; }
      `}</style>

      <CustomCursor />

      {/* ── NAV ─────────────────────────────────────────────────────── */}
      <header
        ref={navRef}
        className={`sticky top-0 z-50 flex items-center justify-between px-8 md:px-16 py-5 opacity-0 transition-all duration-500 ${
          navScrolled
            ? "bg-[#f8f7f6]/92 backdrop-blur-md border-b border-[#b36619]/10"
            : "bg-transparent"
        }`}
      >
        <a href="#" className="flex items-center gap-3" data-hover>
          <svg className="w-5 h-5 text-[#b36619]" viewBox="0 0 48 48" fill="none">
            <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" fill="currentColor" />
          </svg>
          <span className="text-[18px] font-black uppercase tracking-[0.18em]">Xcentia</span>
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {["Collection", "Heritage", "Bespoke"].map((l) => (
            <a key={l} href="#" data-hover
              className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#211911]/55 hover:text-[#211911] transition-colors duration-200 relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-[#b36619] hover:after:w-full after:transition-all after:duration-300"
            >
              {l}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          {["search", "shopping_bag"].map((icon) => (
            <button key={icon} data-hover className="w-9 h-9 flex items-center justify-center hover:bg-[#b36619]/8 rounded-full transition-colors duration-200">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'wght' 200" }}>{icon}</span>
            </button>
          ))}
        </div>
      </header>

      <main>
        {/* ── HERO ────────────────────────────────────────────────────── */}
        <section className="px-8 md:px-16 pt-8 pb-20 max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center min-h-[84vh]">

            {/* Left — Hero image */}
            <div className="md:col-span-7 h-full opacity-0" ref={heroImgRef}>
              <div className="relative w-full aspect-[4/5] md:aspect-[16/10] overflow-hidden bg-[#e8e0d5]">
                <img
                  src="https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=1400&q=90"
                  alt="Xcentia — The Essence of Precision"
                  className="w-full h-full object-cover"
                />
                {/* Bottom badge */}
                <div className="absolute bottom-6 left-6 bg-[#211911]/80 backdrop-blur-sm px-5 py-3">
                  <p className="text-[9px] text-[#f8f7f6]/45 uppercase tracking-[0.35em] mb-0.5">Current Season</p>
                  <p className="text-[11px] text-[#f8f7f6] font-bold uppercase tracking-[0.2em]">Spring / Summer 2025</p>
                </div>
                {/* Corner accent */}
                <div className="absolute top-5 right-5 w-16 h-16 border-t border-r border-[#b36619]/40 pointer-events-none" />
              </div>
            </div>

            {/* Right — Copy */}
            <div className="md:col-span-5 flex flex-col gap-7 md:pl-4">
              <span ref={heroEyebrowRef} className="text-[#b36619] text-[10px] font-bold uppercase tracking-[0.45em] opacity-0">
                Swiss Perfumery · Est. 1924
              </span>

              <div ref={heroHeadRef} aria-label="The Essence of Precision">
                {HERO_WORDS.map((word, i) => (
                  <span key={i} className="line-clip">
                    <span
                      className="word-line font-black opacity-0 leading-[0.88]"
                      style={{
                        fontFamily: i % 2 === 1 ? "'Cormorant Garamond', serif" : "'Work Sans', sans-serif",
                        fontStyle: i % 2 === 1 ? "italic" : "normal",
                        fontSize: "clamp(44px, 5.5vw, 78px)",
                        color: i % 2 === 1 ? "#b36619" : "#211911",
                        display: "block",
                      }}
                    >
                      {word}
                    </span>
                  </span>
                ))}
              </div>

              <p ref={heroSubRef} className="text-[#211911]/50 text-[15px] max-w-[300px] font-light leading-[1.75] opacity-0">
                Swiss crafted scents defined by minimalist architecture and raw, untamed alpine nature.
              </p>

              <div ref={heroCtaRef} className="flex flex-col items-start gap-4 opacity-0">
                <button data-hover className="group flex items-center gap-3 bg-[#211911] text-[#f8f7f6] px-8 py-[14px] text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#b36619] transition-colors duration-300">
                  Explore Editorial
                  <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                </button>
                <a href="#" data-hover className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#211911]/50 border-b border-[#b36619]/25 pb-0.5 hover:border-[#b36619] hover:text-[#211911] transition-all duration-200">
                  View Lookbook
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── TICKER ──────────────────────────────────────────────────── */}
        <Ticker />

        {/* ── COLLECTION ──────────────────────────────────────────────── */}
        <section id="collection" className="px-8 md:px-16 py-24 bg-white">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4">
              <div>
                <span className="text-[10px] text-[#b36619] font-bold uppercase tracking-[0.4em] block mb-3">Current Editions</span>
                <h2 className="text-[40px] font-black tracking-tighter uppercase leading-none">The Collection</h2>
              </div>
              <p className="text-[#211911]/35 text-[11px] font-medium uppercase tracking-[0.25em]">01 — 08 Fragrances</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
              {PRODUCTS.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>

            <div className="mt-16 flex justify-center">
              <button data-hover className="group flex items-center gap-4 border border-[#211911]/18 px-10 py-4 text-[10px] font-bold uppercase tracking-[0.3em] hover:border-[#b36619] hover:text-[#b36619] transition-all duration-300">
                View All Fragrances
                <span className="group-hover:translate-x-1.5 transition-transform duration-200">→</span>
              </button>
            </div>
          </div>
        </section>

        {/* ── HERITAGE ────────────────────────────────────────────────── */}
        <section className="px-8 md:px-16 py-32 max-w-[1440px] mx-auto overflow-hidden">
          <div className="flex flex-col md:flex-row gap-16 lg:gap-24 items-center">

            {/* Text side */}
            <div className="md:w-1/2 flex flex-col gap-8">
              <span className="text-[#b36619] text-[10px] font-bold uppercase tracking-[0.45em]">Our Legacy</span>
              <h2
                className="text-[clamp(40px,5vw,68px)] font-black tracking-tighter leading-[0.92]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Precision<br /><em>since</em><br />1924.
              </h2>
              <p className="text-[15px] text-[#211911]/50 leading-[1.8] font-light max-w-[420px]">
                For a century, Xcentia has operated from a small laboratory in the Swiss Alps, blending traditional olfactory craft with modern analytical chemistry. Our process is quiet, slow, and uncompromising.
              </p>

              <div className="grid grid-cols-3 gap-5 pt-6 border-t border-[#b36619]/10">
                {[["100", "Years"], ["12", "Noses"], ["40+", "Botanicals"]].map(([n, l]) => (
                  <div key={l}>
                    <p className="text-[30px] font-black tracking-tighter text-[#b36619] leading-none">{n}</p>
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#211911]/35 mt-1.5">{l}</p>
                  </div>
                ))}
              </div>

              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#211911]/30">Zürich & Lausanne</p>
            </div>

            {/* Image side */}
            <div className="md:w-1/2 relative" ref={heritageImgRef}>
              <div className="absolute -top-8 -left-8 w-32 h-32 border-t border-l border-[#b36619]/20 hidden md:block pointer-events-none" />
              <div className="overflow-hidden aspect-square bg-[#e8e0d5]">
                <img
                  src="https://images.unsplash.com/photo-1589782182703-2aaa69037b5b?w=900&q=85"
                  alt="Xcentia Craft"
                  className="w-full h-full object-cover mix-blend-multiply opacity-85 scale-110"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 md:bottom-10 md:-right-10 p-8 bg-[#b36619] text-white hidden md:block">
                <p className="text-[20px] font-black tracking-tighter leading-tight">100%<br />RAW<br />MATERIALS</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── DARK EDITORIAL ──────────────────────────────────────────── */}
        <section className="bg-[#211911] text-[#f8f7f6] overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-8 md:px-16 py-28 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-8">
              <span className="text-[#b36619] text-[10px] font-bold uppercase tracking-[0.45em]">New Arrival</span>
              <h2 className="font-black tracking-tighter leading-[0.93]" style={{ fontSize: "clamp(36px,4.5vw,60px)" }}>
                N° 05<br />
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "rgba(248,247,246,0.6)" }}>
                  Nuit de Forêt
                </span>
              </h2>
              <p className="text-[#f8f7f6]/40 text-[15px] font-light leading-[1.8] max-w-sm">
                A nocturnal composition of damp pine, black pepper, and smoked vetiver. Drawn from a single night spent above the treeline at 2,400m.
              </p>
              <div className="flex items-center gap-6">
                <span className="text-[#b36619] text-2xl font-black tracking-tight">CHF 245</span>
                <button data-hover className="group flex items-center gap-3 border border-[#f8f7f6]/18 px-7 py-3.5 text-[10px] font-bold uppercase tracking-[0.3em] hover:border-[#b36619] hover:text-[#b36619] transition-all duration-300">
                  Discover
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden bg-[#2d2018]">
              <img
                src="https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=800&q=85"
                alt="N° 05 Nuit de Forêt"
                className="w-full h-full object-cover opacity-75 hover:opacity-100 hover:scale-105 transition-all duration-700"
              />
              <div className="absolute top-6 left-6 w-12 h-12 border-t border-l border-[#b36619]/50 pointer-events-none" />
              <div className="absolute bottom-6 right-6">
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#f8f7f6]/25">
                  Limited — 200 Bottles
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── BESPOKE CTA ─────────────────────────────────────────────── */}
        <section className="px-8 md:px-16 py-28 border-t border-[#b36619]/10">
          <div className="max-w-[1440px] mx-auto text-center flex flex-col items-center gap-10">
            <div className="flex flex-col gap-5 items-center">
              <span className="text-[#b36619] text-[10px] font-bold uppercase tracking-[0.45em]">Haute Parfumerie</span>
              <h2 className="text-[clamp(36px,5vw,66px)] font-black tracking-tighter leading-[0.93] uppercase">
                Signature<br />Bespoke
              </h2>
              <p className="text-[#211911]/45 max-w-md font-light leading-[1.8] text-[15px]">
                Collaborate with our master perfumers to translate your personal narrative into a unique molecular signature. A six-month process. A lifetime of memory.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button data-hover className="group flex items-center gap-3 bg-[#211911] text-[#f8f7f6] px-10 py-5 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#b36619] transition-colors duration-300">
                Inquire About Bespoke
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
              <a href="#" data-hover className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#211911]/45 hover:text-[#211911] border-b border-transparent hover:border-[#211911]/25 pb-0.5 transition-all duration-200">
                Learn More
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl w-full pt-8 border-t border-[#b36619]/10">
              {[
                ["Consultation", "3–4 weeks to understand your olfactory identity"],
                ["Composition", "12–16 weeks of precise molecular blending"],
                ["Delivery", "Bespoke bottle engraved with your signature"],
              ].map(([title, body]) => (
                <div key={title} className="text-left">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] mb-2">{title}</p>
                  <p className="text-[12px] text-[#211911]/40 font-light leading-[1.7]">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="bg-[#211911] text-[#f8f7f6]/45 pt-20 pb-10 px-8 md:px-16">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 text-[#f8f7f6]">
              <svg className="w-5 h-5 text-[#b36619]" viewBox="0 0 48 48" fill="none">
                <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" fill="currentColor" />
              </svg>
              <span className="text-[18px] font-black uppercase tracking-[0.18em]">Xcentia</span>
            </div>
            <p className="text-[10px] font-medium uppercase tracking-[0.28em] leading-relaxed max-w-[200px] text-[#f8f7f6]/28">
              Crafted in Switzerland.<br />Defined by silence.
            </p>
          </div>

          {[
            { title: "Explore", links: ["Fragrances", "Body Care", "Home Scents", "Gift Sets"] },
            { title: "Institutional", links: ["Our Story", "Sustainability", "Bespoke", "Contact"] },
          ].map((col) => (
            <div key={col.title} className="flex flex-col gap-5">
              <h4 className="text-[#f8f7f6] text-[10px] font-bold uppercase tracking-[0.35em]">{col.title}</h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((item) => (
                  <li key={item}>
                    <a href="#" data-hover className="text-[11px] uppercase tracking-[0.18em] hover:text-[#b36619] transition-colors duration-200">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="flex flex-col gap-5">
            <h4 className="text-[#f8f7f6] text-[10px] font-bold uppercase tracking-[0.35em]">Newsletter</h4>
            <p className="text-[11px] uppercase tracking-[0.15em] text-[#f8f7f6]/25 leading-relaxed">
              Quiet dispatches.<br />Twice a year.
            </p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email address"
                className="bg-transparent border-b border-[#f8f7f6]/12 py-2.5 focus:border-[#b36619] focus:outline-none text-[11px] placeholder:text-[#f8f7f6]/18 text-[#f8f7f6] transition-colors duration-200 tracking-widest uppercase"
              />
              <button data-hover className="text-[10px] font-bold uppercase tracking-[0.3em] text-left text-[#f8f7f6]/35 hover:text-[#b36619] transition-colors duration-200 flex items-center gap-2">
                Subscribe →
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto pt-8 border-t border-[#f8f7f6]/7 flex flex-col md:flex-row justify-between gap-4 text-[9px] uppercase tracking-[0.25em] text-[#f8f7f6]/22">
          <p>© 2025 Xcentia Laboratories GmbH. All rights reserved.</p>
          <div className="flex gap-8">
            {["Privacy Policy", "Terms of Service", "Accessibility"].map((l) => (
              <a key={l} href="#" data-hover className="hover:text-[#b36619] transition-colors duration-200">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}