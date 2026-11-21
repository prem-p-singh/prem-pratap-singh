import { GitHubMark } from "@/components/icons/BrandIcons";
import { AnalysisIcon, DataScienceIcon, ResearchDeliveryIcon, type IconProps } from "@/components/icons/PortfolioIcons";
import { featuredSoftware as featured, software } from "@/profile/software";
import type { ComponentType } from "react";

// One icon and family per card, written out in full so Tailwind can see every class.
const cardStyles: Array<{ icon: ComponentType<IconProps>; tile: string; tag: string }> = [
  { icon: AnalysisIcon, tile: "bg-field-wash text-field", tag: "border-field/20 bg-field-wash text-field" },
  { icon: DataScienceIcon, tile: "bg-data-wash text-data", tag: "border-data/20 bg-data-wash text-data" },
  { icon: ResearchDeliveryIcon, tile: "bg-biology-wash text-biology", tag: "border-biology/20 bg-biology-wash text-biology" },
];

export default function SoftwareShowcase() {
  return (
    <div className="grid gap-5">
      <article className="paper-panel" aria-labelledby="featured-software-title">
        <span className="absolute inset-x-0 top-0 h-1.5 bg-primary" aria-hidden="true" />
        <div className="grid items-center lg:grid-cols-2">
        <div className="p-6 sm:p-8 lg:p-12">
          <ul className="flex flex-wrap gap-2">
            <li className="rounded-none border border-decision/30 bg-decision-wash px-3 py-1 text-xs font-medium text-decision">
              New release
            </li>
            <li className="rounded-none border border-border bg-card px-3 py-1 text-xs font-medium text-foreground">
              {featured.name} {featured.version}, {featured.released}
            </li>
          </ul>

          <h3
            id="featured-software-title"
            className="mt-5 max-w-[22ch] text-[length:var(--text-3xl)] leading-tight"
          >
            {featured.headline}
          </h3>
          <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-foreground">{featured.summary}</p>

          <dl className="mt-6 grid gap-3 sm:grid-cols-3">
            {featured.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse rounded-none bg-field-wash px-4 py-3">
                <dt className="text-sm leading-snug text-foreground">{stat.label}</dt>
                <dd className="font-serif text-3xl font-medium tabular-nums text-field">{stat.value}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Features">
            {featured.features.map((feature) => (
              <li
                key={feature}
                className="rounded-none border border-data/20 bg-data-wash px-3 py-1 text-xs font-medium text-data"
              >
                {feature}
              </li>
            ))}
          </ul>
                <div className="mt-8 flex flex-wrap gap-3">
          <a href={featured.url} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
            <GitHubMark className="size-5" />
            View on GitHub
          </a>
          <a href={featured.releaseUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
            Release notes
          </a>
        </div>
        </div>

        <div className="photo-frame bg-paper-2 lg:mr-12">
          {/* Muted and looping like a product spot; the controls let visitors pause it. */}
          <video
            className="aspect-video h-auto w-full"
            src={featured.video.src}
            poster={featured.video.poster}
            aria-label={featured.video.label}
            autoPlay
            muted
            loop
            playsInline
            controls
            preload="metadata"
          />
        </div>
        </div>
      </article>

      <ul className="grid gap-5 md:grid-cols-3">
        {software.map((repo, index) => {
          const style = cardStyles[index % cardStyles.length];
          return (
            <li key={repo.name} className="paper-panel">
              <div className="flex h-full flex-col gap-4 p-6">
                <div>
                  <h3 className="text-lg font-medium leading-snug text-foreground">{repo.name}</h3>
                  <p className="mt-2 text-sm leading-snug text-muted-foreground">{repo.summary}</p>
                </div>
                <ul className="flex flex-wrap gap-2">
                  <li className={`rounded-none border px-3 py-1 text-xs font-medium ${style.tag}`}>{repo.language}</li>
                  {repo.status && (
                    <li className="rounded-none border border-border bg-card px-3 py-1 text-xs font-medium text-foreground">
                      {repo.status}
                    </li>
                  )}
                </ul>
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-field underline underline-offset-4"
                >
                  <GitHubMark className="size-5" />
                  View repository
                  <span className="sr-only">: {repo.name}</span>
                </a>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
