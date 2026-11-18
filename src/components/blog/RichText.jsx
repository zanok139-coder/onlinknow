import React from "react";
import { Link } from "react-router-dom";

const TOKEN = /\[\[([^\]|]+)\|([^\]]+)\]\]/g;

const parse = (text = "") => {
  const nodes = [];
  let cursor = 0;
  let match;
  TOKEN.lastIndex = 0;
  while ((match = TOKEN.exec(text)) !== null) {
    if (match.index > cursor) nodes.push(text.slice(cursor, match.index));
    nodes.push({ to: match[1], label: match[2], key: match.index });
    cursor = match.index + match[0].length;
  }
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
};

/** Renders a paragraph with inline internal links written as [[/path|Label]]. */
export default function RichText({ text, className = "" }) {
  return (
    <p className={className}>
      {parse(text).map((node, index) =>
        typeof node === "string" ? (
          <React.Fragment key={`t-${index}`}>{node}</React.Fragment>
        ) : (
          <Link
            key={`l-${node.key}`}
            to={node.to}
            className="font-medium text-foreground underline decoration-gold decoration-2 underline-offset-2 hover:decoration-foreground"
          >
            {node.label}
          </Link>
        )
      )}
    </p>
  );
}