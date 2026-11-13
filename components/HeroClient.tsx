import Image from "next/image";
import type { ComponentType } from "react";
import { Github, GraduationCap, Linkedin, Mail, type LucideIcon } from "lucide-react";
import {
  AnalysisIcon,
  BenchIcon,
  CropIcon,
  DataScienceIcon,
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
  {
    label: "Study",
    value: "California field crop diseases, including Grapevine Red Blotch Virus",
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
  { label: "Plant pathology", className: "border-biology/20 bg-biology-wash text-biology-strong" },
  { label: "Computational biologist", className: "border-data/20 bg-data-wash text-data-strong" },
];

const links: Array<{ label: string; href: string; icon: LucideIcon }> = [
  { label: personal.email, href: `mailto:${personal.email}`, icon: Mail },
  { label: "GitHub", href: personal.social.github, icon: Github },
  { label: "LinkedIn", href: personal.social.linkedin, icon: Linkedin },
  { label: "Google Scholar", href: personal.social.googleScholar, icon: GraduationCap },
];

// The plate under the portrait: where the work happens, one family colour each.
const practice = [
  { label: "Field", icon: FieldIcon, tone: "text-field" },
  { label: "Bench", icon: BenchIcon, tone: "text-biology" },
  { label: "Code", icon: DataScienceIcon, tone: "text-data" },
];

export default function HeroClient() {
  return (
    <section id="about" className="guided-scroll-section room-merlot pt-16">
      <div className="mx-auto grid max-w-[100rem] gap-x-10 gap-y-12 px-4 pb-10 pt-10 sm:px-6 lg:grid-cols-12 lg:px-8 lg:pb-8 lg:pt-10">
        <div className="lg:col-span-7">
          <h1 className="text-[clamp(3rem,6.6vw,7rem)] leading-[0.94] text-foreground">
            {personal.name}
          </h1>
          <p className="mt-6 text-lg font-semibold text-accent">{personal.heroRole}</p>
          <p className="mt-5 max-w-[22ch] font-serif text-3xl leading-[1.12] text-foreground sm:text-4xl">
            {personal.heroStatement}
          </p>
          <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-muted-foreground">
            {personal.heroBio}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li
                key={tag.label}
                className={`rounded-[4px] border px-3 py-1 text-xs font-semibold ${tag.className}`}
              >
                {tag.label}
              </li>
            ))}
          </ul>
          <p className="mt-3 max-w-[60ch] text-sm leading-normal text-muted-foreground">
            {personal.openTo}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#capabilities" className="btn-primary">
              Explore research
            </a>
            <a href="/Prem_Pratap_Singh_Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-outline">
              CV
            </a>
          </div>
          <ul className="mt-7 flex flex-wrap gap-2 text-sm">
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
        </div>

        {/* The portrait hangs framed on the wall, with its caption plate under it. */}
        <figure className="mx-auto w-full max-w-md self-start lg:col-span-5 lg:mx-0 lg:justify-self-end">
          <div className="bg-card p-4 [box-shadow:var(--shadow-float),0_0_0_12px_#2a0b15] sm:p-6">
            <div className="relative aspect-[4/5] w-full">
              <Image
                src="/images/portrait.jpg"
                alt={personal.name}
                fill
                sizes="(min-width: 1024px) 26rem, 90vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
          {/* The name is already the page title, so the plate carries only the three places the work happens. */}
          <figcaption
            aria-hidden="true"
            className="mt-9 grid grid-cols-3 divide-x divide-border border-y border-border"
          >
            {practice.map((item) => {
              const Icon = item.icon;
              return (
                <span
                  key={item.label}
                  className="flex items-center justify-center gap-2 py-3 text-lg font-bold text-foreground sm:text-xl"
                >
                  <Icon className={`size-6 sm:size-7 ${item.tone}`} />
                  {item.label}
                </span>
              );
            })}
          </figcaption>
        </figure>
      </div>

      {/* The top of the next room: the first three exhibits, one step from the door. */}
      <div className="room-green">
        <ul className="mx-auto grid max-w-[100rem] gap-4 px-4 pt-8 sm:grid-cols-3 sm:px-6 lg:px-8">
          {projects.slice(0, 3).map((project) => (
            <li key={project.title}>
              <a
                href="#projects"
                className="paper-panel block h-full p-4 text-base font-semibold leading-snug text-foreground hover:text-primary"
              >
                {project.title}
              </a>
            </li>
          ))}
        </ul>
        <div className="mx-auto max-w-[100rem] px-4 pt-6 sm:px-6 lg:px-8">
          <dl className="paper-panel grid divide-y divide-border text-sm leading-normal lg:grid-cols-4 lg:divide-x lg:divide-y-0">
            {facts.map((fact) => {
              const Icon = fact.icon;
              return (
                <div key={fact.label} className="flex items-start gap-4 p-5">
                  <span
                    className={`icon-stamp ${tile[fact.tone]}`}
                    aria-hidden="true"
                  >
                    <Icon size={22} />
                  </span>
                  <div>
                    <dt className="font-semibold text-foreground">{fact.label}</dt>
                    <dd className="mt-1 tabular-nums text-foreground">{fact.value}</dd>
                  </div>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </section>
  );
}
