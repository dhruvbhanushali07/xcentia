import { createClient } from "@/lib/supabase/client";

// ─── Types ────────────────────────────────────────────────────────────────────
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

// ─── Main Page ────────────────────────────────────────────────────────────────

import ProductDetail from "./components/ProductDetails";

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	// 1. Await the params first
	const { slug } = await params;
	const supabase = createClient();
	// 2. Now use the awaited slug in your query
	const { data: product, error } = await supabase
		.from("products")
		.select(`*, product_variants(id, volume_ml, price)`)
		.eq("slug", slug)
		.single();

	console.log("Supabase Query Result:", { product, error });

	// 3. Handle cases where the product might not exist
	if (error || !product) {
		return <div>Product not found</div>; // Or use the notFound() function from 'next/navigation'
	}

	console.log("Fetched Product:", product);

	const { data: relatedProducts } = await supabase
		.from("products")
		.select(`*, product_variants ( price )`)
		.eq("fragrance_family", product.fragrance_family)
		.neq("id", product.id)
		.limit(4);

	return (
		<ProductDetail
			product={product}
			relatedProducts={relatedProducts || []}
		/>
	);
}
