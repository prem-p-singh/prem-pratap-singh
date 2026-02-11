import Link from "next/link";
import Image from "next/image";
import { personal, researchInterests, skills } from "@/data/personal";
import { education, workExperience } from "@/data/experience";
import { projects } from "@/data/projects";
import { publications } from "@/data/publications";
import PublicationsList from "@/components/PublicationsList";
import EducationTimeline from "@/components/EducationTimeline";
import ScholarAnalytics from "@/components/ScholarAnalytics";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <p className="text-lg text-muted-foreground mb-2">
                Hello, I am
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                {personal.name}
              </h1>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-muted-foreground mb-6">
                <span className="text-primary">{personal.title}</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
                {personal.tagline}
              </p>

              <div className="flex flex-wrap gap-4">
                <a href="#about" className="btn-primary inline-flex items-center gap-2">
                  About Me
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
                <a
                  href="/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline inline-flex items-center gap-2"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download CV
                </a>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4 mt-8">
                {personal.social.orcid && (
                  <a
                    href={personal.social.orcid}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-muted-foreground hover:text-primary transition-colors"
                    aria-label="ORCID"
                  >
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-1.209-.619-3.722-3.853-3.722h-2.466z"/>
                    </svg>
                  </a>
                )}
                {personal.social.googleScholar && (
                  <a
                    href={personal.social.googleScholar}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Google Scholar"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/>
                    </svg>
                  </a>
                )}
                {personal.social.researchgate && (
                  <a
                    href={personal.social.researchgate}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-muted-foreground hover:text-primary transition-colors"
                    aria-label="ResearchGate"
                  >
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.97.936-1.213 1.68a3.193 3.193 0 0 0-.112.437 8.365 8.365 0 0 0-.078.53 9 9 0 0 0-.05.727c-.01.282-.013.621-.013 1.016a31.121 31.123 0 0 0 .014 1.017 9 9 0 0 0 .05.727 7.946 7.946 0 0 0 .078.53h-.005a3.334 3.334 0 0 0 .112.438c.244.743.65 1.303 1.214 1.68.565.376 1.256.564 2.075.564.8 0 1.536-.213 2.105-.603.57-.39.94-.916 1.175-1.65.076-.235.135-.558.177-.93a10.9 10.9 0 0 0 .043-1.207v-.82c0-.095-.047-.142-.14-.142h-3.064c-.094 0-.14.047-.14.141v.956c0 .094.046.14.14.14h1.666c.056 0 .084.03.084.086 0 .36 0 .62-.036.865-.038.244-.1.447-.147.606-.108.335-.311.622-.608.851-.297.23-.68.345-1.15.345-.498 0-.942-.132-1.233-.4-.29-.27-.48-.657-.58-1.164-.036-.217-.06-.49-.06-.762a9.042 9.042 0 0 1 .002-.283c.03-.576.123-1.066.28-1.47.158-.404.395-.722.713-.96.32-.24.733-.36 1.238-.36.465 0 .853.109 1.163.327.31.22.533.505.672.858.026.084.078.127.156.127h1.073c.094 0 .14-.047.14-.14v-.134a3.235 3.235 0 0 0-.16-.741 3.206 3.206 0 0 0-.395-.751 3.066 3.066 0 0 0-.65-.669 3.254 3.254 0 0 0-.902-.45A4.048 4.048 0 0 0 19.586 0zm-8.614 7.27c-.517 0-.907.2-1.217.59-.31.392-.465.883-.465 1.472 0 .59.155 1.08.465 1.472.31.39.7.59 1.217.59.526 0 .918-.197 1.179-.59.26-.392.39-.883.39-1.472 0-.59-.13-1.08-.39-1.472-.26-.392-.655-.59-1.18-.59zm-7.977 3.16c-.067 0-.14.05-.162.158-.022.11.036.197.122.245l2.73 1.5c.09.054.19.056.28 0l2.74-1.5c.086-.047.143-.135.12-.245-.02-.108-.094-.158-.162-.158H2.995zm0 2.15c-.067 0-.14.05-.162.158-.022.11.036.197.122.245l2.73 1.5c.09.054.19.056.28 0l2.74-1.5c.086-.048.143-.135.12-.245-.02-.108-.094-.158-.162-.158H2.995zm.06 2.016c-.067 0-.14.05-.16.157a.236.236 0 0 0 .12.245l2.726 1.5c.09.054.19.056.28 0l2.74-1.5a.236.236 0 0 0 .12-.245c-.02-.108-.094-.157-.161-.157H3.055z"/>
                    </svg>
                  </a>
                )}
                <a
                  href={`mailto:${personal.email}`}
                  className="p-2 text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Email"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Hero Profile Image */}
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 float-animation">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-background shadow-2xl">
                  <Image
                    src="/images/profile.jpg"
                    alt={personal.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 section-alt">
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

            {/* Skills */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-6">Skills & Expertise</h3>
              <div className="space-y-6">
                {skills.map((skillGroup, index) => (
                  <div key={index}>
                    <h4 className="text-sm font-medium text-primary mb-3">{skillGroup.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-sm bg-muted text-muted-foreground rounded-md hover:bg-primary hover:text-white transition-colors cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-16">Experience</h2>

          <div className="relative">
            {/* Timeline center line - visible on lg screens */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent -translate-x-1/2" />

            <div className="space-y-8 lg:space-y-12">
              {workExperience.map((exp, index) => {
                const isResearch = exp.title.toLowerCase().includes('research') || exp.title.toLowerCase().includes('postdoc') || exp.title.toLowerCase().includes('scholar');

                return (
                  <div
                    key={index}
                    className={`relative flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8 ${
                      index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    }`}
                  >
                    {/* Timeline node - centered on lg screens */}
                    <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 z-10">
                      <div className="experience-node">
                        {isResearch ? (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        )}
                      </div>
                    </div>

                    {/* Date badge - side placement on lg */}
                    <div className={`lg:w-[calc(50%-2rem)] flex ${index % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'}`}>
                      <div className="experience-date-badge">
                        <svg className="w-4 h-4 mr-2 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {exp.startDate} — {exp.endDate}
                      </div>
                    </div>

                    {/* Card */}
                    <div className="lg:w-[calc(50%-2rem)]">
                      <div className="experience-card group">
                        {/* Accent bar */}
                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-primary/30 rounded-l-xl" />

                        {/* Mobile timeline indicator */}
                        <div className="lg:hidden absolute -left-6 top-6 experience-node-mobile">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>

                        <div className="pl-4">
                          {/* Header */}
                          <div className="mb-4">
                            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                              {exp.title}
                            </h3>
                            <p className="text-primary font-semibold text-lg">{exp.organization}</p>
                            {exp.location && (
                              <p className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {exp.location}
                              </p>
                            )}
                          </div>

                          {/* Description */}
                          {exp.description && (
                            <p className="text-muted-foreground mb-4 leading-relaxed">
                              {exp.description}
                            </p>
                          )}

                          {/* Highlights */}
                          {exp.highlights && exp.highlights.length > 0 && (
                            <ul className="space-y-2">
                              {exp.highlights.map((h, i) => (
                                <li key={i} className="experience-highlight">
                                  <span className="experience-highlight-icon">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                  </span>
                                  <span className="text-sm text-muted-foreground">{h}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 section-alt">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-12">Education</h2>

          <EducationTimeline items={education} />
        </div>
      </section>

      {/* Research Impact / Analytics Section */}
      <section id="publications" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-12">Research Impact</h2>

          <ScholarAnalytics />

          <div className="mt-16">
            <h3 className="text-2xl font-bold text-foreground mb-8">Publications</h3>
            <PublicationsList publications={publications} />

            <div className="mt-8 text-center">
              <p className="text-muted-foreground">
                {publications.length} peer-reviewed publications in journals including Food Chemistry, Scientific Reports, and Food Control.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 section-alt">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-12">Research Projects</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group bg-card rounded-xl overflow-hidden border border-border card-hover"
              >
                {/* Project Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <span className="text-5xl font-bold text-primary/30">
                    {project.title.charAt(0)}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="section-title mx-auto mb-8">Get In Touch</h2>
            <p className="text-lg text-muted-foreground mb-8">
              I am open to research collaborations, academic discussions, and consulting opportunities.
              Whether you have questions about my research or want to explore potential collaborations,
              feel free to reach out!
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href={`mailto:${personal.email}`}
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Me
              </a>
              <a
                href={personal.social.googleScholar || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex items-center justify-center gap-2"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/>
                </svg>
                Google Scholar
              </a>
            </div>

            <div className="mt-8 flex justify-center gap-6">
              {personal.social.orcid && (
                <a
                  href={personal.social.orcid}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-muted-foreground hover:text-primary bg-card rounded-full border border-border hover:border-primary transition-all"
                  aria-label="ORCID"
                >
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-1.209-.619-3.722-3.853-3.722h-2.466z"/>
                  </svg>
                </a>
              )}
              {personal.social.googleScholar && (
                <a
                  href={personal.social.googleScholar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-muted-foreground hover:text-primary bg-card rounded-full border border-border hover:border-primary transition-all"
                  aria-label="Google Scholar"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/>
                  </svg>
                </a>
              )}
              {personal.social.researchgate && (
                <a
                  href={personal.social.researchgate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-muted-foreground hover:text-primary bg-card rounded-full border border-border hover:border-primary transition-all"
                  aria-label="ResearchGate"
                >
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.97.936-1.213 1.68a3.193 3.193 0 0 0-.112.437 8.365 8.365 0 0 0-.078.53 9 9 0 0 0-.05.727c-.01.282-.013.621-.013 1.016a31.121 31.123 0 0 0 .014 1.017 9 9 0 0 0 .05.727 7.946 7.946 0 0 0 .078.53h-.005a3.334 3.334 0 0 0 .112.438c.244.743.65 1.303 1.214 1.68.565.376 1.256.564 2.075.564.8 0 1.536-.213 2.105-.603.57-.39.94-.916 1.175-1.65.076-.235.135-.558.177-.93a10.9 10.9 0 0 0 .043-1.207v-.82c0-.095-.047-.142-.14-.142h-3.064c-.094 0-.14.047-.14.141v.956c0 .094.046.14.14.14h1.666c.056 0 .084.03.084.086 0 .36 0 .62-.036.865-.038.244-.1.447-.147.606-.108.335-.311.622-.608.851-.297.23-.68.345-1.15.345-.498 0-.942-.132-1.233-.4-.29-.27-.48-.657-.58-1.164-.036-.217-.06-.49-.06-.762a9.042 9.042 0 0 1 .002-.283c.03-.576.123-1.066.28-1.47.158-.404.395-.722.713-.96.32-.24.733-.36 1.238-.36.465 0 .853.109 1.163.327.31.22.533.505.672.858.026.084.078.127.156.127h1.073c.094 0 .14-.047.14-.14v-.134a3.235 3.235 0 0 0-.16-.741 3.206 3.206 0 0 0-.395-.751 3.066 3.066 0 0 0-.65-.669 3.254 3.254 0 0 0-.902-.45A4.048 4.048 0 0 0 19.586 0z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
