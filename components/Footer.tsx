import Link from "next/link";
import { FlaskConical, Github, GraduationCap, Linkedin, Mail } from "lucide-react";
import { personal } from "@/profile/personal";
import { primaryNavigation } from "@/profile/navigation";

const socialItems = [
  { name: "GitHub", href: personal.social.github, icon: Github },
  { name: "LinkedIn", href: personal.social.linkedin, icon: Linkedin },
  { name: "Scholar", href: personal.social.googleScholar, icon: GraduationCap },
  { name: "ResearchGate", href: personal.social.researchgate, icon: FlaskConical },
  { name: "Email", href: `mailto:${personal.email}`, icon: Mail },
];

const linkClass = "underline-offset-4 hover:text-foreground hover:underline";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    // A floating card at the container width, so the page wash runs behind it.
    <footer className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-8 text-sm sm:px-6 lg:px-8">
      <div className="paper-panel p-6 sm:p-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-baseline lg:justify-between">
          <Link href="/" className="font-serif text-xl font-semibold text-foreground">
            {personal.name}
          </Link>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2 text-muted-foreground">
            {primaryNavigation.map((link) => (
              <Link key={link.name} href={link.link} className={linkClass}>
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        <ul className="mt-5 flex flex-wrap gap-2">
          {socialItems.map((social) => {
            const external = !social.href.startsWith("mailto:");
            const Icon = social.icon;
            return (
              <li key={social.name}>
                <a
                  href={social.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="paper-control inline-flex items-center gap-2 px-3 py-2 text-foreground hover:text-field"
                >
                  <Icon className="size-4 text-field" strokeWidth={1.8} aria-hidden="true" />
                  {social.name}
                </a>
              </li>
            );
          })}
        </ul>
        <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 border-t border-border pt-5 text-muted-foreground">
          <p>&copy; {currentYear} {personal.name}. All rights reserved.</p>
          <Link href="/privacy" className={linkClass}>
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
