"use client";

// app/cart/page.tsx
// Full client component — cart state lives in local state for now.
// Swap the mock cartItems for real cart logic (Zustand / context / DB) as needed.

import { useState, useEffect } from "react";
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
							<div className="aspect-[4/5] bg-[#ede5d8] overflow-hidden mb-3 relative">
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
	const removefromBag = useBagStore((state) => state.removeFromBag);
	const updateQuantity = useBagStore((state) => state.updateQuantity);
	const [suggestions, setSuggestions] =
		useState<Product[]>(suggestedProducts);
	const [loadingSuggestions, setLoadingSuggestions] = useState(true);
	const [promoCode, setPromoCode] = useState("");
	const [promoApplied, setPromoApplied] = useState(false);
	const [promoError, setPromoError] = useState("");
	const [checkingOut, setCheckingOut] = useState(false);

	const [isHydrated, setIsHydrated] = useState(false);
	useEffect(() => setIsHydrated(true), []);

	if (!isHydrated) return null; // Wait for client-side storage to load


	function handleQuantityChange(id: string, volume_ml: number, qty: number) {
		

		updateQuantity(id, qty);
	}

	function handleRemove(id: string, volume_ml: number) {
		

		removefromBag(id);
	}

	// ── Promo ──────────────────────────────────────────────────────────────────
	const VALID_PROMOS: Record<string, number> = {
		XCENTIA10: 10,
		WELCOME15: 15,
	};

	function handlePromo() {
		const discount = VALID_PROMOS[promoCode.toUpperCase()];
		if (discount) {
			setPromoApplied(true);
			setPromoError("");
		} else {
			setPromoError("Invalid promo code.");
		}
	}

	// ── Totals ─────────────────────────────────────────────────────────────────
	const subtotal = cartItems.reduce(
		(sum, i) => sum + i.price * i.quantity,
		0,
	);
	const discountPct = promoApplied
		? (VALID_PROMOS[promoCode.toUpperCase()] ?? 0)
		: 0;
	const discountAmt = Math.round((subtotal * discountPct) / 100);
	const shipping = subtotal === 0 ? 0 : subtotal >= 15000 ? 0 : 299;
	const total = subtotal - discountAmt + shipping;
	const itemCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

	function handleCheckout() {
		setCheckingOut(true);
		setTimeout(() => setCheckingOut(false), 2000);
		// plug in your checkout logic here
	}

	return (
		<div className="min-h-screen bg-[#f8f7f6] text-[#211911]">
			{/* ── Breadcrumb ─────────────────────────────────────────────────────── */}
			<div className="px-8 lg:px-16 pt-8 pb-0">
				<nav className="flex items-center gap-2 text-[9px] uppercase tracking-[0.35em] text-[#b36619]/55">
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
					<span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#b36619] block mb-3">
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
						<p className="text-[14px] text-[#211911]/45 font-light leading-relaxed max-w-sm">
							You haven't added anything yet. Explore our
							collection and find your signature scent.
						</p>
						<Link
							href="/shop"
							className="inline-flex items-center gap-3 px-8 py-4 bg-[#b36619] text-white
                         text-[10px] font-bold uppercase tracking-[0.28em] hover:bg-[#211911]
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
								<span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#211911]/40">
									Product
								</span>
								<span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#211911]/40">
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
									className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em]
                             text-[#211911]/40 hover:text-[#b36619] transition-colors duration-200 no-underline"
								>
									<ChevronLeft className="w-3.5 h-3.5" />
									Continue Shopping
								</Link>
							</div>
						</div>

						{/* RIGHT — summary */}
						<div className="w-full lg:w-[360px] flex-shrink-0 lg:sticky lg:top-[88px]">
							<div className="border border-[#211911]/8 p-7 bg-white">
								<h2 className="text-[12px] font-bold uppercase tracking-[0.3em] text-[#211911] mb-6 pb-5 border-b border-[#211911]/8">
									Order Summary
								</h2>

								{/* Line items */}
								<div className="space-y-3 mb-5">
									<div className="flex justify-between">
										<span className="text-[12px] text-[#211911]/55 font-medium">
											Subtotal ({itemCount} item
											{itemCount > 1 ? "s" : ""})
										</span>
										<span className="text-[12px] font-semibold text-[#211911]">
											₹{subtotal}
										</span>
									</div>

									{promoApplied && (
										<div className="flex justify-between">
											<span className="text-[12px] text-[#2d6a4f] font-medium">
												Discount ({discountPct}% off)
											</span>
											<span className="text-[12px] font-semibold text-[#2d6a4f]">
												−₹{discountAmt}
											</span>
										</div>
									)}

									<div className="flex justify-between">
										<span className="text-[12px] text-[#211911]/55 font-medium">
											Shipping
										</span>
										<span className="text-[12px] font-semibold text-[#211911]">
											{shipping === 0
												? "Free"
												: `₹${shipping}`}
										</span>
									</div>
								</div>

								{/* Free shipping notice */}
								{shipping > 0 && (
									<div className="mb-5 px-3 py-2.5 bg-[#f8f7f6] border border-[#211911]/8 text-[10px] text-[#211911]/50 font-medium leading-relaxed">
										Add ₹{15000 - subtotal} more for free
										shipping
										<div className="mt-2 h-px bg-[#211911]/10 relative overflow-hidden">
											<div
												className="absolute top-0 left-0 h-full bg-[#b36619] transition-all duration-500"
												style={{
													width: `${Math.min(100, (subtotal / 15000) * 100)}%`,
												}}
											/>
										</div>
									</div>
								)}

								{/* Promo code */}
								<div className="mb-6">
									<p className="text-[9px] font-bold uppercase tracking-[0.35em] text-[#211911]/40 mb-2">
										Promo Code
									</p>
									{promoApplied ? (
										<div className="flex items-center justify-between px-3 py-2.5 bg-[#2d6a4f]/8 border border-[#2d6a4f]/20">
											<span className="text-[11px] font-bold text-[#2d6a4f] uppercase tracking-[0.15em]">
												✓ {promoCode.toUpperCase()}
											</span>
											<button
												onClick={() => {
													setPromoApplied(false);
													setPromoCode("");
												}}
												className="text-[10px] text-[#2d6a4f]/60 hover:text-[#2d6a4f] transition-colors"
											>
												Remove
											</button>
										</div>
									) : (
										<div>
											<div className="flex items-stretch gap-2">
												<input
													type="text"
													placeholder="Enter code"
													value={promoCode}
													onChange={(e) => {
														setPromoCode(
															e.target.value,
														);
														setPromoError("");
													}}
													onKeyDown={(e) =>
														e.key === "Enter" &&
														handlePromo()
													}
													className="flex-1 px-3 py-2.5 text-[12px] bg-[#f8f7f6] border border-[#211911]/12
                                     focus:outline-none focus:border-[#b36619] transition-colors
                                     placeholder:text-[#211911]/25 text-[#211911] font-medium uppercase tracking-[0.1em]"
												/>
												<button
													onClick={handlePromo}
													className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] bg-[#211911]
                                     text-white hover:bg-[#b36619] transition-colors duration-200"
												>
													Apply
												</button>
											</div>
											{promoError && (
												<p className="text-[10px] text-red-400 mt-1.5 font-medium">
													{promoError}
												</p>
											)}
										</div>
									)}
								</div>

								{/* Total */}
								<div className="flex justify-between items-baseline py-5 border-t border-[#211911]/8 mb-6">
									<span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#211911]">
										Total
									</span>
									<div className="text-right">
										<span className="text-[26px] font-black tracking-tighter text-[#211911] leading-none">
											₹{total}
										</span>
										<p className="text-[9px] text-[#211911]/30 mt-0.5">
											Incl. all taxes
										</p>
									</div>
								</div>

								{/* Checkout CTA */}
								<button
									onClick={handleCheckout}
									disabled={checkingOut}
									className={`w-full py-4 text-[11px] font-bold uppercase tracking-[0.28em] text-white
                              transition-colors duration-300
                              ${checkingOut ? "bg-[#211911]/60 cursor-default" : "bg-[#b36619] hover:bg-[#211911] cursor-pointer"}`}
								>
									{checkingOut
										? "Processing…"
										: "Proceed to Checkout"}
								</button>

								{/* Trust signals */}
								<div className="mt-5 flex items-center justify-center gap-6">
									{[
										{
											icon: Shield,
											label: "Secure",
										},
										{
											icon: ShoppingBag,
											label: "Easy Returns",
										},
										{
											icon: Package,
											label: "Free Box",
										},
									].map(({ icon: Icon, label }) => (
										<div
											key={label}
											className="flex flex-col items-center gap-1.5"
										>
											<Icon className="w-4 h-4 text-[#b36619]/60" />
											<span className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#211911]/30">
												{label}
											</span>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				)}

				{/* ── You May Also Like ──────────────────────────────────────────── */}
				{!loadingSuggestions && <YouMayLike products={suggestions} />}
			</main>
		</div>
	);
}
