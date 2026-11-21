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
  // The homepage shows the five newest notes that have a picture: one large,
  // four beside it, so the right column is as full as the left.
  const allPosts = getAllPosts();
  const picturedPosts = allPosts.filter((post) => post.visualSummary || post.image);
  const latestPosts = (picturedPosts.length >= 5 ? picturedPosts : allPosts).slice(0, 5);
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
              {/* The counts, set like a label: three figures parted by rules. */}
              <dl className="grid border-y border-rule sm:grid-cols-3 sm:divide-x sm:divide-rule">
                <div className="flex flex-col-reverse gap-3 py-8 sm:pr-8">
                  <dt className="text-sm font-medium text-muted">Published works</dt>
                  <dd className="figure text-[clamp(4rem,9vw,9rem)] text-accent">
                    {publishedJournalCount + bookChapters.length}
                  </dd>
                </div>
                <div className="flex flex-col-reverse gap-3 border-t border-rule py-8 sm:border-t-0 sm:px-8">
                  <dt className="text-sm font-medium text-muted">Journal articles</dt>
                  <dd className="figure text-[clamp(4rem,9vw,9rem)]">{publishedJournalCount}</dd>
                </div>
                <div className="flex flex-col-reverse gap-3 border-t border-rule py-8 sm:border-t-0 sm:pl-8">
                  <dt className="text-sm font-medium text-muted">Book chapters</dt>
                  <dd className="figure text-[clamp(4rem,9vw,9rem)]">{bookChapters.length}</dd>
                </div>
              </dl>

              <details className="group mt-5">
                <summary className="cursor-pointer list-none text-sm marker:content-none">
                  <span className="flex items-center justify-between gap-4 border-b border-rule py-5">
                    <span>
                      <span className="font-display text-[length:var(--text-title)] text-ink underline decoration-accent decoration-1 underline-offset-4">
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

              <ul className="grid gap-x-8 gap-y-6 lg:col-span-12 lg:grid-cols-12">
                {latestPosts.map((post, index) => {
                  const image = post.visualSummary || post.image;
                  const lead = index === 0;
                  return (
                    <li
                      key={post.slug}
                      className={`relative ${
                        lead
                          ? "lg:col-span-7 lg:row-span-4"
                          : "grid content-start gap-x-6 gap-y-4 border-t border-rule pt-6 sm:grid-cols-[2fr_3fr] lg:col-span-5"
                      }`}
                    >
                      {image && (
                        <div className={`photo-frame relative overflow-hidden bg-paper-3 ${lead ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
                          <Image
                            src={image}
                            alt=""
                            fill
                            sizes={lead ? "(max-width: 1024px) 100vw, 56vw" : "(max-width: 640px) 100vw, 18vw"}
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className={lead ? "mt-6" : ""}>
                        <p className="flex gap-4 text-xs font-medium tabular-nums text-muted">
                          <time dateTime={post.date}>
                            {formatContentDate(post.date, {
                              month: "short",
                              day: "numeric",
                            })}
                          </time>
                          <span>{post.readingTime}</span>
                        </p>
                        <h3
                          className={`mt-3 ${lead ? "max-w-[26ch] text-[length:var(--text-3xl)] leading-tight" : "text-[length:var(--text-title)] leading-snug"}`}
                        >
                          {/* The link's ::after covers the whole item, so the picture is clickable too. */}
                          <Link
                            href={`/blog/${post.slug}`}
                            className="no-underline underline-offset-4 after:absolute after:inset-0 hover:underline hover:decoration-accent"
                          >
                            {post.title}
                          </Link>
                        </h3>
                        {lead && post.description && (
                          <p className="mt-4 line-clamp-3 max-w-[60ch] text-ink-2">{post.description}</p>
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
        {/* The close opens on a vineyard; the head rests low and left over a scrim. */}
        <div className="relative flex min-h-[68dvh] items-end overflow-hidden pb-16 pt-32 max-lg:min-h-[52dvh] max-lg:pb-10">
          <div
            data-slot="close"
            data-alt="Your own picture: a vineyard block you have worked in, wide"
            className="absolute inset-0"
          >
            <Image
              src="/images/photos/vineyard-in-cabrerolles-1920.jpg"
              alt="Autumn vines in yellow rows with a single cypress beyond"
              fill
              sizes="100vw"
              className="object-cover object-[50%_62%]"
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-0 z-[2] bg-[linear-gradient(90deg,color-mix(in_oklab,var(--color-paper)_88%,transparent)_0%,color-mix(in_oklab,var(--color-paper)_62%,transparent)_42%,color-mix(in_oklab,var(--color-paper)_10%,transparent)_80%),linear-gradient(0deg,var(--color-paper)_0%,transparent_40%)]"
          />
          <div className="shell relative z-[3]">
            <h2 id="contact-title" className="max-w-[18ch] text-[length:var(--text-display-s)] leading-[1.05]">
              Better crop decisions, built on stronger biological data
            </h2>
          </div>
        </div>

        <div className="shell">
          <div className="grid gap-x-8 gap-y-10 pb-[var(--section-gap-s)] pt-10 lg:grid-cols-12">

            {/* The close: four columns side by side under one rule, each a
                short head with its content directly beneath. */}
            <div className="grid border-t-[1.5px] border-accent sm:grid-cols-2 lg:col-span-12 lg:grid-cols-4 lg:divide-x lg:divide-rule">
              <div className="py-8 lg:pr-8">
                <h3>Start a conversation</h3>
                <a
                  href={`mailto:${personal.email}`}
                  className="mt-4 block break-all text-ink underline-offset-4 hover:decoration-2"
                >
                  {personal.email}
                </a>
                <a href={`mailto:${personal.email}`} className="btn-primary mt-5">
                  Send an email
                </a>
              </div>

              <div className="py-8 lg:px-8">
                <h3>Open to</h3>
                <ul className="mt-4 grid gap-2 text-ink">
                  {opportunities.map((opportunity) => (
                    <li key={opportunity}>{opportunity}</li>
                  ))}
                </ul>
              </div>

              <div className="py-8 lg:px-8">
                <h3>Profiles</h3>
                <ul className="mt-4 grid gap-1">
                  {socialLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-9 items-center gap-3 text-ink underline-offset-4 hover:decoration-2"
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
