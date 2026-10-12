import { useEffect } from "react";

function setMeta(selector: string, attribute: "name" | "property", key: string, content: string): () => void {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  const created = !element;
  const previous = element?.getAttribute("content") ?? null;
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
  return () => {
    if (created) element?.remove();
    else if (previous !== null) element?.setAttribute("content", previous);
  };
}

// Title / description / Open Graph for the current page (restored when leaving it).
// Note: link-preview crawlers that do not run JavaScript still see the generic tags of index.html.
export function usePageMeta(title: string | undefined, description?: string) {
  useEffect(() => {
    if (!title) return undefined;
    const previousTitle = document.title;
    document.title = `${title} - TalentFlow`;
    const undo = [
      setMeta('meta[property="og:title"]', "property", "og:title", title),
      setMeta('meta[name="description"]', "name", "description", description ?? title),
      setMeta('meta[property="og:description"]', "property", "og:description", description ?? title),
    ];
    return () => {
      document.title = previousTitle;
      undo.forEach((fn) => fn());
    };
  }, [title, description]);
}
