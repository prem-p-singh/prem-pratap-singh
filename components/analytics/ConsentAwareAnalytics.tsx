"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MicrosoftClarity from "@/components/analytics/MicrosoftClarity";

const CONSENT_KEY = "analytics-consent-v1";
const OPEN_CONSENT_EVENT = "open-analytics-consent";

type Consent = "granted" | "denied" | "unknown";

function clearClarityCookies() {
  for (const name of ["_clck", "_clsk"]) {
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
  }
}

export default function ConsentAwareAnalytics() {
  const [consent, setConsent] = useState<Consent>("unknown");
  const [ready, setReady] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(CONSENT_KEY);
    const restoreConsent = window.setTimeout(() => {
      if (saved === "granted" || saved === "denied") setConsent(saved);
      setReady(true);
    }, 0);

    const openPreferences = () => setPreferencesOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, openPreferences);
    return () => {
      window.clearTimeout(restoreConsent);
      window.removeEventListener(OPEN_CONSENT_EVENT, openPreferences);
    };
  }, []);

  function saveConsent(nextConsent: Exclude<Consent, "unknown">) {
    const stopActiveAnalytics = consent === "granted" && nextConsent === "denied";
    window.localStorage.setItem(CONSENT_KEY, nextConsent);
    setConsent(nextConsent);
    setPreferencesOpen(false);
    if (nextConsent === "denied") {
      clearClarityCookies();
      if (stopActiveAnalytics) window.location.reload();
    }
  }

  const showChoices = ready && (consent === "unknown" || preferencesOpen);

  return (
    <>
      {consent === "granted" && <MicrosoftClarity />}

      {showChoices && (
        <aside
          className="fixed inset-x-3 bottom-3 z-[6000] mx-auto max-w-3xl rounded-2xl border border-border bg-card/95 p-4 shadow-2xl backdrop-blur-xl sm:bottom-5 sm:p-5"
          role="dialog"
          aria-modal="false"
          aria-labelledby="analytics-consent-title"
          aria-describedby="analytics-consent-description"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <p id="analytics-consent-title" className="font-bold text-foreground">
                Your privacy, your choice
              </p>
              <p id="analytics-consent-description" className="mt-1 text-sm leading-relaxed text-muted-foreground">
                This site can use Microsoft Clarity to understand page navigation and improve the portfolio. Analytics stays off unless you allow it. Read the{" "}
                <Link href="/privacy" className="font-semibold text-primary hover:underline">
                  privacy notice
                </Link>
                .
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <button
                type="button"
                onClick={() => saveConsent("denied")}
                className="paper-button px-4 py-2.5 text-sm font-semibold"
              >
                Necessary only
              </button>
              <button
                type="button"
                onClick={() => saveConsent("granted")}
                className="rounded-xl bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-85"
              >
                Allow analytics
              </button>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}

export { OPEN_CONSENT_EVENT };
