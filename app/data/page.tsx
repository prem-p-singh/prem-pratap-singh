import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllDataPosts } from "@/lib/data";
import { formatContentDate } from "@/lib/date";

export const metadata: Metadata = {
  title: "Open Data, Decoded",
  description:
    "Public datasets in plant science, read honestly. Reproducible analyses that turn raw open data into clear, defensible interpretation, with the code behind every figure.",
  alternates: { canonical: "/data" },
};

export default function DataPage() {
  const posts = getAllDataPosts();

  return (
    <div className="min-h-screen pt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="border-b border-border pb-10 pt-10 sm:pt-12 lg:pb-14 lg:pt-14">
          <p className="section-kicker">Open Data, Decoded</p>
          <h1 className="mt-3 text-4xl leading-tight text-foreground sm:text-5xl lg:text-6xl">
            What public data actually says
          </h1>
          <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-muted-foreground">
            Public plant-science datasets, turned into maps, charts, and reproducible conclusions.
          </p>
        </header>

        {posts.length > 0 ? (
          <ul className="py-10">
            {posts.map((post, index) => (
              <li
                key={post.slug}
                className={`relative grid gap-x-8 gap-y-5 border-t border-border py-8 first:border-t-0 first:pt-0 ${
                  post.image ? "md:grid-cols-12" : ""
                }`}
              >
                {post.image && (
                  <div className="relative aspect-video overflow-hidden rounded-md border border-border bg-card md:col-span-5">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw, 480px"
                      className="object-contain"
                    />
                  </div>
                )}
                <div className={post.image ? "md:col-span-7" : undefined}>
                  <p className="flex flex-wrap items-center gap-x-2 text-sm tabular-nums text-muted-foreground">
                    <time dateTime={post.date}>
                      {formatContentDate(post.date, { year: "numeric", month: "short", day: "numeric" })}
                    </time>
                    {post.source && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>{post.source}</span>
                      </>
                    )}
                    {typeof post.records === "number" && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>{post.records.toLocaleString()} records</span>
                      </>
                    )}
                  </p>
                  <h2 className="mt-2 text-2xl leading-snug text-foreground">
                    {/* The link's ::after covers the row, so the figure is clickable too. */}
                    <Link
                      href={`/data/${post.slug}`}
                      className="underline-offset-4 after:absolute after:inset-0 hover:underline"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  {post.description && (
                    <p className="mt-3 max-w-[60ch] text-base leading-relaxed text-muted-foreground">
                      {post.description}
                    </p>
                  )}
                  <p className="mt-3 text-sm text-accent">Open visual story</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="py-16">
            <h2 className="text-3xl leading-tight text-foreground">First analyses coming soon</h2>
            <p className="mt-3 max-w-[60ch] text-base leading-relaxed text-muted-foreground">
              Reproducible reads of public plant-science datasets are on the way.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
