import { type FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  createForm,
  createFormField,
  deleteForm,
  deleteFormField,
  getForm,
  listForms,
  updateForm,
  updateFormField,
} from "../../services/admin/forms";
import type { AdminForm } from "../../services/admin/forms/dto";
import { getApiErrorMessage } from "../../utils/api-error";
import { ConfirmDialog } from "../StaffKit/ConfirmDialog";
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
  Select,
  Textarea,
} from "../StaffKit/styles";

type FormFormState = { title: string; description: string; department: string };
const emptyForm: FormFormState = { title: "", description: "", department: "" };

type FieldFormState = { question: string; response_type: AdminForm.Field["response_type"] };
const emptyFieldForm: FieldFormState = { question: "", response_type: "text" };

const RESPONSE_TYPES: AdminForm.Field["response_type"][] = ["text", "string", "number", "boolean", "date"];

export function StaffFormsPage() {
  const [items, setItems] = useState<AdminForm.Item[]>([]);
  const [form, setForm] = useState<FormFormState>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [selectedFormId, setSelectedFormId] = useState<string>("");
  const [selectedForm, setSelectedForm] = useState<AdminForm.Item | null>(null);
  const [fieldForm, setFieldForm] = useState<FieldFormState>(emptyFieldForm);
  const [editingFieldId, setEditingFieldId] = useState<number | null>(null);
  const [pendingDeleteFormId, setPendingDeleteFormId] = useState<number | null>(null);
  const [deletingForm, setDeletingForm] = useState(false);
  const [pendingDeleteFieldId, setPendingDeleteFieldId] = useState<number | null>(null);
  const [deletingField, setDeletingField] = useState(false);

  async function loadForms() {
    const response = await listForms();
    setItems(response);
  }

  useEffect(() => {
    void loadForms();
  }, []);

  useEffect(() => {
    setEditingFieldId(null);
    setFieldForm(emptyFieldForm);

    if (!selectedFormId) {
      setSelectedForm(null);
      return;
    }

    async function loadDetail() {
      try {
        const detail = await getForm(Number(selectedFormId));
        setSelectedForm(detail);
      } catch (error) {
        toast.error(getApiErrorMessage(error, "Erro ao carregar formulário."));
      }
    }

    void loadDetail();
  }, [selectedFormId]);

  function beginEdit(item: AdminForm.Item) {
    setEditingId(item.id);
    setForm({ title: item.title, description: item.description, department: item.department });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      if (editingId) {
        await updateForm(editingId, form);
        toast.success("Formulário atualizado.");
      } else {
        await createForm(form);
        toast.success("Formulário criado.");
      }
      resetForm();
      await loadForms();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao salvar formulário."));
    }
  }

  async function confirmDeleteForm() {
    if (!pendingDeleteFormId) return;
    setDeletingForm(true);

    try {
      await deleteForm(pendingDeleteFormId);
      toast.success("Formulário removido.");
      setSelectedFormId((current) => (current === String(pendingDeleteFormId) ? "" : current));
      setPendingDeleteFormId(null);
      await loadForms();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao remover formulário."));
    } finally {
      setDeletingForm(false);
    }
  }

  function beginEditField(field: AdminForm.Field) {
    setEditingFieldId(field.id);
    setFieldForm({ question: field.question, response_type: field.response_type });
  }

  function resetFieldForm() {
    setEditingFieldId(null);
    setFieldForm(emptyFieldForm);
  }

  async function refreshSelectedForm() {
    const detail = await getForm(Number(selectedFormId));
    setSelectedForm(detail);
  }

  async function handleFieldSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedFormId) {
      toast.error("Selecione um formulário para adicionar uma pergunta.");
      return;
    }

    try {
      if (editingFieldId) {
        await updateFormField(Number(selectedFormId), editingFieldId, fieldForm);
        toast.success("Pergunta atualizada.");
      } else {
        await createFormField(Number(selectedFormId), fieldForm);
        toast.success("Pergunta adicionada.");
      }
      resetFieldForm();
      await refreshSelectedForm();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao salvar pergunta."));
    }
  }

  async function confirmDeleteField() {
    if (!selectedFormId || !pendingDeleteFieldId) return;
    setDeletingField(true);

    try {
      await deleteFormField(Number(selectedFormId), pendingDeleteFieldId);
      toast.success("Pergunta removida.");
      if (editingFieldId === pendingDeleteFieldId) resetFieldForm();
      setPendingDeleteFieldId(null);
      await refreshSelectedForm();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao remover pergunta."));
    } finally {
      setDeletingField(false);
    }
  }

  return (
    <Page>
      <Hero>
        <h2>Formulários dinâmicos</h2>
        <Lead>
          Crie formulários de triagem com perguntas personalizadas e use esses modelos ao criar processos seletivos.
        </Lead>
      </Hero>

      <Panel>
        <PanelTitle>{editingId ? "Editar formulário" : "Novo formulário"}</PanelTitle>
        <form onSubmit={handleFormSubmit}>
          <Grid>
            <Field>
              Título
              <Input required value={form.title} onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))} />
            </Field>
            <Field>
              Departamento
              <Input required value={form.department} onChange={(event) => setForm((prev) => ({ ...prev, department: event.target.value }))} />
            </Field>
          </Grid>
          <Field>
            Descrição
            <Textarea required value={form.description} onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))} />
          </Field>
          <Actions>
            <Button tone="brand" type="submit">{editingId ? "Salvar" : "Criar formulário"}</Button>
            <Button type="button" tone="ghost" onClick={resetForm}>Limpar</Button>
          </Actions>
        </form>
      </Panel>

      <Panel>
        <PanelTitle>Formulários cadastrados</PanelTitle>
        {items.length === 0 ? (
          <Empty>Nenhum formulário cadastrado.</Empty>
        ) : (
          <List>
            {items.map((item) => (
              <Item key={item.id}>
                <ItemTop>
                  <strong>{item.title}</strong>
                  <Actions>
                    <Button type="button" onClick={() => setSelectedFormId(String(item.id))}>Visualizar</Button>
                    <Button type="button" onClick={() => beginEdit(item)}>Editar</Button>
                    <Button type="button" tone="danger" onClick={() => setPendingDeleteFormId(item.id)}>Excluir</Button>
                  </Actions>
                </ItemTop>
                <Meta>{item.department}</Meta>
              </Item>
            ))}
          </List>
        )}
      </Panel>

      <Panel>
        <PanelTitle>Modelo do formulário (perguntas)</PanelTitle>
        <Field>
          Formulário para gerenciar perguntas
          <Select value={selectedFormId} onChange={(event) => setSelectedFormId(event.target.value)}>
            <option value="">Selecione</option>
            {items.map((item) => (
              <option key={item.id} value={item.id}>{item.title}</option>
            ))}
          </Select>
        </Field>

        {selectedForm ? (
          <>
            <form onSubmit={handleFieldSubmit}>
              <Grid>
                <Field>
                  Pergunta
                  <Textarea
                    required
                    value={fieldForm.question}
                    onChange={(event) => setFieldForm((prev) => ({ ...prev, question: event.target.value }))}
                  />
                </Field>
                <Field>
                  Tipo de resposta
                  <Select
                    value={fieldForm.response_type}
                    onChange={(event) => setFieldForm((prev) => ({ ...prev, response_type: event.target.value as AdminForm.Field["response_type"] }))}
                  >
                    {RESPONSE_TYPES.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </Select>
                </Field>
              </Grid>
              <Actions>
                <Button tone="brand" type="submit">
                  {editingFieldId ? "Salvar edição" : "Adicionar pergunta"}
                </Button>
                {editingFieldId ? (
                  <Button type="button" tone="ghost" onClick={resetFieldForm}>Cancelar edição</Button>
                ) : null}
              </Actions>
            </form>

            {selectedForm.fields?.length ? (
              <List>
                {selectedForm.fields.map((field) => (
                  <Item key={field.id}>
                    <ItemTop>
                      <strong>{field.question}</strong>
                      <Actions>
                        <Button type="button" onClick={() => beginEditField(field)}>Editar</Button>
                        <Button type="button" tone="danger" onClick={() => setPendingDeleteFieldId(field.id)}>Excluir</Button>
                      </Actions>
                    </ItemTop>
                    <Meta>Tipo: {field.response_type}</Meta>
                  </Item>
                ))}
              </List>
            ) : (
              <Empty>Esse formulário ainda não possui perguntas.</Empty>
            )}
          </>
        ) : (
          <Empty>Selecione um formulário para visualizar e editar o modelo.</Empty>
        )}
      </Panel>

      <ConfirmDialog
        open={pendingDeleteFormId !== null}
        title="Excluir formulário"
        message="Essa ação não pode ser desfeita. As perguntas desse formulário também serão removidas."
        confirming={deletingForm}
        onConfirm={() => void confirmDeleteForm()}
        onCancel={() => setPendingDeleteFormId(null)}
      />

      <ConfirmDialog
        open={pendingDeleteFieldId !== null}
        title="Excluir pergunta"
        message="Essa ação não pode ser desfeita."
        confirming={deletingField}
        onConfirm={() => void confirmDeleteField()}
        onCancel={() => setPendingDeleteFieldId(null)}
      />
    </Page>
  );
}
