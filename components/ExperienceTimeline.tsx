"use client";

import { Timeline } from "@/components/ui/timeline";
import { renderMentor } from "@/components/Timeline";
import { workExperience } from "@/data/experience";

export default function ExperienceTimeline() {
  const data = workExperience.map((exp) => ({
    title: `${exp.startDate} — ${exp.endDate}`,
    content: (
      <div className="space-y-4 pb-8">
        <div>
          <h3 className="text-xl font-bold text-[var(--foreground)]">
            {exp.title}
          </h3>
          <p className="text-[var(--muted-foreground)] font-semibold text-lg">
            {exp.organization}
          </p>
          {exp.location && (
            <p className="flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] mt-1">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {exp.location}
            </p>
          )}
        </div>

        {exp.mentor && (
          <p className="flex items-start gap-1.5 text-sm text-[var(--muted-foreground)] mt-1">
            <svg
              className="w-4 h-4 mt-0.5 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span><span className="font-medium text-[var(--foreground)]">Mentor:</span> {renderMentor(exp.mentor)}</span>
          </p>
        )}

        {exp.description && (
          <p className="text-[var(--muted-foreground)] leading-relaxed">
            {exp.description}
          </p>
        )}

        {exp.highlights && exp.highlights.length > 0 && (
          <ul className="space-y-2">
            {exp.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--foreground)]" />
                <span className="text-sm text-[var(--muted-foreground)]">
                  {h}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    ),
  }));

  return <Timeline data={data} />;
}
