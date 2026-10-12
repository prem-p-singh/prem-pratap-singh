import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllMethodPosts } from "@/lib/methods";

export const metadata: Metadata = {
  title: "Methods That Travel",
  description:
    "Interactive statistical methods tested across crop research and public data.",
  alternates: { canonical: "/methods" },
};

/** Reads the count off the content folder so the intro cannot go stale. */
function methodCount(n: number): string {
  const words = ["No", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
  const word = words[n] ?? String(n);
  return `${word} ${n === 1 ? "way" : "ways"}`;
}

export default function MethodsPage() {
  const posts = getAllMethodPosts();

  return (
    <div className="min-h-screen pt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="pb-10 pt-10 sm:pt-12 lg:pt-14">
          <h1 className="text-4xl leading-tight text-foreground sm:text-5xl lg:text-6xl">
            Methods, made visible.
          </h1>
          <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-muted-foreground">
            {methodCount(posts.length)} to turn biological and public data into a decision you
            can inspect.
          </p>
        </header>

        {posts.length > 0 ? (
          <ul className="grid gap-5 pb-16 lg:pb-24">
            {posts.map((post, index) => (
              <li
                key={post.slug}
                className="paper-panel grid gap-x-8 gap-y-6 p-6 sm:p-7 lg:grid-cols-12"
              >
                <span className="absolute inset-x-0 top-0 h-1 bg-decision" aria-hidden="true" />
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
                  {(post.origin || post.reappliedTo) && (
                    <dl className={`divide-y divide-border text-sm leading-normal ${post.image ? "mt-4" : ""}`}>
                      {/* Label colours as the previous design had them: origin biology, re-test data. */}
                      <div className="grid grid-cols-[7rem_1fr] gap-x-4 py-3">
                        <dt className="font-semibold text-biology">Built in</dt>
                        <dd className="tabular-nums text-foreground">{post.origin || "Original study"}</dd>
                      </div>
                      <div className="grid grid-cols-[7rem_1fr] gap-x-4 py-3">
                        <dt className="font-semibold text-data">Re-tested on</dt>
                        <dd className="tabular-nums text-foreground">{post.reappliedTo || "Public data"}</dd>
                      </div>
                    </dl>
                  )}
                </div>
                <div className="flex flex-col lg:col-span-7">
                  {post.method && (
                    <p className="self-start rounded-full border border-decision/20 bg-decision-wash px-3 py-1 text-xs font-semibold text-decision">
                      {post.method}
                    </p>
                  )}
                  <h2 className="mt-3 text-2xl leading-snug text-foreground">
                    {/* The link's ::after covers the card, so the figure is clickable too. */}
                    <Link
                      href={`/methods/${post.slug}`}
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
                          className="flex flex-col-reverse justify-end rounded-xl bg-decision-wash px-4 py-3"
                        >
                          <dt className="text-sm font-semibold leading-snug text-foreground">
                            {stat.label}
                          </dt>
                          <dd className="text-2xl font-semibold tabular-nums text-decision">
                            {stat.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="paper-panel mb-16 p-6 sm:p-8 lg:mb-24">
            <h2 className="text-3xl leading-tight text-foreground">Case studies coming soon</h2>
          </div>
        )}
      </div>
    </div>
  );
}
