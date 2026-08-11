"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const primaryItems = [
  { name: "About", link: "/#about" },
  { name: "Research", link: "/#publications" },
  { name: "Projects", link: "/#projects" },
  { name: "Writing", link: "/blog" },
  { name: "Data", link: "/data" },
  { name: "Journey", link: "/journey" },
];

const exploreItems = [
  { name: "Skills", detail: "Methods I use", link: "/#skills" },
  { name: "Experience", detail: "Roles and research", link: "/#experience" },
  { name: "Methods", detail: "Technical explainers", link: "/methods" },
  { name: "Gallery", detail: "Field and laboratory", link: "/gallery" },
];

export default function FloatingNavWrapper() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-[5001] hidden px-4 lg:block">
        <nav
          aria-label="Primary navigation"
          className="mx-auto flex max-w-7xl items-center gap-3 rounded-2xl border border-border bg-card/90 px-3 py-2 shadow-[0_18px_60px_-32px_rgba(0,0,0,0.75)] backdrop-blur-xl"
        >
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-3 rounded-xl px-2 py-2 text-foreground"
            aria-label="Prem P. Singh, home"
          >
            <span className="flex size-9 items-center justify-center rounded-xl border border-emerald-400/35 bg-emerald-400/10 text-sm font-bold tracking-tight text-emerald-500 dark:text-emerald-300">
              PS
            </span>
            <span className="leading-snug">
              <span className="block text-sm font-semibold">Prem P. Singh</span>
              <span className="block text-[11px] font-medium text-muted-foreground">Plant scientist · Data scientist</span>
            </span>
          </Link>

          <span className="h-8 w-px shrink-0 bg-border" aria-hidden="true" />

          <div className="flex min-w-0 flex-1 items-center justify-center gap-0.5">
            {primaryItems.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                className="whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {item.name}
              </Link>
            ))}

            <div className="group relative">
              <button
                type="button"
                className="flex items-center gap-1 rounded-lg px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors group-hover:bg-muted group-hover:text-foreground group-focus-within:bg-muted group-focus-within:text-foreground"
                aria-haspopup="menu"
              >
                Explore
                <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" aria-hidden="true" />
              </button>
              <div className="invisible absolute left-1/2 top-full z-20 w-64 -translate-x-1/2 pt-3 opacity-0 transition-[opacity,visibility] group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="rounded-2xl border border-border bg-card p-2 shadow-2xl" role="menu">
                  {exploreItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.link}
                      role="menuitem"
                      className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-muted focus:bg-muted focus:outline-none"
                    >
                      <span className="block text-sm font-semibold text-foreground">{item.name}</span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">{item.detail}</span>
                    </Link>
                  ))}
                </div>
              </div>
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
              className="rounded-xl bg-foreground px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-85"
            >
              Let&apos;s talk
            </Link>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <header className="fixed inset-x-0 top-0 z-[5001] border-b border-border/70 bg-background/90 px-4 backdrop-blur-xl lg:hidden">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" onClick={closeMobileMenu} className="flex items-center gap-3 text-foreground">
            <span className="flex size-9 items-center justify-center rounded-xl border border-emerald-400/35 bg-emerald-400/10 text-sm font-bold text-emerald-500 dark:text-emerald-300">PS</span>
            <span>
              <span className="block text-sm font-semibold leading-tight">Prem P. Singh</span>
              <span className="block text-[10px] font-medium leading-snug text-muted-foreground">Plant scientist · Data scientist</span>
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
        <div id="mobile-navigation" className="fixed inset-0 z-[5000] bg-background/95 px-4 pb-6 pt-20 backdrop-blur-xl lg:hidden">
          <nav aria-label="Mobile navigation" className="mx-auto flex h-full max-w-lg flex-col overflow-y-auto rounded-3xl border border-border bg-card p-5">
            <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Navigate</p>
            <div className="mt-3 grid grid-cols-2 gap-1">
              {primaryItems.map((item) => (
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
              <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Explore more</p>
              <div className="mt-3 space-y-1">
                {exploreItems.map((item) => (
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
                className="rounded-xl border border-border px-4 py-3 text-center text-sm font-semibold text-foreground"
              >
                Open CV
              </a>
              <Link
                href="/#contact"
                onClick={closeMobileMenu}
                className="rounded-xl bg-foreground px-4 py-3 text-center text-sm font-semibold text-background"
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
