"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AuthCodeErrorPage() {
	const [isHydrated, setIsHydrated] = useState(false);

	useEffect(() => {
		setIsHydrated(true);
	}, []);

	if (!isHydrated) return null;

	return (
		<div className="min-h-screen bg-[#f8f7f6] flex items-center justify-center px-4">
			<style>{`
        @import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@200;300;400;500;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
        body { font-family: 'Work Sans', sans-serif; }
      `}</style>

			{/* Error Container */}
			<div className="max-w-md w-full text-center">
				{/* Error Icon */}
				<div className="mb-8 flex justify-center">
					<div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
						<svg
							className="w-12 h-12 text-red-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.5}
								d="M12 9v2m0 4v2m-6-4a9 9 0 1118 0 9 9 0 01-18 0z"
							/>
						</svg>
					</div>
				</div>

				{/* Error Title */}
				<h1
					className="text-4xl md:text-5xl font-light text-[#211911] mb-3"
					style={{ fontFamily: "'Cormorant Garamond', serif" }}
				>
					Authentication Error
				</h1>

				{/* Error Message */}
				<p className="text-[#211911]/70 text-base mb-2">
					We couldn't complete your login process.
				</p>

				<p className="text-[#211911]/60 text-sm mb-8">
					The authentication code is invalid, expired, or there was an issue with
					your request. Please try signing in again.
				</p>

				{/* Error Details Box */}
				<div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 text-left">
					<p className="text-xs font-semibold text-red-900 uppercase tracking-wider mb-1">
						Common Reasons:
					</p>
					<ul className="text-sm text-red-800 space-y-1">
						<li>• Authentication code has expired</li>
						<li>• Invalid authentication code</li>
						<li>• Account verification failed</li>
						<li>• Session timeout occurred</li>
					</ul>
				</div>

				{/* Action Buttons */}
				<div className="flex flex-col gap-3 sm:gap-4">
					{/* Retry Sign In */}
					<Link
						href="/sign-in"
						className="w-full px-6 py-3 bg-[#b36619] text-[#f8f7f6] font-semibold uppercase tracking-wide rounded-md
            hover:bg-[#a0561f] transition-all duration-200 border border-[#b36619] text-center
            active:scale-95"
					>
						Try Signing In Again
					</Link>

					{/* Browse Products */}
					<Link
						href="/shop"
						className="w-full px-6 py-3 border-2 border-[#211911]/20 text-[#211911] font-semibold uppercase tracking-wide rounded-md
            hover:border-[#b36619] hover:text-[#b36619] transition-all duration-200 text-center
            active:scale-95"
					>
						Browse Our Fragrances
					</Link>

					{/* Go Home */}
					<Link
						href="/"
						className="w-full px-6 py-3 text-[#b36619] font-semibold uppercase tracking-wide rounded-md
            hover:bg-[#b36619]/8 transition-all duration-200 text-center
            active:scale-95"
					>
						Return to Home
					</Link>
				</div>

				{/* Support Link */}
				<div className="mt-8 pt-6 border-t border-[#211911]/10">
					<p className="text-xs text-[#211911]/50 mb-3">
						Still having trouble?
					</p>
					<button className="text-sm text-[#b36619] font-semibold hover:underline transition-colors">
						Contact Our Support Team
					</button>
				</div>
			</div>
		</div>
	);
}
