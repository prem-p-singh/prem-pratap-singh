"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { exploreNavigation, primaryNavigation } from "@/profile/navigation";

const linkClass =
  "whitespace-nowrap text-sm text-muted-foreground underline-offset-8 hover:text-foreground hover:underline aria-[current=page]:text-foreground aria-[current=page]:underline aria-[current=page]:decoration-accent aria-[current=page]:decoration-2";

const mobileRowClass =
  "flex items-baseline justify-between gap-4 border-b border-border py-3 last:border-b-0 text-base text-foreground aria-[current=page]:underline aria-[current=page]:decoration-accent aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-8";

export default function FloatingNavWrapper() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const exploreMenuRef = useRef<HTMLDivElement>(null);
  const exploreButtonRef = useRef<HTMLButtonElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const closeMobileMenu = () => setMobileOpen(false);

  // Marks the page being viewed. Homepage anchors (/#about) are never current.
  const current = (link: string) =>
    pathname === link || pathname.startsWith(`${link}/`) ? "page" : undefined;

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!exploreMenuRef.current?.contains(target)) setExploreOpen(false);
      // The header holds the menu button, which toggles the mobile menu itself.
      if (!headerRef.current?.contains(target) && !mobileMenuRef.current?.contains(target)) {
        setMobileOpen(false);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      // The effect runs once, so read what is open from the buttons themselves.
      const exploreWasOpen = exploreButtonRef.current?.getAttribute("aria-expanded") === "true";
      const mobileWasOpen = mobileButtonRef.current?.getAttribute("aria-expanded") === "true";
      setExploreOpen(false);
      setMobileOpen(false);
      if (exploreWasOpen) exploreButtonRef.current?.focus();
      else if (mobileWasOpen) mobileButtonRef.current?.focus();
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
      {/* The fixed wrapper keeps the 4rem that pages reserve with pt-16. The pill
          floats inside it: a 0.75rem gap, then 3.25rem of pill. Clicks pass
          through the empty space on either side. */}
      <header ref={headerRef} className="pointer-events-none fixed inset-x-0 top-0 z-[5001] h-16 px-4 sm:px-6 lg:px-8">
        <div className="pointer-events-auto mx-auto mt-3 flex h-13 w-full items-center justify-between gap-6 rounded-full border border-border bg-card pl-5 pr-2 [box-shadow:var(--shadow-float)] lg:w-max lg:max-w-full lg:gap-8 lg:pl-6 lg:pr-3">
          <Link href="/" onClick={closeMobileMenu} className="shrink-0 text-foreground" aria-label="Prem P. Singh, home">
            <span className="block font-serif text-lg font-semibold leading-tight">Prem P. Singh</span>
            <span className="block text-xs leading-snug text-muted-foreground lg:hidden xl:block">
              Plant scientist · Data scientist
            </span>
          </Link>

          <div className="flex items-center gap-5">
            <nav aria-label="Primary navigation" className="hidden items-center gap-5 lg:flex">
              {primaryNavigation.map((item) => (
                <Link key={item.name} href={item.link} aria-current={current(item.link)} className={linkClass}>
                  {item.name}
                </Link>
              ))}

              <div ref={exploreMenuRef} className="relative">
                <button
                  ref={exploreButtonRef}
                  type="button"
                  onClick={() => setExploreOpen((open) => !open)}
                  className={`flex items-center gap-1 text-sm underline-offset-8 hover:text-foreground hover:underline ${
                    exploreOpen ? "text-foreground" : "text-muted-foreground"
                  }`}
                  aria-haspopup="menu"
                  aria-expanded={exploreOpen}
                  aria-controls="desktop-explore-menu"
                >
                  Explore
                  <ChevronDown className={`size-3.5 ${exploreOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                </button>
                {exploreOpen && (
                  <div id="desktop-explore-menu" className="absolute right-0 top-full z-20 w-64 pt-7">
                    <div className="paper-panel p-1.5" role="menu" aria-label="Explore more">
                      {exploreNavigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.link}
                          role="menuitem"
                          aria-current={current(item.link)}
                          onClick={() => setExploreOpen(false)}
                          className="block rounded-2xl px-3 py-2 hover:bg-muted aria-[current=page]:bg-muted"
                        >
                          <span className="block text-sm font-medium text-foreground">{item.name}</span>
                          <span className="block text-xs text-muted-foreground">{item.detail}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className={linkClass}>
                CV
              </a>
              <Link href="/#contact" className={linkClass}>
                Let&apos;s talk
              </Link>
            </nav>

            <div className="flex items-center gap-1">
              <ThemeToggle />
              <button
                ref={mobileButtonRef}
                type="button"
                onClick={() => setMobileOpen((open) => !open)}
                className="flex size-10 items-center justify-center rounded-full text-foreground hover:bg-muted lg:hidden"
                aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-navigation"
              >
                {mobileOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div id="mobile-navigation" ref={mobileMenuRef} className="fixed inset-x-4 top-18 z-[5000] sm:inset-x-6 lg:hidden">
          {/* Same surface as .paper-panel, written out because that class forces
              overflow: hidden and this list has to scroll on short screens. */}
          <nav
            aria-label="Mobile navigation"
            className="max-h-[calc(100dvh-5.5rem)] overflow-y-auto overscroll-contain rounded-[20px] border border-border bg-card px-5 py-2 [box-shadow:var(--shadow-float)]"
          >
            {primaryNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                aria-current={current(item.link)}
                onClick={closeMobileMenu}
                className={mobileRowClass}
              >
                {item.name}
              </Link>
            ))}
            {exploreNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                aria-current={current(item.link)}
                onClick={closeMobileMenu}
                className={mobileRowClass}
              >
                {item.name}
                <span className="text-xs text-muted-foreground">{item.detail}</span>
              </Link>
            ))}
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobileMenu}
              className={mobileRowClass}
            >
              Open CV
            </a>
            <Link href="/#contact" onClick={closeMobileMenu} className={mobileRowClass}>
              Let&apos;s talk
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
