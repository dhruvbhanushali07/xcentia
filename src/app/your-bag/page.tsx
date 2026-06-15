import { supabase } from "@/lib/supabase/client";
import BagClient from "./components/BagClient";

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
	fragrance_family: string;
	image: string;
	product_variants: { volume_ml: number; price: number }[];
}

export default async function YourBagPage() {
	const { data:suggestion } = await supabase
		.from("products")
		.select(
			`id, name, slug, image, product_variants ( volume_ml, price )`,
		)
		.limit(4);

	if (!suggestion) {
		return
	}
	
	return (
		<BagClient suggestedProducts={suggestion} />
	);
}

// ─── Main Cart Page ───────────────────────────────────────────────────────────
