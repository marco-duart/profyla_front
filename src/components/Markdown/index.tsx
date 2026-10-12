import { Fragment, type ReactNode } from "react";
import { parseMarkdown } from "../../utils/markdown";

// Minimal, safe markdown renderer for our own legal texts: builds React nodes
// (never injects HTML) and only lets http(s)/relative/mailto links through.

const SAFE_URL = /^(https?:\/\/|\/|mailto:)/i;
const INLINE = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;

function renderInline(text: string): ReactNode[] {
  return text.split(INLINE).filter(Boolean).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }

    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link && SAFE_URL.test(link[2])) {
      return (
        <a key={index} href={link[2]} target="_blank" rel="noreferrer">
          {link[1]}
        </a>
      );
    }

    return <Fragment key={index}>{part}</Fragment>;
  });
}

export function Markdown({ source }: { source: string }) {
  return (
    <>
      {parseMarkdown(source).map((block, index) => {
        if (block.type === "heading") {
          const Tag = (`h${block.level + 1}` as "h2" | "h3" | "h4");
          return <Tag key={index}>{renderInline(block.text)}</Tag>;
        }
        if (block.type === "quote") {
          return <blockquote key={index}>{renderInline(block.text)}</blockquote>;
        }
        if (block.type === "list") {
          return (
            <ul key={index}>
              {block.items.map((item, itemIndex) => <li key={itemIndex}>{renderInline(item)}</li>)}
            </ul>
          );
        }
        return <p key={index}>{renderInline(block.text)}</p>;
      })}
    </>
  );
}
