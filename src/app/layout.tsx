// src/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

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
        

        {/* Dynamic Page Content goes here */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-black text-white text-center py-12 mt-10">
          <h2 className="text-2xl font-serif tracking-widest mb-4">SCENTWALE.</h2>
          <p className="text-gray-400 font-light">© 2026 Scentwale Private Limited. All Rights Reserved.</p>
        </footer>
      </body>
    </html>
  );
}