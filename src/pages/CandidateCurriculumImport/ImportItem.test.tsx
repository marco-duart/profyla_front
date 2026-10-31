import { useState } from "react";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { ImportItem } from "./ImportItem";
import type { ImportData, ImportField } from "./fields";

const FIELDS: ImportField[] = [
  { name: "company_name", label: "Empresa", required: true },
  { name: "start_date", label: "Início", type: "date", required: true },
  { name: "achievements", label: "Realizações", type: "textarea" },
];

function Harness({ initial, confidence = "high", warnings = [] }: { initial: ImportData; confidence?: "high" | "medium" | "low"; warnings?: string[] }) {
  const [data, setData] = useState(initial);
  const [selected, setSelected] = useState(true);
  return (
    <ul>
      <ImportItem title="Experiência: Analista na Acme" confidence={confidence} selected={selected} fields={FIELDS} data={data} warnings={warnings}
        onToggle={setSelected} onChange={(name, value) => setData((current) => ({ ...current, [name]: value }))} />
    </ul>
  );
}

describe("ImportItem", () => {
  it("marca o item como selecionado e mostra os campos preenchidos", () => {
    render(<Harness initial={{ company_name: "Acme", start_date: "2019-03-01", achievements: null }} />);

    expect(screen.getByRole("checkbox", { name: "Adicionar Experiência: Analista na Acme" })).toBeChecked();
    expect(screen.getByLabelText("Empresa")).toHaveValue("Acme");
    expect(screen.queryByText("Confira")).not.toBeInTheDocument();
  });

  it("bloqueia a seleção enquanto um campo obrigatório está vazio e libera ao preenchê-lo (sem marcar sozinho)", async () => {
    const user = userEvent.setup();
    render(<Harness initial={{ company_name: "Acme", start_date: null, achievements: null }} confidence="low" />);

    const checkbox = screen.getByRole("checkbox", { name: /Adicionar/ });
    expect(checkbox).toBeDisabled();
    expect(checkbox).not.toBeChecked();
    expect(screen.getByText("Informe para poder adicionar.")).toBeInTheDocument();
    expect(screen.getByText("Confira")).toBeInTheDocument();

    await user.type(screen.getByLabelText("Início"), "2019-03-01");

    expect(checkbox).toBeEnabled();
    expect(screen.queryByText("Informe para poder adicionar.")).not.toBeInTheDocument();
  });

  it("avisa que só o ano foi informado", () => {
    render(<Harness initial={{ company_name: "Acme", start_date: "2019-01-01", achievements: null }} confidence="medium" warnings={["year_only"]} />);

    expect(screen.getByText("Confira o mês: o currículo informa só o ano.")).toBeInTheDocument();
  });

  it("permite desmarcar o item", async () => {
    const user = userEvent.setup();
    render(<Harness initial={{ company_name: "Acme", start_date: "2019-03-01", achievements: null }} />);

    await user.click(screen.getByRole("checkbox", { name: /Adicionar/ }));

    expect(screen.getByRole("checkbox", { name: /Adicionar/ })).not.toBeChecked();
  });
});
