"use client";

import Image from "next/image";
import { Github, GraduationCap, Linkedin, Mail, type LucideIcon } from "lucide-react";
import { personal } from "@/data/personal";
import { MovingBorderButton } from "@/components/ui/moving-border";

const socialLinks: Array<{ label: string; href: string; icon: LucideIcon }> = [
  { label: "GitHub", href: personal.social.github, icon: Github },
  { label: "LinkedIn", href: personal.social.linkedin, icon: Linkedin },
  { label: "Google Scholar", href: personal.social.googleScholar, icon: GraduationCap },
  { label: "Email", href: `mailto:${personal.email}`, icon: Mail },
];

export default function HeroClient() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-dot-grid opacity-20" />
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="order-2 lg:order-2">
            <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
              Crop biology, measured carefully
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              {personal.name}
            </h1>
            <p className="mt-4 text-lg font-semibold leading-snug text-foreground sm:text-xl">
              {personal.heroRole}
            </p>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              {personal.heroBio}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {["UC Davis", "Grapevine virology", "Open to Scientist roles"].map((label, index) => (
                <span
                  key={label}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                    index === 0
                      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                      : index === 1
                        ? "bg-violet-500/15 text-violet-700 dark:text-violet-300"
                        : "bg-sky-500/15 text-sky-700 dark:text-sky-300"
                  }`}
                >
                  {label}
                </span>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap gap-4">
              <MovingBorderButton
                as="a"
                href="#about"
                borderRadius="0.75rem"
                containerClassName="h-12 w-auto"
                className="px-6 font-medium"
                duration={3000}
              >
                Explore research
              </MovingBorderButton>
              <MovingBorderButton
                as="a"
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                borderRadius="0.75rem"
                containerClassName="h-12 w-auto"
                className="px-6 font-medium"
                duration={3000}
              >
                CV
              </MovingBorderButton>
            </div>

            <div className="mt-8 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                const external = !social.href.startsWith("mailto:");
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="flex size-10 items-center justify-center rounded-full border border-border bg-muted/50 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-foreground/40 hover:text-foreground"
                    aria-label={social.label}
                    title={social.label}
                  >
                    <Icon className="size-4" strokeWidth={1.8} aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="order-1 flex justify-center lg:order-1">
            <div className="relative size-72 sm:size-80 lg:size-96">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500/15 via-violet-500/10 to-sky-500/15 blur-3xl" />
              <div className="relative size-full overflow-hidden rounded-full border-2 border-border shadow-2xl">
                <Image
                  src="/images/headshot-1.jpg"
                  alt={personal.name}
                  fill
                  sizes="(max-width: 640px) 18rem, (max-width: 1024px) 20rem, 24rem"
                  className="object-cover"
                  priority
                />
              </div>
              <span className="absolute -left-3 top-12 rounded-full border border-border bg-background/90 px-[0.975rem] py-[0.4875rem] text-[0.975rem] font-bold leading-none text-foreground shadow-lg backdrop-blur-sm sm:-left-10">
                FIELD
              </span>
              <span className="absolute -right-2 top-1/2 rounded-full border border-border bg-background/90 px-[0.975rem] py-[0.4875rem] text-[0.975rem] font-bold leading-none text-foreground shadow-lg backdrop-blur-sm sm:-right-12">
                BENCH
              </span>
              <span className="absolute bottom-8 left-5 rounded-full border border-border bg-background/90 px-[0.975rem] py-[0.4875rem] text-[0.975rem] font-bold leading-none text-foreground shadow-lg backdrop-blur-sm sm:left-0">
                CODE
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
