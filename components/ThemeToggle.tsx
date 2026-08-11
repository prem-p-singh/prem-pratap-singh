"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const THEME_CHANGE_EVENT = "portfolio-theme-change";
const DAY_START_HOUR = 7;
const NIGHT_START_HOUR = 19;

function getStoredTheme(): Theme | null {
  const stored = localStorage.getItem("theme");
  return stored === "light" || stored === "dark" ? stored : null;
}

function getAutomaticTheme(): Theme {
  const hour = new Date().getHours();
  const isNight = hour < DAY_START_HOUR || hour >= NIGHT_START_HOUR;
  const devicePrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  return devicePrefersDark || isNight ? "dark" : "light";
}

function getResolvedTheme(): Theme {
  return getStoredTheme() ?? getAutomaticTheme();
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
  return false;
}

function subscribeToTheme(onChange: () => void) {
  const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");

  const syncTheme = () => {
    const wasLight = getThemeSnapshot();
    applyTheme(getResolvedTheme());

    if (wasLight !== getThemeSnapshot()) onChange();
  };

  syncTheme();
  colorScheme.addEventListener("change", syncTheme);
  window.addEventListener("storage", syncTheme);
  window.addEventListener(THEME_CHANGE_EVENT, syncTheme);

  // Recheck local time so the automatic theme changes at the day/night boundary
  // without requiring a reload.
  const clock = window.setInterval(syncTheme, 60_000);

  return () => {
    colorScheme.removeEventListener("change", syncTheme);
    window.removeEventListener("storage", syncTheme);
    window.removeEventListener(THEME_CHANGE_EVENT, syncTheme);
    window.clearInterval(clock);
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
    localStorage.setItem("theme", nextTheme);
    applyTheme(nextTheme);
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      title="Theme follows your device and local time until you choose one"
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
