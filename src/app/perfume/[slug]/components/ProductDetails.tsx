'use client';

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import ProductInteractions from "./ProductInteractions";



interface Variant {
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

export default function ProductDetail({ myproduct, relatedProducts }: { myproduct: Product, relatedProducts: Product[] }) {
	const router = useRouter();

	const [product, setProduct] = useState<Product | null>(myproduct);
	const [related, setRelated] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);

	const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
		null,
	);
	const [addingToCart, setAddingToCart] = useState(false);

	// Parse notes safely
	const parseNotes = (notesData: any, type: "top" | "heart" | "base") => {
		if (!notesData) return "Undisclosed";
		const raw = notesData[type];
		if (Array.isArray(raw)) return raw.join(", ");
		if (typeof raw === "string") return raw;
		return "Undisclosed";
	};

    useEffect(() => {
        setProduct(myproduct);
        setRelated(relatedProducts);
        setLoading(false);
    }, [myproduct, relatedProducts]);
	

	if (loading || !product) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-white text-black">
				<h1 className="text-2xl tracking-[0.3em] uppercase animate-pulse">
					Extracting Essence...
				</h1>
			</div>
		);
	}

	return (
		<div className="bg-white text-black min-h-screen overflow-x-hidden cursor-default ">
			<style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;900&display=swap');
        body { font-family: 'Inter', sans-serif; }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 0px; } 
      `}</style>

			{/* ─── SPLIT SCREEN LAYOUT ────────────────────────────────────────────── */}
			<div className="flex flex-col py-5 px-10 lg:flex-row min-h-screen">
				{/* RIGHT PANEL: Image Canvas */}
				<div className="w-full lg:w-[50%] rounded-3xl lg:h-screen top-0 bg-[#e8dad0] flex items-center justify-center p-8 relative overflow-hidden">
					{/* Main Prominent Image */}
					<Image
						src={product.image}
						alt={product.name}
						fill
						className=" object-cover rounded-3xl"
					/>
				</div>

				{/* LEFT PANEL: Text & Typography */}
				<div className="w-full lg:w-[55%] p-8 lg:p-16 flex flex-col justify-between z-10 bg-white">
					{/* Header/Nav */}
					<nav className="flex items-center justify-between mb-16 lg:mb-0">
						<button
							onClick={() => router.back()}
							data-hover
							className="text-xs font-bold tracking-[0.2em] uppercase hover:text-[#b36619] transition"
						>
							[ ← Back ]
						</button>
					</nav>

					{/* Main Typography Area */}
					<div className="my-10 lg:my-4">
						<h1 className="text-[12vw]  lg:text-[5vw] font-black leading-[0.85] tracking-tighter uppercase mb-6 wrap-break-word">
							{product.name}
						</h1>
						<p className="text-[11px] lg:text-[13px] font-semibold tracking-[0.1em] uppercase max-w-sm mb-16">
							Is a premium {product.category.toLowerCase()}{" "}
							fragrance belonging to the{" "}
							<span className="text-[#b36619]">
								{product.fragrance_family}
							</span>{" "}
							collection.
						</p>

						{/* Brutalist List / Accordion (Like the left side of the image) */}
						<div className="border-t border-black/10">
							{[
								{
									title: "TOP NOTES",
									desc: parseNotes(
										product.fragrance_notes,
										"top",
									),
								},
								{
									title: "HEART NOTES",
									desc: parseNotes(
										product.fragrance_notes,
										"heart",
									),
								},
								{
									title: "BASE NOTES",
									desc: parseNotes(
										product.fragrance_notes,
										"base",
									),
								},
								{
									title: "DESCRIPTION",
									desc: product.description,
								},
							].map((item, i) => (
								<div
									key={i}
									className="group border-b border-black/10 py-5 flex items-start justify-between hover:bg-black hover:text-white transition-colors duration-300 px-4 -mx-4  "
									data-hover
								>
									<div className="w-[80%]">
										<h3 className="text-md font-bold uppercase tracking-[0.1em] mb-1">
											{item.title}
										</h3>
										<p className="text-sm font-light opacity-70 group-hover:opacity-100 transition-opacity leading-relaxed">
											{item.desc}
										</p>
									</div>
								</div>
							))}
						</div>

						<ProductInteractions
							variants={product.product_variants}
							initialPrice={null}
						/>
					</div>
				</div>
			</div>

			{/* ─── MORE LIKE THIS SECTION (Mimicking "MORE BRANDS" footer) ───────── */}
			{related.length > 0 && (
				<div className="bg-white border-t border-black py-16 px-8 lg:px-16">
					<div className="flex items-end gap-6 mb-16">
						<h2 className="text-[10vw] lg:text-[6vw] font-black leading-none tracking-tighter uppercase">
							MORE
						</h2>
						<span
							className="text-[10px] font-bold tracking-[0.2em] uppercase pb-2 lg:pb-4 border-b border-black  "
							data-hover
							onClick={() => router.push("/shop")}
						>
							[ GO TO CATALOGUE ]
						</span>
						<h2 className="text-[10vw] lg:text-[6vw] font-black leading-none tracking-tighter uppercase">
							SCENTS
						</h2>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
						{related.map((rel) => {
							const startingPrice =
								rel.product_variants &&
								rel.product_variants.length > 0
									? Math.min(
											...rel.product_variants.map(
												(v: Variant) => v.price,
											),
										)
									: 0;

							return (
								<div
									key={rel.id}
									className="group   flex flex-col"
									data-hover
									onClick={() =>
										router.push(`/perfume/${rel.slug}`)
									}
								>
									<div className="aspect-[4/5] bg-[#f4f4f4] overflow-hidden mb-4 relative">
										<img
											src={rel.image}
											alt={rel.name}
											className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
										/>
									</div>
									<h4 className="text-lg font-black tracking-tighter uppercase">
										{rel.name}
									</h4>
									<p className="text-xs font-bold tracking-[0.1em] text-gray-500 uppercase mt-1">
										{rel.fragrance_family}
									</p>
									<p className="text-sm font-semibold mt-2">
										Starts at ₹ {startingPrice}
									</p>
								</div>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
}