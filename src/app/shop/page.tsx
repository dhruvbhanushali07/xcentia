
import { supabase } from "@/lib/supabase/client";
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
