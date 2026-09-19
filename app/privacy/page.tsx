import Link from "next/link";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Privacy",
  description: "How this portfolio handles contact, newsletter, and basic technical data.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-16">
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <p className="section-kicker">Privacy</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          A small site with a small data footprint.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          This portfolio does not run advertising trackers, sell visitor data, or operate public user accounts.
        </p>

        <div className="prose prose-lg prose-invert mt-12 max-w-none prose-headings:text-foreground prose-p:text-foreground/85 prose-a:text-primary">
          <h2>Newsletter</h2>
          <p>
            If you subscribe, your email address is sent to Buttondown and used only to deliver occasional research notes. Buttondown processes that address under its own privacy terms. You can unsubscribe from any newsletter email.
          </p>
          <p>
            Newsletter signup is protected by Cloudflare Turnstile, which checks whether a request is likely to come from a person rather than automated abuse. Cloudflare may process technical information needed to perform that security check under its own privacy policy.
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
            If you select “Allow analytics,” the site loads Microsoft Clarity to understand how visitors use pages through aggregated heatmaps and session replays. Clarity may set cookies and record interactions such as clicks, scrolling, and page navigation. Text typed into form fields is masked and not recorded. Microsoft processes this data under the <a href="https://privacy.microsoft.com/privacystatement">Microsoft Privacy Statement</a>.
          </p>

          <h2>Your choices</h2>
          <p>
            You can browse without creating an account. Analytics remains off unless you allow it, and you can reopen “Privacy choices” from the footer at any time. Theme and consent preferences may be stored in your browser so the site can remember them. To ask about information you submitted, use the contact section on the homepage.
          </p>
        </div>

        <Link href="/#contact" className="mt-10 inline-flex text-sm font-semibold text-primary hover:underline">
          Contact Prem Pratap Singh
        </Link>
        <p className="mt-8 text-xs text-muted-foreground">Last updated September 19, 2026.</p>
      </section>
    </main>
  );
}
