/**
 * Placeholder helpers for portfolio content.
 *
 * Wrap anything you still need to write or verify in `todo("…")`.
 * The UI renders it as a dashed "to be documented" note while
 * `site.showPlaceholderNotes` is true and hides it otherwise - so an
 * unfinished fact is never presented as a real one.
 */

const TODO_PREFIX = "__TODO__:";

export function todo(note: string): string {
  return `${TODO_PREFIX}${note}`;
}

export function isTodo(value: string | undefined | null): boolean {
  return typeof value === "string" && value.startsWith(TODO_PREFIX);
}

export function todoText(value: string): string {
  return value.slice(TODO_PREFIX.length);
}

/** True when a value has real, publishable content. */
export function hasContent(value: string | undefined | null): value is string {
  return typeof value === "string" && value.trim() !== "" && !isTodo(value);
}
