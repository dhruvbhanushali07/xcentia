"use client";

// app/cart/page.tsx
// Full client component — cart state lives in local state for now.
// Swap the mock cartItems for real cart logic (Zustand / context / DB) as needed.

import Link from "next/link";
import Image from "next/image";
import { useBagStore } from "@/providers/Bag-store-provider";
import BagRow from "./BagRow";
import {
	ChevronRight,
	ChevronLeft,
	Shield,
	ShoppingBag,
	Package,
} from "lucide-react";

import OrderSummary from "./OrderSummary";
import { useEffect, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface CartItem {
	id: string; // product id
	slug: string;
	name: string;
	image: string;
	volume_ml: number;
	price: number;
	quantity: number;
}

interface Product {
	id: string;
	name: string;
	slug: string;
	image: string;
	product_variants: { volume_ml: number; price: number }[];
}

// ─── You May Also Like ────────────────────────────────────────────────────────
function YouMayLike({ products }: { products: Product[] }) {
	if (!products.length) return null;
	return (
		<section className="mt-20 pt-14 border-t border-[#211911]/8">
			<h2
				className="text-[clamp(28px,3.5vw,42px)] font-light tracking-tight leading-none mb-10"
				style={{ fontFamily: "'Cormorant Garamond', serif" }}
			>
				You May Also Like
			</h2>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
				{products.map((p) => {
					const price =
						p.product_variants?.length > 0
							? Math.min(
									...p.product_variants.map((v) => v.price),
								)
							: 0;
					return (
						<Link
							key={p.id}
							href={`/perfume/${p.slug}`}
							className="group flex flex-col no-underline text-inherit"
						>
							<div className="aspect-4/5 bg-[#ede5d8] overflow-hidden mb-3 relative">
								<Image
									src={p.image}
									alt={p.name}
									fill
									sizes="(max-width: 768px) 50vw, 25vw"
									className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-700"
								/>
							</div>

							<h4
								className="text-[15px] font-light leading-snug text-[#211911] group-hover:text-[#b36619] transition-colors duration-300 mb-1"
								style={{
									fontFamily: "'Cormorant Garamond', serif",
								}}
							>
								{p.name}
							</h4>
							<span className="text-[12px] font-semibold text-[#211911]/50">
								From ₹{price}
							</span>
						</Link>
					);
				})}
			</div>
		</section>
	);
}

// ─── Main Cart Page ───────────────────────────────────────────────────────────
export default function BagClient({
	suggestedProducts,
}: {
	suggestedProducts: Product[];
}) {
	// In a real app, seed this from your cart store / context
	const cartItems = useBagStore((state) => state.items);
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
	const removefromBag = useBagStore((state) => state.removeFromBag);
	const updateQuantity = useBagStore((state) => state.updateQuantity);

	const [isHydrated, setIsHydrated] = useState(false);
	useEffect(() => setIsHydrated(true), []);

	if (!isHydrated) return null; // Wait for client-side storage to load

	function handleQuantityChange(id: string, volume_ml: number, qty: number) {
		updateQuantity(id, qty);
	}

	function handleRemove(id: string, volume_ml: number) {
		removefromBag(id);
	}

	return (
		<div className="min-h-screen bg-[#f8f7f6] text-[#211911]">
			{/* ── Breadcrumb ─────────────────────────────────────────────────────── */}
			<div className="px-8 lg:px-16 pt-8 pb-0">
				<nav className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-[#b36619]/55">
					<Link
						href="/"
						className="hover:text-[#b36619] transition-colors"
					>
						Home
					</Link>
					<span className="text-[#211911]/20">›</span>
					<span className="text-[#211911] font-bold">Your Bag</span>
				</nav>
			</div>

			<main className="max-w-[1440px] mx-auto px-8 lg:px-16 py-12">
				{/* ── Page title ─────────────────────────────────────────────────── */}
				<div className="mb-10">
					<span className="text-sm font-bold uppercase tracking-[0.4em] text-[#b36619] block mb-3">
						Shopping Bag
					</span>
					<h1
						className="font-light tracking-tight leading-none"
						style={{
							fontFamily: "'Cormorant Garamond', serif",
							fontSize: "clamp(40px, 5vw, 64px)",
						}}
					>
						{itemCount === 0
							? "Your Bag is Empty"
							: `${itemCount} Item${itemCount > 1 ? "s" : ""}`}
					</h1>
				</div>

				{cartItems.length === 0 ? (
					/* ── Empty state ─────────────────────────────────────────────── */
					<div className="flex flex-col items-start gap-6 py-12 border-t border-[#211911]/8">
						<p className="text-lg text-[#211911]/45 font-light leading-relaxed max-w-sm">
							You haven't added anything yet. Explore our
							collection and find your signature scent.
						</p>
						<Link
							href="/shop"
							className="inline-flex items-center gap-3 px-8 py-4 bg-[#b36619] text-white
                        text-sm font-bold uppercase tracking-[0.28em] hover:bg-[#211911]
                        transition-colors duration-300 no-underline"
						>
							Explore Fragrances
							<ChevronRight className="w-3.5 h-3.5" />
						</Link>
					</div>
				) : (
					/* ── Cart layout ─────────────────────────────────────────────── */
					<div className="flex flex-col lg:flex-row gap-16 items-start">
						{/* LEFT — items */}
						<div className="flex-1 min-w-0">
							<div className="flex items-center justify-between pb-4 border-b border-[#211911]/8">
								<span className="text-sm font-bold uppercase tracking-[0.3em] text-[#211911]/40">
									Product
								</span>
								<span className="text-sm font-bold uppercase tracking-[0.3em] text-[#211911]/40">
									Total
								</span>
							</div>

							{cartItems.map((item) => (
								<BagRow
									key={`${item.id}-${item.volume_ml}`}
									item={item}
									onQuantityChange={handleQuantityChange}
									onRemove={handleRemove}
								/>
							))}

							<div className="flex items-center justify-between pt-6">
								<Link
									href="/shop"
									className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.25em]
                             text-[#211911]/40 hover:text-[#b36619] transition-colors duration-200 no-underline"
								>
									<ChevronLeft className="w-3.5 h-3.5" />
									Continue Shopping
								</Link>
							</div>
						</div>

						{/* RIGHT — summary */}
						<OrderSummary />
					</div>
				)}

				{/* ── You May Also Like ──────────────────────────────────────────── */}
				<YouMayLike products={suggestedProducts} />
			</main>
		</div>
	);
}
