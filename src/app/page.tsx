// app/page.tsx
// SERVER COMPONENT — fetches all data, renders static shell
// Only the marquee ticker and category hover effects are client islands

import Image from "next/image";
import Link from "next/link";
import {createClient} from "@/lib/supabase/client";

import MarqueeTicker from "./components/MarqueeTicker";
import CategoryCard from "./components/CategoryCard";

export const revalidate = 60;

interface Variant {
	price: number;
}

interface Product {
	id: string;
	name: string;
	slug: string;
	category: string;
	fragrance_family: string;
	image: string;
	product_variants: Variant[];
}

const CATEGORIES = [
	{
		key: "men",
		label: "Men",
		sub: "Woody · Spicy · Oud",
		image: "https://images.unsplash.com/photo-1641248775395-2b938a7c099a?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		href: "/shop/men-perfume",
	},
	{
		key: "women",
		label: "Women",
		sub: "Floral · Sweet · Soft",
		image: "https://images.unsplash.com/photo-1592400374401-002fe1d25961?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		href: "/shop/women-perfume",
	},
	{
		key: "unisex",
		label: "Unisex",
		sub: "Fresh · Aquatic · Citrus",
		image: "https://images.unsplash.com/photo-1723391962110-299d412ca046?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		href: "/shop/unisex-perfume",
	},
] as const;

const TICKER_WORDS = [
	"Eau de Parfum",
	"Swiss Crafted",
	"Free Shipping Above ₹500",
	"New Arrivals",
	"Luxury Oud",
	"Signature Blends",
];

export default async function HomePage() {
	const supabase= createClient()
	// Fetch featured products — server side, zero client JS
	const { data: products } = await supabase
		.from("products")
		.select(
			`id, name, slug, category, fragrance_family, image, product_variants ( price )`,
		)
		.limit(6)
		.returns<Product[]>();

	const featured = products ?? [];

	return (
		<>
			<style>{`
        @import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@200;300;400;500;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');
        body { font-family: 'Work Sans', sans-serif; background: #f8f7f6; }
        ::selection { background: #b36619; color: #f8f7f6; }
        html { scroll-behavior: smooth; }
      `}</style>

			<div className="bg-[#f8f7f6] text-[#211911] overflow-x-hidden">
				{/* ── 1. HERO ─────────────────────────────────────────────────────── */}
				<section className="relative w-full min-h-[92vh] flex items-end overflow-hidden">
					{/* Background image */}
					<div className="absolute inset-0">
						<Image
							src="https://images.unsplash.com/photo-1758225502621-9102d2856dc8?q=80&w=1505&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							alt="Xcentia hero"
							fill
							priority
							sizes="100vw"
							className="object-cover"
						/>
						{/* Gradient overlay — bottom heavy for text legibility */}
						<div className="absolute inset-0 bg-linear-to-t from-[#211911]/85 via-[#211911]/70 md:via-[#211911]/30 to-transparent" />
					</div>

					{/* Hero content */}
					<div className="relative z-10 w-full px-8 lg:px-16 pb-16 lg:pb-24">
						<div className="max-w-360 mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-12">
							{/* Left — headline */}
							<div className="flex-1 max-w-2xl">
								<span className="text-[9px] font-bold uppercase tracking-[0.45em] text-[#b36619] block mb-5">
									The Fragrance Edit · Est. 2025
								</span>
								<h1
									className="font-light text-[#f8f7f6] leading-[0.88] tracking-tight mb-8"
									style={{
										fontFamily:
											"'Cormorant Garamond', serif",
										fontSize: "clamp(56px, 8vw, 112px)",
									}}
								>
									Crafting
									<br />
									<em>Memorable</em>
									<br />
									Scents
								</h1>
								<p className="text-[14px] font-light text-[#f8f7f6]/65 leading-relaxed max-w-md mb-10">
									Meticulously crafted in the heart of the
									Swiss Alps. Each composition represents a
									balance of traditional precision and
									avant-garde sensibility.
								</p>
								<div className="flex items-center gap-4">
									<Link
										href="/shop"
										className="inline-flex items-center gap-3 px-8 py-4 bg-[#b36619] text-white
                               text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#f8f7f6]
                               hover:text-[#211911] transition-colors duration-300 no-underline"
									>
										Explore Collection
										<svg
											className="w-3.5 h-3.5"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9 5l7 7-7 7"
											/>
										</svg>
									</Link>
									<Link
										href="#categories"
										className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#f8f7f6]/55
                               hover:text-[#f8f7f6] transition-colors duration-200 no-underline"
									>
										Our Categories ↓
									</Link>
								</div>
							</div>

							{/* Right — stats */}
							<div className="flex items-end gap-10 lg:gap-12 flex-shrink-0 pb-2">
								{[
									["150+", "Unique Scents"],
									["12", "Collections"],
									["50K+", "Happy Clients"],
								].map(([num, label]) => (
									<div
										key={label}
										className="flex flex-col gap-1"
									>
										<span
											className="font-light text-[#f8f7f6] leading-none"
											style={{
												fontFamily:
													"'Cormorant Garamond', serif",
												fontSize:
													"clamp(32px, 3.5vw, 48px)",
											}}
										>
											{num}
										</span>
										<span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#f8f7f6]/40">
											{label}
										</span>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Scroll indicator */}
					<div className="absolute bottom-8 right-8 lg:right-16 z-10 flex flex-col items-center gap-2">
						<span className="text-[8px] font-bold uppercase tracking-[0.35em] text-[#f8f7f6]/35 [writing-mode:vertical-lr]">
							Scroll
						</span>
						<div className="w-px h-12 bg-[#f8f7f6]/20 relative overflow-hidden">
							<div className="absolute top-0 left-0 w-full h-1/2 bg-[#b36619] animate-[scrollLine_2s_ease-in-out_infinite]" />
						</div>
					</div>
				</section>

				{/* ── 2. TICKER ──────────────────────────────────────────────────────── */}
				{/* Client island — CSS animation loop */}
				<MarqueeTicker words={TICKER_WORDS} />

				{/* ── 3. CATEGORIES ─────────────────────────────────────────────────── */}
				<section
					id="categories"
					className="px-8 lg:px-16 py-20 max-w-[1440px] mx-auto"
				>
					{/* Section header */}
					<div className="flex items-end justify-between mb-12">
						<div>
							<span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#b36619] block mb-3">
								Shop by Category
							</span>
							<h2
								className="font-light tracking-tight leading-none"
								style={{
									fontFamily: "'Cormorant Garamond', serif",
									fontSize: "clamp(36px, 4.5vw, 58px)",
								}}
							>
								Find Your Signature
							</h2>
						</div>
						<Link
							href="/shop"
							className="hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em]
                         text-[#211911]/40 hover:text-[#b36619] transition-colors duration-200
                         no-underline border-b border-[#211911]/15 hover:border-[#b36619] pb-1"
						>
							All Fragrances
							<svg
								className="w-3 h-3"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</Link>
					</div>

					{/* Category grid — client components for hover effect */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
						{CATEGORIES.map((cat, i) => (
							<CategoryCard
								key={cat.key}
								category={cat}
								index={i}
							/>
						))}
					</div>
				</section>

				{/* ── 4. EDITORIAL STRIP ────────────────────────────────────────────── */}
				<section className="bg-[#211911] px-8 lg:px-16 py-20">
					<div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center gap-16">
						{/* Left — image */}
						<div className="w-full lg:w-1/2 aspect-[4/3] relative overflow-hidden">
							<Image
								src="https://images.unsplash.com/photo-1772191399367-91ed8d95664b?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
								alt="Crafting process"
								fill
								sizes="(max-width: 1024px) 90vw, 50vw"
								className="object-cover"
							/>
							<div className="absolute inset-0 bg-[#211911]/15" />
							{/* Image label */}
							<div className="absolute bottom-6 left-6 text-[9px] font-bold uppercase tracking-[0.35em] text-[#f8f7f6]/50">
								The Atelier
							</div>
						</div>

						{/* Right — text */}
						<div className="w-full lg:w-1/2">
							<span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#b36619] block mb-5">
								Our Philosophy
							</span>
							<h2
								className="font-light text-[#f8f7f6] leading-[0.92] tracking-tight mb-8"
								style={{
									fontFamily: "'Cormorant Garamond', serif",
									fontSize: "clamp(36px, 4vw, 56px)",
								}}
							>
								More Than
								<br />
								<em>A Fragrance</em>
							</h2>
							<p className="text-[14px] font-light text-[#f8f7f6]/50 leading-[1.85] max-w-md mb-10">
								At Xcentia, we believe perfume is an extension
								of your personality. Our journey began with a
								passion to craft unique, evocative scents using
								only the finest ingredients sourced from across
								the globe. Every bottle holds a story, waiting
								to become a part of yours.
							</p>
							<div className="grid grid-cols-2 gap-6 mb-10">
								{[
									[
										"Hand-blended",
										"Every batch crafted by master perfumers",
									],
									[
										"Sustainably Sourced",
										"Ethically harvested ingredients",
									],
									["Cruelty Free", "Never tested on animals"],
									[
										"Long Lasting",
										"12–16 hour sillage guaranteed",
									],
								].map(([title, desc]) => (
									<div
										key={title}
										className="flex flex-col gap-1.5"
									>
										<div className="w-5 h-px bg-[#b36619]" />
										<span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#f8f7f6]/80 mt-2">
											{title}
										</span>
										<span className="text-[11px] font-light text-[#f8f7f6]/35 leading-relaxed">
											{desc}
										</span>
									</div>
								))}
							</div>
							<Link
								href="/heritage"
								className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em]
                           text-[#b36619] hover:text-[#f8f7f6] transition-colors duration-200 no-underline"
							>
								Our Heritage
								<svg
									className="w-3.5 h-3.5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</Link>
						</div>
					</div>
				</section>

				{/* ── 5. FEATURED PRODUCTS ──────────────────────────────────────────── */}
				<section className="px-8 lg:px-16 py-20 max-w-[1440px] mx-auto">
					<div className="flex items-end justify-between mb-12">
						<div>
							<span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#b36619] block mb-3">
								Featured
							</span>
							<h2
								className="font-light tracking-tight leading-none"
								style={{
									fontFamily: "'Cormorant Garamond', serif",
									fontSize: "clamp(36px, 4.5vw, 58px)",
								}}
							>
								Bestselling Scents
							</h2>
						</div>
						<Link
							href="/shop"
							className="hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em]
                         text-[#211911]/40 hover:text-[#b36619] transition-colors duration-200
                         no-underline border-b border-[#211911]/15 hover:border-[#b36619] pb-1"
						>
							View All
							<svg
								className="w-3 h-3"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</Link>
					</div>

					{featured.length === 0 ? (
						<p className="text-[13px] text-[#211911]/35">
							No products found.
						</p>
					) : (
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-8 gap-y-14">
							{featured.map((product, index) => {
								const price =
									product.product_variants?.length > 0
										? Math.min(
												...product.product_variants.map(
													(v) => v.price,
												),
											)
										: null;

								// First card is large (spans 2 cols on desktop) to add editorial variety
								const isHero = index === 0;

								return (
									<Link
										key={product.id}
										href={`/perfume/${product.slug}`}
										className={`group flex flex-col no-underline text-inherit ${isHero ? "md:col-span-1" : ""}`}
									>
										{/* Image */}
										<div className="aspect-[4/5] bg-[#ede5d8] overflow-hidden mb-5 relative">
											<Image
												src={product.image}
												alt={product.name}
												fill
												sizes="(max-width: 768px) 50vw, 33vw"
												className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-700"
											/>
											{/* Hover overlay */}
											<div className="absolute inset-0 bg-gradient-to-t from-[#211911]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

											{/* Index label */}
											<span className="absolute top-4 right-4 text-[10px] font-black tracking-[0.25em] text-[#211911]/15 group-hover:text-[#f8f7f6]/40 transition-colors duration-500">
												N°
												{String(index + 1).padStart(
													2,
													"0",
												)}
											</span>

											{/* Quick view on hover */}
											<div
												className="absolute bottom-5 left-5 right-5 opacity-0 group-hover:opacity-100
                                      translate-y-2 group-hover:translate-y-0 transition-all duration-300"
											>
												<div
													className="w-full py-3 text-center text-[9px] font-bold uppercase tracking-[0.28em]
                                        bg-[#f8f7f6]/92 backdrop-blur-sm text-[#211911]"
												>
													View Details
												</div>
											</div>
										</div>

										{/* Info */}
										<div className="flex items-start justify-between gap-2">
											<div className="flex-1 min-w-0">
												<span className="text-[9px] font-bold uppercase tracking-[0.35em] text-[#b36619] block mb-1">
													{product.fragrance_family ??
														product.category}
												</span>
												<h3
													className="text-[17px] font-light tracking-tight text-[#211911]
                                     group-hover:text-[#b36619] transition-colors duration-300 leading-snug"
													style={{
														fontFamily:
															"'Cormorant Garamond', serif",
													}}
												>
													{product.name}
												</h3>
											</div>
											<span className="text-[13px] font-semibold text-[#211911]/70 flex-shrink-0 pt-1">
												{price !== null
													? `₹${price}`
													: "TBA"}
											</span>
										</div>
									</Link>
								);
							})}
						</div>
					)}

					{/* Mobile — view all link */}
					<div className="mt-12 flex justify-center md:hidden">
						<Link
							href="/shop"
							className="px-8 py-4 border border-[#211911]/15 text-[10px] font-bold uppercase
                         tracking-[0.28em] text-[#211911]/50 hover:border-[#b36619] hover:text-[#b36619]
                         transition-all duration-200 no-underline"
						>
							View All Fragrances
						</Link>
					</div>
				</section>

				{/* ── 6. TESTIMONIALS ───────────────────────────────────────────────── */}
				<section className="border-t border-[#211911]/8 px-8 lg:px-16 py-20">
					<div className="max-w-[1440px] mx-auto">
						<div className="mb-12">
							<span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#b36619] block mb-3">
								Reviews
							</span>
							<h2
								className="font-light tracking-tight leading-none"
								style={{
									fontFamily: "'Cormorant Garamond', serif",
									fontSize: "clamp(36px, 4.5vw, 58px)",
								}}
							>
								What They Say
							</h2>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							{[
								{
									quote: "The longevity is incredible. I still get compliments 12 hours after applying. Nothing else comes close.",
									name: "Priya S.",
									title: "Verified Buyer",
									rating: 5,
								},
								{
									quote: "Packaging is stunning and the scent is even better. Bought the Oud collection and I'm obsessed.",
									name: "Arjun M.",
									title: "Verified Buyer",
									rating: 5,
								},
								{
									quote: "Finally a fragrance house that understands Indian tastes while maintaining global quality.",
									name: "Nisha K.",
									title: "Verified Buyer",
									rating: 5,
								},
							].map((t) => (
								<div
									key={t.name}
									className="flex flex-col gap-5 p-7 border border-[#211911]/8 bg-white"
								>
									{/* Stars */}
									<div className="flex gap-1">
										{Array.from({ length: t.rating }).map(
											(_, i) => (
												<svg
													key={i}
													className="w-3 h-3 text-[#b36619]"
													fill="currentColor"
													viewBox="0 0 20 20"
												>
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
												</svg>
											),
										)}
									</div>
									<p
										className="text-[16px] font-light text-[#211911]/70 leading-relaxed"
										style={{
											fontFamily:
												"'Cormorant Garamond', serif",
										}}
									>
										"{t.quote}"
									</p>
									<div className="mt-auto pt-4 border-t border-[#211911]/8">
										<span className="text-[11px] font-bold text-[#211911] block">
											{t.name}
										</span>
										<span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#211911]/30">
											{t.title}
										</span>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* ── 7. CTA BANNER ─────────────────────────────────────────────────── */}
				<section className="relative overflow-hidden bg-[#b36619] px-8 lg:px-16 py-20">
					<div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
						<div>
							<span className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/50 block mb-3">
								Limited Time
							</span>
							<h2
								className="font-light text-white leading-[0.92] tracking-tight"
								style={{
									fontFamily: "'Cormorant Garamond', serif",
									fontSize: "clamp(36px, 4vw, 56px)",
								}}
							>
								Free Shipping on
								<br />
								Orders Above ₹15,000
							</h2>
						</div>
						<Link
							href="/shop"
							className="flex-shrink-0 inline-flex items-center gap-3 px-9 py-4 bg-white text-[#211911]
                         text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#211911] hover:text-white
                         transition-colors duration-300 no-underline"
						>
							Shop Now
							<svg
								className="w-3.5 h-3.5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</Link>
					</div>
					{/* Decorative large text */}
					<div
						className="absolute -right-8 top-1/2 -translate-y-1/2 text-[160px] font-black text-white/5 select-none leading-none pointer-events-none hidden lg:block"
						style={{ fontFamily: "'Cormorant Garamond', serif" }}
					>
						Xcentia
					</div>
				</section>
			</div>

			<style>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
		</>
	);
}
