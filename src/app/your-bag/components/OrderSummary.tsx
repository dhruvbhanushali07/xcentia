'use client';

import React, { useState } from "react";
import { Shield, ShoppingBag, Package } from "lucide-react";
import { useBagStore } from "@/providers/Bag-store-provider";

export default function OrderSummary() {
    const cartItems = useBagStore((state) => state.items);
    const [promoCode, setPromoCode] = useState("");
    const [promoApplied, setPromoApplied] = useState(false);
    const [promoError, setPromoError] = useState("");
    const [checkingOut, setCheckingOut] = useState(false);

    const VALID_PROMOS: Record<string, number> = {
        XCENTIA10: 10,
        WELCOME15: 15,
    };

    const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const discountPct = promoApplied ? (VALID_PROMOS[promoCode.toUpperCase()] ?? 0) : 0;
    const discountAmt = Math.round((subtotal * discountPct) / 100);
    const shipping = subtotal === 0 ? 0 : subtotal >= 500 ? 0 : 299;
    const total = subtotal - discountAmt + shipping;
    const itemCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

    function handleCheckout() {
        setCheckingOut(true);
        setTimeout(() => setCheckingOut(false), 2000);
        console.log("Proceeding to checkout with items:", cartItems);
    }

    function handlePromo() {
        const discount = VALID_PROMOS[promoCode.toUpperCase()];
        if (discount) {
            setPromoApplied(true);
            setPromoError("");
        } else {
            setPromoError("Invalid promo code.");
        }
    }

    return (
        <div className="w-full lg:w-1/3 flex-shrink-0">
            <div className="lg:sticky lg:top-24 border border-stone-200 p-6 sm:p-8 bg-white shadow-sm">
                <h2 className="text-sm font-bold uppercase tracking-widest text-stone-900 mb-6 pb-4 border-b border-stone-100">
                    Order Summary
                </h2>

                {/* Line items */}
                <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-stone-500 font-medium">
                            Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
                        </span>
                        <span className="text-sm font-semibold text-stone-900">
                            ₹{subtotal.toLocaleString()}
                        </span>
                    </div>

                    {promoApplied && (
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-emerald-700 font-medium">
                                Discount ({discountPct}% off)
                            </span>
                            <span className="text-sm font-semibold text-emerald-700">
                                −₹{discountAmt.toLocaleString()}
                            </span>
                        </div>
                    )}

                    <div className="flex justify-between items-center">
                        <span className="text-sm text-stone-500 font-medium">
                            Shipping
                        </span>
                        <span className="text-sm font-semibold text-stone-900">
                            {shipping === 0 ? "Free" : `₹${shipping}`}
                        </span>
                    </div>
                </div>

                {/* Free shipping progress */}
                {subtotal > 0 && subtotal < 500 && (
                    <div className="mb-6 p-4 bg-stone-50 border border-stone-100 rounded-sm">
                        <p className="text-xs text-stone-500 font-medium mb-2">
                            Add ₹{500 - subtotal} more for free shipping
                        </p>
                        <div className="h-1 bg-stone-200 w-full relative overflow-hidden rounded-full">
                            <div
                                className="absolute top-0 left-0 h-full bg-[#b36619] transition-all duration-700 ease-out"
                                style={{ width: `${(subtotal / 500) * 100}%` }}
                            />
                        </div>
                    </div>
                )}

                {/* Promo code */}
                <div className="mb-8">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">
                        Promo Code
                    </p>
                    {promoApplied ? (
                        <div className="flex items-center justify-between px-3 py-3 bg-emerald-50 border border-emerald-100 rounded-sm">
                            <span className="text-xs font-bold text-emerald-700 uppercase tracking-tight">
                                ✓ {promoCode.toUpperCase()} Applied
                            </span>
                            <button
                                onClick={() => {
                                    setPromoApplied(false);
                                    setPromoCode("");
                                }}
                                className="text-xs text-emerald-700 underline underline-offset-2 hover:text-emerald-900 transition-colors"
                            >
                                Remove
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <div className="flex items-stretch gap-2">
                                <input
                                    type="text"
                                    placeholder="Enter code"
                                    value={promoCode}
                                    onChange={(e) => {
                                        setPromoCode(e.target.value);
                                        setPromoError("");
                                    }}
                                    onKeyDown={(e) => e.key === "Enter" && handlePromo()}
                                    className="flex-1 px-4 py-2.5 text-sm bg-stone-50 border border-stone-200 focus:outline-none focus:ring-1 focus:ring-[#b36619] focus:border-[#b36619] transition-all placeholder:text-stone-300 text-stone-900 font-medium uppercase tracking-wider"
                                />
                                <button
                                    onClick={handlePromo}
                                    className="px-5 text-xs font-bold uppercase tracking-widest bg-stone-900 text-white hover:bg-stone-800 active:scale-95 transition-all"
                                >
                                    Apply
                                </button>
                            </div>
                            {promoError && (
                                <p className="text-xs text-red-500 font-medium">{promoError}</p>
                            )}
                        </div>
                    )}
                </div>

                {/* Total */}
                <div className="flex justify-between items-end py-6 border-t border-stone-100 mb-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-stone-900">
                        Total Amount
                    </span>
                    <div className="text-right">
                        <span className="text-3xl font-black tracking-tighter text-stone-900 block leading-none">
                            ₹{total.toLocaleString()}
                        </span>
                        <p className="text-[10px] text-stone-400 mt-1 uppercase tracking-wide">
                            Incl. all taxes
                        </p>
                    </div>
                </div>

                {/* Checkout CTA */}
                <button
                    onClick={handleCheckout}
                    disabled={checkingOut || cartItems.length === 0}
                    className={`w-full py-5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 rounded-sm
                        ${checkingOut || cartItems.length === 0 
                            ? "bg-stone-300 cursor-not-allowed" 
                            : "bg-[#b36619] hover:bg-stone-900 active:transform active:scale-[0.99]"}`}
                >
                    {checkingOut ? "Processing…" : "Proceed to Checkout"}
                </button>

                {/* Trust signals */}
                <div className="mt-8 grid grid-cols-3 gap-4 border-t border-stone-50 pt-6">
                    {[
                        { icon: Shield, label: "Secure" },
                        { icon: ShoppingBag, label: "Returns" },
                        { icon: Package, label: "Free Box" },
                    ].map(({ icon: Icon, label }) => (
                        <div key={label} className="flex flex-col items-center gap-2">
                            <Icon className="w-4 h-4 text-[#b36619]" strokeWidth={1.5} />
                            <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400">
                                {label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}