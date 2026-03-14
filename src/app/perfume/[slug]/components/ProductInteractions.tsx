// app/perfume/[slug]/ProductInteractions.tsx
"use client";

import { useState } from "react";
import { useBagStore } from "@/providers/Bag-store-provider";
interface Variant {
  id: string;
  volume_ml: number;
  price: number;
}

interface Product {
	id: string;
	name: string;
	slug: string;
	description: string;
	category: string;
	fragrance_family: string;
	fragrance_notes: any;
	image: string;
	product_variants: Variant[];
}

interface Props {
  product: Product;
  variants: Variant[];
  initialPrice: number | null;
}

export default function ProductInteractions({ product, variants, initialPrice }: Props) {

  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    variants[0] ?? null
  );
  const addToBag = useBagStore((state) => state.addToBag);
  const removefromBag = useBagStore((state) => state.removeFromBag);
  const isInBag = useBagStore((state) => state.isItemInBag);
  const updateQuantity = useBagStore((state) => state.updateQuantity);
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState<"idle" | "adding" | "added">("idle");

  function handleAddToBag() {
    if (!selectedVariant) return;

    setStatus("adding");

    // Construct the item for the bag
    const bagItem = {
        id: product.id,
        slug: product.slug,
        variantId: selectedVariant.id, // This is what you needed
        name: product.name,
        price: selectedVariant.price,
        volume_ml: selectedVariant.volume_ml,
        image: product.image,
        quantity: quantity
    };

    // Call your store action
    addToBag(bagItem);

    // Feedback for the user
    setTimeout(() => {
        setStatus("added");
        setTimeout(() => setStatus("idle"), 2000);
    }, 600);
}


  const price = selectedVariant?.price ?? initialPrice ?? null;
  const total = price !== null ? price * quantity : null;
  console.log(product);
  return (
    <div className="mt-10">

      {/* Variant buttons */}
      <div className="flex gap-2.5 mb-6">
        {variants.map((v) => {
          const active = selectedVariant?.volume_ml === v.volume_ml;
          return (
            <button
              key={v.volume_ml}
              onClick={() => setSelectedVariant(v)}
              className={`flex-1 py-3 text-[11px] font-semibold tracking-[0.18em] uppercase
                          border transition-all duration-200
                          ${active
                            ? "border-[#0a0a0a] bg-[#0a0a0a] text-white"
                            : "border-black/20 bg-white text-[#0a0a0a] hover:border-[#0a0a0a]"
                          }`}
            >
              {v.volume_ml} ML
            </button>
          );
        })}
      </div>

      {/* Quantity + Price row */}
      <div className="flex items-center justify-between mb-6">

        {/* Quantity counter */}
        <div className="flex items-center gap-0 border border-black/15">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
            className="w-10 h-10 flex items-center justify-center text-[#0a0a0a]/50
                       hover:text-[#0a0a0a] hover:bg-black/5 transition-all duration-150
                       disabled:opacity-25 disabled:cursor-not-allowed text-lg leading-none"
          >
            −
          </button>

          <span className="w-10 h-10 flex items-center justify-center text-[13px] font-semibold
                           border-x border-black/15 text-[#0a0a0a]">
            {quantity}
          </span>

          <button
            onClick={() => setQuantity((q) => Math.min(10, q + 1))}
            disabled={quantity >= 10}
            className="w-10 h-10 flex items-center justify-center text-[#0a0a0a]/50
                       hover:text-[#0a0a0a] hover:bg-black/5 transition-all duration-150
                       disabled:opacity-25 disabled:cursor-not-allowed text-lg leading-none"
          >
            +
          </button>
        </div>

        {/* Price — updates with quantity */}
        <div className="text-right">
          {quantity > 1 && price !== null && (
            <div className="text-[10px] font-medium text-[#0a0a0a]/35 tracking-wide mb-0.5">
              ₹{price} × {quantity}
            </div>
          )}
          <div className="font-black text-3xl tracking-tighter leading-none text-[#0a0a0a]">
            ₹{total ?? "—"}
          </div>
        </div>
      </div>

      {/* Add to bag */}
      <button
        onClick={handleAddToBag}
        disabled={status !== "idle"}
        className={`w-full py-4 text-[11px] font-semibold tracking-[0.22em] uppercase text-white
                    transition-colors duration-300
                    ${status === "added"
                      ? "bg-[#2d6a4f] cursor-default"
                      : status === "adding"
                      ? "bg-[#0a0a0a] cursor-default"
                      : "bg-[#b36619] hover:bg-[#0a0a0a] cursor-pointer"
                    }`}
      >
        {status === "added"
          ? `✓ Added ${quantity > 1 ? `${quantity} items` : ""} to Bag`
          : status === "adding"
          ? "Adding…"
          : "Add to Bag"}
      </button>

    </div>
  );
}