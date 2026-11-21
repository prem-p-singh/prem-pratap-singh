"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { exploreNavigation, primaryNavigation } from "@/profile/navigation";

// One weight across states: the state is a colour and an underline, never a fill.
const linkClass =
  "whitespace-nowrap text-sm font-medium text-ink-2 no-underline underline-offset-8 hover:text-ink aria-[current=page]:text-ink aria-[current=page]:underline aria-[current=page]:decoration-accent aria-[current=page]:decoration-2";

const mobileRowClass =
  "flex min-h-12 items-baseline justify-between gap-4 border-b border-rule py-3 text-base text-ink no-underline last:border-b-0 aria-[current=page]:underline aria-[current=page]:decoration-accent aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-8";

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
      {/* One bar across the full width, on the lower paper with a hairline
          under it. It fills the 4rem that every page reserves with pt-16. */}
      <header ref={headerRef} className="fixed inset-x-0 top-0 z-[300] h-16 border-b border-rule bg-paper-2">
        <div className="shell flex h-full items-center justify-between gap-6 lg:gap-8">
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="flex shrink-0 items-center gap-2 text-ink no-underline"
            aria-label="Prem P. Singh, home"
          >
            {/* The mark is white on clear; the bar's dark paper carries it. */}
            <Image src="/images/logo-mark.png" alt="" width={36} height={36} className="size-9" priority />
            <span className="font-display text-xl leading-none">Prem P. Singh</span>
          </Link>

          <div className="flex items-center gap-5">
            <nav aria-label="Primary navigation" className="hidden items-center gap-7 lg:flex">
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
                  className={`flex items-center gap-1 text-sm font-medium hover:text-ink ${
                    exploreOpen ? "text-ink" : "text-ink-2"
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
                    <div className="border border-rule bg-paper-2 p-2" role="menu" aria-label="Explore more">
                      {exploreNavigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.link}
                          role="menuitem"
                          aria-current={current(item.link)}
                          onClick={() => setExploreOpen(false)}
                          className="block px-3 py-2 no-underline hover:bg-paper-3 aria-[current=page]:bg-paper-3"
                        >
                          <span className="block text-sm font-medium text-ink">{item.name}</span>
                          <span className="block text-xs text-muted">{item.detail}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <a href="/Prem_Pratap_Singh_Resume.pdf" target="_blank" rel="noopener noreferrer" className={linkClass}>
                CV
              </a>
              <Link
                href="/#contact"
                className="inline-flex h-10 items-center whitespace-nowrap rounded-full bg-accent px-5 text-sm font-bold text-accent-ink no-underline hover:bg-accent-2"
              >
                Let&apos;s talk
              </Link>
            </nav>

            <div className="flex items-center gap-1">
              <button
                ref={mobileButtonRef}
                type="button"
                onClick={() => setMobileOpen((open) => !open)}
                className="flex size-10 items-center justify-center rounded-full text-ink hover:bg-paper-3 lg:hidden"
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
        <div id="mobile-navigation" ref={mobileMenuRef} className="fixed inset-x-4 top-18 z-[300] sm:inset-x-6 lg:hidden">
          {/* A ruled sheet on the lower paper; it scrolls on short screens. */}
          <nav
            aria-label="Mobile navigation"
            className="max-h-[calc(100dvh-5.5rem)] overflow-y-auto overscroll-contain border border-rule bg-paper-2 px-5 py-2"
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
                <span className="text-xs text-muted">{item.detail}</span>
              </Link>
            ))}
            <a
              href="/Prem_Pratap_Singh_Resume.pdf"
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
