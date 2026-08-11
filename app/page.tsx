import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Compass,
  Github,
  Handshake,
  Linkedin,
  Mail,
} from "lucide-react";
import { personal } from "@/profile/personal";
import { projects } from "@/profile/projects";
import { publications, bookChapters } from "@/profile/publications";
import PublicationsList from "@/components/PublicationsList";
import ScholarAnalytics from "@/components/ScholarAnalytics";
import { getAllPosts } from "@/lib/mdx";
import HeroClient from "@/components/HeroClient";
import { formatContentDate } from "@/lib/date";
import ResearchPathway from "@/components/ResearchPathway";
import ProjectCaseFiles from "@/components/ProjectCaseFiles";
import ResearchSnapshot from "@/components/ResearchSnapshot";
import CareerMap from "@/components/CareerMap";
import WorkExperience from "@/components/WorkExperience";
import NewsletterSignup from "@/components/NewsletterSignup";

export default function Home() {
  const latestPosts = getAllPosts().slice(0, 3);
  const publishedJournalCount = publications.filter(
    (publication) => publication.venue !== "In Preparation"
  ).length;

  return (
    <>
      <HeroClient />
      <ResearchPathway />
      <ResearchSnapshot />
      <WorkExperience />
      <CareerMap />

      <section id="publications" className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Evidence beyond the lab
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Work that keeps moving through the literature
              </h2>
            </div>
            <span className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground">
              {publishedJournalCount + bookChapters.length} published works
            </span>
          </div>

          <ScholarAnalytics />

          <div className="mt-16">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  The evidence shelf
                </p>
                <h3 className="mt-2 text-2xl font-bold text-foreground">
                  Browse by signal, method, or year
                </h3>
              </div>
              <span className="text-sm text-muted-foreground">
                Open a card for the scientific detail.
              </span>
            </div>
            <PublicationsList publications={[...publications, ...bookChapters]} />
          </div>
        </div>
      </section>

      <section id="projects" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <p className="text-sm font-semibold text-muted-foreground">
              Selected work
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Research projects
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Field studies, diagnostic methods, and mechanism work across crop and food systems.
            </p>
          </div>

          <ProjectCaseFiles projects={projects} />
        </div>
      </section>

      {latestPosts.length > 0 && (
        <section id="blog" className="py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  Field notes
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  Ideas moving between crop and data
                </h2>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                Open research notebook <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post, index) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div
                        className={`relative flex h-full items-end overflow-hidden p-5 ${
                          index === 0
                            ? "bg-gradient-to-br from-emerald-500/20 to-sky-500/10"
                            : index === 1
                              ? "bg-gradient-to-br from-violet-500/20 to-rose-500/10"
                              : "bg-gradient-to-br from-amber-500/20 to-orange-500/10"
                        }`}
                      >
                        <span className="absolute -right-8 -top-8 size-36 rounded-full border border-foreground/10" />
                        <span className="absolute right-8 top-8 size-16 rounded-full border border-foreground/10" />
                        <span className="text-6xl font-black tabular-nums text-foreground/10">
                          0{index + 1}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="line-clamp-2 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                      {post.title}
                    </h3>
                    <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
                      <time dateTime={post.date}>
                        {formatContentDate(post.date, {
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                      <span>{post.readingTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="contact" className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-card p-6 sm:p-10 lg:p-12">
            <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full border border-emerald-400/15 bg-emerald-400/[0.04]" />
            <div className="pointer-events-none absolute -bottom-32 left-1/3 size-80 rounded-full border border-violet-400/10 bg-violet-400/[0.03]" />

            <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600 dark:text-emerald-300">
                  Where the work can grow next
                </p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  Better crop decisions, built on stronger biological data.
                </h2>

                <div className="mt-9 space-y-3">
                  <Opportunity
                    icon={<BriefcaseBusiness className="size-5" aria-hidden="true" />}
                    title="Scientist roles"
                    detail="Ag-biotech · diagnostics · trait discovery"
                    tone="emerald"
                  />
                  <Opportunity
                    icon={<Handshake className="size-5" aria-hidden="true" />}
                    title="Research collaborations"
                    detail="Field biology · multi-omics · reproducible analysis"
                    tone="violet"
                  />
                  <Opportunity
                    icon={<Compass className="size-5" aria-hidden="true" />}
                    title="Scientific consulting"
                    detail="From experimental design to decision-ready evidence"
                    tone="sky"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <a
                  href={`mailto:${personal.email}`}
                  className="group rounded-3xl border border-emerald-400/30 bg-gradient-to-br from-emerald-400/[0.13] to-sky-400/[0.06] p-6 transition-transform hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-emerald-500 text-white">
                      <Mail className="size-5" aria-hidden="true" />
                    </span>
                    <ArrowRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </div>
                  <p className="mt-10 text-sm font-semibold text-muted-foreground">Start a conversation</p>
                  <p className="mt-1 break-all text-xl font-bold text-foreground">{personal.email}</p>
                </a>

                <div className="grid grid-cols-3 gap-3">
                  {personal.social.googleScholar && (
                    <SocialLink href={personal.social.googleScholar} label="Scholar">
                      <BookOpen className="size-5" aria-hidden="true" />
                    </SocialLink>
                  )}
                  {personal.social.linkedin && (
                    <SocialLink href={personal.social.linkedin} label="LinkedIn">
                      <Linkedin className="size-5" aria-hidden="true" />
                    </SocialLink>
                  )}
                  {personal.social.github && (
                    <SocialLink href={personal.social.github} label="GitHub">
                      <Github className="size-5" aria-hidden="true" />
                    </SocialLink>
                  )}
                </div>

                <NewsletterSignup />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const opportunityTones = {
  emerald: "bg-emerald-400/10 text-emerald-600 dark:text-emerald-300",
  violet: "bg-violet-400/10 text-violet-600 dark:text-violet-300",
  sky: "bg-sky-400/10 text-sky-600 dark:text-sky-300",
};

function Opportunity({
  icon,
  title,
  detail,
  tone,
}: {
  icon: ReactNode;
  title: string;
  detail: string;
  tone: keyof typeof opportunityTones;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-background/55 p-4">
      <span className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${opportunityTones[tone]}`}>
        {icon}
      </span>
      <div>
        <p className="font-bold text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{detail}</p>
      </div>
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex min-h-24 flex-col justify-between rounded-2xl border border-border bg-background/55 p-4 text-muted-foreground transition-colors hover:text-foreground"
    >
      {children}
      <span className="text-xs font-semibold">{label}</span>
    </a>
  );
}
