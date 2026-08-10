const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Format editorial dates without allowing the viewer's timezone to shift the
 * calendar day. Frontmatter dates represent publication days, not instants.
 */
export function formatContentDate(
  value: string,
  options: Intl.DateTimeFormatOptions,
  locale = "en-US"
): string {
  const dateOnly = DATE_ONLY.test(value);
  const date = new Date(dateOnly ? `${value}T00:00:00Z` : value);

  return new Intl.DateTimeFormat(locale, {
    ...options,
    ...(dateOnly ? { timeZone: "UTC" } : {}),
  }).format(date);
}
