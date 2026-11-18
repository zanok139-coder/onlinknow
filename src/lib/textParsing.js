const MIN_PARAGRAPH_CHARS = 15;
const MAX_PARAGRAPH_CHARS = 900;

const CHAPTER_WORDS =
  "\\d+|[ivxlcdm]+|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty";

export function normalizeText(raw) {
  return String(raw || "")
    .replace(/\r\n?/g, "\n")
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function sentenceSplit(text) {
  return text
    .split(/(?<=[.!?])\s+(?=["'“]?[A-Z0-9])/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

/** Splits raw text into paragraphs, with a sentence-grouping fallback. */
export function splitParagraphs(rawText) {
  const text = normalizeText(rawText);
  if (!text) return [];

  let paragraphs = text
    .split(/\n\s*\n+/)
    .map((paragraph) => paragraph.replace(/\s*\n\s*/g, " ").trim())
    .filter((paragraph) => paragraph.length >= MIN_PARAGRAPH_CHARS)
    .flatMap((paragraph) => {
      if (paragraph.length <= MAX_PARAGRAPH_CHARS) return [paragraph];

      const sentences = sentenceSplit(paragraph);
      const chunks = [];
      let current = "";
      sentences.forEach((sentence) => {
        if (`${current} ${sentence}`.trim().length > MAX_PARAGRAPH_CHARS && current) {
          chunks.push(current.trim());
          current = sentence;
        } else {
          current = `${current} ${sentence}`.trim();
        }
      });
      if (current) chunks.push(current.trim());
      return chunks.filter((chunk) => chunk.length >= MIN_PARAGRAPH_CHARS);
    });

  if (paragraphs.length >= 3) return paragraphs;

  // Fallback: 2-3 sentences per paragraph, at least 8 paragraphs when possible.
  const sentences = sentenceSplit(text.replace(/\n+/g, " ")).filter(Boolean);
  if (sentences.length === 0) return [];

  const grouped = [];
  let index = 0;
  while (index < sentences.length) {
    const take = grouped.length % 2 === 0 ? 2 : 3;
    grouped.push(sentences.slice(index, index + take).join(" "));
    index += take;
  }

  while (grouped.length < 8 && grouped.some((group) => sentenceSplit(group).length > 1)) {
    const target = grouped.findIndex((group) => sentenceSplit(group).length > 1);
    const [first, ...rest] = sentenceSplit(grouped[target]);
    grouped.splice(target, 1, first, rest.join(" "));
  }

  return grouped.filter((paragraph) => paragraph.length > 0);
}

function cleanHeading(raw) {
  return String(raw || "")
    .replace(/\s+/g, " ")
    .replace(/^chapter\s+/i, "Chapter ")
    .trim()
    .slice(0, 120);
}

/** Detects "Chapter …" headings; falls back to a single chapter. */
export function splitIntoChapters(rawText) {
  const text = normalizeText(rawText);
  if (!text) return [];

  const headingPattern = new RegExp(`^[ \\t]*(chapter\\s+(?:${CHAPTER_WORDS})\\b[^\\n]{0,90})[ \\t]*$`, "gim");
  const matches = [...text.matchAll(headingPattern)];

  if (matches.length === 0) {
    return [{ title: "Chapter 1", paragraphs: splitParagraphs(text) }];
  }

  const chapters = matches
    .map((match, chapterIndex) => {
      const start = match.index + match[0].length;
      const end = chapterIndex + 1 < matches.length ? matches[chapterIndex + 1].index : text.length;
      return {
        title: cleanHeading(match[1]),
        paragraphs: splitParagraphs(text.slice(start, end)),
      };
    })
    .filter((chapter) => chapter.paragraphs.length > 0);

  const preface = text.slice(0, matches[0].index);
  const prefaceParagraphs = splitParagraphs(preface);
  if (prefaceParagraphs.length >= 3) {
    chapters.unshift({ title: "Introduction", paragraphs: prefaceParagraphs });
  }

  if (chapters.length === 0) {
    return [{ title: "Chapter 1", paragraphs: splitParagraphs(text) }];
  }

  return chapters;
}

export function countWords(text) {
  return String(text || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

export function readMinutes(chapters) {
  const words = chapters.reduce(
    (total, chapter) =>
      total + chapter.paragraphs.reduce((sum, paragraph) => sum + countWords(paragraph), 0),
    0
  );
  return Math.max(1, Math.round(words / 200));
}