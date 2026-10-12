"use client";

import Link from "next/link";
import { personal } from "@/profile/personal";
import { primaryNavigation } from "@/profile/navigation";

const socialItems = [
  { name: "GitHub", href: personal.social.github },
  { name: "LinkedIn", href: personal.social.linkedin },
  { name: "Scholar", href: personal.social.googleScholar },
  { name: "ResearchGate", href: personal.social.researchgate },
  { name: "Email", href: `mailto:${personal.email}` },
];

const linkClass = "underline-offset-4 hover:text-foreground hover:underline";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-border bg-background text-sm text-muted-foreground">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-baseline lg:justify-between">
          <Link href="/" className="font-semibold text-foreground">
            {personal.name}
          </Link>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
            {primaryNavigation.map((link) => (
              <Link key={link.name} href={link.link} className={linkClass}>
                {link.name}
              </Link>
            ))}
            {socialItems.map((social) => {
              const external = !social.href.startsWith("mailto:");
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className={linkClass}
                >
                  {social.name}
                </a>
              );
            })}
          </nav>
        </div>
        <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
          <p>&copy; {currentYear} {personal.name}. All rights reserved.</p>
          <Link href="/privacy" className={linkClass}>
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
