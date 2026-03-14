// src/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BagStoreProvider } from "@/providers/Bag-store-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Scentwale | Premium Fragrances",
  description: "Discover your signature scent with Scentwale.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        {/* Navigation Bar */}
        <BagStoreProvider>
        <Navbar />

        {/* Dynamic Page Content goes here */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* Footer */}
        <Footer />
        </BagStoreProvider>
      </body>
    </html>
  );
}