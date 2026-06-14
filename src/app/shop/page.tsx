
import { supabase } from "@/utils/supabase/client";
import ShopClient from "./components/ShopClient";

// ─── Types ────────────────────────────────────────────────────────────────────

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



// ─── Constants ────────────────────────────────────────────────────────────────



// app/shop/page.tsx


export default async function Page() {
  const { data: products, error } = await supabase.from("products").select(`
    id,
    name,
    slug,
    category,
    fragrance_family,
    fragrance_notes,
    image,
    created_at,
    product_variants ( id,volume_ml, price )
  `);

  if (error) {
    console.error("Error fetching products:", error);
    return null;
  }

  const formattedProducts: Fragrance[] = products.map((item: any) => {
    const variant = item.product_variants?.[0] ?? { id: "", volume_ml: 0, price: 0 };
    return {
      id: item.id,
      name: item.name,
      slug: item.slug,
      category: item.category,
      fragrance_family: item.fragrance_family,
      fragrance_notes: item.fragrance_notes["top"] ||"Signature Blend",
      image: item.image,
      created_at: item.created_at,
      variant
    };
  });

  const allFragranceFamilies = products.map(p => p.fragrance_family);
  const collections:string[] = [...new Set(allFragranceFamilies)];
  console.log("Collections:", collections);
  console.log("Formatted Products:", formattedProducts);
  return (
    <ShopClient
      products={formattedProducts}
      fragrancefamily={collections}
    />
  );
}

// // ─── Product Card ─────────────────────────────────────────────────────────────
// function ProductCard({ frag, index }: { frag: Fragrance; index: number }) {
// 	const ref = useRef<HTMLDivElement>(null);
// 	const [inBag, setInBag] = useState(false);

// 	useEffect(() => {
// 		(async () => {
// 			const { gsap } = await import("gsap");
// 			const { ScrollTrigger } = await import("gsap/ScrollTrigger");
// 			gsap.registerPlugin(ScrollTrigger);
// 			if (!ref.current) return;
// 			gsap.fromTo(
// 				ref.current,
// 				{ opacity: 0, y: 32 },
// 				{
// 					opacity: 1,
// 					y: 0,
// 					duration: 0.75,
// 					ease: "power3.out",
// 					delay: (index % 3) * 0.08,
// 					scrollTrigger: { trigger: ref.current, start: "top 92%" },
// 				},
// 			);
// 		})();
// 	}, [index]);

// 	return (
// 		<div ref={ref} className="group flex flex-col opacity-0">
// 			{/* Image */}
// 			<Link href={`/perfume/${frag.slug}`} className="block">
// 				<div className="aspect-[4/5] overflow-hidden bg-[#f0ebe3] mb-5 relative">
// 					<Image
// 						src={frag.img}
// 						alt={frag.name}
// 						fill
// 						className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-700"
// 					/>

// 					{/* Gradient overlay */}
// 					<div className="absolute inset-0 bg-gradient-to-t from-[#211911]/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

// 					{/* N° label */}
// 					<span className="absolute top-4 right-4 text-[10px] font-black tracking-[0.25em] text-[#211911]/20 group-hover:text-[#f8f7f6]/50 transition-colors duration-500">
// 						{frag.num}
// 					</span>

// 					{/* Quick add — sits above the link but doesn't navigate */}
// 					<div className="absolute bottom-5 left-5 right-5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
// 						<button
// 							onClick={(e) => {
// 								e.preventDefault(); // prevent link navigation
// 								setInBag(true);
// 							}}
// 							className={`w-full py-3 text-[9px] font-bold uppercase tracking-[0.28em] transition-all duration-300 ${
// 								inBag
// 									? "bg-[#211911] text-[#b36619]"
// 									: "bg-[#f8f7f6]/92 backdrop-blur-sm text-[#211911] hover:bg-[#b36619] hover:text-white"
// 							}`}
// 						>
// 							{inBag ? "✓ Added to Bag" : "Add to Bag"}
// 						</button>
// 					</div>
// 				</div>
// 			</Link>

// 			{/* Info */}
// 			<Link href={`/perfume/${frag.slug}`} className="block group/info">
// 				<div className="flex items-start justify-between gap-2">
// 					<div className="flex-1 min-w-0">
// 						<span className="text-[9px] font-bold uppercase tracking-[0.35em] text-[#b36619] block mb-1">
// 							{frag.collection}
// 						</span>
// 						<h3
// 							className="text-[17px] font-light tracking-tight text-[#211911] group-hover/info:text-[#b36619] transition-colors duration-300 leading-snug"
// 							style={{
// 								fontFamily: "'Cormorant Garamond', serif",
// 							}}
// 						>
// 							{frag.french}
// 						</h3>
// 						<p className="text-[11px] text-[#211911]/40 italic mt-1 font-light leading-relaxed">
// 							{frag.notes}
// 						</p>
// 					</div>
// 					<div className="flex-shrink-0 pt-1">
// 						<span className="text-[14px] font-bold text-[#211911]">
// 							CHF {frag.price}
// 						</span>
// 					</div>
// 				</div>
// 			</Link>
// 		</div>
// 	);
// }

// // ─── Sidebar ──────────────────────────────────────────────────────────────────
// function Sidebar({
// 	activeCollection,
// 	setActiveCollection,
// 	activeNotes,
// 	toggleNote,
// 	sortBy,
// 	setSortBy,
// 	totalCount,
// }: {
// 	activeCollection: string;
// 	setActiveCollection: (c: string) => void;
// 	activeNotes: string[];
// 	toggleNote: (n: string) => void;
// 	sortBy: string;
// 	setSortBy: (s: string) => void;
// 	totalCount: number;
// }) {
// 	const ref = useRef<HTMLElement>(null);

// 	useEffect(() => {
// 		(async () => {
// 			const { gsap } = await import("gsap");
// 			if (!ref.current) return;
// 			gsap.fromTo(
// 				ref.current,
// 				{ opacity: 0, x: -24 },
// 				{
// 					opacity: 1,
// 					x: 0,
// 					duration: 0.9,
// 					ease: "power3.out",
// 					delay: 0.3,
// 				},
// 			);
// 		})();
// 	}, []);

// 	const hasFilters =
// 		activeCollection !== "All Scents" || activeNotes.length > 0;

// 	return (
// 		<aside
// 			ref={ref}
// 			className="w-full lg:w-56 flex-shrink-0 space-y-10 opacity-0"
// 		>
// 			{/* Sort — mobile only */}
// 			<div className="lg:hidden">
// 				<label className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#211911]/50 block mb-3">
// 					Sort By
// 				</label>
// 				<select
// 					value={sortBy}
// 					onChange={(e) => setSortBy(e.target.value)}
// 					className="w-full bg-transparent border-b border-[#211911]/15 py-2 text-[12px] font-medium focus:outline-none focus:border-[#b36619] transition-colors text-[#211911]"
// 				>
// 					{SORT_OPTIONS.map((o) => (
// 						<option key={o}>{o}</option>
// 					))}
// 				</select>
// 			</div>

// 			{/* Collection */}
// 			<div>
// 				<h3 className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#211911] border-b border-[#b36619]/15 pb-4 mb-5">
// 					Collection
// 				</h3>
// 				<ul className="space-y-1">
// 					{COLLECTIONS.map((c) => {
// 						const active = activeCollection === c;
// 						return (
// 							<li key={c}>
// 								<button
// 									onClick={() => setActiveCollection(c)}
// 									className={`w-full text-left flex items-center justify-between py-2 px-0 group transition-all duration-200 ${
// 										active
// 											? "text-[#b36619]"
// 											: "text-[#211911]/50 hover:text-[#211911]"
// 									}`}
// 								>
// 									<span
// 										className={`text-[13px] transition-all duration-200 ${active ? "font-bold translate-x-1" : "font-medium"}`}
// 									>
// 										{c}
// 									</span>
// 									{active && (
// 										<span className="w-1 h-1 rounded-full bg-[#b36619] flex-shrink-0" />
// 									)}
// 								</button>
// 							</li>
// 						);
// 					})}
// 				</ul>
// 			</div>

// 			{/* Notes */}
// 			<div>
// 				<h3 className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#211911] border-b border-[#b36619]/15 pb-4 mb-5">
// 					Notes
// 				</h3>
// 				<ul className="space-y-2.5">
// 					{NOTES_LIST.map((n) => {
// 						const checked = activeNotes.includes(n);
// 						return (
// 							<li key={n}>
// 								<button
// 									onClick={() => toggleNote(n)}
// 									className="flex items-center gap-3 w-full text-left group"
// 								>
// 									<div
// 										className={`w-4 h-4 border flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
// 											checked
// 												? "border-[#b36619] bg-[#b36619]"
// 												: "border-[#211911]/20 group-hover:border-[#211911]/40"
// 										}`}
// 									>
// 										{checked && (
// 											<svg
// 												className="w-2.5 h-2.5 text-white"
// 												viewBox="0 0 10 10"
// 												fill="none"
// 											>
// 												<path
// 													d="M2 5l2.5 2.5L8 3"
// 													stroke="currentColor"
// 													strokeWidth="1.5"
// 													strokeLinecap="round"
// 													strokeLinejoin="round"
// 												/>
// 											</svg>
// 										)}
// 									</div>
// 									<span
// 										className={`text-[12px] transition-colors duration-200 ${checked ? "text-[#211911] font-medium" : "text-[#211911]/45 group-hover:text-[#211911]/70"}`}
// 									>
// 										{n}
// 									</span>
// 								</button>
// 							</li>
// 						);
// 					})}
// 				</ul>
// 			</div>

// 			{/* Clear */}
// 			{hasFilters && (
// 				<button
// 					onClick={() => {
// 						setActiveCollection("All Scents");
// 					}}
// 					className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#211911]/35 hover:text-[#b36619] transition-colors duration-200"
// 				>
// 					<span className="text-base leading-none">×</span> Clear
// 					Filters
// 				</button>
// 			)}

// 			{/* Count */}
// 			<p className="text-[10px] text-[#211911]/25 font-medium uppercase tracking-[0.2em]">
// 				{totalCount} result{totalCount !== 1 ? "s" : ""}
// 			</p>
// 		</aside>
// 	);
// }

// // ─── Main Page ────────────────────────────────────────────────────────────────
// export default function ShopPage() {
// 	const [dbFragrances, setDbFragrances] = useState<Fragrance[]>([]);
// 	const [loading, setLoading] = useState(true);

// 	const [activeCollection, setActiveCollection] = useState("All Scents");
// 	const [activeNotes, setActiveNotes] = useState<string[]>([]);
// 	const [sortBy, setSortBy] = useState("Featured");
// 	const [currentPage, setCurrentPage] = useState(1);
// 	const [navScrolled, setNavScrolled] = useState(false);
// 	const [sidebarOpen, setSidebarOpen] = useState(false);

// 	const headerRef = useRef<HTMLDivElement>(null);
// 	const headlineRef = useRef<HTMLHeadingElement>(null);
// 	const subRef = useRef<HTMLParagraphElement>(null);
// 	const ITEMS_PER_PAGE = 6;

// 	// ── Fetch ──────────────────────────────────────────────────────────────────
// 	useEffect(() => {
// 		async function fetchProducts() {
// 			const { data, error } = await supabase.from("products").select(`
//           id,
//           name,
//           slug,
//           fragrance_family,
//           fragrance_notes,
//           image,
//           created_at,
//           product_variants ( price )
//         `);

// 			if (error) {
// 				console.error("Error fetching products:", error);
// 				setLoading(false);
// 				return;
// 			}

// 			if (data) {
// 				const formattedData: Fragrance[] = data.map((item, index) => {
// 					const price =
// 						item.product_variants &&
// 						item.product_variants.length > 0
// 							? Math.min(
// 									...item.product_variants.map(
// 										(v: any) => v.price,
// 									),
// 								)
// 							: 0;

// 					let extractedNotes = "Signature Blend";
// 					if (item.fragrance_notes) {
// 						const rawNotes =
// 							item.fragrance_notes.top || item.fragrance_notes;
// 						if (Array.isArray(rawNotes)) {
// 							extractedNotes = rawNotes.slice(0, 3).join(" · ");
// 						} else if (typeof rawNotes === "string") {
// 							extractedNotes = rawNotes
// 								.split(",")
// 								.map((s: string) => s.trim())
// 								.slice(0, 3)
// 								.join(" · ");
// 						}
// 					}

// 					return {
// 						id: item.id,
// 						slug: item.slug,
// 						num: `N°${String(index + 1).padStart(2, "0")}`,
// 						collection: item.fragrance_family,
// 						name: item.name,
// 						french: item.name,
// 						notes: extractedNotes,
// 						price,
// 						img: item.image,
// 						created_at: item.created_at,
// 						...(index === 0 && {
// 							badge: "New Arrival",
// 							badgeVariant: "new" as const,
// 						}),
// 						...(index === 4 && {
// 							badge: "Limited",
// 							badgeVariant: "limited" as const,
// 						}),
// 						...(index === 6 && {
// 							badge: "Exclusive",
// 							badgeVariant: "exclusive" as const,
// 						}),
// 					};
// 				});
// 				setDbFragrances(formattedData);
// 			}
// 			setLoading(false);
// 		}
// 		fetchProducts();
// 	}, []);

// 	useEffect(() => {
// 		const onScroll = () => setNavScrolled(window.scrollY > 10);
// 		window.addEventListener("scroll", onScroll, { passive: true });
// 		return () => window.removeEventListener("scroll", onScroll);
// 	}, []);

// 	useEffect(() => {
// 		(async () => {
// 			const { gsap } = await import("gsap");
// 			gsap.fromTo(
// 				headerRef.current,
// 				{ opacity: 0, y: -14 },
// 				{ opacity: 1, y: 0, duration: 0.75, ease: "power3.out" },
// 			);
// 			gsap.fromTo(
// 				headlineRef.current,
// 				{ opacity: 0, y: 22 },
// 				{
// 					opacity: 1,
// 					y: 0,
// 					duration: 0.85,
// 					ease: "power3.out",
// 					delay: 0.2,
// 				},
// 			);
// 			gsap.fromTo(
// 				subRef.current,
// 				{ opacity: 0, y: 14 },
// 				{
// 					opacity: 1,
// 					y: 0,
// 					duration: 0.7,
// 					ease: "power3.out",
// 					delay: 0.35,
// 				},
// 			);
// 		})();
// 	}, []);

// 	// Reset to page 1 whenever filters change
// 	useEffect(() => {
// 		setCurrentPage(1);
// 	}, [activeCollection, activeNotes, sortBy]);

// 	const toggleNote = useCallback((n: string) => {
// 		setActiveNotes((prev) =>
// 			prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n],
// 		);
// 	}, []);

// 	// ── Filter + Sort ──────────────────────────────────────────────────────────
// 	let filtered = dbFragrances;
// 	if (activeCollection !== "All Scents") {
// 		filtered = filtered.filter((f) => f.collection === activeCollection);
// 	}
// 	// Notes filter: show frags whose notes string contains ANY active note
// 	if (activeNotes.length > 0) {
// 		filtered = filtered.filter((f) =>
// 			activeNotes.some((n) =>
// 				f.notes.toLowerCase().includes(n.toLowerCase()),
// 			),
// 		);
// 	}

// 	const sorted = [...filtered].sort((a, b) => {
// 		if (sortBy === "Price: High to Low") return b.price - a.price;
// 		if (sortBy === "Price: Low to High") return a.price - b.price;
// 		if (sortBy === "Newest")
// 			return (
// 				new Date(b.created_at).getTime() -
// 				new Date(a.created_at).getTime()
// 			);
// 		return 0;
// 	});

// 	const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
// 	const paginated = sorted.slice(
// 		(currentPage - 1) * ITEMS_PER_PAGE,
// 		currentPage * ITEMS_PER_PAGE,
// 	);
// 	const hasFilters =
// 		activeCollection !== "All Scents" || activeNotes.length > 0;

// 	return (
// 		<div className="bg-[#f8f7f6] text-[#211911] min-h-screen overflow-x-hidden">
// 			<style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,200;0,300;0,400;0,500;0,700;0,900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');
//         @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700&display=swap');
//         body { font-family: 'Work Sans', sans-serif; }
//         ::selection { background: #b36619; color: #f8f7f6; }
//         html { scroll-behavior: smooth; }
//       `}</style>

// 			{/* ── NAV ──────────────────────────────────────────────────────────── */}
// 			<header
// 				ref={headerRef}
// 				className={`sticky top-0 z-50 flex items-center justify-between px-8 lg:px-16 py-5 opacity-0 transition-all duration-500 ${
// 					navScrolled
// 						? "bg-[#f8f7f6]/92 backdrop-blur-md border-b border-[#b36619]/10"
// 						: "bg-[#f8f7f6] border-b border-[#b36619]/8"
// 				}`}
// 			>
// 				<div className="flex items-center gap-12">
// 					<Link href="/" className="flex items-center gap-3">
// 						<svg
// 							className="w-5 h-5 text-[#b36619]"
// 							viewBox="0 0 48 48"
// 							fill="none"
// 						>
// 							<path
// 								d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
// 								fill="currentColor"
// 							/>
// 						</svg>
// 						<span className="text-[18px] font-black uppercase tracking-[0.18em]">
// 							Xcentia
// 						</span>
// 					</Link>

// 					<nav className="hidden md:flex items-center gap-9">
// 						{(
// 							[
// 								["Fragrances", "/shop"],
// 								["Collections", "/collections"],
// 								["Heritage", "/heritage"],
// 							] as const
// 						).map(([label, href]) => (
// 							<Link
// 								key={label}
// 								href={href}
// 								className={`text-[10px] font-bold uppercase tracking-[0.25em] transition-colors duration-200 relative
//                   after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-[#b36619]
//                   hover:after:w-full after:transition-all after:duration-300
//                   ${label === "Fragrances" ? "text-[#211911] after:!w-full" : "text-[#211911]/50 hover:text-[#211911]"}`}
// 							>
// 								{label}
// 							</Link>
// 						))}
// 					</nav>
// 				</div>

// 				<div className="flex items-center gap-3">
// 					{/* Search */}
// 					<div className="hidden lg:flex items-center gap-2 bg-[#211911]/4 rounded-full px-4 py-2 border border-[#211911]/8 hover:border-[#b36619]/30 transition-colors duration-200">
// 						<svg
// 							className="w-3.5 h-3.5 text-[#b36619]/60 flex-shrink-0"
// 							fill="none"
// 							stroke="currentColor"
// 							viewBox="0 0 24 24"
// 						>
// 							<path
// 								strokeLinecap="round"
// 								strokeLinejoin="round"
// 								strokeWidth={1.5}
// 								d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
// 							/>
// 						</svg>
// 						<input
// 							type="text"
// 							placeholder="Search collection..."
// 							className="bg-transparent border-none focus:outline-none text-[12px] w-44 placeholder:text-[#211911]/30 text-[#211911]"
// 						/>
// 					</div>

// 					<button className="flex items-center gap-1.5 hover:text-[#b36619] transition-colors duration-200 px-2 py-1">
// 						<span
// 							className="material-symbols-outlined text-[20px]"
// 							style={{ fontVariationSettings: "'wght' 200" }}
// 						>
// 							shopping_bag
// 						</span>
// 						<span className="text-[10px] font-bold">(0)</span>
// 					</button>

// 					<button className="p-2 hover:bg-[#b36619]/8 rounded-full transition-colors duration-200">
// 						<span
// 							className="material-symbols-outlined text-[20px]"
// 							style={{ fontVariationSettings: "'wght' 200" }}
// 						>
// 							person
// 						</span>
// 					</button>

// 					{/* Mobile filter toggle */}
// 					<button
// 						onClick={() => setSidebarOpen(!sidebarOpen)}
// 						className="lg:hidden p-2 hover:bg-[#b36619]/8 rounded-full transition-colors duration-200"
// 					>
// 						<span
// 							className="material-symbols-outlined text-[20px]"
// 							style={{ fontVariationSettings: "'wght' 200" }}
// 						>
// 							tune
// 						</span>
// 					</button>
// 				</div>
// 			</header>

// 			<main className="max-w-[1440px] mx-auto w-full px-8 lg:px-16 py-12">
// 				{/* ── Page header ───────────────────────────────────────────────── */}
// 				<div className="mb-14">
// 					<nav className="flex items-center gap-2 text-[9px] uppercase tracking-[0.35em] text-[#b36619]/55 mb-8">
// 						<Link
// 							href="/"
// 							className="hover:text-[#b36619] transition-colors duration-200"
// 						>
// 							Home
// 						</Link>
// 						<span className="text-[#211911]/20">›</span>
// 						<span className="text-[#211911] font-bold">
// 							All Fragrances
// 						</span>
// 					</nav>

// 					<div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
// 						<div className="max-w-xl">
// 							<span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#b36619] block mb-4">
// 								The Olfactory Archive
// 							</span>
// 							<h1
// 								ref={headlineRef}
// 								className="text-[clamp(38px,4.5vw,60px)] font-light tracking-tight leading-[0.95] opacity-0"
// 								style={{
// 									fontFamily: "'Cormorant Garamond', serif",
// 								}}
// 							>
// 								All Fragrances
// 							</h1>
// 							<p
// 								ref={subRef}
// 								className="text-[14px] text-[#211911]/45 font-light leading-[1.8] mt-4 max-w-md opacity-0"
// 							>
// 								Meticulously crafted in the heart of the Swiss
// 								Alps. Each composition represents a balance of
// 								traditional precision and avant-garde
// 								sensibility.
// 							</p>
// 						</div>

// 						{/* Desktop sort */}
// 						<div className="hidden lg:flex items-center gap-4 border-b border-[#211911]/12 pb-2 flex-shrink-0">
// 							<span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#211911]/40">
// 								Sort By
// 							</span>
// 							<select
// 								value={sortBy}
// 								onChange={(e) => setSortBy(e.target.value)}
// 								className="bg-transparent border-none text-[13px] font-medium focus:outline-none pr-6 text-[#211911] cursor-pointer"
// 							>
// 								{SORT_OPTIONS.map((o) => (
// 									<option key={o}>{o}</option>
// 								))}
// 							</select>
// 						</div>
// 					</div>

// 					{/* Active filter chips */}
// 					{hasFilters && (
// 						<div className="flex flex-wrap gap-2 mt-6">
// 							{activeCollection !== "All Scents" && (
// 								<span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#211911]/5 border border-[#211911]/10 text-[10px] font-bold uppercase tracking-[0.2em]">
// 									{activeCollection}
// 									<button
// 										onClick={() =>
// 											setActiveCollection("All Scents")
// 										}
// 										className="text-[#211911]/40 hover:text-[#b36619] transition-colors leading-none"
// 									>
// 										×
// 									</button>
// 								</span>
// 							)}
// 							{activeNotes.map((n) => (
// 								<span
// 									key={n}
// 									className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#b36619]/8 border border-[#b36619]/20 text-[10px] font-bold uppercase tracking-[0.2em] text-[#b36619]"
// 								>
// 									{n}
// 									<button
// 										onClick={() => toggleNote(n)}
// 										className="opacity-60 hover:opacity-100 transition-opacity leading-none"
// 									>
// 										×
// 									</button>
// 								</span>
// 							))}
// 							<button
// 								onClick={() => {
// 									setActiveCollection("All Scents");
// 									setActiveNotes([]);
// 								}}
// 								className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#211911]/35 hover:text-[#b36619] transition-colors border border-transparent hover:border-[#b36619]/20"
// 							>
// 								Clear all
// 							</button>
// 						</div>
// 					)}
// 				</div>

// 				{/* ── Layout ────────────────────────────────────────────────────── */}
// 				<div className="flex flex-col lg:flex-row gap-14">
// 					{/* Sidebar — hidden on mobile unless toggled */}
// 					<div
// 						className={`lg:block ${sidebarOpen ? "block" : "hidden"}`}
// 					>
// 						<Sidebar
// 							activeCollection={activeCollection}
// 							setActiveCollection={setActiveCollection}
// 							activeNotes={activeNotes}
// 							toggleNote={toggleNote}
// 							sortBy={sortBy}
// 							setSortBy={setSortBy}
// 							totalCount={sorted.length}
// 						/>
// 					</div>

// 					{/* Grid */}
// 					<div className="flex-grow min-w-0">
// 						<div className="flex items-center justify-between mb-10">
// 							<p className="text-[11px] text-[#211911]/35 font-medium uppercase tracking-[0.2em]">
// 								{loading
// 									? "Loading…"
// 									: `${sorted.length} fragrance${sorted.length !== 1 ? "s" : ""}`}
// 							</p>
// 							<div className="flex items-center gap-1">
// 								{["grid_view", "view_agenda"].map((icon) => (
// 									<button
// 										key={icon}
// 										className="p-2 hover:bg-[#b36619]/8 rounded transition-colors duration-200"
// 									>
// 										<span
// 											className="material-symbols-outlined text-[18px] text-[#211911]/35"
// 											style={{
// 												fontVariationSettings:
// 													"'wght' 200",
// 											}}
// 										>
// 											{icon}
// 										</span>
// 									</button>
// 								))}
// 							</div>
// 						</div>

// 						{loading ? (
// 							<div className="flex flex-col items-center justify-center py-40 gap-5">
// 								<div className="w-8 h-8 border border-[#b36619]/30 border-t-[#b36619] rounded-full animate-spin" />
// 								<p className="text-[11px] tracking-[0.3em] text-[#b36619]/60 uppercase font-medium">
// 									Loading Archives
// 								</p>
// 							</div>
// 						) : paginated.length === 0 ? (
// 							<div className="flex flex-col items-center justify-center py-40 gap-4 text-center">
// 								<p
// 									className="text-[clamp(32px,3vw,44px)] font-light text-[#211911]/15"
// 									style={{
// 										fontFamily:
// 											"'Cormorant Garamond', serif",
// 									}}
// 								>
// 									No fragrances found
// 								</p>
// 								<p className="text-[12px] text-[#211911]/35 max-w-xs leading-relaxed">
// 									Try adjusting your filters or clearing them
// 									to explore the full collection.
// 								</p>
// 								<button
// 									onClick={() => {
// 										setActiveCollection("All Scents");
// 										setActiveNotes([]);
// 									}}
// 									className="mt-2 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.25em] border border-[#211911]/15 hover:border-[#b36619] hover:text-[#b36619] transition-all duration-200"
// 								>
// 									Clear Filters
// 								</button>
// 							</div>
// 						) : (
// 							<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-16">
// 								{paginated.map((frag, i) => (
// 									<ProductCard
// 										key={frag.id}
// 										frag={frag}
// 										index={i}
// 									/>
// 								))}
// 							</div>
// 						)}

// 						{/* Pagination */}
// 						{!loading && totalPages > 1 && (
// 							<div className="mt-24 flex items-center justify-center gap-8">
// 								<button
// 									onClick={() =>
// 										setCurrentPage((p) =>
// 											Math.max(1, p - 1),
// 										)
// 									}
// 									disabled={currentPage === 1}
// 									className="w-9 h-9 flex items-center justify-center border border-[#b36619]/20 rounded-full hover:bg-[#b36619]/8 hover:border-[#b36619]/50 transition-all duration-200 disabled:opacity-20 disabled:pointer-events-none"
// 								>
// 									<svg
// 										className="w-3.5 h-3.5 text-[#b36619]"
// 										fill="none"
// 										stroke="currentColor"
// 										viewBox="0 0 24 24"
// 									>
// 										<path
// 											strokeLinecap="round"
// 											strokeLinejoin="round"
// 											strokeWidth={1.5}
// 											d="M15 19l-7-7 7-7"
// 										/>
// 									</svg>
// 								</button>

// 								<div className="flex items-center gap-5">
// 									{Array.from(
// 										{ length: totalPages },
// 										(_, i) => i + 1,
// 									).map((p) => (
// 										<button
// 											key={p}
// 											onClick={() => setCurrentPage(p)}
// 											className={`text-[13px] font-medium transition-all duration-200 pb-1 border-b-2 ${
// 												currentPage === p
// 													? "text-[#b36619] border-[#b36619]"
// 													: "text-[#211911]/30 hover:text-[#211911] border-transparent"
// 											}`}
// 										>
// 											{String(p).padStart(2, "0")}
// 										</button>
// 									))}
// 								</div>

// 								<button
// 									onClick={() =>
// 										setCurrentPage((p) =>
// 											Math.min(totalPages, p + 1),
// 										)
// 									}
// 									disabled={currentPage === totalPages}
// 									className="w-9 h-9 flex items-center justify-center border border-[#b36619]/20 rounded-full hover:bg-[#b36619]/8 hover:border-[#b36619]/50 transition-all duration-200 disabled:opacity-20 disabled:pointer-events-none"
// 								>
// 									<svg
// 										className="w-3.5 h-3.5 text-[#b36619]"
// 										fill="none"
// 										stroke="currentColor"
// 										viewBox="0 0 24 24"
// 									>
// 										<path
// 											strokeLinecap="round"
// 											strokeLinejoin="round"
// 											strokeWidth={1.5}
// 											d="M9 5l7 7-7 7"
// 										/>
// 									</svg>
// 								</button>
// 							</div>
// 						)}
// 					</div>
// 				</div>
// 			</main>

// 			{/* ── FOOTER ───────────────────────────────────────────────────────── */}
// 			<footer className="bg-[#211911] text-[#f8f7f6]/45 pt-20 pb-10 px-8 lg:px-16 mt-24">
// 				<div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
// 					<div className="flex flex-col gap-6">
// 						<div className="flex items-center gap-3 text-[#f8f7f6]">
// 							<svg
// 								className="w-5 h-5 text-[#b36619]"
// 								viewBox="0 0 48 48"
// 								fill="none"
// 							>
// 								<path
// 									d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
// 									fill="currentColor"
// 								/>
// 							</svg>
// 							<span className="text-[18px] font-black uppercase tracking-[0.18em]">
// 								Xcentia
// 							</span>
// 						</div>
// 						<p className="text-[10px] font-medium uppercase tracking-[0.25em] leading-relaxed max-w-[200px] text-[#f8f7f6]/28">
// 							Precision, purity,
// 							<br />
// 							and passion in every drop.
// 						</p>
// 					</div>

// 					{[
// 						{
// 							title: "Explore",
// 							links: [
// 								"Our Process",
// 								"Store Locator",
// 								"The Lab",
// 								"Journal",
// 							],
// 						},
// 						{
// 							title: "Service",
// 							links: [
// 								"Shipping & Returns",
// 								"Privacy Policy",
// 								"FAQ",
// 								"Contact",
// 							],
// 						},
// 					].map((col) => (
// 						<div key={col.title} className="flex flex-col gap-5">
// 							<h4 className="text-[#f8f7f6] text-[10px] font-bold uppercase tracking-[0.35em]">
// 								{col.title}
// 							</h4>
// 							<ul className="flex flex-col gap-3">
// 								{col.links.map((item) => (
// 									<li key={item}>
// 										<a
// 											href="#"
// 											className="text-[12px] font-light hover:text-[#b36619] transition-colors duration-200"
// 										>
// 											{item}
// 										</a>
// 									</li>
// 								))}
// 							</ul>
// 						</div>
// 					))}

// 					<div className="flex flex-col gap-5">
// 						<h4 className="text-[#f8f7f6] text-[10px] font-bold uppercase tracking-[0.35em]">
// 							Newsletter
// 						</h4>
// 						<p className="text-[12px] font-light text-[#f8f7f6]/28 leading-relaxed">
// 							Subscribe for early access to limited releases.
// 						</p>
// 						<div className="flex items-center border-b border-[#b36619]/30 pb-2">
// 							<input
// 								type="email"
// 								placeholder="Email address"
// 								className="bg-transparent border-none focus:outline-none text-[12px] w-full placeholder:text-[#f8f7f6]/18 text-[#f8f7f6] font-light"
// 							/>
// 							<button className="text-[#b36619] hover:translate-x-0.5 transition-transform duration-200 flex-shrink-0">
// 								<svg
// 									className="w-4 h-4"
// 									fill="none"
// 									stroke="currentColor"
// 									viewBox="0 0 24 24"
// 								>
// 									<path
// 										strokeLinecap="round"
// 										strokeLinejoin="round"
// 										strokeWidth={1.5}
// 										d="M14 5l7 7-7 7M3 12h18"
// 									/>
// 								</svg>
// 							</button>
// 						</div>
// 					</div>
// 				</div>

// 				<div className="max-w-[1440px] mx-auto pt-8 border-t border-[#f8f7f6]/7 flex flex-col md:flex-row justify-between items-center gap-4">
// 					<p className="text-[9px] uppercase tracking-[0.3em] text-[#f8f7f6]/20">
// 						© 2026 Xcentia Fragrances AG, Switzerland.
// 					</p>
// 					<div className="flex gap-8 text-[9px] uppercase tracking-[0.3em] text-[#f8f7f6]/20">
// 						{["Instagram", "Pinterest", "LinkedIn"].map((s) => (
// 							<a
// 								key={s}
// 								href="#"
// 								className="hover:text-[#b36619] transition-colors duration-200"
// 							>
// 								{s}
// 							</a>
// 						))}
// 					</div>
// 				</div>
// 			</footer>
// 		</div>
// 	);
// }
