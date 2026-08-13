"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { MovingBorder } from "@/components/ui/moving-border";
import { exploreNavigation, primaryNavigation } from "@/profile/navigation";

export default function FloatingNavWrapper() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const exploreMenuRef = useRef<HTMLDivElement>(null);
  const exploreButtonRef = useRef<HTMLButtonElement>(null);

  const closeMobileMenu = () => setMobileOpen(false);

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (exploreMenuRef.current?.contains(event.target as Node)) return;
      setExploreOpen(false);
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setExploreOpen(false);
      exploreButtonRef.current?.focus();
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-[5001] hidden px-4 xl:block">
        <div className="relative mx-auto max-w-7xl">
          <div className="nav-moving-border" aria-hidden="true">
            <MovingBorder duration={12000} rx="24" ry="24">
              <div className="nav-shine-orb" />
            </MovingBorder>
          </div>

          <nav
            aria-label="Primary navigation"
            className="paper-panel flex items-center gap-3 !overflow-visible bg-card/95 px-3 py-2 backdrop-blur-xl"
          >
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-3 rounded-xl px-2 py-2 text-foreground"
            aria-label="Prem P. Singh, home"
          >
            <span className="flex size-9 items-center justify-center rounded-xl border border-field/35 bg-field-wash text-sm font-bold tracking-tight text-field">
              PS
            </span>
            <span className="leading-snug">
              <span className="block text-sm font-semibold">Prem P. Singh</span>
              <span className="block text-xs font-medium text-muted-foreground">Plant scientist · Data scientist</span>
            </span>
          </Link>

          <span className="h-8 w-px shrink-0 bg-border" aria-hidden="true" />

          <div className="flex min-w-0 flex-1 items-center justify-center gap-0.5">
            {primaryNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                className="whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-field-wash hover:text-field"
              >
                {item.name}
              </Link>
            ))}

            <div ref={exploreMenuRef} className="relative">
              <button
                ref={exploreButtonRef}
                type="button"
                onClick={() => setExploreOpen((open) => !open)}
                className={`flex items-center gap-1 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors ${
                  exploreOpen
                    ? "bg-field-wash text-field"
                    : "text-muted-foreground hover:bg-field-wash hover:text-field"
                }`}
                aria-haspopup="menu"
                aria-expanded={exploreOpen}
                aria-controls="desktop-explore-menu"
              >
                Explore
                <ChevronDown className={`size-3.5 transition-transform ${exploreOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
              {exploreOpen && (
                <div id="desktop-explore-menu" className="absolute left-1/2 top-full z-20 w-64 -translate-x-1/2 pt-3">
                  <div className="paper-panel bg-card p-2 shadow-2xl" role="menu" aria-label="Explore more">
                    {exploreNavigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.link}
                        role="menuitem"
                        onClick={() => setExploreOpen(false)}
                        className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-field-wash focus:bg-field-wash focus:outline-none"
                      >
                        <span className="block text-sm font-semibold text-foreground">{item.name}</span>
                        <span className="mt-0.5 block text-xs text-muted-foreground">{item.detail}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <span className="h-8 w-px shrink-0 bg-border" aria-hidden="true" />

          <div className="flex shrink-0 items-center gap-1">
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              CV
            </a>
            <Link
              href="/#contact"
              className="paper-button px-4 py-2 text-sm font-semibold"
            >
              Let&apos;s talk
            </Link>
            <ThemeToggle />
          </div>
          </nav>
        </div>
      </header>

      <header className="fixed inset-x-0 top-0 z-[5001] border-b border-border/70 bg-background/90 px-4 backdrop-blur-xl xl:hidden">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" onClick={closeMobileMenu} className="flex items-center gap-3 text-foreground">
            <span className="flex size-9 items-center justify-center rounded-xl border border-field/35 bg-field-wash text-sm font-bold text-field">PS</span>
            <span>
              <span className="block text-sm font-semibold leading-tight">Prem P. Singh</span>
              <span className="block text-xs font-medium leading-snug text-muted-foreground">Plant scientist · Data scientist</span>
            </span>
          </Link>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="flex size-10 items-center justify-center rounded-xl text-foreground transition-colors hover:bg-muted"
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              {mobileOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div id="mobile-navigation" className="fixed inset-0 z-[5000] bg-background/95 px-4 pb-6 pt-20 backdrop-blur-xl xl:hidden">
          <nav aria-label="Mobile navigation" className="paper-panel mx-auto flex h-full max-w-lg flex-col overflow-y-auto bg-card p-5">
            <p className="px-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Navigate</p>
            <div className="mt-3 grid grid-cols-2 gap-1">
              {primaryNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.link}
                  onClick={closeMobileMenu}
                  className="rounded-xl px-3 py-3 text-base font-semibold text-foreground transition-colors hover:bg-muted"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="mt-6 border-t border-border pt-5">
              <p className="px-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Explore more</p>
              <div className="mt-3 space-y-1">
                {exploreNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.link}
                    onClick={closeMobileMenu}
                    className="flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors hover:bg-muted"
                  >
                    <span className="font-semibold text-foreground">{item.name}</span>
                    <span className="text-xs text-muted-foreground">{item.detail}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-auto grid grid-cols-2 gap-3 border-t border-border pt-5">
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
                className="paper-button px-4 py-3 text-center text-sm font-semibold"
              >
                Open CV
              </a>
              <Link
                href="/#contact"
                onClick={closeMobileMenu}
                className="paper-button px-4 py-3 text-center text-sm font-semibold"
              >
                Let&apos;s talk
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
