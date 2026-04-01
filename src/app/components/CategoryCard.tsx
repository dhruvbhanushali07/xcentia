// app/_components/CategoryCard.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Category {
  key: string;
  label: string;
  sub: string;
  image: string;
  href: string;
}

interface Props {
  category: Category;
  index: number;
}

export default function CategoryCard({ category, index }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={category.href}
      className="group relative overflow-hidden no-underline block aspect-[4/5]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background image — starts grayscale, goes color on hover */}
      <Image
        src={category.image}
        alt={category.label}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className={`object-cover transition-all duration-700 ${
          hovered ? "scale-[1.06] grayscale-0" : "scale-100 grayscale"
        }`}
      />

      {/* Overlay */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          hovered ? "bg-[#211911]/40" : "bg-[#211911]/55"
        }`}
      />

      {/* Top-left index number */}
      <div
        className={`absolute top-7 left-7 text-[9px] font-bold uppercase tracking-[0.4em]
          transition-colors duration-300 ${hovered ? "text-[#b36619]" : "text-[#f8f7f6]/40"}`}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Bottom text */}
      <div className="absolute bottom-8 left-8 flex flex-col gap-2">
        <span
          className={`text-[10px] font-bold uppercase tracking-[0.35em] transition-colors duration-300
            ${hovered ? "text-[#b36619]" : "text-[#f8f7f6]/50"}`}
        >
          {category.sub}
        </span>
        <h3
          className="font-light text-[#f8f7f6] leading-none tracking-tight"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(36px, 4vw, 56px)",
          }}
        >
          {category.label}
        </h3>

        {/* Shop Now — slides up on hover */}
        <div
          className={`flex items-center gap-2 mt-2 transition-all duration-300 ${
            hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#f8f7f6]">
            Shop Now
          </span>
          <svg className="w-3.5 h-3.5 text-[#f8f7f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}