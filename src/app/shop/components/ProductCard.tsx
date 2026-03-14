"use-client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useBagStore } from "@/providers/Bag-store-provider";


interface Variant {
	id: string;
	volume_ml: number;
	price: number;
}

interface Fragrance {
	id: string;
	name: string;
  slug: string;
  category: string;
  fragrance_family: string;
  fragrance_notes: string[] | string;
  image: string;
  created_at: string;
  variant: Variant;
}

export default function ProductCard({
	frag,
	index,
}: {
	frag: Fragrance;
	index: number;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const [inBag, setInBag] = useState(false);
	const addToBag = useBagStore((state) => state.addToBag);

	const handleAddToBag = () => {
		if (inBag) return; // prevent adding multiple times
		addToBag({
			id: frag.id,
			variantId: frag.variant.id, // Using product ID as variant ID for simplicity; adjust if you have actual variants
			name: frag.name,
			price: frag.variant.price,
			quantity: 1,
			volume_ml: frag.variant.volume_ml,
			image: frag.image,
			slug: frag.slug,
		});
		setInBag(true);
	};

	useEffect(() => {
		(async () => {
			const { gsap } = await import("gsap");
			const { ScrollTrigger } = await import("gsap/ScrollTrigger");
			gsap.registerPlugin(ScrollTrigger);
			if (!ref.current) return;
			gsap.fromTo(
				ref.current,
				{ opacity: 0, y: 32 },
				{
					opacity: 1,
					y: 0,
					duration: 0.75,
					ease: "power3.out",
					delay: (index % 3) * 0.08,
					scrollTrigger: { trigger: ref.current, start: "top 92%" },
				},
			);
		})();
	}, [index]);

	return (
		<div ref={ref} className="group flex flex-col opacity-0">
			{/* Image */}
			<Link href={`/perfume/${frag.slug}`} className="block">
				<div className="aspect-[4/5] overflow-hidden bg-[#f0ebe3] mb-5 relative">
					<Image
						src={frag.image}
						alt={frag.name}
						fill
						className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-700"
					/>

					{/* Gradient overlay */}
					<div className="absolute inset-0 bg-gradient-to-t from-[#211911]/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

					{/* N° label */}
					<span className="absolute top-4 right-4 text-[10px] font-black tracking-[0.25em] text-[#211911]/20 group-hover:text-[#f8f7f6]/50 transition-colors duration-500">
						{`N°${index + 1}`.padStart(2, "0")}
					</span>

					{/* Quick add — sits above the link but doesn't navigate */}
					<div className="absolute bottom-5 left-5 right-5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
						<button
							onClick={(e) => {
								e.preventDefault(); // prevent link navigation
								handleAddToBag();
							}}
							className={`w-full py-3 text-[9px] font-bold uppercase tracking-[0.28em] transition-all duration-300 ${
								inBag
									? "bg-[#211911] text-[#b36619]"
									: "bg-[#f8f7f6]/92 backdrop-blur-sm text-[#211911] hover:bg-[#b36619] hover:text-white"
							}`}
						>
							{inBag ? "✓ Added to Bag" : "Add to Bag"}
						</button>
					</div>
				</div>
			</Link>

			{/* Info */}
			<Link href={`/perfume/${frag.slug}`} className="block group/info">
				<div className="flex items-start justify-between gap-2">
					<div className="flex-1 min-w-0">
						<span className="text-[9px] font-bold uppercase tracking-[0.35em] text-[#b36619] block mb-1">
							{frag.fragrance_family}
						</span>
						<h3
							className="text-[17px] font-light tracking-tight text-[#211911] group-hover/info:text-[#b36619] transition-colors duration-300 leading-snug"
							style={{
								fontFamily: "'Cormorant Garamond', serif",
							}}
						>
							{frag.name}
						</h3>
						<p className="text-[11px] text-[#211911]/40 italic mt-1 font-light leading-relaxed">
							{Array.isArray(frag.fragrance_notes) ? frag.fragrance_notes.join(", ") : frag.fragrance_notes}
						</p>
					</div>
					<div className="flex-shrink-0 pt-1">
						<span className="text-[14px] font-bold text-[#211911]">
							₹ {frag.variant.price}
						</span>
					</div>
				</div>
			</Link>
		</div>
	);
}
