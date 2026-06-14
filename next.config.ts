import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    domains: ["ojfsjeosnafqbcduusbe.supabase.co", "images.unsplash.com", "images.pexels.com"],
  },
};

export default nextConfig;
