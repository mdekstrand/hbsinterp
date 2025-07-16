/**
 * Safe-for-HTML string wrapper.
 */
export class SafeString {
  content?: string;

  constructor(s?: string) {
    this.content = s;
  }

  toString(): string {
    return this.content ?? "";
  }
}

/**
 * Mark a string as safe-for-HTML (it will not be escaped).
 * @param s The string
 * @returns A {@link SafeString} wrapping this string.
 */
export function safe(s?: string): SafeString {
  return new SafeString(s);
}

export function escapeHTML(s: string): string {
  s = s.replaceAll("&", "&amp;");
  s = s.replaceAll("<", "&lt;");
  s = s.replaceAll(">", "&gt;");
  return s;
}
