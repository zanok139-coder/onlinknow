import { splitIntoChapters } from "@/lib/textParsing";

export { splitIntoChapters };

const MIN_TEXT_CHARS = 100;
const MAX_OCR_PAGES = 40;

/** Opens a PDF file (or blob) with pdf.js. */
async function openPdf(file) {
  const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const workerModule = await import("pdfjs-dist/legacy/build/pdf.worker.min.mjs?url");
  pdfjsLib.GlobalWorkerOptions.workerSrc = workerModule.default;

  const data = new Uint8Array(await file.arrayBuffer());
  return pdfjsLib.getDocument({ data }).promise;
}

/** Method 1 + 2: read the PDF text layer, combining every text item. */
async function extractTextLayer(pdf) {
  let text = "";
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item) => `${item.str}${item.hasEOL ? "\n" : " "}`)
      .join("");
    text += `${pageText}\n\n`;
  }
  return text;
}

/** Method 3: render each page to a canvas and OCR it. */
async function ocrPdf(pdf, onProgress) {
  const { createWorker } = await import("tesseract.js");
  const worker = await createWorker("eng");
  const pages = Math.min(pdf.numPages, MAX_OCR_PAGES);
  let text = "";

  try {
    for (let pageNumber = 1; pageNumber <= pages; pageNumber += 1) {
      const page = await pdf.getPage(pageNumber);
      const viewport = page.getViewport({ scale: 2 });
      const canvas = document.createElement("canvas");
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);

      await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
      const { data } = await worker.recognize(canvas);
      text += `${data.text}\n\n`;

      onProgress?.(Math.round((pageNumber / pages) * 100));
    }
  } finally {
    await worker.terminate();
  }

  return text;
}

/**
 * Extracts a book from a PDF: text layer first, OCR when the PDF is scanned.
 * Always resolves with chapters — never throws for "no readable paragraphs".
 */
export async function extractBookFromPdf(file, onStatus = () => {}) {
  const pdf = await openPdf(file);
  onStatus({ stage: "reading" });

  let text = await extractTextLayer(pdf);
  let usedOcr = false;

  if (text.replace(/\s/g, "").length < MIN_TEXT_CHARS) {
    usedOcr = true;
    onStatus({ stage: "ocr", progress: 0 });
    text = await ocrPdf(pdf, (progress) => onStatus({ stage: "ocr", progress }));
  }

  const cleaned = text.replace(/\s/g, "").length;
  let chapters = splitIntoChapters(text);

  if (chapters.length === 0) {
    throw new Error(
      "This PDF has no readable text, even with OCR. Use the paste-text option below instead."
    );
  }

  const paragraphs = chapters.reduce((total, chapter) => total + chapter.paragraphs.length, 0);

  return {
    chapters,
    characters: cleaned,
    paragraphs,
    pages: pdf.numPages,
    usedOcr,
  };
}