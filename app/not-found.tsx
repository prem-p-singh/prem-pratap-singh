import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, Sprout } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The requested page could not be found.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center px-4 pb-16 pt-28 sm:px-6">
      <section className="paper-panel relative mx-auto w-full max-w-3xl overflow-hidden bg-card p-7 sm:p-12">
        <div className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full border border-field/15 bg-field-wash" />
        <div className="pointer-events-none absolute -bottom-28 -left-20 size-64 rounded-full border border-data/15 bg-data-wash" />

        <div className="relative">
          <span className="flex size-14 items-center justify-center rounded-2xl border border-field/25 bg-field-wash text-field">
            <Sprout className="size-7" aria-hidden="true" />
          </span>
          <p className="section-kicker mt-7">404 · Trail not found</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            This path does not lead to a published page.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            The address may have changed, or the page may have moved back into the research notebook.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/" className="paper-button inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold">
              <ArrowLeft className="size-4" aria-hidden="true" />
              Return home
            </Link>
            <Link href="/blog" className="paper-button inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold">
              <BookOpen className="size-4" aria-hidden="true" />
              Browse field notes
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
