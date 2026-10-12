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
        <header className="border-b border-border pb-10 pt-10 sm:pt-12 lg:pb-14 lg:pt-14">
          <h1 className="text-4xl leading-tight text-foreground sm:text-5xl lg:text-6xl">
            Methods, made visible.
          </h1>
          <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-muted-foreground">
            {methodCount(posts.length)} to turn biological and public data into a decision you
            can inspect.
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
                  {post.method && <p className="text-sm text-muted-foreground">{post.method}</p>}
                  <h2 className="mt-2 text-2xl leading-snug text-foreground">
                    {/* The link's ::after covers the row, so the figure is clickable too. */}
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
                  {(post.origin || post.reappliedTo) && (
                    <dl className="mt-4 text-sm leading-normal">
                      <div className="grid grid-cols-[7rem_1fr] gap-x-4 border-t border-border py-3">
                        <dt className="text-muted-foreground">Built in</dt>
                        <dd className="tabular-nums text-foreground">{post.origin || "Original study"}</dd>
                      </div>
                      <div className="grid grid-cols-[7rem_1fr] gap-x-4 border-t border-border py-3">
                        <dt className="text-muted-foreground">Re-tested on</dt>
                        <dd className="tabular-nums text-foreground">{post.reappliedTo || "Public data"}</dd>
                      </div>
                    </dl>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="py-16">
            <h2 className="text-3xl leading-tight text-foreground">Case studies coming soon</h2>
          </div>
        )}
      </div>
    </div>
  );
}
