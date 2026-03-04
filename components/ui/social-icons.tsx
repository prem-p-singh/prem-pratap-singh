"use client";

import { useState } from "react";

interface SocialItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export function SocialIcons({ socials }: { socials: SocialItem[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative flex items-center gap-0.5 px-1.5 py-1.5 rounded-2xl bg-[var(--muted)] border border-[var(--border)]">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[var(--foreground)]/[0.03] to-transparent pointer-events-none" />

      {socials.map((social, index) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center size-10 rounded-xl transition-colors duration-200"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          aria-label={social.name}
        >
          <span
            className={`absolute inset-1 rounded-lg bg-[var(--foreground)]/[0.08] transition-all duration-300 ease-out ${
              hoveredIndex === index ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          />

          <span
            className={`relative z-10 transition-all duration-300 ease-out ${
              hoveredIndex === index ? "text-[var(--foreground)] scale-110" : "text-[var(--muted-foreground)]"
            }`}
          >
            {social.icon}
          </span>

          <span
            className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-[var(--foreground)] transition-all duration-300 ease-out ${
              hoveredIndex === index ? "w-3 opacity-100" : "w-0 opacity-0"
            }`}
          />

          <span
            className={`absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-[var(--foreground)] text-[var(--background)] text-[11px] font-medium whitespace-nowrap transition-all duration-300 ease-out ${
              hoveredIndex === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none"
            }`}
          >
            {social.name}
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 size-2 rotate-45 bg-[var(--foreground)]" />
          </span>
        </a>
      ))}
    </div>
  );
}
