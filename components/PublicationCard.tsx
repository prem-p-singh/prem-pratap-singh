export interface Publication {
  title: string;
  authors: string[];
  venue: string;
  year: number;
  type: "journal" | "conference" | "preprint" | "thesis";
  links?: {
    paper?: string;
    code?: string;
    doi?: string;
    slides?: string;
  };
  abstract?: string;
}

interface PublicationCardProps {
  publication: Publication;
}

const typeLabels = {
  journal: "Journal",
  conference: "Conference",
  preprint: "Preprint",
  thesis: "Thesis",
};

export default function PublicationCard({ publication }: PublicationCardProps) {
  const { title, authors, venue, year, type, links } = publication;

  return (
    <div className="group p-5 bg-card border border-border rounded-lg card-hover">
      <div className="flex items-center gap-2 mb-2">
        <span className="px-2 py-0.5 text-xs font-medium bg-muted text-muted-foreground rounded">
          {typeLabels[type]}
        </span>
        <span className="text-xs text-muted-foreground">{year}</span>
      </div>

      <h3 className="text-base font-medium text-foreground leading-snug group-hover:text-accent transition-colors">
        {title}
      </h3>

      <p className="mt-1.5 text-sm text-muted-foreground">
        {authors.join(", ")}
      </p>

      <p className="mt-1 text-sm text-muted-foreground">
        {venue}
      </p>

      {links && Object.keys(links).length > 0 && (
        <div className="mt-3 pt-3 border-t border-border flex flex-wrap gap-2">
          {links.paper && (
            <a
              href={links.paper}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              PDF
            </a>
          )}
          {links.code && (
            <a
              href={links.code}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
              </svg>
              Code
            </a>
          )}
          {links.doi && (
            <a
              href={`https://doi.org/${links.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              DOI
            </a>
          )}
          {links.slides && (
            <a
              href={links.slides}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Slides
            </a>
          )}
        </div>
      )}
    </div>
  );
}
