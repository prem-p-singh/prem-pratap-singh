import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
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
              <p className="text-base leading-relaxed text-foreground">
                <span className="text-2xl font-semibold tabular-nums">
                  {publishedJournalCount + bookChapters.length}
                </span>{" "}
                published works
              </p>

              <details className="group mt-6 border-t border-border">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 text-sm marker:content-none">
                  <span>
                    <span className="text-accent underline underline-offset-4">
                      Browse the publication archive
                    </span>
                    <span className="mt-1 block text-muted-foreground">Filter by format and method</span>
                  </span>
                  <ChevronDown className="size-5 shrink-0 text-muted-foreground group-open:hidden" aria-hidden="true" />
                  <ChevronUp className="hidden size-5 shrink-0 text-muted-foreground group-open:block" aria-hidden="true" />
                </summary>
                <div className="pt-4">
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
                <Link
                  href="/blog"
                  className="mt-5 inline-block text-sm text-accent underline underline-offset-4"
                >
                  Open research notebook
                </Link>
              </div>

              <ul className="lg:col-span-8">
                {latestPosts.map((post) => {
                  const image = post.visualSummary || post.image;
                  return (
                    <li
                      key={post.slug}
                      className={`relative grid gap-x-8 gap-y-4 border-t border-border py-6 first:border-t-0 first:pt-0 ${
                        image ? "sm:grid-cols-3" : ""
                      }`}
                    >
                      {image && (
                        <div className="relative aspect-[4/3] max-w-xs overflow-hidden rounded-md border border-border sm:max-w-none">
                          <Image
                            src={image}
                            alt=""
                            fill
                            sizes="(max-width: 640px) 320px, 240px"
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className={image ? "sm:col-span-2" : undefined}>
                        <time
                          dateTime={post.date}
                          className="text-sm tabular-nums text-muted-foreground"
                        >
                          {formatContentDate(post.date, {
                            month: "short",
                            day: "numeric",
                          })}
                        </time>
                        <h3 className="mt-1 text-xl leading-snug text-foreground">
                          {/* The link's ::after covers the row, so the thumbnail is clickable too. */}
                          <Link
                            href={`/blog/${post.slug}`}
                            className="underline-offset-4 after:absolute after:inset-0 hover:underline"
                          >
                            {post.title}
                          </Link>
                        </h3>
                        {post.description && (
                          <p className="mt-2 line-clamp-3 max-w-[60ch] text-base leading-relaxed text-muted-foreground">
                            {post.description}
                          </p>
                        )}
                        <p className="mt-2 text-sm tabular-nums text-muted-foreground">
                          {post.readingTime}
                        </p>
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

            <div className="lg:col-span-8">
              <ul>
                {opportunities.map((opportunity) => (
                  <li
                    key={opportunity.title}
                    className="border-t border-border py-6 first:border-t-0 first:pt-0"
                  >
                    {/* The base h3 rule is unlayered, so the sans needs the important flag to win. */}
                    <h3 className="font-sans! text-base font-semibold leading-relaxed text-foreground">
                      {opportunity.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">{opportunity.detail}</p>
                  </li>
                ))}
              </ul>

              <div className="border-t border-border pt-6">
                <p className="text-sm text-muted-foreground">Start a conversation</p>
                <a
                  href={`mailto:${personal.email}`}
                  className="mt-1 inline-block break-all text-lg text-accent underline-offset-4 hover:underline"
                >
                  {personal.email}
                </a>
                <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                  {socialLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent underline-offset-4 hover:underline"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
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

const opportunities = [
  {
    title: "Research Scientist and Data Scientist roles",
    detail: "Ag-bio R&D, molecular diagnostics, NGS workflows and trait discovery",
  },
  {
    title: "Research collaborations",
    detail: "Multi-omics studies that start from field samples",
  },
  {
    title: "Scientific consulting",
    detail: "From experimental design to decision-ready evidence",
  },
];

const socialLinks = [
  { label: "Scholar", href: personal.social.googleScholar },
  { label: "LinkedIn", href: personal.social.linkedin },
  { label: "GitHub", href: personal.social.github },
].filter((link) => link.href);
