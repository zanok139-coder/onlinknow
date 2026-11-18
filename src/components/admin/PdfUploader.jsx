import React, { useState } from "react";
import { Upload } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { extractBookFromPdf } from "@/lib/pdfExtract";
import { saveBook } from "@/lib/saveBook";

const STATUS_COPY = {
  extracting: "Reading PDF text…",
  ocr: "PDF appears scanned. Using OCR… Please wait",
  saving: "Saving book to your library…",
};

function titleFromFile(name) {
  return String(name || "Untitled")
    .replace(/\.pdf$/i, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function PdfUploader({ onCreated }) {
  const [status, setStatus] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [debug, setDebug] = useState("");
  const [error, setError] = useState("");

  const busy = status !== "idle";

  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setError("");
    setDebug("");
    setStatus("extracting");

    try {
      const result = await extractBookFromPdf(file, ({ stage, progress: ocrProgress }) => {
        setStatus(stage === "ocr" ? "ocr" : "extracting");
        if (stage === "ocr") setProgress(ocrProgress || 0);
      });

      setDebug(
        `Extracted ${result.characters.toLocaleString()} characters, ${result.paragraphs} paragraphs found${
          result.usedOcr ? " (via OCR)" : ""
        }`
      );

      setStatus("saving");
      const uploaded = await base44.integrations.Core.UploadPublicFile({ file });
      const book = await saveBook({
        title: titleFromFile(file.name),
        chapters: result.chapters,
        sourceFileUrl: uploaded.file_url,
      });

      onCreated(book);
      setStatus("idle");
      setProgress(0);
    } catch (err) {
      setStatus("idle");
      setProgress(0);
      setError(err?.message || "That PDF could not be imported.");
    }
  };

  return (
    <div>
      <label
        className={`mt-5 flex cursor-pointer flex-col items-center justify-center gap-2 border border-dashed border-border bg-secondary px-4 py-8 text-center ${
          busy ? "pointer-events-none opacity-60" : ""
        }`}
      >
        <Upload className="h-5 w-5 text-muted-foreground" />
        <span className="text-[13px] font-semibold">
          {STATUS_COPY[status] || "Choose a PDF file"}
        </span>
        <span className="text-[11px] text-muted-foreground">
          Text or scanned PDFs — OCR runs automatically
        </span>
        <input type="file" accept="application/pdf" className="hidden" onChange={handleFile} />
      </label>

      {status === "ocr" ? (
        <div className="mt-2 h-1 w-full bg-secondary">
          <div className="h-1 bg-foreground transition-all" style={{ width: `${progress}%` }} />
        </div>
      ) : null}

      {debug ? <p className="mt-2 text-[11px] text-muted-foreground">{debug}</p> : null}
      {error ? <p className="mt-2 text-[13px] text-destructive">{error}</p> : null}
    </div>
  );
}