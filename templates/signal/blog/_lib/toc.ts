export type TocItem = {
  id: string;
  level: 2 | 3;
  text: string;
};

const HEADING_REGEX = /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi;
const ID_ATTR_REGEX = /\bid="([^"]+)"/;
const HTML_TAG_REGEX = /<[^>]+>/g;
const NON_SLUG_CHARS_REGEX = /[^a-z0-9\s-]/g;
const WHITESPACE_REGEX = /\s+/g;
const ID_COLLISION_START = 2;

const stripHtml = (html: string): string => html.replace(HTML_TAG_REGEX, '').trim();

const slugify = (text: string): string =>
  text
    .toLowerCase()
    .replace(NON_SLUG_CHARS_REGEX, '')
    .trim()
    .replace(WHITESPACE_REGEX, '-');

const claimId = (id: string, used: Set<string>): string => {
  if (!used.has(id)) {
    used.add(id);
    return id;
  }
  let counter = ID_COLLISION_START;
  while (used.has(`${id}-${counter}`)) counter++;
  const unique = `${id}-${counter}`;
  used.add(unique);
  return unique;
};

export const ensureHeadingIds = (html: string): { html: string; tocItems: TocItem[] } => {
  const tocItems: TocItem[] = [];
  const usedIds = new Set<string>();

  const output = html.replace(HEADING_REGEX, (match, levelStr: string, attrs: string, content: string) => {
    const text = stripHtml(content);
    if (!text) return match;

    const level = Number(levelStr) as 2 | 3;
    const existingIdMatch = attrs.match(ID_ATTR_REGEX);
    let nextAttrs = attrs;
    let id: string;

    if (existingIdMatch) {
      id = claimId(existingIdMatch[1], usedIds);
      if (id !== existingIdMatch[1]) {
        nextAttrs = attrs.replace(ID_ATTR_REGEX, `id="${id}"`);
      }
    } else {
      const slug = slugify(text) || `section-${tocItems.length + 1}`;
      id = claimId(slug, usedIds);
      nextAttrs = `${attrs} id="${id}"`;
    }

    tocItems.push({ id, level, text });
    return `<h${levelStr}${nextAttrs}>${content}</h${levelStr}>`;
  });

  return { html: output, tocItems };
};
