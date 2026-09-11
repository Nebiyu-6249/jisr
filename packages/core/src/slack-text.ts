import { stripInvisible } from './invisible.js';

/**
 * Slack renders `&`, `<` and `>` specially: unescaped worker text could produce
 * a fake link or fire `@channel`. Escape first, render verbatim after.
 * https://api.slack.com/reference/surfaces/formatting#escaping
 */
export function escapeSlackText(input: string): string {
  return input.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Worker text inside a Slack block: escaped, length-capped, and stripped of the
 * invisible characters that could hide a spoofed mention.
 */
export function slackQuote(input: string, maxLength = 300): string {
  const cleaned = stripInvisible(input).replace(/\s+/g, ' ').trim();
  const clipped = cleaned.length > maxLength ? `${cleaned.slice(0, maxLength - 1)}...` : cleaned;
  return escapeSlackText(clipped);
}

/** `@here` is added by us, never by content. Only critical cases get it. */
export function hereMention(): string {
  return '<!here>';
}
