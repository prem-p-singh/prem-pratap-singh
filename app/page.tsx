import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { GitHubMark, LinkedInMark, ScholarMark } from "@/components/icons/BrandIcons";
import { personal } from "@/profile/personal";
import { projects } from "@/profile/projects";
import { publications, bookChapters } from "@/profile/publications";
import PublicationsList from "@/components/PublicationsList";
import { getAllPosts } from "@/lib/mdx";
import HeroClient from "@/components/HeroClient";
import { formatContentDate } from "@/lib/date";
import ResearchPathway from "@/components/ResearchPathway";
import ProjectCaseFiles from "@/components/ProjectCaseFiles";
import SoftwareShowcase from "@/components/SoftwareShowcase";
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
      <div>
        <ResearchPathway />
        <ResearchSnapshot />
      </div>
      <WorkExperience />

      {/* A picture band: the crop itself, between the roles and the papers. */}
      <figure
        data-slot="photo-1"
        data-alt="Your own picture from the vineyard: sampling, a cluster in hand, or an infected leaf"
        className="relative aspect-[21/9] w-full max-lg:aspect-[4/3]"
      >
        <Image
          src="/images/photos/javier-shows-part-of-the-grape-harvest-in-his-lysekil-vineya-1920.jpg"
          alt="Two hands holding freshly cut bunches of green grapes in a vineyard"
          fill
          sizes="100vw"
          className="object-cover object-[50%_40%]"
        />
      </figure>

      <section
        id="research"
        className="guided-scroll-section band-cream"
        aria-labelledby="research-title"
      >
        <div className="shell">
          <div className="grid gap-x-8 gap-y-10 py-[var(--section-gap-s)] lg:grid-cols-12">
            <div className="room-title lg:col-span-12">
              <h2 id="research-title" className="text-3xl leading-tight text-foreground sm:text-4xl">
                Evidence that has passed peer review
              </h2>
              <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-muted-foreground">
                Journal articles and book chapters spanning plant disease, diagnostics, multi-omics, and food safety.
              </p>
            </div>

            <div className="lg:col-span-12">
              <div className="paper-panel grid gap-6 p-6 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-8 sm:p-7">
                <p className="text-sm font-medium leading-normal text-muted-foreground">
                  <span className="block font-serif text-6xl leading-none tabular-nums text-field">
                    {publishedJournalCount + bookChapters.length}
                  </span>
                  <span className="mt-2 block">published works</span>
                </p>
                <dl className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col-reverse justify-end rounded-none bg-data-wash px-4 py-3">
                    <dt className="text-sm font-medium leading-snug text-foreground">Journal articles</dt>
                    <dd className="text-2xl font-medium tabular-nums text-data">
                      {publishedJournalCount}
                    </dd>
                  </div>
                  <div className="flex flex-col-reverse justify-end rounded-none bg-decision-wash px-4 py-3">
                    <dt className="text-sm font-medium leading-snug text-foreground">Book chapters</dt>
                    <dd className="text-2xl font-medium tabular-nums text-decision">
                      {bookChapters.length}
                    </dd>
                  </div>
                </dl>
              </div>

              <details className="group mt-5">
                <summary className="cursor-pointer list-none text-sm marker:content-none">
                  <span className="paper-panel flex items-center justify-between gap-4 px-6 py-4">
                    <span>
                      <span className="font-medium text-field underline underline-offset-4">
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

      <div>
      <section
        id="software"
        className="guided-scroll-section"
        aria-labelledby="software-title"
      >
        <div className="shell">
          <div className="grid gap-x-8 gap-y-10 py-[var(--section-gap-s)] lg:grid-cols-12">
            <div className="room-title lg:col-span-12">
              <h2 id="software-title" className="text-3xl leading-tight text-foreground sm:text-4xl">
                Open-source tools
              </h2>
              <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-muted-foreground">
                Pipelines and analysis code from my research, published on GitHub.
              </p>
              <a
                href={personal.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block text-sm font-medium text-field-strong underline underline-offset-4"
              >
                All repositories on GitHub
              </a>
            </div>

            <div className="lg:col-span-12">
              <SoftwareShowcase />
            </div>
          </div>
        </div>
      </section>

      <section
        id="projects"
        className="guided-scroll-section"
        aria-labelledby="projects-title"
      >
        <div className="shell">
          <div className="grid gap-x-8 gap-y-10 py-[var(--section-gap-s)] lg:grid-cols-12">
            <div className="room-title lg:col-span-12">
              <h2 id="projects-title" className="text-3xl leading-tight text-foreground sm:text-4xl">
                Research projects
              </h2>
              <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-muted-foreground">
                Field studies, diagnostic methods, and mechanism work across crop and food systems.
              </p>
            </div>

            <div className="lg:col-span-12">
              <ProjectCaseFiles projects={projects} initialVisible={3} />
            </div>
          </div>
        </div>
      </section>

      </div>

      {latestPosts.length > 0 && (
        <section
          id="blog"
          className="guided-scroll-section"
          aria-labelledby="blog-title"
        >
          <div className="shell">
            <div className="grid gap-x-8 gap-y-10 py-[var(--section-gap-s)] lg:grid-cols-12">
              <div className="room-title lg:col-span-12">
                <h2 id="blog-title" className="mt-3 text-3xl leading-tight text-foreground sm:text-4xl">
                  Ideas moving between crop and data
                </h2>
                <div className="mt-6">
                  <Link href="/blog" className="btn-outline text-sm">
                    Open research notebook
                  </Link>
                </div>
              </div>

              <ul className="grid gap-5 md:grid-cols-2 lg:col-span-12">
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
                          {post.tags[0] && (
                            <span className="rounded-none border border-field/20 bg-card px-3 py-1 text-xs font-medium text-field">
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
        className="guided-scroll-section room-merlot"
        aria-labelledby="contact-title"
      >
        <div className="shell">
          <div className="grid gap-x-8 gap-y-10 py-[var(--section-gap-s)] lg:grid-cols-12">
            <div className="room-title lg:col-span-12">
              <h2 id="contact-title" className="mt-3 text-3xl leading-tight text-foreground sm:text-4xl">
                Better crop decisions, built on stronger biological data
              </h2>
            </div>

            {/* The close, set as four ruled rows across the page: what each
                row is on the left, its content on the right. */}
            <div className="index-list lg:col-span-12">
              <div className="grid gap-x-8 gap-y-4 py-8 lg:grid-cols-12 lg:items-center">
                <h3 className="lg:col-span-4">Start a conversation</h3>
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4 lg:col-span-8">
                  <a
                    href={`mailto:${personal.email}`}
                    className="break-all text-lg text-ink underline-offset-4 hover:decoration-2"
                  >
                    {personal.email}
                  </a>
                  <a href={`mailto:${personal.email}`} className="btn-primary">
                    Send an email
                  </a>
                </div>
              </div>

              <div className="grid gap-x-8 gap-y-4 py-8 lg:grid-cols-12 lg:items-baseline">
                <h3 className="lg:col-span-4">Open to</h3>
                <ul className="grid gap-x-8 gap-y-2 text-ink sm:grid-cols-3 lg:col-span-8">
                  {opportunities.map((opportunity) => (
                    <li key={opportunity}>{opportunity}</li>
                  ))}
                </ul>
              </div>

              <div className="grid gap-x-8 gap-y-4 py-8 lg:grid-cols-12 lg:items-center">
                <h3 className="lg:col-span-4">Profiles</h3>
                <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-3 lg:col-span-8">
                  {socialLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-11 items-center gap-3 text-ink underline-offset-4 hover:decoration-2"
                        >
                          <Icon className="size-5 shrink-0" aria-hidden="true" />
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

// What the owner is open to, as three plain lines.
const opportunities = [
  "Research Scientist and Data Scientist roles",
  "Research collaborations",
  "Scientific consulting",
];

const socialLinks = [
  { label: "Scholar", href: personal.social.googleScholar, icon: ScholarMark },
  { label: "LinkedIn", href: personal.social.linkedin, icon: LinkedInMark },
  { label: "GitHub", href: personal.social.github, icon: GitHubMark },
].filter((link) => link.href);
