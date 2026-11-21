import Image from "next/image";
import type { ComponentType, SVGProps } from "react";
import { Mail } from "lucide-react";
import { GitHubMark, LinkedInMark, ScholarMark } from "@/components/icons/BrandIcons";
import { workExperience } from "@/profile/experience";
import { personal } from "@/profile/personal";
import { projects } from "@/profile/projects";
import { bookChapters, publications } from "@/profile/publications";

const currentRole = workExperience.find(
  (role) => role.endDate === "Present" && role.organization.includes("Davis")
);
const study = projects[0];
const articleCount = publications.filter(
  (publication) => publication.venue !== "In Preparation"
).length;

// The profile facts, set as ruled rows beside the portrait.
const facts: Array<{ label: string; value: string }> = [
  ...(currentRole
    ? [{ label: "Now", value: `${currentRole.title}, ${currentRole.organization}` }]
    : []),
  {
    label: "Study",
    value: "California field crop diseases, including Grapevine Red Blotch Virus",
  },
  { label: "Methods", value: study.tech.join(", ") },
  {
    label: "Published",
    value: `${articleCount} peer-reviewed articles, ${bookChapters.length} book chapters`,
  },
];

// The first screen holds six rows; the full set is the projects section.
const leadProjects = projects.slice(0, 6);

const tags = ["UC Davis", "Plant pathology", "Computational biologist"];

const links: Array<{ label: string; href: string; icon: ComponentType<SVGProps<SVGSVGElement>> }> = [
  { label: personal.email, href: `mailto:${personal.email}`, icon: Mail },
  { label: "GitHub", href: personal.social.github, icon: GitHubMark },
  { label: "LinkedIn", href: personal.social.linkedin, icon: LinkedInMark },
  { label: "Google Scholar", href: personal.social.googleScholar, icon: ScholarMark },
];

// The role line is stored joined with dots; the page sets one role to a cell.
const roles = personal.heroRole.split(" · ");

// The bio's first sentence heads the profile; the rest is its paragraph.
const bioBreak = personal.heroBio.indexOf(". ") + 1;
const bioHead = personal.heroBio.slice(0, bioBreak);
const bioBody = personal.heroBio.slice(bioBreak).trim();

export default function HeroClient() {
  return (
    <>
      {/* Poster hero: cropland fills the first screen; the name, one sentence
          and the actions rest low and left over a scrim in the page's green. */}
      <section
        id="about"
        className="guided-scroll-section relative flex min-h-[100dvh] items-end overflow-hidden pb-20 pt-32 max-lg:min-h-[86dvh] max-lg:pb-12"
      >
        <div
          data-slot="hero"
          data-alt="Your own field: a vineyard block or crop rows you have sampled, wide, in low light"
          className="absolute inset-0"
        >
          <Image
            src="/images/photos/palousefromsteptoebuttemay2023-2-1920.jpg"
            alt="Rolling green wheat fields in low morning light, seen from above"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_72%]"
          />
        </div>
        {/* The scrim sits above the slot's picture, behind the text's side only. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[2] bg-[linear-gradient(90deg,color-mix(in_oklab,var(--color-paper)_90%,transparent)_0%,color-mix(in_oklab,var(--color-paper)_68%,transparent)_38%,color-mix(in_oklab,var(--color-paper)_12%,transparent)_78%),linear-gradient(0deg,color-mix(in_oklab,var(--color-paper)_82%,transparent)_0%,transparent_46%)]"
        />
        <div className="shell relative z-[3]">
          <h1>{personal.name}</h1>
          <p className="lead mt-6 text-ink">{personal.heroStatement}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#capabilities" className="btn-primary">
              Explore research
            </a>
            <a
              href="/Prem_Pratap_Singh_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline bg-paper"
            >
              CV
            </a>
          </div>
        </div>
      </section>

      {/* The work, set as a field guide: the project, its field, its result. */}
      <section aria-label="Research projects at a glance" className="py-[var(--section-gap-s)]">
        <div className="shell">
          <ol className="index-list">
            {leadProjects.map((project) => (
              <li key={project.title}>
                <a
                  href="#projects"
                  className="group grid items-baseline gap-x-8 gap-y-1 py-5 no-underline hover:bg-paper-2 lg:grid-cols-12"
                >
                  <span className="font-display text-[length:var(--text-2xl)] leading-tight text-ink lg:col-span-6">
                    {project.title}
                  </span>
                  <span className="text-xs font-medium text-muted lg:col-span-3">{project.category}</span>
                  {project.resultStat && (
                    <span className="figure text-2xl text-ink-2 group-hover:text-accent lg:col-span-3 lg:whitespace-nowrap lg:text-right">
                      {project.resultStat}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm">
            <a href="#projects" className="text-ink underline-offset-4 hover:decoration-2">
              All {projects.length} research projects
            </a>
          </p>
        </div>
      </section>

      {/* The profile: the portrait beside the facts a recruiter reads first. */}
      <section aria-labelledby="profile-title" className="bg-paper-2 py-[var(--section-gap-s)]">
        <div className="shell grid items-center gap-x-8 gap-y-12 lg:grid-cols-12">
          <figure className="mx-auto w-full max-w-md lg:col-span-5 lg:mx-0 lg:max-w-none">
            <div className="photo-frame relative aspect-[4/5] w-full overflow-hidden bg-paper-3">
              <Image
                src="/images/portrait.jpg"
                alt={personal.name}
                fill
                sizes="(min-width: 1024px) 32rem, 90vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-4 text-xs font-medium text-muted">
              <ul className="flex flex-wrap divide-x divide-rule">
                {roles.map((role) => (
                  <li key={role} className="px-4 first:pl-0 last:pr-0">
                    {role}
                  </li>
                ))}
              </ul>
            </figcaption>
          </figure>

          <div className="lg:col-span-6 lg:col-start-7">
            <h2 id="profile-title" className="text-[length:var(--text-display-s)]">
              {bioHead}
            </h2>
            <p className="lead mt-6 text-ink-2">{bioBody}</p>

            <dl className="mt-10 border-t border-rule text-sm">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="grid gap-x-8 gap-y-1 border-b border-rule py-4 sm:grid-cols-[7rem_minmax(0,1fr)]"
                >
                  <dt className="text-xs font-medium leading-6 text-muted">{fact.label}</dt>
                  <dd className="tabular-nums text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-8 max-w-[60ch] text-ink-2">{personal.openTo}</p>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-muted">
              {tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>

            <ul className="mt-8 flex flex-wrap gap-2 text-xs font-medium">
              {links.map((link) => {
                const external = !link.href.startsWith("mailto:");
                const Icon = link.icon;
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="paper-control inline-flex min-h-11 items-center gap-2 px-4"
                    >
                      <Icon className="size-5 shrink-0 text-ink" strokeWidth={1.8} aria-hidden="true" />
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
