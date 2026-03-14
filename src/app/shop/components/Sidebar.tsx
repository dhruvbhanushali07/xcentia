'use client';

import { useEffect, useRef } from "react";
import { Check } from "lucide-react";

const NOTES_LIST = [
	"Bergamot",
	"Sandalwood",
	"White Musk",
	"Ozone",
	"Vetiver",
	"Amber",
	"Iris",
];
const SORT_OPTIONS = [
	"Featured",
	"Newest",
	"Price: High to Low",
	"Price: Low to High",
];

export default function Sidebar({
    collections,
	activeCollection,
	setActiveCollection,
	activeNotes,
	toggleNote,
	sortBy,
	setSortBy,
	totalCount,

}: {
    collections: string[];
	activeCollection: string;
	setActiveCollection: (c: string) => void;
	activeNotes: string[];
	toggleNote: (n: string) => void;
	sortBy: string;
	setSortBy: (s: string) => void;
	totalCount: number;
}) {
	const ref = useRef<HTMLElement>(null);

    
	useEffect(() => {
		(async () => {
			const { gsap } = await import("gsap");
			if (!ref.current) return;
			gsap.fromTo(
				ref.current,
				{ opacity: 0, x: -24 },
				{
					opacity: 1,
					x: 0,
					duration: 0.9,
					ease: "power3.out",
					delay: 0.3,
				},
			);
		})();
	}, []);

	const hasFilters =
		activeCollection !== "All Scents" || activeNotes.length > 0;

	return (
		<aside
			ref={ref}
			className="w-full lg:w-56 flex-shrink-0 space-y-10 opacity-0"
		>
			{/* Sort — mobile only */}
			<div className="lg:hidden">
				<label className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#211911]/50 block mb-3">
					Sort By
				</label>
				<select
					value={sortBy}
					onChange={(e) => setSortBy(e.target.value)}
					className="w-full bg-transparent border-b border-[#211911]/15 py-2 text-[12px] font-medium focus:outline-none focus:border-[#b36619] transition-colors text-[#211911]"
				>
					{SORT_OPTIONS.map((o) => (
						<option key={o}>{o}</option>
					))}
				</select>
			</div>

			{/* Collection */}
			<div>
				<h3 className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#211911] border-b border-[#b36619]/15 pb-4 mb-5">
					Collection
				</h3>
				<ul className="space-y-1">
					{collections.map((c) => {
						const active = activeCollection === c;
						return (
							<li key={c}>
								<button
									onClick={() => setActiveCollection(c)}
									className={`w-full text-left flex items-center justify-between py-2 px-0 group transition-all duration-200 ${
										active
											? "text-[#b36619]"
											: "text-[#211911]/50 hover:text-[#211911]"
									}`}
								>
									<span
										className={`text-[13px] transition-all duration-200 ${active ? "font-bold translate-x-1" : "font-medium"}`}
									>
										{c}
									</span>
									{active && (
										<span className="w-1 h-1 rounded-full bg-[#b36619] flex-shrink-0" />
									)}
								</button>
							</li>
						);
					})}
				</ul>
			</div>

			{/* Notes */}
			<div>
				<h3 className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#211911] border-b border-[#b36619]/15 pb-4 mb-5">
					Notes
				</h3>
				<ul className="space-y-2.5">
					{NOTES_LIST.map((n) => {
						const checked = activeNotes.includes(n);
						return (
							<li key={n}>
								<button
									onClick={() => toggleNote(n)}
									className="flex items-center gap-3 w-full text-left group"
								>
									<div
										className={`w-4 h-4 border flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
											checked
												? "border-[#b36619] bg-[#b36619]"
												: "border-[#211911]/20 group-hover:border-[#211911]/40"
										}`}
									>
										{checked && (
											<Check className="w-2.5 h-2.5 text-white" />
										)}
									</div>
									<span
										className={`text-[12px] transition-colors duration-200 ${checked ? "text-[#211911] font-medium" : "text-[#211911]/45 group-hover:text-[#211911]/70"}`}
									>
										{n}
									</span>
								</button>
							</li>
						);
					})}
				</ul>
			</div>

			{/* Clear */}
			{hasFilters && (
				<button
					onClick={() => {
						setActiveCollection("All Scents");
					}}
					className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#211911]/35 hover:text-[#b36619] transition-colors duration-200"
				>
					<span className="text-base leading-none">×</span> Clear
					Filters
				</button>
			)}

			{/* Count */}
			<p className="text-[10px] text-[#211911]/25 font-medium uppercase tracking-[0.2em]">
				{totalCount} result{totalCount !== 1 ? "s" : ""}
			</p>
		</aside>
	);
}