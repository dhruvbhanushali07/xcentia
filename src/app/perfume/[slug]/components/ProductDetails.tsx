import Image from "next/image";
import ProductInteractions from "./ProductInteractions";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

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

export default function ProductDetail({
	product,
	relatedProducts,
}: {
	product: Product;
	relatedProducts: Product[];
}) {
	const parseNotes = (notesData: any, type: "top" | "heart" | "base") => {
		if (!notesData) return "Undisclosed";
		const raw = notesData[type];
		if (Array.isArray(raw)) return raw.join(", ");
		if (typeof raw === "string") return raw;
		return "Undisclosed";
	};

	return (
		<div
			className={`${inter.className} bg-white text-black min-h-screen selection:bg-stone-200`}
		>
			{/* ─── SPLIT SCREEN LAYOUT ────────────────────────────────────────────── */}
			<div className="flex flex-col lg:flex-row min-h-screen overflow-hidden">
				{/* LEFT PANEL: Image (Moved to top on mobile for better UX) */}
				<div className="w-full lg:w-1/2 h-[60vh] lg:h-screen sticky top-0 bg-white p-4 lg:p-10">
					<div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
						<Image
							src={product.image}
							alt={product.name}
							fill
							priority
							className="object-cover"
							sizes="(max-width: 1024px) 100vw, 50vw"
						/>
					</div>
				</div>

				{/* RIGHT PANEL: Content */}
				<div className="w-full lg:w-1/2 p-6 md:p-12 lg:p-20 flex flex-col bg-white">
					{/* Header/Nav */}
					<nav className="mb-12">
						<Link
							href="/shop"
							className="text-xs font-bold tracking-widest uppercase hover:text-[#b36619] transition-colors"
						>
							[ ← Back to Shop ]
						</Link>
					</nav>

					{/* Main Typography Area */}
					<div className="flex-grow">
						<h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tighter uppercase mb-6 break-words">
							{product.name}
						</h1>

						<p className="text-xs md:text-sm font-semibold tracking-widest uppercase max-w-sm mb-12 leading-relaxed">
							Is a premium{" "}
							<span className="italic">
								{product.category.toLowerCase()}
							</span>{" "}
							fragrance belonging to the{" "}
							<span className="text-[#b36619]">
								{product.fragrance_family}
							</span>{" "}
							collection.
						</p>

						{/* Accordion-style Info */}
						<div className="border-t border-black/10 mb-10">
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
									className="group border-b border-black/10 py-6 flex flex-col md:flex-row md:items-start justify-between hover:bg-stone-50 transition-colors duration-300 px-4 -mx-4"
								>
									<h3 className="text-xs font-black uppercase tracking-widest mb-2 md:mb-0 md:w-1/3">
										{item.title}
									</h3>
									<p className="text-sm font-light text-stone-600 group-hover:text-black transition-colors leading-relaxed md:w-2/3">
										{item.desc}
									</p>
								</div>
							))}
						</div>

						<ProductInteractions
							product={product}
							variants={product.product_variants}
							initialPrice={null}
						/>
					</div>
				</div>
			</div>

			{/* ─── RELATED PRODUCTS SECTION ───────────────────────────────────────── */}
			{relatedProducts.length > 0 && (
				<div className="bg-white border-t border-black py-20 px-6 md:px-12 lg:px-20">
					<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
						<h2 className="text-7xl md:text-8xl lg:text-9xl font-black leading-none tracking-tighter uppercase flex flex-wrap items-center gap-x-4">
							MORE
							<span className="hidden lg:inline-block">
								<Link
									href="/shop"
									className="text-xs font-bold tracking-widest uppercase pb-2 border-b-2 border-black hover:text-[#b36619] hover:border-[#b36619] transition-all"
								>
									[ View Catalogue ]
								</Link>																												
							</span>
							<br className="lg:hidden" />
							SCENTS
						</h2>
						{/* Mobile/Tablet only link */}
						<Link
							href="/shop"
							className="lg:hidden text-xs font-bold tracking-widest uppercase pb-2 border-b-2 border-black self-start hover:text-[#b36619] transition-all"
						>
							[ View Catalogue ]
						</Link>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
						{relatedProducts.map((rel) => {
							const startingPrice =
								rel.product_variants?.length > 0
									? Math.min(
											...rel.product_variants.map(
												(v: Variant) => v.price,
											),
										)
									: 0;

							return (
								<Link
									key={rel.id}
									href={`/perfume/${rel.slug}`}
									className="group flex flex-col"
								>
									<div className="aspect-[4/5] bg-stone-100 overflow-hidden mb-6 relative rounded-sm">
										<Image
											src={rel.image}
											alt={rel.name}
											fill
											className="object-cover group-hover:scale-110 transition-transform duration-1000"
										/>
									</div>
									<h4 className="text-xl font-black tracking-tighter uppercase leading-tight">
										{rel.name}
									</h4>
									<p className="text-[10px] font-bold tracking-widest text-stone-400 uppercase mt-1">
										{rel.fragrance_family}
									</p>
									<p className="text-sm font-bold mt-3 text-stone-900">
										From ₹{startingPrice.toLocaleString()}
									</p>
								</Link>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
}
