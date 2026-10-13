"use client";

import Script from "next/script";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { ResearchDeliveryIcon } from "@/components/icons/PortfolioIcons";

type FormState = "idle" | "submitting" | "success" | "error";

type TurnstileOptions = {
  sitekey: string;
  action?: string;
  appearance?: "always" | "execute" | "interaction-only";
  callback?: (token: string) => void;
  "error-callback"?: () => void;
  "expired-callback"?: () => void;
  "timeout-callback"?: () => void;
  size?: "normal" | "compact" | "flexible";
  theme?: "light" | "dark" | "auto";
};

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: TurnstileOptions) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId: string) => void;
    };
  }
}

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReady, setTurnstileReady] = useState(false);
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetIdRef = useRef<string | null>(null);
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const turnstileConfigured = Boolean(turnstileSiteKey);

  const renderTurnstile = useCallback(() => {
    if (
      !turnstileSiteKey ||
      !turnstileContainerRef.current ||
      !window.turnstile ||
      turnstileWidgetIdRef.current
    ) {
      return;
    }

    turnstileWidgetIdRef.current = window.turnstile.render(
      turnstileContainerRef.current,
      {
        sitekey: turnstileSiteKey,
        action: "newsletter_signup",
        appearance: "interaction-only",
        size: "flexible",
        theme: "auto",
        callback: (token) => {
          setTurnstileToken(token);
          setTurnstileReady(true);
        },
        "error-callback": () => {
          setTurnstileToken("");
          setTurnstileReady(false);
          setFormState("error");
          setMessage("The security check could not load. Please refresh and try again.");
        },
        "expired-callback": () => {
          setTurnstileToken("");
          setTurnstileReady(false);
        },
        "timeout-callback": () => {
          setTurnstileToken("");
          setTurnstileReady(false);
        },
      }
    );
  }, [turnstileSiteKey]);

  useEffect(() => {
    renderTurnstile();

    return () => {
      if (turnstileWidgetIdRef.current && window.turnstile) {
        window.turnstile.remove(turnstileWidgetIdRef.current);
        turnstileWidgetIdRef.current = null;
      }
    };
  }, [renderTurnstile]);

  const resetTurnstile = () => {
    setTurnstileToken("");
    setTurnstileReady(false);

    if (turnstileWidgetIdRef.current && window.turnstile) {
      window.turnstile.reset(turnstileWidgetIdRef.current);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!turnstileToken) {
      setFormState("error");
      setMessage("Please wait for the security check, then try again.");
      return;
    }

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
          turnstileToken,
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
    } finally {
      resetTurnstile();
    }
  };

  return (
    <div className="paper-panel flex flex-col p-6">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-decision-wash text-decision">
        <ResearchDeliveryIcon size={22} />
      </span>
      <h3 className="mt-5 text-xl leading-tight text-foreground">Occasional field notes</h3>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">New research, no noise.</p>

      {turnstileConfigured ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          onReady={renderTurnstile}
        />
      ) : null}

      <form onSubmit={handleSubmit} className="mt-auto flex flex-col gap-2 pt-6">
        <label htmlFor="newsletter-email" className="text-sm font-semibold text-muted-foreground">
          Email address
        </label>
        <div className="flex flex-col gap-2 sm:max-md:flex-row">
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
            aria-describedby="newsletter-status"
            className="paper-control min-w-0 flex-1 px-4 py-2.5 text-sm placeholder:text-muted-foreground disabled:cursor-wait disabled:opacity-65"
          />

          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label htmlFor="newsletter-website">Website</label>
            <input id="newsletter-website" type="text" name="website" tabIndex={-1} autoComplete="off" />
          </div>

          <button
            type="submit"
            disabled={formState === "submitting" || !turnstileReady || !turnstileConfigured}
            className="btn-primary text-sm disabled:cursor-wait disabled:opacity-60"
          >
            {formState === "submitting"
              ? "Subscribing…"
              : !turnstileConfigured
                ? "Unavailable"
              : turnstileReady
                ? "Subscribe"
                : "Checking…"}
          </button>
        </div>

        <div
          ref={turnstileContainerRef}
          className="min-h-0 w-full overflow-hidden empty:hidden"
          aria-label="Newsletter security check"
        />
      </form>

      <p
        id="newsletter-status"
        className={`mt-3 min-h-5 text-xs ${
          formState === "error"
            ? "text-danger"
            : formState === "success"
              ? "text-foreground"
              : "text-muted-foreground"
        }`}
        role={formState === "error" ? "alert" : "status"}
        aria-live="polite"
      >
        {message ||
          (turnstileConfigured
            ? "Confirmation required. Unsubscribe anytime."
            : "Newsletter signup is temporarily unavailable.")}
      </p>
    </div>
  );
}
