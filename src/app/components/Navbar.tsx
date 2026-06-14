"use client";

// components/Navbar.tsx
// Added "Business" link to desktop nav and mobile menu

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
  import { useBagStore } from "@/providers/Bag-store-provider";

const NAV_LINKS = [
  ["Fragrances", "/shop"],

] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const cartItems = useBagStore((state) => state.items);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setIsHydrated(true), []); 
  useEffect(() => { setMobileOpen(false); }, [pathname]);
  if (!isHydrated) return null; 


  const isB2B = pathname.startsWith("/b2b");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@200;300;400;500;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
        body { font-family: 'Work Sans', sans-serif; }
        ::selection { background: #b36619; color: #f8f7f6; }
      `}</style>

      <header
        className={`sticky top-0 z-50 flex items-center justify-between px-8 lg:px-16 py-5
          transition-all duration-500
          ${scrolled
            ? "bg-[#f8f7f6]/92 backdrop-blur-md border-b border-[#b36619]/10"
            : "bg-[#f8f7f6] border-b border-[#211911]/6"
          }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 no-underline text-[#211911]">
          <svg className="w-5 h-5 text-[#b36619]" viewBox="0 0 48 48" fill="none">
            <path
              d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
              fill="currentColor"
            />
          </svg>
          <span className="text-[18px] font-black uppercase tracking-[0.18em]">Xcentia</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-9">
          {NAV_LINKS.map(([label, href]) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={label}
                href={href}
                className={`text-[10px] font-bold uppercase tracking-[0.25em] transition-colors duration-200
                  relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:bg-[#b36619]
                  after:transition-all after:duration-300
                  ${active
                    ? "text-[#211911] after:w-full"
                    : "text-[#211911]/50 hover:text-[#211911] after:w-0 hover:after:w-full"
                  }`}
              >
                {label}
              </Link>
            );
          })}

          {/* B2B — visually distinct */}
          <Link
            href="/b2b"
            className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.25em]
              px-3.5 py-1.5 border transition-all duration-200
              ${isB2B
                ? "border-[#b36619] text-[#b36619] bg-[#b36619]/8"
                : "border-[#211911]/15 text-[#211911]/50 hover:border-[#b36619] hover:text-[#b36619]"
              }`}
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Business
          </Link>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button className="p-2 text-[#211911]/40 hover:text-[#211911] transition-colors duration-200 rounded-full hover:bg-black/4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
          </button>

          <button className="p-2 text-[#211911]/40 hover:text-[#211911] transition-colors duration-200 rounded-full hover:bg-black/4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
            </svg>
          </button>

          <Link
            href="/your-bag"
            className={`flex items-center gap-1.5 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em]
              transition-colors duration-200
              ${pathname === "/your-bag" ? "text-[#b36619]" : "text-[#211911] hover:text-[#b36619]"}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span>({itemCount})</span>
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-[#211911]/40 hover:text-[#211911] transition-colors duration-200 rounded-full hover:bg-black/4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={`md:hidden fixed inset-0 z-40 bg-[#f8f7f6] transition-all duration-300 flex flex-col
        px-8 pt-28 pb-12 gap-8
        ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        {NAV_LINKS.map(([label, href]) => (
          <Link
            key={label}
            href={href}
            className="text-[clamp(28px,6vw,40px)] font-light text-[#211911] hover:text-[#b36619]
                       transition-colors duration-200 no-underline"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {label}
          </Link>
        ))}
        <Link
          href="/b2b"
          className="text-[clamp(28px,6vw,40px)] font-light text-[#b36619]
                     transition-colors duration-200 no-underline"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Business Orders
        </Link>
        <Link
          href="/your-bag"
          className="text-[clamp(28px,6vw,40px)] font-light text-[#211911] hover:text-[#b36619]
                     transition-colors duration-200 no-underline"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Cart
        </Link>
      </div>
    </>
  );
}