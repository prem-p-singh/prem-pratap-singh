import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How this portfolio handles contact, newsletter, and basic technical data.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-16">
      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <header className="pb-10 pt-10 sm:pt-12 lg:pt-14">
          <p className="section-kicker">Privacy</p>
          <h1 className="mt-3 text-4xl leading-tight text-foreground sm:text-5xl lg:text-6xl">
            A small site with a small data footprint.
          </h1>
          <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-muted-foreground">
            This portfolio does not run advertising trackers, sell visitor data, or operate public user accounts.
          </p>
        </header>

        {/* The typography plugin is not installed, so the prose-* modifiers did nothing.
            .prose sets the serif and the measure; spacing and sizes are set here. */}
        <div className="paper-panel max-w-4xl p-6 sm:p-10">
          <div className="prose max-w-[70ch] text-base text-foreground [&_a]:text-field [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:leading-snug [&_h2:first-child]:mt-0 [&_p]:mt-3">
            <h2>Newsletter</h2>
            <p>
              If you subscribe, your email address is sent to Buttondown and used only to deliver occasional research notes. Buttondown processes that address under its own privacy terms. You can unsubscribe from any newsletter email.
            </p>

            <h2>Contact</h2>
            <p>
              Selecting an email link opens your own email service. Any message you send is handled by the email providers involved in that conversation.
            </p>

            <h2>Site operation</h2>
            <p>
              The site is hosted by Vercel. Like most hosting providers, Vercel may process limited technical information needed to deliver and protect the site, such as an IP address, browser details, request time, and requested page.
            </p>

            <h2>Usage analytics</h2>
            <p>
              The site uses Microsoft Clarity to understand how visitors use pages, through aggregated heatmaps and session replays. Clarity sets cookies and records interactions such as clicks, scrolling, and page navigation. Text you type into form fields is masked and not recorded. Microsoft processes this data under the <a href="https://privacy.microsoft.com/privacystatement">Microsoft Privacy Statement</a>. You can block it with any standard tracker blocker.
            </p>

            <h2>Your choices</h2>
            <p>
              You can browse without creating an account. Theme preference may be stored in your browser so the site can remember light or dark mode. To ask about information you submitted, use the contact section on the homepage.
            </p>
          </div>

          <Link
            href="/#contact"
            className="mt-10 inline-block text-sm font-semibold text-field underline underline-offset-4"
          >
            Contact Prem Pratap Singh
          </Link>
          <p className="mt-6 border-t border-border pt-4 text-xs tabular-nums text-muted-foreground">
            Last updated September 18, 2026.
          </p>
        </div>
      </div>
    </main>
  );
}
