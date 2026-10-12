"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const THEME_CHANGE_EVENT = "portfolio-theme-change";
let sessionTheme: Theme | null = null;

function getStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem("theme");
    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    // Blocked storage falls back to the light default.
    return null;
  }
}

function getResolvedTheme(): Theme {
  return sessionTheme ?? getStoredTheme() ?? "light";
}

function applyTheme(theme: Theme) {
  const light = theme === "light";
  document.documentElement.classList.toggle("light", light);
  document.documentElement.style.colorScheme = theme;
}

function getThemeSnapshot() {
  return document.documentElement.classList.contains("light");
}

function getServerThemeSnapshot() {
  return true;
}

function subscribeToTheme(onChange: () => void) {
  const syncTheme = () => {
    applyTheme(getResolvedTheme());
    onChange();
  };

  const syncStoredTheme = () => {
    sessionTheme = null;
    syncTheme();
  };

  syncTheme();
  window.addEventListener("storage", syncStoredTheme);
  window.addEventListener(THEME_CHANGE_EVENT, syncTheme);

  return () => {
    window.removeEventListener("storage", syncStoredTheme);
    window.removeEventListener(THEME_CHANGE_EVENT, syncTheme);
  };
}

export default function ThemeToggle() {
  const isLight = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot
  );

  const toggleTheme = () => {
    const nextTheme: Theme = isLight ? "dark" : "light";
    sessionTheme = nextTheme;
    try {
      localStorage.setItem("theme", nextTheme);
    } catch {
      // The visual toggle still works when storage is unavailable.
    }
    applyTheme(nextTheme);
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-decision-wash hover:text-decision"
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
    >
      {isLight ? (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      ) : (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      )}
    </button>
  );
}
