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
  "flex items-baseline justify-between gap-4 border-b border-border py-3 text-base text-foreground aria-[current=page]:underline aria-[current=page]:decoration-accent aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-8";

export default function FloatingNavWrapper() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const exploreMenuRef = useRef<HTMLDivElement>(null);
  const exploreButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  const closeMobileMenu = () => setMobileOpen(false);

  // Marks the page being viewed. Homepage anchors (/#about) are never current.
  const current = (link: string) =>
    pathname === link || pathname.startsWith(`${link}/`) ? "page" : undefined;

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (exploreMenuRef.current?.contains(event.target as Node)) return;
      setExploreOpen(false);
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setExploreOpen(false);
      setMobileOpen(false);
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
      <header className="fixed inset-x-0 top-0 z-[5001] h-16 border-b border-border bg-background">
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
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
                  <div id="desktop-explore-menu" className="absolute right-0 top-full z-20 w-64 pt-5">
                    <div className="paper-panel p-1 shadow-md" role="menu" aria-label="Explore more">
                      {exploreNavigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.link}
                          role="menuitem"
                          aria-current={current(item.link)}
                          onClick={() => setExploreOpen(false)}
                          className="block rounded px-3 py-2 hover:bg-muted aria-[current=page]:bg-muted"
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
                type="button"
                onClick={() => setMobileOpen((open) => !open)}
                className="flex size-10 items-center justify-center rounded-md text-foreground hover:bg-muted lg:hidden"
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
        <div id="mobile-navigation" className="fixed inset-x-0 bottom-0 top-16 z-[5000] overflow-y-auto bg-background lg:hidden">
          <nav aria-label="Mobile navigation" className="mx-auto max-w-6xl px-4 pb-8 pt-2 sm:px-6">
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
