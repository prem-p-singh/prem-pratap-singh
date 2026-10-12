import Link from "next/link";
import Image from "next/image";
import {
  BriefcaseBusiness,
  ChevronDown,
  ChevronUp,
  Compass,
  Github,
  GraduationCap,
  Handshake,
  Linkedin,
  Mail,
} from "lucide-react";
import { FieldIcon } from "@/components/icons/PortfolioIcons";
import { personal } from "@/profile/personal";
import { projects } from "@/profile/projects";
import { publications, bookChapters } from "@/profile/publications";
import PublicationsList from "@/components/PublicationsList";
import { getAllPosts } from "@/lib/mdx";
import HeroClient from "@/components/HeroClient";
import { formatContentDate } from "@/lib/date";
import ResearchPathway from "@/components/ResearchPathway";
import ProjectCaseFiles from "@/components/ProjectCaseFiles";
import ResearchSnapshot from "@/components/ResearchSnapshot";
import WorkExperience from "@/components/WorkExperience";
import NewsletterSignup from "@/components/NewsletterSignup";

export default function Home() {
  const latestPosts = getAllPosts().slice(0, 2);
  const publishedJournalCount = publications.filter(
    (publication) => publication.venue !== "In Preparation"
  ).length;

  return (
    <>
      <HeroClient />
      <ResearchPathway />
      <ResearchSnapshot />
      <WorkExperience />

      <section
        id="research"
        data-guided-scroll-section
        className="guided-scroll-section"
        aria-labelledby="research-title"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-x-8 gap-y-10 border-t border-border py-16 lg:grid-cols-12 lg:py-24">
            <div className="lg:col-span-4">
              <h2 id="research-title" className="text-3xl leading-tight text-foreground sm:text-4xl">
                Evidence that has passed peer review.
              </h2>
              <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-muted-foreground">
                Journal articles and book chapters spanning plant disease, diagnostics, multi-omics, and food safety.
              </p>
            </div>

            <div className="lg:col-span-8">
              <div className="paper-panel grid gap-6 p-6 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-8 sm:p-7">
                <p className="text-sm font-semibold leading-normal text-muted-foreground">
                  <span className="block font-serif text-6xl leading-none tabular-nums text-field">
                    {publishedJournalCount + bookChapters.length}
                  </span>
                  <span className="mt-2 block">published works</span>
                </p>
                <dl className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col-reverse justify-end rounded-xl bg-data-wash px-4 py-3">
                    <dt className="text-sm font-semibold leading-snug text-foreground">Journal articles</dt>
                    <dd className="text-2xl font-semibold tabular-nums text-data">
                      {publishedJournalCount}
                    </dd>
                  </div>
                  <div className="flex flex-col-reverse justify-end rounded-xl bg-decision-wash px-4 py-3">
                    <dt className="text-sm font-semibold leading-snug text-foreground">Book chapters</dt>
                    <dd className="text-2xl font-semibold tabular-nums text-decision">
                      {bookChapters.length}
                    </dd>
                  </div>
                </dl>
              </div>

              <details className="group mt-5">
                <summary className="cursor-pointer list-none text-sm marker:content-none">
                  <span className="paper-panel flex items-center justify-between gap-4 px-6 py-4">
                    <span>
                      <span className="font-semibold text-field underline underline-offset-4">
                        Browse the publication archive
                      </span>
                      <span className="mt-1 block text-muted-foreground">Filter by format and method</span>
                    </span>
                    <ChevronDown className="size-5 shrink-0 text-muted-foreground group-open:hidden" aria-hidden="true" />
                    <ChevronUp className="hidden size-5 shrink-0 text-muted-foreground group-open:block" aria-hidden="true" />
                  </span>
                </summary>
                <div className="pt-5">
                  <PublicationsList publications={[...publications, ...bookChapters]} />
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      <section
        id="projects"
        data-guided-scroll-section
        className="guided-scroll-section"
        aria-labelledby="projects-title"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-x-8 gap-y-10 border-t border-border py-16 lg:grid-cols-12 lg:py-24">
            <div className="lg:col-span-4">
              <h2 id="projects-title" className="text-3xl leading-tight text-foreground sm:text-4xl">
                Research projects
              </h2>
              <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-muted-foreground">
                Field studies, diagnostic methods, and mechanism work across crop and food systems.
              </p>
            </div>

            <div className="lg:col-span-8">
              <ProjectCaseFiles projects={projects} initialVisible={3} />
            </div>
          </div>
        </div>
      </section>

      {latestPosts.length > 0 && (
        <section
          id="blog"
          data-guided-scroll-section
          className="guided-scroll-section"
          aria-labelledby="blog-title"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-x-8 gap-y-10 border-t border-border py-16 lg:grid-cols-12 lg:py-24">
              <div className="lg:col-span-4">
                <p className="section-kicker">Field notes</p>
                <h2 id="blog-title" className="mt-3 text-3xl leading-tight text-foreground sm:text-4xl">
                  Ideas moving between crop and data
                </h2>
                <div className="mt-6">
                  <Link href="/blog" className="btn-outline text-sm">
                    Open research notebook
                  </Link>
                </div>
              </div>

              <ul className="grid gap-5 md:grid-cols-2 lg:col-span-8">
                {latestPosts.map((post) => {
                  const image = post.visualSummary || post.image;
                  return (
                    <li key={post.slug} className="paper-panel flex flex-col">
                      {image ? (
                        <div className="relative aspect-[16/10] border-b border-border">
                          <Image
                            src={image}
                            alt=""
                            fill
                            sizes="(max-width: 768px) 100vw, 360px"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        // No image: a tinted band with the notebook's field icon and the post's first tag.
                        <div className="flex items-center justify-between gap-4 border-b border-border bg-field-wash px-6 py-5">
                          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-card text-field">
                            <FieldIcon size={22} />
                          </span>
                          {post.tags[0] && (
                            <span className="rounded-full border border-field/20 bg-card px-3 py-1 text-xs font-semibold text-field">
                              {post.tags[0]}
                            </span>
                          )}
                        </div>
                      )}
                      <div className="flex flex-1 flex-col p-6">
                        <p className="flex justify-between gap-4 text-sm tabular-nums text-muted-foreground">
                          <time dateTime={post.date}>
                            {formatContentDate(post.date, {
                              month: "short",
                              day: "numeric",
                            })}
                          </time>
                          <span>{post.readingTime}</span>
                        </p>
                        <h3 className="mt-3 text-xl leading-snug text-foreground">
                          {/* The link's ::after covers the card, so the image or band is clickable too. */}
                          <Link
                            href={`/blog/${post.slug}`}
                            className="underline-offset-4 after:absolute after:inset-0 hover:underline"
                          >
                            {post.title}
                          </Link>
                        </h3>
                        {post.description && (
                          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                            {post.description}
                          </p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>
      )}

      <section
        id="contact"
        data-guided-scroll-section
        className="guided-scroll-section"
        aria-labelledby="contact-title"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-x-8 gap-y-10 border-t border-border py-16 lg:grid-cols-12 lg:py-24">
            <div className="lg:col-span-4">
              <p className="section-kicker">Where the work can grow next</p>
              <h2 id="contact-title" className="mt-3 text-3xl leading-tight text-foreground sm:text-4xl">
                Better crop decisions, built on stronger biological data.
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:col-span-8">
              <ul className="paper-panel divide-y divide-border px-5 sm:px-6 md:col-span-2">
                {opportunities.map((opportunity) => {
                  const Icon = opportunity.icon;
                  return (
                    <li key={opportunity.title} className="flex items-center gap-4 py-5">
                      <span
                        className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${opportunity.tile}`}
                      >
                        <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="text-xl leading-tight text-foreground">{opportunity.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {opportunity.detail}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="paper-panel flex flex-col p-6">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-field-wash text-field">
                  <Mail size={22} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <p className="mt-5 text-sm font-semibold text-muted-foreground">Start a conversation</p>
                <a
                  href={`mailto:${personal.email}`}
                  className="mt-1 break-all font-serif text-2xl font-semibold leading-tight text-foreground underline-offset-4 hover:text-field hover:underline"
                >
                  {personal.email}
                </a>
                <ul className="mt-auto flex flex-wrap gap-2 pt-6 text-sm">
                  {socialLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="paper-control inline-flex items-center gap-2 px-3 py-2 text-foreground hover:text-field"
                        >
                          <Icon className="size-4 text-field" strokeWidth={1.8} aria-hidden="true" />
                          {link.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <NewsletterSignup />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// Icons and families as the previous design had them: roles field, collaborations biology, consulting data.
const opportunities = [
  {
    title: "Research Scientist and Data Scientist roles",
    detail: "Ag-biotech, diagnostics and trait discovery",
    icon: BriefcaseBusiness,
    tile: "bg-field-wash text-field",
  },
  {
    title: "Research collaborations",
    detail: "Field biology, multi-omics and reproducible analysis",
    icon: Handshake,
    tile: "bg-biology-wash text-biology",
  },
  {
    title: "Scientific consulting",
    detail: "From experimental design to decision-ready evidence",
    icon: Compass,
    tile: "bg-data-wash text-data",
  },
];

const socialLinks = [
  { label: "Scholar", href: personal.social.googleScholar, icon: GraduationCap },
  { label: "LinkedIn", href: personal.social.linkedin, icon: Linkedin },
  { label: "GitHub", href: personal.social.github, icon: Github },
].filter((link) => link.href);
