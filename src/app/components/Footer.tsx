// components/Footer.tsx
// SERVER COMPONENT — no interactivity needed

import Link from "next/link";

const EXPLORE = ["Our Process", "Store Locator", "The Lab", "Journal"];
const SERVICE = ["Shipping & Returns", "Privacy Policy", "FAQ", "Contact"];
const SOCIAL  = ["Instagram", "Pinterest", "LinkedIn"];

export default function Footer() {
  return (
    <footer className="bg-[#211911] text-[#f8f7f6]/40 pt-20 pb-10 px-8 lg:px-16">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

        {/* Brand */}
        <div className="flex flex-col gap-6">
          <Link href="/" className="flex items-center gap-3 text-[#f8f7f6] no-underline w-fit">
            <svg className="w-5 h-5 text-[#b36619]" viewBox="0 0 48 48" fill="none">
              <path
                d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
                fill="currentColor"
              />
            </svg>
            <span className="text-[18px] font-black uppercase tracking-[0.18em]">Xcentia</span>
          </Link>
          <p className="text-[10px] font-medium uppercase tracking-[0.25em] leading-relaxed max-w-[200px] text-[#f8f7f6]/28">
            Precision, purity,<br />and passion in every drop.
          </p>
        </div>

        {/* Explore */}
        <div className="flex flex-col gap-5">
          <h4 className="text-[#f8f7f6] text-[10px] font-bold uppercase tracking-[0.35em]">Explore</h4>
          <ul className="flex flex-col gap-3">
            {EXPLORE.map((item) => (
              <li key={item}>
                <a href="#" className="text-[12px] font-light hover:text-[#b36619] transition-colors duration-200">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Service */}
        <div className="flex flex-col gap-5">
          <h4 className="text-[#f8f7f6] text-[10px] font-bold uppercase tracking-[0.35em]">Service</h4>
          <ul className="flex flex-col gap-3">
            {SERVICE.map((item) => (
              <li key={item}>
                <a href="#" className="text-[12px] font-light hover:text-[#b36619] transition-colors duration-200">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-5">
          <h4 className="text-[#f8f7f6] text-[10px] font-bold uppercase tracking-[0.35em]">Newsletter</h4>
          <p className="text-[12px] font-light text-[#f8f7f6]/28 leading-relaxed">
            Subscribe for early access to limited releases.
          </p>
          {/* Input is interactive — isolated as its own small client island */}
          <NewsletterForm />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-[1440px] mx-auto pt-8 border-t border-[#f8f7f6]/7 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[9px] uppercase tracking-[0.3em] text-[#f8f7f6]/20">
          © 2026 Xcentia Fragrances AG, Switzerland.
        </p>
        <div className="flex gap-8">
          {SOCIAL.map((s) => (
            <a
              key={s}
              href="#"
              className="text-[9px] uppercase tracking-[0.3em] text-[#f8f7f6]/20 hover:text-[#b36619] transition-colors duration-200"
            >
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// Tiny client island just for the email input submit
function NewsletterForm() {
  "use client";
  return (
    <div className="flex items-center border-b border-[#b36619]/30 pb-2">
      <input
        type="email"
        placeholder="Email address"
        className="bg-transparent border-none focus:outline-none text-[12px] w-full placeholder:text-[#f8f7f6]/18 text-[#f8f7f6] font-light"
      />
      <button className="text-[#b36619] hover:translate-x-0.5 transition-transform duration-200 flex-shrink-0">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7-7 7M3 12h18" />
        </svg>
      </button>
    </div>
  );
}