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
        <header className="pb-10 pt-10 sm:pt-12 lg:pt-14">
          <p className="section-kicker">Open Data, Decoded</p>
          <h1 className="mt-3 text-4xl leading-tight text-foreground sm:text-5xl lg:text-6xl">
            What public data actually says
          </h1>
          <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-muted-foreground">
            Public plant-science datasets, turned into maps, charts, and reproducible conclusions.
          </p>
        </header>

        {posts.length > 0 ? (
          <ul className="grid gap-5 pb-16 lg:pb-24">
            {posts.map((post, index) => (
              <li
                key={post.slug}
                className="paper-panel grid gap-x-8 gap-y-6 p-6 sm:p-7 lg:grid-cols-12"
              >
                <span className="absolute inset-x-0 top-0 h-1 bg-data" aria-hidden="true" />
                <div className="lg:col-span-5">
                  {post.image && (
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-card">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        priority={index === 0}
                        sizes="(max-width: 1024px) 100vw, 440px"
                        className="object-contain"
                      />
                    </div>
                  )}
                  <dl className={`divide-y divide-border text-sm leading-normal ${post.image ? "mt-4" : ""}`}>
                    <div className="grid grid-cols-[7rem_1fr] gap-x-4 py-3">
                      <dt className="font-semibold text-foreground">Published</dt>
                      <dd className="tabular-nums text-muted-foreground">
                        <time dateTime={post.date}>
                          {formatContentDate(post.date, { year: "numeric", month: "short", day: "numeric" })}
                        </time>
                      </dd>
                    </div>
                    {typeof post.records === "number" && (
                      <div className="grid grid-cols-[7rem_1fr] gap-x-4 py-3">
                        <dt className="font-semibold text-foreground">Records</dt>
                        <dd className="tabular-nums text-muted-foreground">
                          {post.records.toLocaleString()}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
                <div className="flex flex-col lg:col-span-7">
                  {post.source && (
                    <p className="self-start rounded-full border border-data/20 bg-data-wash px-3 py-1 text-xs font-semibold text-data">
                      {post.source}
                    </p>
                  )}
                  <h2 className="mt-3 text-2xl leading-snug text-foreground">
                    {/* The link's ::after covers the card, so the figure is clickable too. */}
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
                  {post.keyStats && post.keyStats.length > 0 && (
                    <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:mt-auto lg:pt-5">
                      {post.keyStats.map((stat) => (
                        <div
                          key={stat.label}
                          className="flex flex-col-reverse justify-end rounded-xl bg-data-wash px-4 py-3"
                        >
                          <dt className="text-sm font-semibold leading-snug text-foreground">
                            {stat.label}
                          </dt>
                          <dd className="text-2xl font-semibold tabular-nums text-data">
                            {stat.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  <p className="mt-5 text-sm font-semibold text-data underline underline-offset-4">
                    Open visual story
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="paper-panel mb-16 p-6 sm:p-8 lg:mb-24">
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
