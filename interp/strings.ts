export class SafeString {
  content?: string;

  constructor(s?: string) {
    this.content = s;
  }

  toString() {
    return this.content;
  }
}

/**
 * Mark a string as safe-for-HTML.
 * @param s The string
 * @returns A {@link SafeString} wrapping this string.
 */
export function safe(s?: string): SafeString {
  return new SafeString(s);
}
