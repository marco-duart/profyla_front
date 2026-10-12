import { useState } from "react";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { ConfirmDialog as CandidateConfirmDialog } from "../CandidateKit/ConfirmDialog";
import { ConfirmDialog as StaffConfirmDialog } from "./ConfirmDialog";

const kits = [
  ["StaffKit", StaffConfirmDialog],
  ["CandidateKit", CandidateConfirmDialog],
] as const;

describe.each(kits)("%s ConfirmDialog accessibility", (_name, ConfirmDialog) => {
  function Harness({ onConfirm = () => undefined }: { onConfirm?: () => void }) {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button type="button" onClick={() => setOpen(true)}>Abrir</button>
        <ConfirmDialog open={open} title="Excluir item" message="Não pode ser desfeito." onConfirm={onConfirm} onCancel={() => setOpen(false)} />
      </>
    );
  }

  it("is a labelled modal dialog", async () => {
    render(<Harness />);
    await userEvent.setup().click(screen.getByRole("button", { name: "Abrir" }));

    const dialog = screen.getByRole("dialog", { name: "Excluir item" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  it("starts focus on Cancelar so a stray Enter never confirms", async () => {
    const onConfirm = vi.fn();
    const user = userEvent.setup();
    render(<Harness onConfirm={onConfirm} />);

    await user.click(screen.getByRole("button", { name: "Abrir" }));
    expect(screen.getByRole("button", { name: "Cancelar" })).toHaveFocus();

    await user.keyboard("{Enter}");
    expect(onConfirm).not.toHaveBeenCalled();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("keeps Tab inside the dialog", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole("button", { name: "Abrir" }));

    for (let i = 0; i < 6; i += 1) await user.tab();

    expect(screen.getByRole("dialog")).toContainElement(document.activeElement as HTMLElement);
  });

  it("closes with Esc and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    const trigger = screen.getByRole("button", { name: "Abrir" });
    await user.click(trigger);

    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
