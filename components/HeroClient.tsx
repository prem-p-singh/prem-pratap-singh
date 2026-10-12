import Image from "next/image";
import type { ComponentType } from "react";
import { Github, GraduationCap, Linkedin, Mail, type LucideIcon } from "lucide-react";
import {
  AnalysisIcon,
  CropIcon,
  FieldIcon,
  ResearchDeliveryIcon,
  type IconProps,
} from "@/components/icons/PortfolioIcons";
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

// Icon tile colours, one per family.
const tile = {
  field: "bg-field-wash text-field",
  data: "bg-data-wash text-data",
  decision: "bg-decision-wash text-decision",
};

const facts: Array<{
  label: string;
  value: string;
  icon: ComponentType<IconProps>;
  tone: keyof typeof tile;
}> = [
  ...(currentRole
    ? [
        {
          label: "Now",
          value: `${currentRole.title}, ${currentRole.organization}`,
          icon: CropIcon,
          tone: "field" as const,
        },
      ]
    : []),
  // Wording from the study description in profile/projects.ts.
  {
    label: "Study",
    value:
      "Grapevine Red Blotch Virus, 327 vine samples across two growing seasons and four ripening stages",
    icon: FieldIcon,
    tone: "field",
  },
  { label: "Methods", value: study.tech.join(", "), icon: AnalysisIcon, tone: "data" },
  {
    label: "Published",
    value: `${articleCount} peer-reviewed articles, ${bookChapters.length} book chapters`,
    icon: ResearchDeliveryIcon,
    tone: "decision",
  },
];

// The third tag of the previous design repeated the open-to-roles sentence below, so it stays out.
const tags = [
  { label: "UC Davis", className: "border-field/20 bg-field-wash text-field-strong" },
  { label: "Grapevine virology", className: "border-biology/20 bg-biology-wash text-biology" },
];

const links: Array<{ label: string; href: string; icon: LucideIcon }> = [
  { label: personal.email, href: `mailto:${personal.email}`, icon: Mail },
  { label: "GitHub", href: personal.social.github, icon: Github },
  { label: "LinkedIn", href: personal.social.linkedin, icon: Linkedin },
  { label: "Google Scholar", href: personal.social.googleScholar, icon: GraduationCap },
];

const portraitLabel =
  "absolute rounded-full border bg-card px-4 py-2 text-sm font-semibold leading-none shadow-sm";

export default function HeroClient() {
  return (
    <section id="about" data-guided-scroll-section className="guided-scroll-section pt-16">
      <div className="mx-auto grid max-w-6xl gap-x-8 gap-y-12 px-4 pb-10 pt-10 sm:px-6 sm:pt-12 lg:grid-cols-12 lg:px-8 lg:pb-14 lg:pt-14">
        <div className="lg:col-span-7">
          <h1 className="name-gradient text-4xl leading-tight text-foreground sm:text-5xl lg:text-6xl">
            {personal.name}
          </h1>
          <p className="mt-4 text-lg font-medium text-foreground">{personal.heroRole}</p>
          <p className="mt-5 max-w-[60ch] font-serif text-base leading-relaxed text-foreground">
            {personal.heroBio}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li
                key={tag.label}
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${tag.className}`}
              >
                {tag.label}
              </li>
            ))}
          </ul>
          <p className="mt-3 max-w-[60ch] text-sm leading-normal text-muted-foreground">
            {personal.openTo}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#capabilities" className="btn-primary">
              Explore research
            </a>
            <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="btn-outline">
              CV
            </a>
          </div>
          <ul className="mt-5 flex flex-wrap gap-2 text-sm">
            {links.map((link) => {
              const external = !link.href.startsWith("mailto:");
              const Icon = link.icon;
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="paper-control inline-flex items-center gap-2 px-3 py-2 text-foreground hover:text-field"
                  >
                    <Icon className="size-4 text-field" strokeWidth={1.8} aria-hidden="true" />
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <dl className="paper-panel mt-10 divide-y divide-border px-5 text-sm leading-normal sm:px-6">
            {facts.map((fact) => {
              const Icon = fact.icon;
              return (
                <div
                  key={fact.label}
                  className="relative grid min-h-19 content-center gap-x-4 py-4 pl-15 sm:grid-cols-[5.5rem_1fr]"
                >
                  <dt className="font-semibold text-foreground">
                    <span
                      className={`absolute inset-y-0 left-0 my-auto flex size-11 items-center justify-center rounded-xl ${tile[fact.tone]}`}
                    >
                      <Icon size={22} />
                    </span>
                    {fact.label}
                  </dt>
                  <dd className="tabular-nums text-muted-foreground sm:text-foreground">
                    {fact.value}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>

        <div className="flex justify-center lg:col-span-5 lg:justify-end">
          <div className="relative size-72 sm:size-80 xl:size-96">
            <div className="size-full rounded-full border-2 border-field p-1.5 shadow-xl">
              <div className="relative size-full overflow-hidden rounded-full">
                <Image
                  src="/images/headshot-1.jpg"
                  alt={personal.name}
                  fill
                  sizes="(min-width: 1280px) 24rem, (min-width: 640px) 20rem, 18rem"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <span className={`${portraitLabel} -left-2 top-10 border-field/30 text-field`}>
              Field
            </span>
            <span className={`${portraitLabel} -right-2 top-1/2 border-biology/30 text-biology`}>
              Bench
            </span>
            <span className={`${portraitLabel} bottom-6 left-4 border-data/30 text-data`}>
              Code
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
