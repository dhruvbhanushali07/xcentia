// src/app/page.tsx
import { supabase } from "@/utils/supabase/client";
import Link from "next/link";

// This tells Next.js to fetch fresh data occasionally, keeping the site fast but up-to-date
export const revalidate = 60; 

export default async function Home() {
  // Fetch products, getting the direct image column and joining the variants for prices
  const { data: products, error } = await supabase
    .from("products")
    .select(`
      id,
      name,
      category,
      image,
      product_variants ( price )
    `)
    .limit(3); // Grabbing 3 for the "Bestsellers" section

  if (error) {
    console.error("Error fetching products:", error);
  }

  console.log()
  return (
    <div>
      {/* 1. Premium Hero Section */}
      <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden bg-black">
        <img
          src="https://images.unsplash.com/photo-1610461888750-10bef9f065c5?q=80&w=2000&auto=format&fit=crop"
          alt="Scentwale Lifestyle"
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-70"
        />
        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-serif font-extralight tracking-wider mb-6">
            Crafting<br />Memorable Scents
          </h1>
          <p className="text-xl font-light max-w-2xl mb-12">
            Discover unique fragrances handcrafted for every mood and occasion.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-white text-black text-lg font-medium px-12 py-4 rounded-full shadow-lg hover:bg-gray-200 transition duration-300"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* 2. Live Database Bestsellers Grid */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4">Our Bestsellers</h2>
            <p className="text-gray-500">Live data fetched from Supabase PostgreSQL</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {products?.map((product) => {
              // Calculate the lowest starting price from the variants (e.g., the 20ml price)
              // If no variants exist yet, it defaults to 0
              const startingPrice = product.product_variants && product.product_variants.length > 0
                ? Math.min(...product.product_variants.map((v: any) => v.price))
                : 'TBA';

              return (
                <div key={product.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition duration-300 flex flex-col">
                  <div className="relative h-80 mb-6 overflow-hidden rounded-lg">
                    {/* Using the direct 'image' column from your new schema */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="text-center flex-grow flex flex-col justify-between">
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">{product.category}</p>
                      <h3 className="text-2xl font-serif mb-3">{product.name}</h3>
                      <p className="text-lg font-light text-gray-700 mb-6">Starts from ₹{startingPrice}</p>
                    </div>
                    <Link
                      href={`/product/${product.id}`}
                      className="block w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition text-md font-medium"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* 3. Brand Story Section */}
      <section className="bg-white py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-8">More Than A Fragrance</h2>
          <p className="text-lg text-gray-600 font-light leading-relaxed mb-10">
            At Scentwale, we believe perfume is an extension of your personality. Our journey began with a passion to craft unique, evocative scents using only the finest ingredients. Every bottle holds a story, waiting to be a part of yours.
          </p>
        </div>
      </section>
    </div>
  );
}