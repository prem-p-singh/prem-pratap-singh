import Image from "next/image";
import Link from "next/link";
import { Globe, Mail } from "lucide-react";
import { GitHubMark, LinkedInMark, ResearchGateMark, ScholarMark } from "@/components/icons/BrandIcons";
import { personal } from "@/profile/personal";
import { primaryNavigation } from "@/profile/navigation";

const socialItems = [
  { name: "GitHub", href: personal.social.github, icon: GitHubMark },
  { name: "LinkedIn", href: personal.social.linkedin, icon: LinkedInMark },
  { name: "Scholar", href: personal.social.googleScholar, icon: ScholarMark },
  { name: "ResearchGate", href: personal.social.researchgate, icon: ResearchGateMark },
  { name: "premsingh.org", href: personal.social.website, icon: Globe },
  { name: "Email", href: `mailto:${personal.email}`, icon: Mail },
];

const linkClass = "text-ink-2 no-underline underline-offset-4 hover:text-ink hover:underline hover:decoration-accent";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    // Index columns: the mark and name, the site's sections, the profiles, then the legal line.
    <footer className="relative z-10 border-t border-muted bg-paper-2 text-sm">
      <div className="shell grid gap-x-8 gap-y-10 py-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Link href="/" className="flex items-center gap-3 font-display text-3xl text-ink no-underline">
            <Image src="/images/logo-mark.png" alt="" width={44} height={44} className="size-11" />
            {personal.name}
          </Link>
          <p className="mt-4 max-w-[40ch] text-ink-2">{personal.location}</p>
        </div>
        <nav aria-label="Footer" className="lg:col-span-3">
          <h2 className="font-sans! text-xs font-medium tracking-normal text-muted">Sections</h2>
          <ul className="mt-3 grid gap-2">
            {primaryNavigation.map((link) => (
              <li key={link.name}>
                <Link href={link.link} className={linkClass}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="lg:col-span-4">
          <h2 className="font-sans! text-xs font-medium tracking-normal text-muted">Profiles</h2>
          <ul className="mt-3 grid gap-2">
            {socialItems.map((social) => {
              const external = !social.href.startsWith("mailto:");
              const Icon = social.icon;
              return (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className={`inline-flex items-center gap-2 ${linkClass}`}
                  >
                    <Icon className="size-5 shrink-0 text-ink" strokeWidth={1.8} aria-hidden="true" />
                    {social.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-rule pt-6 text-xs text-muted lg:col-span-12">
          <p>&copy; {currentYear} {personal.name}. All rights reserved.</p>
          <p data-credits>
            Photographs:{" "}
            <a href="https://commons.wikimedia.org/wiki/File:PalouseFromSteptoeButteMay2023-2.jpg" className={linkClass}>Caleb Riston</a> (CC BY 4.0, Wikimedia Commons),{" "}
            <a href="https://commons.wikimedia.org/wiki/File:Javier_shows_part_of_the_grape_harvest_in_his_Lysekil_vineyard_1_-_cropped.jpg" className={linkClass}>W.carter</a> (CC0, Wikimedia Commons),{" "}
            <a href="https://commons.wikimedia.org/wiki/File:Writing_in_a_notebook_with_a_feather_pen_while_enjoying_coffee_at_a_desk_surrounded_by_flowers.jpg" className={linkClass}>Shixart1985</a> (CC BY 2.0, Wikimedia Commons),{" "}
            <a href="https://commons.wikimedia.org/wiki/File:Aerial_View_-_Landschaft_Markgr%C3%A4flerland1.jpg" className={linkClass}>Taxiarchos228</a> (CC BY 3.0, Wikimedia Commons),{" "}
            <a href="https://commons.wikimedia.org/wiki/File:CSIRO_ScienceImage_11401_CSIRO_researcher_with_pipette.jpg" className={linkClass}>Morgan Brown, CSIRO</a> (CC BY 3.0, Wikimedia Commons),{" "}
            <a href="https://commons.wikimedia.org/wiki/File:Ripe_Zinfandel_grapes_in_Dry_Creek_Valley-8958.jpg" className={linkClass}>Frank Schulenburg</a> (CC BY-SA 4.0, Wikimedia Commons),{" "}
            <a href="https://commons.wikimedia.org/wiki/File:Vineyard_in_Cabrerolles.jpg" className={linkClass}>Christian Ferrer</a> (CC BY 4.0, Wikimedia Commons)
          </p>
          <Link href="/privacy" className={linkClass}>
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
