import { type RefObject, useEffect, useRef } from "react";

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Modal accessibility: focus starts on `initialFocusSelector` (the cancel button by default, so a
// stray Enter never confirms a destructive action), Tab stays inside the dialog, Esc closes it and
// focus returns to whatever opened it.
export function useDialogA11y(
  open: boolean,
  containerRef: RefObject<HTMLElement | null>,
  onClose: () => void,
  initialFocusSelector = "[data-dialog-initial-focus]",
) {
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return undefined;

    const trigger = document.activeElement as HTMLElement | null;
    const container = containerRef.current;
    const initial = container?.querySelector<HTMLElement>(initialFocusSelector) ?? container?.querySelector<HTMLElement>(FOCUSABLE);
    initial?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab" || !container) return;

      const items = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      trigger?.focus?.();
    };
  }, [open, containerRef, initialFocusSelector]);
}
