import type { ReactNode } from "react";
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
  if (!open) return null;

  return (
    <Overlay>
      <Modal>
        <h3>{title}</h3>
        {message ? <p>{message}</p> : null}
        {children}
        <Actions>
          <Button type="button" tone={tone} onClick={onConfirm} disabled={confirming || confirmDisabled}>
            {confirming ? "Aguarde..." : confirmLabel}
          </Button>
          <Button type="button" tone="ghost" onClick={onCancel} disabled={confirming}>
            {cancelLabel}
          </Button>
        </Actions>
      </Modal>
    </Overlay>
  );
}
