"use client";

import { FormEvent, useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormState("submitting");
    setMessage("");

    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          website: form.get("website"),
        }),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "We could not save your subscription.");
      }

      setEmail("");
      setMessage(result.message || "Check your inbox to confirm your subscription.");
      setFormState("success");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Please try again soon.");
      setFormState("error");
    }
  };

  return (
    <div className="paper-panel bg-card p-5">
      <div className="mb-4">
        <p className="font-bold text-foreground">Occasional field notes</p>
        <p className="mt-1 text-xs text-muted-foreground">New research, no noise.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">Email address</label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="your@email.com"
          autoComplete="email"
          required
          disabled={formState === "submitting"}
          className="paper-control min-w-0 flex-1 bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-field focus:outline-none disabled:cursor-wait disabled:opacity-65"
        />

        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor="newsletter-website">Website</label>
          <input id="newsletter-website" type="text" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <button
          type="submit"
          disabled={formState === "submitting"}
          className="paper-button px-5 py-2.5 text-sm font-semibold disabled:cursor-wait disabled:opacity-60"
        >
          {formState === "submitting" ? "Subscribing…" : "Subscribe"}
        </button>
      </form>

      <p
        className={`mt-3 min-h-5 text-xs ${
          formState === "error"
            ? "text-danger"
            : formState === "success"
              ? "text-field"
              : "text-muted-foreground"
        }`}
        role={formState === "error" ? "alert" : "status"}
        aria-live="polite"
      >
        {message || "Confirmation required. Unsubscribe anytime."}
      </p>
    </div>
  );
}
