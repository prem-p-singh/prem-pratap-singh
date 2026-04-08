import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Blog",
  description: "Exploring plant-pathogen interactions, multi-omics, and sustainable agriculture. Research insights and updates from my work in grapevine virology and food safety.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  // Group: Research Journal posts (grapevine virology research updates)
  const researchJournalSlugs = new Set([
    "research-update-grapevine-virology-2026-02-14",
    "research-update-grapevine-virology-2026-02-16",
    "research-update-grapevine-virology-2026-02-19",
    "research-update-grapevine-virology-2026-02-23",
    "research-update-grapevine-virology-2026-02-26",
    "research-update-grapevine-virology-2026-03-02",
    "research-update-grapevine-virology-2026-03-05",
  ]);

  // Group: Deep Dives (longer standalone articles)
  const deepDiveSlugs = new Set([
    "crosskingdom-rna-signals-and-climate-extremes-two-forces-rewriting-plantmicrobe-outcomes",
    "from-crop-residues-to-cross-omics-a-practical-path-to-predicting-plant-disease-before-symp",
    "from-single-cell-four-omics-to-spatial-maps-the-multi-omics-shift-plant-pathology-cant-ign",
  ]);

  const researchJournal = posts.filter(p => researchJournalSlugs.has(p.slug));
  const deepDives = posts.filter(p => deepDiveSlugs.has(p.slug));
  const otherPosts = posts.filter(p => !researchJournalSlugs.has(p.slug) && !deepDiveSlugs.has(p.slug));

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-muted to-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Blog
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Exploring plant-pathogen interactions, multi-omics, and sustainable agriculture.
              Research insights and updates from my work in grapevine virology and food safety.
            </p>
          </div>
        </div>
      </section>

      {/* Deep Dives */}
      {deepDives.length > 0 && (
        <section className="py-16 border-b border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-primary/10">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Deep Dives
                </h2>
                <p className="text-sm text-muted-foreground">
                  In-depth explorations connecting multi-omics, ecology, and plant health
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-4">
              {deepDives.map((post) => {
                const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                });
                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group relative bg-gradient-to-br from-primary/5 via-card to-accent/5 rounded-2xl border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all p-5"
                  >
                    <div className="flex flex-col h-full">
                      <time className="text-xs text-muted-foreground mb-2">{formattedDate}</time>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      {post.description && (
                        <p className="text-sm text-muted-foreground line-clamp-3 mb-3 flex-grow">
                          {post.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/50">
                        <span className="text-xs text-muted-foreground">{post.readingTime}</span>
                        <svg className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Research Journal */}
      {researchJournal.length > 0 && (
        <section className="py-16 border-b border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-accent/10">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Research Journal
                </h2>
                <p className="text-sm text-muted-foreground">
                  Weekly notes on grapevine virology, structural phenotyping, and pathogen ecology
                </p>
              </div>
            </div>

            <div className="bg-card rounded-2xl border border-border p-6 sm:p-8">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {[...researchJournal].reverse().map((post, index) => {
                  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                  return (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group relative bg-background rounded-xl p-4 border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                          {formattedDate}
                        </span>
                        <div className="min-w-0">
                          <h4 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 text-sm">
                            {post.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {post.readingTime}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-foreground">
                  All Articles
                </h2>
                <span className="text-sm text-muted-foreground">
                  {posts.length} {posts.length === 1 ? "article" : "articles"}
                </span>
              </div>

              <div className="space-y-4">
                {posts.map((post) => {
                  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  });

                  return (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group block"
                    >
                      <article className="flex flex-col sm:flex-row sm:items-start gap-4 p-4 sm:p-6 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all">
                        {/* Number/Icon */}
                        <div className="hidden sm:flex flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 items-center justify-center">
                          <svg className="w-6 h-6 text-primary/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>

                        {/* Content */}
                        <div className="flex-grow min-w-0">
                          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-2">
                            <time dateTime={post.date}>{formattedDate}</time>
                            <span className="hidden sm:inline">·</span>
                            <span>{post.readingTime}</span>
                          </div>

                          <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>

                          {post.description && (
                            <p className="text-muted-foreground text-sm sm:text-base line-clamp-2 mb-3">
                              {post.description}
                            </p>
                          )}

                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {post.tags.slice(0, 4).map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md"
                                >
                                  {tag}
                                </span>
                              ))}
                              {post.tags.length > 4 && (
                                <span className="px-2 py-1 text-xs text-muted-foreground">
                                  +{post.tags.length - 4}
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Arrow */}
                        <div className="hidden sm:flex flex-shrink-0 items-center">
                          <svg className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </article>
                    </Link>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <svg className="h-10 w-10 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-3">
                No articles yet
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                I&apos;m working on some exciting content about grapevine virology,
                plant-pathogen interactions, and multi-omics research. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 section-divider">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Stay Updated
            </h2>
            <p className="text-muted-foreground mb-6">
              Follow me on social media or reach out via email to stay updated on new articles and research.
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="https://github.com/prem-p-singh"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-surface border border-border hover:border-primary hover:text-primary hover:shadow-[0_0_16px_-4px_var(--glow-primary)] transition-all"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/prem-p-singh"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-surface border border-border hover:border-primary hover:text-primary hover:shadow-[0_0_16px_-4px_var(--glow-primary)] transition-all"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="mailto:ppssingh@ucdavis.edu"
                className="p-3 rounded-full bg-surface border border-border hover:border-primary hover:text-primary hover:shadow-[0_0_16px_-4px_var(--glow-primary)] transition-all"
                aria-label="Email"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
