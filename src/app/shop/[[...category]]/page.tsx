import { createClient } from "@/lib/supabase/server";

import ShopClient from "../components/ShopClient";

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

const CATEGORY_MAP: Record<string, string> = {
	"men-perfume": "Men",
	"women-perfume": "Women",
	"unisex-perfume": "Unisex",
};

// app/shop/page.tsx

export default async function Page({
	params,
  searchParams
}: {
	params: Promise<{ category?: string }>;
	searchParams: Promise<{ page?: string }>;
}) {
	const supabase = await createClient();
	const categorySlug = (await params).category;
	const categoryValue = categorySlug ? CATEGORY_MAP[categorySlug] : null;
  console.log(categorySlug,categoryValue)

  const page_size=6
  const page_number = Number((await searchParams).page ?? 1)
  const from= (page_number - 1) * page_size
  const to= (from + page_size) - 1



let query = supabase
  .from("products")
  .select(
    `
    id,
    name,
    slug,
    category,
    fragrance_family,
    fragrance_notes,
    image,
    created_at,
    product_variants (
      id,
      volume_ml,
      price
    )
  `,
    { count: "exact" }
  )
  .range(from, to);


	if (categoryValue) {
		query = query.eq("category", categoryValue);
	}

	const { data: products, error , count } = await query;
	if (error) {
		console.error("Error fetching products:", error);
		return null;
	}

  const totalPages = Math.ceil((count ?? 0) / page_size);

  console.log(products)

	const formattedProducts: Fragrance[] = products.map((item: any) => {
		const variant = item.product_variants?.[0] ?? {
			id: "",
			volume_ml: 0,
			price: 0,
		};
		return {
			id: item.id,
			name: item.name,
			slug: item.slug,
			category: item.category,
			fragrance_family: item.fragrance_family,
			fragrance_notes: item.fragrance_notes["top"] || "Signature Blend",
			image: item.image,
			created_at: item.created_at,
			variant,
		};
	});

	const allFragranceFamilies = products.map((p) => p.fragrance_family);
	const collections: string[] = [...new Set(allFragranceFamilies)];


  console.log(collections)
	return (
		<ShopClient
			products={formattedProducts}
			fragrancefamily={collections}
      totalPage={totalPages}
		/>
	);
}
