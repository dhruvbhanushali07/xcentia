"use client";

// app/b2b/_components/B2BEnquiryForm.tsx
// Standalone client island — all form state lives here
// Plug in your email/Supabase submission logic in handleSubmit

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const OCCASIONS = [
  "Diwali Hampers",
  "Employee Onboarding",
  "Client Appreciation",
  "Corporate Event",
  "Wedding Favours",
  "Retail / Reselling",
  "White Label",
  "Other",
];

interface FormData {
  company: string;
  name: string;
  phone: string;
  email: string;
  occasion: string;
  quantity: string;
  deadline: string;
  message: string;
}

const EMPTY: FormData = {
  company: "",
  name: "",
  phone: "",
  email: "",
  occasion: "",
  quantity: "",
  deadline: "",
  message: "",
};

export default function B2BEnquiryForm() {
  const [form, setForm] = useState<FormData>(EMPTY);
  const [status, setStatus] = useState<Status>("idle");

  function set(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    // ── Plug in your submission logic here ─────────────────────────────
    // Option A: Supabase insert
    // const { error } = await supabase.from("b2b_enquiries").insert([form]);
    //
    // Option B: email via Resend / Nodemailer API route
    // await fetch("/api/b2b-enquiry", { method: "POST", body: JSON.stringify(form) });
    // ───────────────────────────────────────────────────────────────────

    // Simulated delay for now
    await new Promise((r) => setTimeout(r, 1200));

    setStatus("success");
    setForm(EMPTY);
  }

  const inputClass = `w-full bg-transparent border-b border-[#f8f7f6]/12 py-3 text-[13px] font-light
    text-[#f8f7f6] placeholder:text-[#f8f7f6]/20 focus:outline-none focus:border-[#b36619]
    transition-colors duration-200`;

  const labelClass = "text-[9px] font-bold uppercase tracking-[0.35em] text-[#f8f7f6]/30 block mb-2";

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-5 py-16 border border-[#b36619]/20 px-10">
        <div className="w-10 h-10 flex items-center justify-center border border-[#b36619]/30 text-[#b36619]">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <h3
            className="font-light text-[#f8f7f6] text-[28px] leading-tight mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Enquiry Received.
          </h3>
          <p className="text-[13px] font-light text-[#f8f7f6]/40 leading-relaxed max-w-sm">
            We'll review your requirement and get back within 48 hours with a
            sample kit and pricing. Check your inbox — or WhatsApp if you're in a hurry.
          </p>
        </div>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-[10px] font-bold uppercase tracking-[0.25em] text-[#b36619]
                     hover:text-[#f8f7f6] transition-colors duration-200"
        >
          Submit Another Enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      {/* Row 1 — company + contact name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className={labelClass}>Company / Organisation *</label>
          <input
            type="text"
            required
            placeholder="Tata Consultancy Services"
            value={form.company}
            onChange={(e) => set("company", e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Your Name *</label>
          <input
            type="text"
            required
            placeholder="Rahul Sharma"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {/* Row 2 — phone + email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className={labelClass}>Phone *</label>
          <input
            type="tel"
            required
            placeholder="+91 98765 43210"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Email *</label>
          <input
            type="email"
            required
            placeholder="rahul@company.com"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {/* Row 3 — occasion */}
      <div>
        <label className={labelClass}>Occasion / Purpose *</label>
        <div className="flex flex-wrap gap-2 mt-1">
          {OCCASIONS.map((occ) => (
            <button
              key={occ}
              type="button"
              onClick={() => set("occasion", occ)}
              className={`px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] border
                transition-all duration-200
                ${form.occasion === occ
                  ? "border-[#b36619] bg-[#b36619]/15 text-[#b36619]"
                  : "border-[#f8f7f6]/12 text-[#f8f7f6]/35 hover:border-[#f8f7f6]/30 hover:text-[#f8f7f6]/70"
                }`}
            >
              {occ}
            </button>
          ))}
        </div>
      </div>

      {/* Row 4 — quantity + deadline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className={labelClass}>Approximate Quantity *</label>
          <select
            required
            value={form.quantity}
            onChange={(e) => set("quantity", e.target.value)}
            className={`${inputClass} cursor-pointer`}
          >
            <option value="" disabled>Select range</option>
            <option value="25-50">25 – 50 units</option>
            <option value="50-100">50 – 100 units</option>
            <option value="100-200">100 – 200 units</option>
            <option value="200-500">200 – 500 units</option>
            <option value="500+">500+ units</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Required By</label>
          <input
            type="date"
            value={form.deadline}
            onChange={(e) => set("deadline", e.target.value)}
            className={`${inputClass} [color-scheme:dark]`}
          />
        </div>
      </div>

      {/* Row 5 — message */}
      <div>
        <label className={labelClass}>Additional Requirements</label>
        <textarea
          rows={3}
          placeholder="Custom packaging, specific scents, branding requirements, budget range..."
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Submit */}
      <div className="flex items-center gap-5 pt-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className={`inline-flex items-center gap-3 px-8 py-4 text-[10px] font-bold uppercase
            tracking-[0.3em] text-white transition-colors duration-300
            ${status === "submitting"
              ? "bg-[#211911]/60 cursor-default"
              : "bg-[#b36619] hover:bg-[#f8f7f6] hover:text-[#211911] cursor-pointer"
            }`}
        >
          {status === "submitting" ? (
            <>
              <div className="w-3.5 h-3.5 border border-white/30 border-t-white rounded-full animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send Enquiry
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </>
          )}
        </button>
        <p className="text-[10px] font-light text-[#f8f7f6]/25 leading-relaxed">
          No spam. We only reach out about your enquiry.
        </p>
      </div>

    </form>
  );
}