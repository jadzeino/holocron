/**
 * Sanitise user input for search queries.
 * - Strips HTML / script tags
 * - Removes potentially dangerous characters
 * - Enforces a max length (default 100)
 */
export function sanitizeSearchInput(
  value: string,
  maxLength: number = 100,
): string {
  return value
    .replace(/<[^>]*>/g, "")          // strip HTML tags
    .replace(/[<>"'`;(){}[\]\\]/g, "") // remove dangerous punctuation
    .slice(0, maxLength)               // enforce max length
    .trim();
}
