import React from "react";



export default function ChapterContent({ paragraphs = [] }) {
  const blocks = [];
  

  paragraphs.forEach((paragraph, index) => {
    const text = String(paragraph || "").trim();
    if (!text) return;

    blocks.push(
      <p
        key={`p-${index}`}
        className="mb-5 font-reading text-[17px] leading-[1.8] text-foreground sm:text-[18px]"
      >
        {text}
      </p>
    );

   
  });

  return <div>{blocks}</div>;
}