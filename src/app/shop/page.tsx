"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Fragrance {
  id: string;
  num: string;
  collection: string;
  name: string;
  french: string;
  notes: string;
  price: number;
  badge?: string;
  badgeVariant?: "new" | "limited" | "exclusive";
  img: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const ALL_FRAGRANCES: Fragrance[] = [
  {
    id: "01", num: "N°01", collection: "Alpine Mist",
    name: "L'Eau de Sommet", french: "L'Eau de Sommet",
    notes: "Bergamot · Juniper · Icy Air", price: 185,
    badge: "New Arrival", badgeVariant: "new",
    img: "https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80",
  },
  {
    id: "02", num: "N°02", collection: "Midnight Pine",
    name: "Forêt Obscure", french: "Forêt Obscure",
    notes: "Pine Needles · Smoke · Vetiver", price: 210,
    img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80",
  },
  {
    id: "03", num: "N°03", collection: "Golden Hour",
    name: "Soleil d'Or", french: "Soleil d'Or",
    notes: "Amber · Saffron · Honey", price: 245,
    img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80",
  },
  {
    id: "04", num: "N°04", collection: "White Marble",
    name: "Marbre Blanc", french: "Marbre Blanc",
    notes: "Cotton · Iris · White Rose", price: 195,
    img: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=600&q=80",
  },
  {
    id: "05", num: "N°05", collection: "Glacier Silk",
    name: "Soie Glacée", french: "Soie Glacée",
    notes: "Peony · Musk · Cold Water", price: 260,
    badge: "Limited", badgeVariant: "limited",
    img: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=600&q=80",
  },
  {
    id: "06", num: "N°06", collection: "Iron Roots",
    name: "Racines de Fer", french: "Racines de Fer",
    notes: "Leather · Earth · Cardamom", price: 180,
    img: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&q=80",
  },
  {
    id: "07", num: "N°07", collection: "Midnight Storm",
    name: "Tempête de Minuit", french: "Tempête de Minuit",
    notes: "Black Pepper · Cedar · Vetiver", price: 230,
    badge: "Exclusive", badgeVariant: "exclusive",
    img: "https://images.unsplash.com/photo-1589782182703-2aaa69037b5b?w=600&q=80",
  },
  {
    id: "08", num: "N°08", collection: "Alpine Air",
    name: "Air des Cimes", french: "Air des Cimes",
    notes: "Ozone · Mineral · Fresh Bark", price: 175,
    img: "https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80",
  },
  {
    id: "09", num: "N°09", collection: "Warm Earth",
    name: "Terre Chaude", french: "Terre Chaude",
    notes: "Patchouli · Tonka · Dry Wood", price: 220,
    img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80",
  },
];

const COLLECTIONS = ["All Scents", "Alpine Woods", "Floral Botanica", "Mineral & Cold", "Nocturnal"];
const INTENSITIES = ["Subtle", "Moderate", "Bold"];
const NOTES_LIST = ["Bergamot", "Sandalwood", "White Musk", "Ozone", "Vetiver", "Amber", "Iris"];
const SORT_OPTIONS = ["Featured", "Newest", "Price: High to Low", "Price: Low to High"];

// ─── Custom Cursor ─────────────────────────────────────────────────────────────
function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (dot.current) dot.current.style.transform = `translate(${e.clientX - 4}px,${e.clientY - 4}px)`;
      if (ring.current) ring.current.style.transform = `translate(${e.clientX - 20}px,${e.clientY - 20}px)`;
    };
    const onOver = (e: MouseEvent) => setHover(!!(e.target as HTMLElement).closest("a,button,input,select,[data-hover]"));
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseover", onOver); };
  }, []);

  return (
    <>
      <div ref={dot} className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#b36619] pointer-events-none z-[9999] transition-transform duration-75" />
      <div ref={ring} className={`fixed top-0 left-0 w-10 h-10 rounded-full border border-[#b36619]/50 pointer-events-none z-[9998] transition-all duration-300 ${hover ? "scale-[2.2] border-[#b36619]/20" : "scale-100"}`} />
    </>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ frag, index }: { frag: Fragrance; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inBag, setInBag] = useState(false);

  useEffect(() => {
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (!ref.current) return;
      gsap.fromTo(ref.current,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.75, ease: "power3.out", delay: (index % 3) * 0.08,
          scrollTrigger: { trigger: ref.current, start: "top 92%" } }
      );
    })();
  }, [index]);

  const badgeClasses: Record<string, string> = {
    new: "bg-[#f8f7f6] text-[#211911]",
    limited: "bg-[#b36619] text-white",
    exclusive: "bg-[#211911] text-[#f8f7f6]",
  };

  return (
    <div ref={ref} data-hover className="group flex flex-col cursor-none opacity-0">
      {/* Image */}
      <div className="aspect-[4/5] overflow-hidden bg-[#f0ebe3] mb-5 relative">
        <img
          src={frag.img}
          alt={frag.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-700"
        />
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#211911]/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Badge */}
        {frag.badge && (
          <div className={`absolute top-4 left-4 px-3 py-1 text-[9px] uppercase font-bold tracking-[0.28em] ${badgeClasses[frag.badgeVariant ?? "new"]}`}>
            {frag.badge}
          </div>
        )}

        {/* Quick add */}
        <div className="absolute bottom-5 left-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0">
          <button
            onClick={() => setInBag(true)}
            className={`w-full py-3 text-[9px] font-bold uppercase tracking-[0.28em] transition-all duration-300 cursor-none ${
              inBag ? "bg-[#211911] text-[#b36619]" : "bg-[#f8f7f6]/92 backdrop-blur-sm text-[#211911] hover:bg-[#b36619] hover:text-white"
            }`}
          >
            {inBag ? "✓ Added to Bag" : "Add to Bag"}
          </button>
        </div>

        {/* N° label */}
        <span className="absolute top-4 right-4 text-[10px] font-black tracking-[0.25em] text-[#211911]/20 group-hover:text-[#f8f7f6]/50 transition-colors duration-500">
          {frag.num}
        </span>
      </div>

      {/* Info */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-[#b36619] block mb-1">{frag.collection}</span>
          <h3 className="text-[16px] font-light tracking-tight text-[#211911] group-hover:text-[#b36619] transition-colors duration-300 leading-snug" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {frag.french}
          </h3>
          <p className="text-[11px] text-[#211911]/40 italic mt-1 font-light leading-relaxed">{frag.notes}</p>
        </div>
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <span className="text-[14px] font-bold text-[#211911]">CHF {frag.price}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({
  activeCollection, setActiveCollection,
  activeIntensity, setActiveIntensity,
  activeNotes, toggleNote,
  sortBy, setSortBy,
}: {
  activeCollection: string;
  setActiveCollection: (c: string) => void;
  activeIntensity: string | null;
  setActiveIntensity: (i: string | null) => void;
  activeNotes: string[];
  toggleNote: (n: string) => void;
  sortBy: string;
  setSortBy: (s: string) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    (async () => {
      const { gsap } = await import("gsap");
      if (!ref.current) return;
      gsap.fromTo(ref.current, { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.9, ease: "power3.out", delay: 0.3 });
    })();
  }, []);

  return (
    <aside ref={ref} className="w-full lg:w-60 flex-shrink-0 space-y-10 opacity-0">
      {/* Sort — mobile visible */}
      <div className="lg:hidden">
        <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#211911]/50 block mb-3">Sort By</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full bg-transparent border-b border-[#211911]/15 py-2 text-[12px] font-medium focus:outline-none focus:border-[#b36619] transition-colors text-[#211911]"
        >
          {SORT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
        </select>
      </div>

      {/* Collection filter */}
      <div>
        <h3 className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#211911] border-b border-[#b36619]/15 pb-4 mb-5">Collection</h3>
        <ul className="space-y-2.5">
          {COLLECTIONS.map((c) => (
            <li
              key={c}
              onClick={() => setActiveCollection(c)}
              data-hover
              className="flex items-center justify-between group cursor-none"
            >
              <span className={`text-[13px] font-medium transition-colors duration-200 ${activeCollection === c ? "text-[#b36619] font-bold" : "text-[#211911]/50 group-hover:text-[#211911]"}`}>
                {c}
              </span>
              <span className="text-[9px] text-[#b36619]/40 font-medium">{Math.floor(Math.random() * 10) + 6}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Price range */}
      <div>
        <h3 className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#211911] border-b border-[#b36619]/15 pb-4 mb-5">Price Range</h3>
        <div className="space-y-3">
          <input
            type="range" min={150} max={400} defaultValue={400}
            className="w-full h-px bg-[#211911]/15 appearance-none rounded-none cursor-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#b36619] [&::-webkit-slider-thumb]:cursor-none"
          />
          <div className="flex justify-between">
            <span className="text-[11px] text-[#211911]/40 font-medium">CHF 150</span>
            <span className="text-[11px] text-[#211911]/40 font-medium">CHF 400</span>
          </div>
        </div>
      </div>

      {/* Intensity */}
      <div>
        <h3 className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#211911] border-b border-[#b36619]/15 pb-4 mb-5">Intensity</h3>
        <div className="flex flex-wrap gap-2">
          {INTENSITIES.map((i) => (
            <button
              key={i}
              onClick={() => setActiveIntensity(activeIntensity === i ? null : i)}
              className={`px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] border transition-all duration-200 cursor-none ${
                activeIntensity === i
                  ? "border-[#b36619] bg-[#b36619]/8 text-[#b36619]"
                  : "border-[#211911]/12 text-[#211911]/45 hover:border-[#211911]/35 hover:text-[#211911]"
              }`}
            >
              {i}
            </button>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div>
        <h3 className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#211911] border-b border-[#b36619]/15 pb-4 mb-5">Notes</h3>
        <ul className="space-y-3">
          {NOTES_LIST.map((n) => (
            <li key={n} className="flex items-center gap-3 cursor-none" onClick={() => toggleNote(n)} data-hover>
              <div className={`w-4 h-4 border flex items-center justify-center flex-shrink-0 transition-all duration-200 ${activeNotes.includes(n) ? "border-[#b36619] bg-[#b36619]" : "border-[#211911]/20"}`}>
                {activeNotes.includes(n) && (
                  <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <span className={`text-[12px] transition-colors duration-200 ${activeNotes.includes(n) ? "text-[#211911] font-medium" : "text-[#211911]/45"}`}>{n}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Clear */}
      {(activeCollection !== "All Scents" || activeIntensity || activeNotes.length > 0) && (
        <button
          onClick={() => { setActiveCollection("All Scents"); setActiveIntensity(null); }}
          className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#211911]/35 hover:text-[#b36619] transition-colors duration-200 flex items-center gap-2 cursor-none"
          data-hover
        >
          <span className="text-base leading-none">×</span> Clear All Filters
        </button>
      )}
    </aside>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ShopPage() {
  const [activeCollection, setActiveCollection] = useState("All Scents");
  const [activeIntensity, setActiveIntensity] = useState<string | null>(null);
  const [activeNotes, setActiveNotes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("Featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [navScrolled, setNavScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Page header entrance
  useEffect(() => {
    (async () => {
      const { gsap } = await import("gsap");
      gsap.fromTo(headerRef.current, { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" });
      gsap.fromTo(headlineRef.current, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.85, ease: "power3.out", delay: 0.2 });
      gsap.fromTo(subRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.35 });
    })();
  }, []);

  const toggleNote = useCallback((n: string) => {
    setActiveNotes((prev) => prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]);
  }, []);

  // Sort
  const sorted = [...ALL_FRAGRANCES].sort((a, b) => {
    if (sortBy === "Price: High to Low") return b.price - a.price;
    if (sortBy === "Price: Low to High") return a.price - b.price;
    if (sortBy === "Newest") return parseInt(b.id) - parseInt(a.id);
    return 0;
  });

  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
  const paginated = sorted.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="bg-[#f8f7f6] text-[#211911] min-h-screen overflow-x-hidden cursor-none">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,200;0,300;0,400;0,500;0,700;0,900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700&display=swap');
        body { font-family: 'Work Sans', sans-serif; }
        * { cursor: none !important; box-sizing: border-box; }
        ::selection { background: #b36619; color: #f8f7f6; }
        html { scroll-behavior: smooth; }
        input[type=range]::-webkit-slider-thumb { cursor: none !important; }
      `}</style>

      <CustomCursor />

      {/* ── NAV ───────────────────────────────────────────────────── */}
      <header
        ref={headerRef}
        className={`sticky top-0 z-50 flex items-center justify-between px-8 lg:px-16 py-5 opacity-0 transition-all duration-500 ${
          navScrolled ? "bg-[#f8f7f6]/92 backdrop-blur-md border-b border-[#b36619]/10" : "bg-[#f8f7f6] border-b border-[#b36619]/8"
        }`}
      >
        <div className="flex items-center gap-12">
          <a href="/" className="flex items-center gap-3" data-hover>
            <svg className="w-5 h-5 text-[#b36619]" viewBox="0 0 48 48" fill="none">
              <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" fill="currentColor"/>
            </svg>
            <span className="text-[18px] font-black uppercase tracking-[0.18em]">Xcentia</span>
          </a>
          <nav className="hidden md:flex items-center gap-9">
            {[["Fragrances", "/shop"], ["Collections", "/collections"], ["Heritage", "/heritage"]].map(([l, h]) => (
              <a key={l} href={h} data-hover
                className={`text-[10px] font-bold uppercase tracking-[0.25em] transition-colors duration-200 relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-[#b36619] hover:after:w-full after:transition-all after:duration-300 ${
                  l === "Fragrances" ? "text-[#211911] after:w-full" : "text-[#211911]/50 hover:text-[#211911]"
                }`}
              >
                {l}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {/* Search bar */}
          <div className="hidden lg:flex items-center gap-2 bg-[#211911]/4 rounded-full px-4 py-2 border border-[#211911]/8 hover:border-[#b36619]/30 transition-colors duration-200">
            <svg className="w-3.5 h-3.5 text-[#b36619]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
            </svg>
            <input
              type="text" placeholder="Search collection..."
              className="bg-transparent border-none focus:outline-none text-[12px] w-44 placeholder:text-[#211911]/30 text-[#211911]"
            />
          </div>

          {/* Cart */}
          <button data-hover className="flex items-center gap-1.5 hover:text-[#b36619] transition-colors duration-200 px-2 py-1">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'wght' 200" }}>shopping_bag</span>
            <span className="text-[10px] font-bold">(0)</span>
          </button>

          {/* Account */}
          <button data-hover className="p-2 hover:bg-[#b36619]/8 rounded-full transition-colors duration-200">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'wght' 200" }}>person</span>
          </button>

          {/* Mobile filter toggle */}
          <button
            data-hover
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 hover:bg-[#b36619]/8 rounded-full transition-colors duration-200"
          >
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'wght' 200" }}>tune</span>
          </button>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto w-full px-8 lg:px-16 py-12">
        {/* ── Page header ─────────────────────────────────────────── */}
        <div className="mb-14">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[9px] uppercase tracking-[0.35em] text-[#b36619]/55 mb-8">
            <a href="/" data-hover className="hover:text-[#b36619] transition-colors duration-200">Home</a>
            <span className="text-[#211911]/20">›</span>
            <span className="text-[#211911] font-bold">All Fragrances</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-xl">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#b36619] block mb-4">The Olfactory Archive</span>
              <h1
                ref={headlineRef}
                className="text-[clamp(38px,4.5vw,60px)] font-light tracking-tight leading-[0.95] opacity-0"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                All Fragrances
              </h1>
              <p ref={subRef} className="text-[14px] text-[#211911]/45 font-light leading-[1.8] mt-4 max-w-md opacity-0">
                Meticulously crafted in the heart of the Swiss Alps. Each composition represents a balance of traditional precision and avant-garde sensibility.
              </p>
            </div>

            {/* Sort — desktop */}
            <div className="hidden lg:flex items-center gap-4 border-b border-[#211911]/12 pb-2 flex-shrink-0">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#211911]/40">Sort By</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none text-[13px] font-medium focus:outline-none pr-6 cursor-none text-[#211911]"
              >
                {SORT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>

          {/* Active filter pills */}
          {(activeCollection !== "All Scents" || activeIntensity || activeNotes.length > 0) && (
            <div className="flex flex-wrap gap-2 mt-6">
              {activeCollection !== "All Scents" && (
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#211911]/5 border border-[#211911]/10 text-[10px] font-bold uppercase tracking-[0.2em]">
                  {activeCollection}
                  <button onClick={() => setActiveCollection("All Scents")} className="text-[#211911]/40 hover:text-[#b36619] cursor-none">×</button>
                </span>
              )}
              {activeIntensity && (
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#b36619]/8 border border-[#b36619]/20 text-[10px] font-bold uppercase tracking-[0.2em] text-[#b36619]">
                  {activeIntensity}
                  <button onClick={() => setActiveIntensity(null)} className="opacity-60 hover:opacity-100 cursor-none">×</button>
                </span>
              )}
              {activeNotes.map((n) => (
                <span key={n} className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#211911]/5 border border-[#211911]/10 text-[10px] font-bold uppercase tracking-[0.2em]">
                  {n}
                  <button onClick={() => toggleNote(n)} className="text-[#211911]/40 hover:text-[#b36619] cursor-none">×</button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ── Main layout ──────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-14">
          {/* Sidebar */}
          <div className={`lg:block ${sidebarOpen ? "block" : "hidden"}`}>
            <Sidebar
              activeCollection={activeCollection}
              setActiveCollection={setActiveCollection}
              activeIntensity={activeIntensity}
              setActiveIntensity={setActiveIntensity}
              activeNotes={activeNotes}
              toggleNote={toggleNote}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </div>

          {/* Grid */}
          <div className="flex-grow">
            {/* Count row */}
            <div className="flex items-center justify-between mb-10">
              <p className="text-[11px] text-[#211911]/35 font-medium uppercase tracking-[0.2em]">
                Showing {paginated.length} of {sorted.length} fragrances
              </p>
              {/* Grid / List toggle */}
              <div className="flex items-center gap-1">
                {["grid_view", "view_agenda"].map((icon) => (
                  <button key={icon} data-hover className="p-2 hover:bg-[#b36619]/8 rounded transition-colors duration-200">
                    <span className="material-symbols-outlined text-[18px] text-[#211911]/35" style={{ fontVariationSettings: "'wght' 200" }}>{icon}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-16">
              {paginated.map((frag, i) => (
                <ProductCard key={frag.id} frag={frag} index={i} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-24 flex items-center justify-center gap-8">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                data-hover
                className="w-9 h-9 flex items-center justify-center border border-[#b36619]/20 rounded-full hover:bg-[#b36619]/8 hover:border-[#b36619]/50 transition-all duration-200 disabled:opacity-20 disabled:pointer-events-none cursor-none"
              >
                <svg className="w-3.5 h-3.5 text-[#b36619]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7"/>
                </svg>
              </button>

              <div className="flex items-center gap-5">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    data-hover
                    className={`text-[13px] font-medium transition-all duration-200 cursor-none pb-1 ${
                      currentPage === p
                        ? "text-[#b36619] border-b-2 border-[#b36619]"
                        : "text-[#211911]/30 hover:text-[#211911] border-b-2 border-transparent"
                    }`}
                  >
                    {String(p).padStart(2, "0")}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                data-hover
                className="w-9 h-9 flex items-center justify-center border border-[#b36619]/20 rounded-full hover:bg-[#b36619]/8 hover:border-[#b36619]/50 transition-all duration-200 disabled:opacity-20 disabled:pointer-events-none cursor-none"
              >
                <svg className="w-3.5 h-3.5 text-[#b36619]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer className="bg-[#211911] text-[#f8f7f6]/45 pt-20 pb-10 px-8 lg:px-16 mt-24">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 text-[#f8f7f6]">
              <svg className="w-5 h-5 text-[#b36619]" viewBox="0 0 48 48" fill="none">
                <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" fill="currentColor"/>
              </svg>
              <span className="text-[18px] font-black uppercase tracking-[0.18em]">Xcentia</span>
            </div>
            <p className="text-[10px] font-medium uppercase tracking-[0.25em] leading-relaxed max-w-[200px] text-[#f8f7f6]/28">
              Precision, purity,<br />and passion in every drop.
            </p>
          </div>

          {[
            { title: "Explore", links: ["Our Process", "Store Locator", "The Lab", "Journal"] },
            { title: "Service", links: ["Shipping & Returns", "Privacy Policy", "FAQ", "Contact"] },
          ].map((col) => (
            <div key={col.title} className="flex flex-col gap-5">
              <h4 className="text-[#f8f7f6] text-[10px] font-bold uppercase tracking-[0.35em]">{col.title}</h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((item) => (
                  <li key={item}>
                    <a href="#" data-hover className="text-[12px] font-light hover:text-[#b36619] transition-colors duration-200">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="flex flex-col gap-5">
            <h4 className="text-[#f8f7f6] text-[10px] font-bold uppercase tracking-[0.35em]">Newsletter</h4>
            <p className="text-[12px] font-light text-[#f8f7f6]/28 leading-relaxed">Subscribe for early access to limited releases.</p>
            <div className="flex items-center border-b border-[#b36619]/30 pb-2">
              <input
                type="email" placeholder="Email address"
                className="bg-transparent border-none focus:outline-none text-[12px] w-full placeholder:text-[#f8f7f6]/18 text-[#f8f7f6] font-light"
              />
              <button data-hover className="text-[#b36619] hover:translate-x-0.5 transition-transform duration-200 cursor-none">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7-7 7M3 12h18"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto pt-8 border-t border-[#f8f7f6]/7 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[9px] uppercase tracking-[0.3em] text-[#f8f7f6]/20">© 2025 Xcentia Fragrances AG, Switzerland.</p>
          <div className="flex gap-8 text-[9px] uppercase tracking-[0.3em] text-[#f8f7f6]/20">
            {["Instagram", "Pinterest", "LinkedIn"].map((s) => (
              <a key={s} href="#" data-hover className="hover:text-[#b36619] transition-colors duration-200">{s}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}