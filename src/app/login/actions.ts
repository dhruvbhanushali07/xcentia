// src/app/login/actions.ts (or wherever you put it)
"use server"
import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";
import { z } from "zod";

// Define a Zod schema for validating the form data
const SignUpSchema = z.object({
	email: z.email("Please enter a valid email address"),
	password: z.string().min(6, "Password must be at least 6 characters long"),
});

export async function signUpAction(prevState: any, formData: FormData) {
    const parseResult = SignUpSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (!parseResult.success) {
        // We return an object with a 'validationErrors' property to keep it organized
        return { validationErrors: parseResult.error.flatten().fieldErrors }; 
    }

    const { email, password } = parseResult.data;
    const supabase = await createClient();
    const origin = (await headers()).get("origin");

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${origin}/auth/confirm`, // Redirect to this URL after email confirmation
        },
    });

    if (error) {
        // Return Supabase errors
        return { serverError: error.message };
    }

    return { success: true };
}

// Sign In Schema
const SignInSchema = z.object({
	email: z.email("Please enter a valid email address"),
	password: z.string().min(1, "Password is required"),
});

export async function signInAction(prevState: any, formData: FormData) {
	const parseResult = SignInSchema.safeParse({
		email: formData.get("email"),
		password: formData.get("password"),
	});

	if (!parseResult.success) {
		return { validationErrors: parseResult.error.flatten().fieldErrors };
	}

	const { email, password } = parseResult.data;
	const supabase = await createClient();

	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		return { serverError: error.message };
	}

	return { success: true };
}
