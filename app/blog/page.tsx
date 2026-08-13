import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Dna, ScanSearch, Sprout } from "lucide-react";
import BlogSearchList from "@/components/blog/BlogSearchList";
import { formatContentDate } from "@/lib/date";
import { getAllPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Blog",
  description: "Visual field notes on plant disease, grapevine virology, molecular signals, and multi-omics.",
  alternates: { canonical: "/blog" },
};

const topicNodes = [
  { label: "Field", icon: Sprout, tone: "bg-field-wash text-field" },
  { label: "Signals", icon: Dna, tone: "bg-biology-wash text-biology" },
  { label: "Models", icon: ScanSearch, tone: "bg-data-wash text-data" },
];

export default function BlogPage() {
  const posts = getAllPosts();
  const featured = posts[0];
  const library = posts.slice(1);

  return (
    <div className="min-h-screen pt-16">
      <section className="bg-gradient-to-b from-muted to-background pb-12 pt-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div>
            <p className="section-kicker">Research notebook</p>
            <h1 className="mt-3 text-4xl font-bold text-foreground sm:text-5xl">
              See the idea before reading the details
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Visual field notes on plants, pathogens, measurements, and models.
            </p>
          </div>

          <div className="paper-panel bg-card p-5 sm:p-6">
            <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2">
              {topicNodes.map((topic, index) => {
                const Icon = topic.icon;
                return (
                  <div key={topic.label} className="contents">
                    <div className="flex flex-col items-center text-center">
                      <span className={`flex size-14 items-center justify-center rounded-2xl ${topic.tone}`}>
                        <Icon className="size-6" strokeWidth={1.7} aria-hidden="true" />
                      </span>
                      <span className="mt-2 text-xs font-bold text-foreground">{topic.label}</span>
                    </div>
                    {index < topicNodes.length - 1 && <ArrowRight className="size-4 text-muted-foreground/50" aria-hidden="true" />}
                  </div>
                );
              })}
            </div>
            <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Published notes</span>
              <span className="text-3xl font-black text-foreground">{posts.length}</span>
            </div>
          </div>
        </div>
      </section>

      {featured && (
        <section className="pb-6 sm:pb-8">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <Link
              href={`/blog/${featured.slug}`}
              className="paper-panel group grid overflow-hidden bg-card transition-all hover:border-field/60 lg:grid-cols-2"
            >
              <div className="relative min-h-[300px] overflow-hidden bg-muted">
                {featured.image ? (
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="relative flex h-full min-h-[300px] items-center justify-center overflow-hidden bg-gradient-to-br from-field-wash via-card to-biology-wash">
                    <span className="absolute -left-20 -top-20 size-64 rounded-full border border-field/20" />
                    <span className="absolute -bottom-28 -right-20 size-72 rounded-full border border-biology/20" />
                    <BookOpen className="size-20 text-foreground/15" strokeWidth={1.2} aria-hidden="true" />
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Latest field note</span>
                <h2 className="mt-3 text-2xl font-bold leading-tight text-foreground transition-colors group-hover:text-primary sm:text-3xl">
                  {featured.title}
                </h2>
                <div className="mt-6 flex items-center gap-2 border-t border-border pt-4 text-sm text-muted-foreground">
                  <time dateTime={featured.date}>
                    {formatContentDate(featured.date, { year: "numeric", month: "short", day: "numeric" })}
                  </time>
                  <span>·</span>
                  <span>{featured.readingTime}</span>
                  <ArrowRight className="ml-auto size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {library.length > 0 && (
        <section className="border-t border-border py-6 sm:py-8">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <BlogSearchList posts={library} />
          </div>
        </section>
      )}
    </div>
  );
}
