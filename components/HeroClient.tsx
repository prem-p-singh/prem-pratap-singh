import Image from "next/image";
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

const facts = [
  currentRole && {
    label: "Now",
    value: `${currentRole.title}, ${currentRole.organization}`,
  },
  // Wording from the study description in profile/projects.ts.
  {
    label: "Study",
    value:
      "Grapevine Red Blotch Virus, 327 vine samples across two growing seasons and four ripening stages",
  },
  { label: "Methods", value: study.tech.join(", ") },
  {
    label: "Published",
    value: `${articleCount} peer-reviewed articles, ${bookChapters.length} book chapters`,
  },
].filter((fact) => !!fact);

const links = [
  { label: personal.email, href: `mailto:${personal.email}` },
  { label: "GitHub", href: personal.social.github },
  { label: "LinkedIn", href: personal.social.linkedin },
  { label: "Google Scholar", href: personal.social.googleScholar },
];

export default function HeroClient() {
  return (
    <section id="about" data-guided-scroll-section className="guided-scroll-section pt-16">
      <div className="mx-auto grid max-w-6xl gap-x-8 gap-y-10 px-4 pb-10 pt-10 sm:px-6 sm:pt-12 lg:grid-cols-12 lg:px-8 lg:pb-14 lg:pt-14">
        <div className="lg:col-span-7">
          <h1 className="text-4xl leading-tight text-foreground sm:text-5xl lg:text-6xl">
            {personal.name}
          </h1>
          <p className="mt-4 text-lg font-medium text-foreground">{personal.heroRole}</p>
          <p className="mt-5 max-w-[60ch] font-serif text-base leading-relaxed text-foreground">
            {personal.heroBio}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#capabilities" className="btn-primary">
              Explore research
            </a>
            <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="btn-outline">
              CV
            </a>
          </div>
          <p className="mt-5 max-w-[60ch] text-sm leading-normal text-muted-foreground">
            {personal.openTo}
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {links.map((link) => {
              const external = !link.href.startsWith("mailto:");
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="text-accent underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <dl className="mt-10 text-sm leading-normal">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="grid grid-cols-[5.5rem_1fr] gap-x-4 border-t border-border py-3 sm:grid-cols-[7rem_1fr]"
              >
                <dt className="text-muted-foreground">{fact.label}</dt>
                <dd className="tabular-nums text-foreground">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          <div className="relative aspect-[4/5] max-w-xs overflow-hidden rounded-md border border-border lg:max-w-none">
            <Image
              src="/images/headshot-1.jpg"
              alt={personal.name}
              fill
              sizes="(min-width: 1024px) 341px, 320px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
