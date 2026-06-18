"use client";

import React, { useActionState, useEffect, useState } from "react";
import { signUpAction, signInAction } from "../login/actions";
import { useRouter } from "next/navigation";
type Props = {
	isSignUpMode: boolean;
	setIsSignUpMode: (v: boolean) => void;
	formAction: any;
	state: any;
	isPending: boolean;
	signInFormAction: any;
	signInState: any;
	isSignInPending: boolean;
};

export default function LoginSignupForm() {
	const [isSignUpMode, setIsSignUpMode] = useState(true);
	const [state, formAction, isPending] = useActionState(signUpAction, null);
	const [signInState, signInFormAction, isSignInPending] = useActionState(
		signInAction,
		null,
	);

	const router = useRouter();

	// after signInState.success:
	useEffect(() => {
		if (signInState?.success) {
			router.refresh(); // ← this is the key
		}
	}, [signInState?.success]);
	return (
		<>
			{isSignUpMode ? (
				<>
					<div className="mb-8">
						<h2
							className="text-3xl font-light text-[#211911] mb-2"
							style={{
								fontFamily: "'Cormorant Garamond', serif",
							}}
						>
							Create Account
						</h2>
						<p className="text-[#211911]/60 text-sm">
							Join us to explore premium fragrances
						</p>
					</div>

					<form className="space-y-4" action={formAction}>
						{state?.serverError && (
							<div className="p-3 bg-red-50 text-red-600 text-sm rounded-md">
								{state.serverError}
							</div>
						)}
						{state?.success && (
							<div className="p-3 bg-green-50 text-green-700 text-sm rounded-md">
								Check your email to confirm your account!
							</div>
						)}

						<div>
							<label className="block text-xs font-semibold uppercase tracking-wider text-[#211911]/70 mb-2">
								Email Address
							</label>
							<input
								type="email"
								name="email"
								placeholder="you@example.com"
								className={`w-full px-4 py-3 border rounded-md bg-white text-[#211911] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#b36619] ${state?.validationErrors?.email ? "border-red-500" : "border-[#211911]/15"}`}
							/>
							{state?.validationErrors?.email && (
								<p className="text-red-500 text-xs mt-1">
									{state.validationErrors.email[0]}
								</p>
							)}
						</div>

						<div>
							<label className="block text-xs font-semibold uppercase tracking-wider text-[#211911]/70 mb-2">
								Password
							</label>
							<input
								type="password"
								name="password"
								placeholder="••••••••"
								className={`w-full px-4 py-3 border rounded-md bg-white text-[#211911] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#b36619] ${state?.validationErrors?.password ? "border-red-500" : "border-[#211911]/15"}`}
							/>
							{state?.validationErrors?.password && (
								<p className="text-red-500 text-xs mt-1">
									{state.validationErrors.password[0]}
								</p>
							)}
						</div>

						<button
							type="submit"
							disabled={isPending}
							className="w-full px-4 py-3 bg-[#b36619] text-[#f8f7f6] font-semibold uppercase tracking-wide rounded-md hover:bg-[#a0561f] transition-all duration-200 mt-6 border border-[#b36619] disabled:opacity-50"
						>
							{isPending ? "Signing Up..." : "Sign Up"}
						</button>
					</form>

					<div className="flex items-center gap-3 my-6">
						<div className="flex-1 h-px bg-[#211911]/10"></div>
						<span className="text-xs text-[#211911]/50 uppercase tracking-wider">
							Or
						</span>
						<div className="flex-1 h-px bg-[#211911]/10"></div>
					</div>

					<button
						type="button"
						className="w-full px-4 py-3 border-2 border-[#211911]/20 bg-white text-[#211911] font-semibold uppercase tracking-wide rounded-md hover:border-[#b36619] hover:bg-[#b36619]/4 transition-all duration-200 flex items-center justify-center gap-3"
					>
						Sign up with Google
					</button>

					<p className="text-center text-sm text-[#211911]/60 mt-6">
						Already have an account?{" "}
						<button
							type="button"
							onClick={() => setIsSignUpMode(false)}
							className="text-[#b36619] font-semibold hover:underline"
						>
							Sign In
						</button>
					</p>
				</>
			) : (
				<>
					<div className="mb-8">
						<h2
							className="text-3xl font-light text-[#211911] mb-2"
							style={{
								fontFamily: "'Cormorant Garamond', serif",
							}}
						>
							Welcome Back
						</h2>
						<p className="text-[#211911]/60 text-sm">
							Sign in to your account to continue shopping
						</p>
					</div>

					<form className="space-y-4" action={signInFormAction}>
						{signInState?.serverError && (
							<div className="p-3 bg-red-50 text-red-600 text-sm rounded-md">
								{signInState.serverError}
							</div>
						)}
						{signInState?.success && (
							<div className="p-3 bg-green-50 text-green-700 text-sm rounded-md">
								Successfully signed in!
							</div>
						)}

						<div>
							<label className="block text-xs font-semibold uppercase tracking-wider text-[#211911]/70 mb-2">
								Email Address
							</label>
							<input
								type="email"
								name="email"
								placeholder="you@example.com"
								className={`w-full px-4 py-3 border rounded-md bg-white text-[#211911] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#b36619] ${signInState?.validationErrors?.email ? "border-red-500" : "border-[#211911]/15"}`}
							/>
							{signInState?.validationErrors?.email && (
								<p className="text-red-500 text-xs mt-1">
									{signInState.validationErrors.email[0]}
								</p>
							)}
						</div>

						<div>
							<label className="block text-xs font-semibold uppercase tracking-wider text-[#211911]/70 mb-2">
								Password
							</label>
							<input
								type="password"
								name="password"
								placeholder="••••••••"
								className={`w-full px-4 py-3 border rounded-md bg-white text-[#211911] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#b36619] ${signInState?.validationErrors?.password ? "border-red-500" : "border-[#211911]/15"}`}
							/>
							{signInState?.validationErrors?.password && (
								<p className="text-red-500 text-xs mt-1">
									{signInState.validationErrors.password[0]}
								</p>
							)}
						</div>

						<button
							type="submit"
							disabled={isSignInPending}
							className="w-full px-4 py-3 bg-[#b36619] text-[#f8f7f6] font-semibold uppercase tracking-wide rounded-md hover:bg-[#a0561f] transition-all duration-200 mt-6 border border-[#b36619] disabled:opacity-50"
						>
							{isSignInPending ? "Signing In..." : "Sign In"}
						</button>
					</form>

					<div className="flex items-center gap-3 my-6">
						<div className="flex-1 h-px bg-[#211911]/10"></div>
						<span className="text-xs text-[#211911]/50 uppercase tracking-wider">
							Or
						</span>
						<div className="flex-1 h-px bg-[#211911]/10"></div>
					</div>

					<button
						type="button"
						className="w-full px-4 py-3 border-2 border-[#211911]/20 bg-white text-[#211911] font-semibold uppercase tracking-wide rounded-md hover:border-[#b36619] hover:bg-[#b36619]/4 transition-all duration-200 flex items-center justify-center gap-3"
					>
						Sign in with Google
					</button>

					<p className="text-center text-sm text-[#211911]/60 mt-6">
						Don't have an account?{" "}
						<button
							type="button"
							onClick={() => setIsSignUpMode(true)}
							className="text-[#b36619] font-semibold hover:underline"
						>
							Sign Up
						</button>
					</p>
				</>
			)}
		</>
	);
}
