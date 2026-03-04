"use client";

import { Timeline } from "@/components/ui/timeline";
import { education } from "@/data/experience";

export default function EducationTimelineNew() {
  const data = education.map((edu) => ({
    title: `${edu.startDate} — ${edu.endDate}`,
    content: (
      <div className="space-y-3 pb-8">
        <div>
          <h3 className="text-xl font-bold text-[var(--foreground)]">
            {edu.title}
          </h3>
          <p className="text-[var(--muted-foreground)] font-semibold text-lg">
            {edu.organization}
          </p>
          {edu.location && (
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
              {edu.location}
            </p>
          )}
        </div>

        {edu.description && (
          <p className="text-[var(--muted-foreground)] leading-relaxed">
            {edu.description}
          </p>
        )}
      </div>
    ),
  }));

  return <Timeline data={data} />;
}
