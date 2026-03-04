"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { MovingBorder } from "@/components/ui/moving-border";

const navItems = [
  { name: "About", link: "/#about" },
  { name: "Experience", link: "/#experience" },
  { name: "Publications", link: "/#publications" },
  { name: "Projects", link: "/#projects" },
  { name: "Blog", link: "/blog" },
  { name: "Contact", link: "/#contact" },
];

export default function FloatingNavWrapper() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop: Dock-style floating pill nav with moving border */}
      <header className="fixed top-4 inset-x-0 z-[5001] hidden sm:flex justify-center px-4">
        <div
          className="relative bg-transparent p-[1px] overflow-hidden"
          style={{ borderRadius: "1rem" }}
        >
          {/* Animated glowing border */}
          <div
            className="absolute inset-0"
            style={{ borderRadius: "calc(1rem * 0.96)" }}
          >
            <MovingBorder duration={4000} rx="30%" ry="30%">
              <div className="h-20 w-20 opacity-[0.8] bg-[radial-gradient(var(--foreground)_40%,transparent_60%)]" />
            </MovingBorder>
          </div>

          {/* Nav content */}
          <nav
            className="relative flex items-center gap-0.5 bg-[var(--muted)]/80 backdrop-blur-xl border border-[var(--border)] px-1.5 py-1.5 shadow-lg"
            style={{ borderRadius: "calc(1rem * 0.96)" }}
          >
            {/* Brand */}
            <Link
              href="/"
              className="px-2.5 py-1 text-xs font-bold text-[var(--foreground)] hover:bg-[var(--background)]/60 rounded-lg transition-colors whitespace-nowrap"
            >
              PPS
            </Link>

            {/* Separator */}
            <div className="w-px h-4 bg-[var(--border)] shrink-0" />

            {/* Nav links */}
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                className="px-2 py-1 text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--background)]/60 rounded-lg transition-colors whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))}

            {/* Separator */}
            <div className="w-px h-4 bg-[var(--border)] shrink-0" />

            {/* CV + Theme */}
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-1 text-xs font-medium text-[var(--foreground)] hover:bg-[var(--background)]/60 rounded-lg transition-colors whitespace-nowrap"
            >
              CV
            </a>
            <div className="flex items-center shrink-0 pl-0.5">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile: Minimal top bar with brand + hamburger */}
      <header className="fixed top-0 inset-x-0 z-[5001] sm:hidden px-4 bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--border)]/50">
        <div className="flex items-center justify-between h-14">
          <Link
            href="/"
            className="text-lg font-bold text-[var(--foreground)] hover:opacity-70 transition-opacity"
          >
            Prem P. Singh
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex flex-col items-center justify-center w-10 h-10 rounded-lg hover:bg-[var(--muted)] transition-colors"
              aria-label="Toggle menu"
            >
              <span
                className={`block w-5 h-0.5 bg-[var(--foreground)] transition-all duration-200 ${
                  mobileOpen ? "rotate-45 translate-y-[3px]" : ""
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-[var(--foreground)] mt-1 transition-all duration-200 ${
                  mobileOpen ? "-rotate-45 -translate-y-[2px]" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="sm:hidden fixed inset-0 z-[5000] bg-[var(--background)]/95 backdrop-blur-md pt-20">
          <nav className="flex flex-col items-center gap-6 py-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                onClick={() => setMobileOpen(false)}
                className="text-xl font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="mt-4 px-6 py-2 text-sm font-medium rounded-full border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
            >
              Download CV
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
