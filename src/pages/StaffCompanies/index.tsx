import { type FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  createCompany,
  deleteCompany,
  listCompanies,
  updateCompany,
} from "../../services/admin/companies";
import type { AdminCompany } from "../../services/admin/companies/dto";
import { getApiErrorMessage } from "../../utils/api-error";
import {
  Actions,
  Button,
  Empty,
  Field,
  Grid,
  Hero,
  Input,
  Item,
  ItemTop,
  Lead,
  List,
  Meta,
  Page,
  Panel,
  PanelTitle,
} from "../StaffKit/styles";

type CompanyFormState = {
  company_name: string;
  cnpj: string;
  sector: string;
  company_size: string;
  company_location: string;
};

const emptyForm: CompanyFormState = {
  company_name: "",
  cnpj: "",
  sector: "",
  company_size: "",
  company_location: "",
};

export function StaffCompaniesPage() {
  const [items, setItems] = useState<AdminCompany.Item[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<CompanyFormState>(emptyForm);
  const [loading, setLoading] = useState<boolean>(false);

  async function loadCompanies() {
    const response = await listCompanies();
    setItems(response);
  }

  useEffect(() => {
    void loadCompanies();
  }, []);

  function beginEdit(item: AdminCompany.Item) {
    setEditingId(item.id);
    setForm({
      company_name: item.company_name,
      cnpj: item.cnpj,
      sector: item.sector,
      company_size: String(item.company_size),
      company_location: item.company_location,
    });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      const payload = {
        company_name: form.company_name,
        cnpj: form.cnpj,
        sector: form.sector,
        company_size: Number(form.company_size),
        company_location: form.company_location,
      };

      if (editingId) {
        await updateCompany(editingId, payload);
        toast.success("Empresa atualizada.");
      } else {
        await createCompany(payload);
        toast.success("Empresa criada.");
      }

      resetForm();
      await loadCompanies();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao salvar empresa."));
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Confirma exclusao da empresa?")) {
      return;
    }

    try {
      await deleteCompany(id);
      toast.success("Empresa removida.");
      await loadCompanies();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao remover empresa."));
    }
  }

  return (
    <Page>
      <Hero>
        <h2>Empresas e CNPJs</h2>
        <Lead>
          Cadastre e mantenha empresas do ecossistema RH. Uma mesma razao social pode existir com CNPJs diferentes para diferentes frentes de contratacao.
        </Lead>
      </Hero>

      <Panel>
        <PanelTitle>{editingId ? "Editar empresa" : "Nova empresa"}</PanelTitle>
        <form onSubmit={handleSubmit}>
          <Grid>
            <Field>
              Nome da empresa
              <Input
                required
                value={form.company_name}
                onChange={(event) => setForm((prev) => ({ ...prev, company_name: event.target.value }))}
              />
            </Field>
            <Field>
              CNPJ
              <Input
                required
                value={form.cnpj}
                onChange={(event) => setForm((prev) => ({ ...prev, cnpj: event.target.value }))}
              />
            </Field>
            <Field>
              Setor
              <Input
                required
                value={form.sector}
                onChange={(event) => setForm((prev) => ({ ...prev, sector: event.target.value }))}
              />
            </Field>
            <Field>
              Tamanho
              <Input
                required
                type="number"
                value={form.company_size}
                onChange={(event) => setForm((prev) => ({ ...prev, company_size: event.target.value }))}
              />
            </Field>
            <Field>
              Localizacao
              <Input
                required
                value={form.company_location}
                onChange={(event) => setForm((prev) => ({ ...prev, company_location: event.target.value }))}
              />
            </Field>
          </Grid>

          <Actions>
            <Button tone="brand" type="submit" disabled={loading}>
              {editingId ? "Salvar edicao" : "Criar empresa"}
            </Button>
            <Button type="button" tone="ghost" onClick={resetForm}>
              Limpar
            </Button>
          </Actions>
        </form>
      </Panel>

      <Panel>
        <PanelTitle>Empresas cadastradas</PanelTitle>
        {items.length === 0 ? (
          <Empty>Nenhuma empresa cadastrada ainda.</Empty>
        ) : (
          <List>
            {items.map((item) => (
              <Item key={item.id}>
                <ItemTop>
                  <strong>{item.company_name}</strong>
                  <Actions>
                    <Button type="button" onClick={() => beginEdit(item)}>
                      Editar
                    </Button>
                    <Button type="button" tone="danger" onClick={() => void handleDelete(item.id)}>
                      Excluir
                    </Button>
                  </Actions>
                </ItemTop>
                <Meta>CNPJ: {item.cnpj}</Meta>
                <Meta>
                  Setor: {item.sector} · Tamanho: {item.company_size} · Local: {item.company_location}
                </Meta>
              </Item>
            ))}
          </List>
        )}
      </Panel>
    </Page>
  );
}
