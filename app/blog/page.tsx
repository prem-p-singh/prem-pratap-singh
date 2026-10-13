import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BlogSearchList from "@/components/blog/BlogSearchList";
import { DataScienceIcon, FieldIcon, OmicsIcon } from "@/components/icons/PortfolioIcons";
import { formatContentDate } from "@/lib/date";
import { getAllPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Blog",
  description: "Visual field notes on plant disease, grapevine virology, molecular signals, and multi-omics.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: "/blog",
    siteName: "Prem Pratap Singh",
    title: "Research Blog | Prem Pratap Singh",
    description: "Visual field notes on plant disease, grapevine virology, molecular signals, and multi-omics.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Prem Pratap Singh research blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Research Blog | Prem Pratap Singh",
    description: "Visual field notes on plant disease, grapevine virology, molecular signals, and multi-omics.",
    images: ["/opengraph-image"],
  },
};

// Families as the previous design had them: field, then biology, then data.
const topicNodes = [
  { label: "Field", icon: FieldIcon, tile: "bg-field-wash text-field" },
  { label: "Signals", icon: OmicsIcon, tile: "bg-biology-wash text-biology" },
  { label: "Models", icon: DataScienceIcon, tile: "bg-data-wash text-data" },
];

// The card shows this many tags, then a count of the rest.
const MAX_TAGS = 3;

const tagClass =
  "rounded-full border border-field/20 bg-field-wash px-3 py-1 text-xs font-semibold text-field";

export default function BlogPage() {
  const posts = getAllPosts();
  const featured = posts[0];
  const library = posts.slice(1);
  const featuredImage = featured?.visualSummary || featured?.image;
  // Without an image the first tag sits in the tinted band, so the list below starts at the second.
  const featuredTags = featured ? (featuredImage ? featured.tags : featured.tags.slice(1)) : [];

  return (
    <div className="min-h-screen pt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="grid gap-x-8 gap-y-8 pb-10 pt-10 sm:pt-12 lg:grid-cols-12 lg:items-end lg:pt-14">
          <div className="lg:col-span-7">
            <p className="section-kicker">Research notebook</p>
            <h1 className="mt-3 text-4xl leading-tight text-foreground sm:text-5xl lg:text-6xl">
              See the idea before reading the details
            </h1>
            <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-muted-foreground">
              Visual field notes on plants, pathogens, measurements, and models.
            </p>
          </div>

          <div className="paper-panel p-5 sm:p-6 lg:col-span-5">
            {/* The arrows mark a real order: field observation, then signals, then models. */}
            <ol className="flex items-center justify-between gap-2">
              {topicNodes.map((topic, index) => {
                const Icon = topic.icon;
                return (
                  <li key={topic.label} className="contents">
                    {index > 0 && (
                      <ArrowRight className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                    )}
                    <span className="flex flex-col items-center gap-2 text-sm font-semibold text-foreground">
                      <span
                        className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${topic.tile}`}
                      >
                        <Icon size={22} />
                      </span>
                      {topic.label}
                    </span>
                  </li>
                );
              })}
            </ol>
            <p className="mt-5 flex items-end justify-between gap-4 border-t border-border pt-4 text-sm font-semibold text-muted-foreground">
              Published notes{" "}
              <span className="font-serif text-4xl leading-none tabular-nums text-field">
                {posts.length}
              </span>
            </p>
          </div>
        </header>

        {featured && (
          <article className={`paper-panel ${featuredImage ? "grid lg:grid-cols-5 lg:items-center" : ""}`}>
            {featuredImage ? (
              <div className="p-5 pb-0 sm:p-6 sm:pb-0 lg:col-span-3 lg:pb-6 lg:pr-0">
                <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-card">
                  <Image
                    src={featuredImage}
                    alt={featured.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 660px"
                    className="object-contain"
                  />
                </div>
              </div>
            ) : (
              // No image: a tinted band with the notebook's field icon and the post's first tag.
              <div className="flex items-center justify-between gap-4 border-b border-border bg-field-wash px-6 py-5 sm:px-8">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-card text-field">
                  <FieldIcon size={22} />
                </span>
                {featured.tags[0] && (
                  <span className="rounded-full border border-field/20 bg-card px-3 py-1 text-xs font-semibold text-field">
                    {featured.tags[0]}
                  </span>
                )}
              </div>
            )}
            <div className={`p-6 sm:p-8 ${featuredImage ? "lg:col-span-2" : ""}`}>
              <p className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-sm tabular-nums text-muted-foreground">
                <span className="font-semibold">Latest field note</span>
                <span className="flex items-center gap-2">
                  <time dateTime={featured.date}>
                    {formatContentDate(featured.date, { year: "numeric", month: "short", day: "numeric" })}
                  </time>
                  <span aria-hidden="true">·</span>
                  <span>{featured.readingTime}</span>
                </span>
              </p>
              <h2 className="mt-3 text-2xl leading-tight text-foreground sm:text-3xl">
                {/* The link's ::after covers the card, so the image or band is clickable too. */}
                <Link
                  href={`/blog/${featured.slug}`}
                  className="underline-offset-4 after:absolute after:inset-0 hover:underline"
                >
                  {featured.title}
                </Link>
              </h2>
              {featured.description && (
                <p className="mt-3 line-clamp-3 max-w-[60ch] text-base leading-relaxed text-muted-foreground">
                  {featured.description}
                </p>
              )}
              {featuredTags.length > 0 && (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {featuredTags.slice(0, MAX_TAGS).map((tag) => (
                    <li key={tag} className={tagClass}>
                      {tag}
                    </li>
                  ))}
                  {featuredTags.length > MAX_TAGS && (
                    <li className="rounded-full border border-border px-3 py-1 text-xs font-semibold tabular-nums text-muted-foreground">
                      +{featuredTags.length - MAX_TAGS}
                      <span className="sr-only"> more tags</span>
                    </li>
                  )}
                </ul>
              )}
            </div>
          </article>
        )}

        {library.length > 0 && <BlogSearchList posts={library} />}
      </div>
    </div>
  );
}
