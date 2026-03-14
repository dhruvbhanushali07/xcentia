"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import ProductCard from "./ProductCard";
import Sidebar from "./Sidebar";
import { ChevronLeft, ChevronRight } from "lucide-react";


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


export default function ShopClient({ products, fragrancefamily }: { products: Fragrance[]; fragrancefamily: string[] }) {
	const [dbFragrances, setDbFragrances] = useState<Fragrance[]>(products);
	const [loading, setLoading] = useState(true);
    const collections = ["All Scents", ...fragrancefamily];
	const [sortBy, setSortBy] = useState("Featured");
	const [currentPage, setCurrentPage] = useState(1);
	const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeCollection, setActiveCollection] = useState("All Scents");
    const [activeNotes, setActiveNotes] = useState<string[]>([]);
	const ITEMS_PER_PAGE = 6;


    useEffect(() => {
        setDbFragrances(products);
        setLoading(false);
    }, [products]);
	// Reset to page 1 whenever filters change
	useEffect(() => {
		setCurrentPage(1);
	}, [activeCollection, activeNotes, sortBy]);

	const toggleNote = useCallback((n: string) => {
		setActiveNotes((prev) =>
			prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n],
		);
	}, []);

	// ── Filter + Sort ──────────────────────────────────────────────────────────
	let filtered = dbFragrances;
	if (activeCollection !== "All Scents") {
		filtered = filtered.filter((f) => f.fragrance_family === activeCollection);
	}
	// Notes filter: show frags whose notes string contains ANY active note
	if (activeNotes.length > 0) {
  filtered = filtered.filter((f) =>
    activeNotes.some((n) =>
      Array.isArray(f.fragrance_notes)
        ? f.fragrance_notes
            .map(note => note.toLowerCase())
            .includes(n.toLowerCase())
        : f.fragrance_notes
            .toLowerCase()
            .includes(n.toLowerCase())
    )
  );
}

	const sorted = [...filtered].sort((a, b) => {
		if (sortBy === "Price: High to Low") return b.variant.price - a.variant.price;
		if (sortBy === "Price: Low to High") return a.variant.price - b.variant.price;
		if (sortBy === "Newest")
			return (
				new Date(b.created_at).getTime() -
				new Date(a.created_at).getTime()
			);
		return 0;
	});

	const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
	const paginated = sorted.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE,
	);
	const hasFilters =
		activeCollection !== "All Scents" || activeNotes.length > 0;

	return (
		<div className="bg-[#f8f7f6] text-[#211911] min-h-screen overflow-x-hidden">
			<style>{`
        @import url('https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,200;0,300;0,400;0,500;0,700;0,900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700&display=swap');
        body { font-family: 'Work Sans', sans-serif; }
        ::selection { background: #b36619; color: #f8f7f6; }
        html { scroll-behavior: smooth; }
      `}</style>

			

			<main className="max-w-[1440px] mx-auto w-full px-8 lg:px-16 py-12">
				{/* ── Page header ───────────────────────────────────────────────── */}
				

				{/* ── Layout ────────────────────────────────────────────────────── */}
				<div className="flex flex-col lg:flex-row gap-14">
					{/* Sidebar — hidden on mobile unless toggled */}
					<div
						className={`lg:block ${sidebarOpen ? "block" : "hidden"}`}
					>
						<Sidebar
                            collections={collections}
							activeCollection={activeCollection}
							setActiveCollection={setActiveCollection}
							activeNotes={activeNotes}
							toggleNote={toggleNote}
							sortBy={sortBy}
							setSortBy={setSortBy}
							totalCount={sorted.length}
						/>
					</div>

					{/* Grid */}
					<div className="flex-grow min-w-0">
						<div className="flex items-center justify-between mb-10">
							<p className="text-[11px] text-[#211911]/35 font-medium uppercase tracking-[0.2em]">
								{loading
									? "Loading…"
									: `${sorted.length} fragrance${sorted.length !== 1 ? "s" : ""}`}
							</p>
							<div className="flex items-center gap-1">
								{["grid_view", "view_agenda"].map((icon) => (
									<button
										key={icon}
										className="p-2 hover:bg-[#b36619]/8 rounded transition-colors duration-200"
									>
										<span
											className="material-symbols-outlined text-[18px] text-[#211911]/35"
											style={{
												fontVariationSettings:
													"'wght' 200",
											}}
										>
											{icon}
										</span>
									</button>
								))}
							</div>
						</div>

						{loading ? (
							<div className="flex flex-col items-center justify-center py-40 gap-5">
								<div className="w-8 h-8 border border-[#b36619]/30 border-t-[#b36619] rounded-full animate-spin" />
								<p className="text-[11px] tracking-[0.3em] text-[#b36619]/60 uppercase font-medium">
									Loading Archives
								</p>
							</div>
						) : paginated.length === 0 ? (
							<div className="flex flex-col items-center justify-center py-40 gap-4 text-center">
								<p
									className="text-[clamp(32px,3vw,44px)] font-light text-[#211911]/15"
									style={{
										fontFamily:
											"'Cormorant Garamond', serif",
									}}
								>
									No fragrances found
								</p>
								<p className="text-[12px] text-[#211911]/35 max-w-xs leading-relaxed">
									Try adjusting your filters or clearing them
									to explore the full collection.
								</p>
								<button
									onClick={() => {
										setActiveCollection("All Scents");
										setActiveNotes([]);
									}}
									className="mt-2 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.25em] border border-[#211911]/15 hover:border-[#b36619] hover:text-[#b36619] transition-all duration-200"
								>
									Clear Filters
								</button>
							</div>
						) : (
							<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-16">
								{paginated.map((frag, i) => (
									<ProductCard
										key={frag.id}
										frag={frag}
										index={i}
									/>
								))}
							</div>
						)}

						{/* Pagination */}
						{!loading && totalPages > 1 && (
							<div className="mt-24 flex items-center justify-center gap-8">
								<button
									onClick={() =>
										setCurrentPage((p) =>
											Math.max(1, p - 1),
										)
									}
									disabled={currentPage === 1}
									className="w-9 h-9 flex items-center justify-center border border-[#b36619]/20 rounded-full hover:bg-[#b36619]/8 hover:border-[#b36619]/50 transition-all duration-200 disabled:opacity-20 disabled:pointer-events-none"
								>
									<ChevronLeft className="w-3.5 h-3.5 text-[#b36619]" />
								</button>

								<div className="flex items-center gap-5">
									{Array.from(
										{ length: totalPages },
										(_, i) => i + 1,
									).map((p) => (
										<button
											key={p}
											onClick={() => setCurrentPage(p)}
											className={`text-[13px] font-medium transition-all duration-200 pb-1 border-b-2 ${
												currentPage === p
													? "text-[#b36619] border-[#b36619]"
													: "text-[#211911]/30 hover:text-[#211911] border-transparent"
											}`}
										>
											{String(p).padStart(2, "0")}
										</button>
									))}
								</div>

								<button
									onClick={() =>
										setCurrentPage((p) =>
											Math.min(totalPages, p + 1),
										)
									}
									disabled={currentPage === totalPages}
									className="w-9 h-9 flex items-center justify-center border border-[#b36619]/20 rounded-full hover:bg-[#b36619]/8 hover:border-[#b36619]/50 transition-all duration-200 disabled:opacity-20 disabled:pointer-events-none"
								>
									<ChevronRight className="w-3.5 h-3.5 text-[#b36619]" />
								</button>
							</div>
						)}
					</div>
				</div>
			</main>

			{/* ── FOOTER ───────────────────────────────────────────────────────── */}
			<footer className="bg-[#211911] text-[#f8f7f6]/45 pt-20 pb-10 px-8 lg:px-16 mt-24">
				<div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
					<div className="flex flex-col gap-6">
						<div className="flex items-center gap-3 text-[#f8f7f6]">
							<svg
								className="w-5 h-5 text-[#b36619]"
								viewBox="0 0 48 48"
								fill="none"
							>
								<path
									d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
									fill="currentColor"
								/>
							</svg>
							<span className="text-[18px] font-black uppercase tracking-[0.18em]">
								Xcentia
							</span>
						</div>
						<p className="text-[10px] font-medium uppercase tracking-[0.25em] leading-relaxed max-w-[200px] text-[#f8f7f6]/28">
							Precision, purity,
							<br />
							and passion in every drop.
						</p>
					</div>

					{[
						{
							title: "Explore",
							links: [
								"Our Process",
								"Store Locator",
								"The Lab",
								"Journal",
							],
						},
						{
							title: "Service",
							links: [
								"Shipping & Returns",
								"Privacy Policy",
								"FAQ",
								"Contact",
							],
						},
					].map((col) => (
						<div key={col.title} className="flex flex-col gap-5">
							<h4 className="text-[#f8f7f6] text-[10px] font-bold uppercase tracking-[0.35em]">
								{col.title}
							</h4>
							<ul className="flex flex-col gap-3">
								{col.links.map((item) => (
									<li key={item}>
										<a
											href="#"
											className="text-[12px] font-light hover:text-[#b36619] transition-colors duration-200"
										>
											{item}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}

					<div className="flex flex-col gap-5">
						<h4 className="text-[#f8f7f6] text-[10px] font-bold uppercase tracking-[0.35em]">
							Newsletter
						</h4>
						<p className="text-[12px] font-light text-[#f8f7f6]/28 leading-relaxed">
							Subscribe for early access to limited releases.
						</p>
						<div className="flex items-center border-b border-[#b36619]/30 pb-2">
							<input
								type="email"
								placeholder="Email address"
								className="bg-transparent border-none focus:outline-none text-[12px] w-full placeholder:text-[#f8f7f6]/18 text-[#f8f7f6] font-light"
							/>
							<button className="text-[#b36619] hover:translate-x-0.5 transition-transform duration-200 flex-shrink-0">
								<svg
									className="w-4 h-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={1.5}
										d="M14 5l7 7-7 7M3 12h18"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>

				<div className="max-w-[1440px] mx-auto pt-8 border-t border-[#f8f7f6]/7 flex flex-col md:flex-row justify-between items-center gap-4">
					<p className="text-[9px] uppercase tracking-[0.3em] text-[#f8f7f6]/20">
						© 2026 Xcentia Fragrances AG, Switzerland.
					</p>
					<div className="flex gap-8 text-[9px] uppercase tracking-[0.3em] text-[#f8f7f6]/20">
						{["Instagram", "Pinterest", "LinkedIn"].map((s) => (
							<a
								key={s}
								href="#"
								className="hover:text-[#b36619] transition-colors duration-200"
							>
								{s}
							</a>
						))}
					</div>
				</div>
			</footer>
		</div>
	);
}