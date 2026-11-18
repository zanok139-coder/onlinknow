const PREFIX = /^chapter\s+[\w]+\s*[.:\-–]?\s*/i;

/** "Chapter 1. The Right To Be Rich" -> "The Right To Be Rich" */
export function chapterName(title) {
  return String(title || "").replace(PREFIX, "").trim();
}

/** Always renders as "Chapter 3. Title" */
export function chapterHeading(number, title) {
  const name = chapterName(title);
  return name ? `Chapter ${number}. ${name}` : `Chapter ${number}`;
}