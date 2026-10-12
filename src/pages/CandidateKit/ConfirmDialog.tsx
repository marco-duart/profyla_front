import { type ReactNode, useId, useRef } from "react";
import { useDialogA11y } from "../../hooks/useDialogA11y";
import { Actions, Button, Modal, Overlay } from "./styles";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: "danger" | "brand";
  confirming?: boolean;
  confirmDisabled?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  children?: ReactNode;
};

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  tone = "danger",
  confirming = false,
  confirmDisabled = false,
  onConfirm,
  onCancel,
  children,
}: ConfirmDialogProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  // Esc cancels, except while a request is in flight.
  useDialogA11y(open, containerRef, () => {
    if (!confirming) onCancel();
  });

  if (!open) return null;

  return (
    <Overlay>
      <Modal ref={containerRef} role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <h3 id={titleId}>{title}</h3>
        {message ? <p>{message}</p> : null}
        {children}
        <Actions>
          <Button type="button" tone={tone} onClick={onConfirm} disabled={confirming || confirmDisabled}>
            {confirming ? "Aguarde..." : confirmLabel}
          </Button>
          <Button type="button" tone="ghost" data-dialog-initial-focus onClick={onCancel} disabled={confirming}>
            {cancelLabel}
          </Button>
        </Actions>
      </Modal>
    </Overlay>
  );
}
