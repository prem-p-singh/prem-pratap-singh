export interface MentorLink {
  name: string;
  url?: string;
  note?: string;
}

export interface TimelineItem {
  title: string;
  organization: string;
  location?: string;
  startDate: string;
  endDate: string;
  mentor?: string | MentorLink[];
  description?: string;
  highlights?: string[];
}

interface TimelineProps {
  items: TimelineItem[];
}

export function renderMentor(mentor: string | MentorLink[]) {
  if (typeof mentor === "string") return mentor;
  return mentor.map((m, i) => (
    <span key={i}>
      {i > 0 && "; "}
      {m.url ? (
        <a
          href={m.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          {m.name}
        </a>
      ) : (
        <span>{m.name}</span>
      )}
      {m.note && ` (${m.note})`}
    </span>
  ));
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="group p-5 bg-card border border-border rounded-lg card-hover"
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4">
            <div>
              <h3 className="text-base font-medium text-foreground group-hover:text-accent transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {item.organization}
                {item.location && ` · ${item.location}`}
              </p>
              {item.mentor && (
                <p className="text-sm text-muted-foreground">
                  Mentor: {renderMentor(item.mentor)}
                </p>
              )}
            </div>
            <p className="text-xs text-muted-foreground whitespace-nowrap">
              {item.startDate} - {item.endDate}
            </p>
          </div>

          {item.description && (
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              {item.description}
            </p>
          )}

          {item.highlights && item.highlights.length > 0 && (
            <ul className="mt-3 space-y-1.5">
              {item.highlights.map((highlight, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-subtle mt-1.5 text-[6px]">&#9679;</span>
                  {highlight}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
