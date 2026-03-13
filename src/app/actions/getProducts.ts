import { createClient } from '@/utils/supabase/server'; // Adjust based on your supabase config

export async function getProducts() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_variants (
        id,
        volume_ml,
        price,
        stock
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return data;
}