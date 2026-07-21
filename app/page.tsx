import Link from "next/link";
import Image from "next/image";
import { personal, researchInterests } from "@/data/personal";
import { projects } from "@/data/projects";
import { publications, bookChapters } from "@/data/publications";
import PublicationsList from "@/components/PublicationsList";
import SkillsMatrix from "@/components/SkillsMatrix";
import ScholarAnalytics from "@/components/ScholarAnalytics";
import { getAllPosts } from "@/lib/mdx";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import EducationTimelineNew from "@/components/EducationTimelineNew";
import HeroClient from "@/components/HeroClient";
import { ShinyCard } from "@/components/ui/shiny-card";

export default function Home() {
  const latestPosts = getAllPosts().slice(0, 3);
  // Count only published, peer-reviewed articles (exclude in-preparation
  // manuscripts) so this figure matches the About section's "37".
  const publishedJournalCount = publications.filter(
    (p) => p.venue !== "In Preparation"
  ).length;

  return (
    <>
      {/* Hero Section */}
      <HeroClient />

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-12">About Me</h2>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="text-muted-foreground space-y-4 leading-relaxed">
                {personal.bio.split('\n').filter(p => p.trim()).map((paragraph, index) => (
                  <p key={index}>{paragraph.trim()}</p>
                ))}
              </div>

              {/* Research Interests */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">Research Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {researchInterests.map((interest, index) => (
                    <span key={index} className="tech-badge">
                      {interest.title}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Skillset panel */}
            <div id="skills">
              <SkillsMatrix />
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-12">Experience</h2>
          <ExperienceTimeline />
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-12">Education</h2>
          <EducationTimelineNew />
        </div>
      </section>

      {/* Research Impact / Analytics Section */}
      <section id="publications" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-12">Research Impact</h2>

          <ScholarAnalytics />

          <div className="mt-16">
            <h3 className="text-2xl font-bold text-foreground mb-8">Publications</h3>
            <PublicationsList publications={[...publications, ...bookChapters]} />

            <div className="mt-8 text-center">
              <p className="text-muted-foreground">
                {publishedJournalCount} peer-reviewed articles and {bookChapters.length} book chapters ({publishedJournalCount + bookChapters.length} total) in venues including Food Chemistry, Scientific Reports, and Food Control.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-12">Research Projects</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ShinyCard
                key={index}
                className="group p-6"
                duration={4000 + index * 500}
              >
                <div className="flex flex-col h-full">
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-muted-foreground transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {project.impact && (
                    <div className="mb-4 rounded-lg border-l-2 border-primary/60 bg-primary/5 px-3 py-2.5">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-primary mb-1 flex items-center gap-1.5">
                        <svg className="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        Impact
                      </p>
                      <p className="text-sm text-foreground/85 leading-relaxed">
                        {project.impact}
                      </p>
                    </div>
                  )}

                  <div className="mt-auto space-y-3">
                    {project.skills && project.skills.length > 0 && (
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                          Skills
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {project.skills.map((s) => (
                            <span
                              key={s}
                              className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary border border-primary/20"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {project.tech.length > 0 && (
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                          Tools
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {project.tech.map((t) => (
                            <span
                              key={t}
                              className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded border border-border"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {((project.papers && project.papers.length > 0) ||
                      project.links?.github) && (
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-2 border-t border-border/50">
                        {project.papers && project.papers.length > 0 && (
                          <>
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                              Published in
                            </span>
                            {project.papers.map((p) => (
                              <a
                                key={p.url + p.label}
                                href={p.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary underline decoration-dotted underline-offset-2 transition-colors"
                              >
                                {p.label}
                                <svg className="h-3 w-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                </svg>
                              </a>
                            ))}
                          </>
                        )}

                        {project.links?.github && (
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary underline decoration-dotted underline-offset-2 transition-colors"
                          >
                            <svg className="h-3.5 w-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                            Code
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </ShinyCard>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      {latestPosts.length > 0 && (
        <section id="blog" className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <h2 className="section-title">Latest from the Blog</h2>
              <Link
                href="/blog"
                className="text-sm font-medium text-muted-foreground hover:text-foreground hover:underline transition-colors"
              >
                View all posts &rarr;
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPosts.map((post, index) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block"
                >
                  <ShinyCard
                    className="group p-6 h-full"
                    duration={4000 + index * 600}
                  >
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-xs bg-muted text-muted-foreground rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-muted-foreground transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {post.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                      <span>{post.readingTime}</span>
                    </div>
                  </ShinyCard>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="section-title mx-auto mb-8">Get In Touch</h2>
            <p className="text-lg text-muted-foreground mb-8">
              I am open to industry Scientist / Scientist II roles in plant pathology,
              molecular diagnostics, NGS workflow, and trait discovery. Also available
              for research collaborations and consulting.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <ShinyCard
                as="a"
                href={`mailto:${personal.email}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 font-medium text-[var(--foreground)]"
                borderRadius="0.75rem"
                duration={3000}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Me
              </ShinyCard>
              <ShinyCard
                as="a"
                href={personal.social.googleScholar || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 font-medium text-[var(--foreground)]"
                borderRadius="0.75rem"
                duration={3500}
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/>
                </svg>
                Google Scholar
              </ShinyCard>
            </div>

            <div className="mt-8 flex justify-center gap-6">
              {personal.social.orcid && (
                <a href={personal.social.orcid} target="_blank" rel="noopener noreferrer"
                  className="p-3 text-muted-foreground hover:text-foreground bg-surface rounded-full border border-border hover:border-muted-foreground transition-all"
                  aria-label="ORCID">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-1.209-.619-3.722-3.853-3.722h-2.466z"/>
                  </svg>
                </a>
              )}
              {personal.social.googleScholar && (
                <a href={personal.social.googleScholar} target="_blank" rel="noopener noreferrer"
                  className="p-3 text-muted-foreground hover:text-foreground bg-surface rounded-full border border-border hover:border-muted-foreground transition-all"
                  aria-label="Google Scholar">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/>
                  </svg>
                </a>
              )}
              {personal.social.linkedin && (
                <a href={personal.social.linkedin} target="_blank" rel="noopener noreferrer"
                  className="p-3 text-muted-foreground hover:text-foreground bg-surface rounded-full border border-border hover:border-muted-foreground transition-all"
                  aria-label="LinkedIn">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              )}
              {personal.social.researchgate && (
                <a href={personal.social.researchgate} target="_blank" rel="noopener noreferrer"
                  className="p-3 text-muted-foreground hover:text-foreground bg-surface rounded-full border border-border hover:border-muted-foreground transition-all"
                  aria-label="ResearchGate">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.97.936-1.213 1.68a3.193 3.193 0 0 0-.112.437 8.365 8.365 0 0 0-.078.53 9 9 0 0 0-.05.727c-.01.282-.013.621-.013 1.016a31.121 31.123 0 0 0 .014 1.017 9 9 0 0 0 .05.727 7.946 7.946 0 0 0 .077.53h-.005a3.334 3.334 0 0 0 .113.438c.245.743.65 1.303 1.214 1.68.565.376 1.256.564 2.075.564.8 0 1.536-.213 2.105-.603.57-.39.94-.916 1.175-1.65.076-.235.135-.558.177-.93a10.9 10.9 0 0 0 .043-1.207v-.82c0-.095-.047-.142-.14-.142h-3.064c-.094 0-.14.047-.14.141v.956c0 .094.046.14.14.14h1.666c.056 0 .084.03.084.086 0 .36 0 .62-.036.865-.038.244-.1.447-.147.606-.108.385-.348.664-.638.876-.29.212-.738.35-1.227.35-.545 0-.901-.15-1.21-.353-.306-.203-.517-.454-.67-.915a3.136 3.136 0 0 1-.147-.762 17.366 17.367 0 0 1-.034-.656c-.01-.26-.014-.572-.014-.939a26.401 26.403 0 0 1 .014-.938 15.821 15.822 0 0 1 .035-.656 3.19 3.19 0 0 1 .148-.76 1.89 1.89 0 0 1 .742-1.01c.344-.244.593-.352 1.137-.352.508 0 .815.096 1.144.303.33.207.528.492.764.925.047.094.111.118.198.07l1.044-.43c.075-.048.09-.115.042-.199a3.549 3.549 0 0 0-.466-.742 3 3 0 0 0-.679-.607 3.313 3.313 0 0 0-.903-.41A4.068 4.068 0 0 0 19.586 0zM8.217 5.836c-1.69 0-3.036.086-4.297.086-1.146 0-2.291 0-3.007-.029v.831l1.088.2c.744.144 1.174.488 1.174 2.264v11.288c0 1.777-.43 2.12-1.174 2.263l-1.088.2v.832c.773-.029 2.12-.086 3.465-.086 1.29 0 2.951.057 3.667.086v-.831l-1.49-.2c-.773-.115-1.174-.487-1.174-2.264v-4.784c.688.057 1.29.057 2.206.057 1.748 3.123 3.41 5.472 4.355 6.56.86 1.032 2.177 1.691 3.839 1.691.487 0 1.003-.086 1.318-.23v-.744c-1.031 0-2.063-.716-2.808-1.518-1.26-1.376-2.95-3.582-4.355-6.074 2.32-.545 4.04-2.722 4.04-4.9 0-3.208-2.492-4.698-5.758-4.698zm-.515 1.29c2.406 0 3.839 1.26 3.839 3.552 0 2.263-1.547 3.782-4.097 3.782-.974 0-1.404-.03-2.063-.086v-7.19c.66-.059 1.547-.059 2.32-.059z"/>
                  </svg>
                </a>
              )}
            </div>

            {/* Newsletter Signup */}
            <div className="max-w-lg mx-auto mt-12">
              <ShinyCard className="p-8" duration={5000}>
                <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">Stay Updated</h3>
                <p className="text-sm text-[var(--muted-foreground)] mb-4">
                  Get notified about new publications, research updates, and blog posts.
                </p>
                <form
                  action="https://buttondown.com/api/emails/newsletter-subscribe"
                  method="post"
                  target="_blank"
                  className="flex gap-2"
                >
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    aria-label="Email address"
                    required
                    className="flex-1 px-4 py-2 rounded-lg bg-[var(--muted)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] text-sm focus:outline-none focus:border-[var(--foreground)] transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2 text-sm whitespace-nowrap rounded-lg bg-[var(--foreground)] text-[var(--background)] font-medium hover:opacity-85 transition-opacity"
                  >
                    Subscribe
                  </button>
                </form>
                <p className="text-xs text-[var(--muted-foreground)] mt-2">No spam. Unsubscribe anytime.</p>
              </ShinyCard>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
