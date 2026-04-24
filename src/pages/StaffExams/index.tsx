import { type FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  createExam,
  createExamQuestion,
  deleteExam,
  getExam,
  listExams,
  updateExam,
} from "../../services/admin/exams";
import type { AdminExam } from "../../services/admin/exams/dto";
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
  Select,
  Textarea,
} from "../StaffKit/styles";

type ExamFormState = {
  title: string;
  description: string;
  department: string;
};

const emptyExamForm: ExamFormState = {
  title: "",
  description: "",
  department: "",
};

type QuestionFormState = {
  text: string;
  question_type: string;
  alt1: string;
  alt2: string;
  alt3: string;
  alt4: string;
  correctIndex: string;
};

const emptyQuestionForm: QuestionFormState = {
  text: "",
  question_type: "multiple_choice",
  alt1: "",
  alt2: "",
  alt3: "",
  alt4: "",
  correctIndex: "0",
};

export function StaffExamsPage() {
  const [items, setItems] = useState<AdminExam.Item[]>([]);
  const [form, setForm] = useState<ExamFormState>(emptyExamForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [selectedExamId, setSelectedExamId] = useState<string>("");
  const [selectedExam, setSelectedExam] = useState<AdminExam.Item | null>(null);
  const [questionForm, setQuestionForm] = useState<QuestionFormState>(emptyQuestionForm);

  async function loadExams() {
    const response = await listExams();
    setItems(response);
  }

  useEffect(() => {
    void loadExams();
  }, []);

  useEffect(() => {
    if (!selectedExamId) {
      setSelectedExam(null);
      return;
    }

    async function loadDetail() {
      try {
        const detail = await getExam(Number(selectedExamId));
        setSelectedExam(detail);
      } catch (error) {
        toast.error(getApiErrorMessage(error, "Erro ao carregar prova."));
      }
    }

    void loadDetail();
  }, [selectedExamId]);

  function beginEdit(item: AdminExam.Item) {
    setEditingId(item.id);
    setForm({
      title: item.title,
      description: item.description,
      department: item.department,
    });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyExamForm);
  }

  async function handleExamSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      if (editingId) {
        await updateExam(editingId, form);
        toast.success("Prova atualizada.");
      } else {
        await createExam(form);
        toast.success("Prova criada.");
      }

      resetForm();
      await loadExams();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao salvar prova."));
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Confirma exclusao da prova?")) {
      return;
    }

    try {
      await deleteExam(id);
      toast.success("Prova removida.");
      setSelectedExamId((current) => (current === String(id) ? "" : current));
      await loadExams();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao remover prova."));
    }
  }

  async function handleQuestionSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedExamId) {
      toast.error("Selecione uma prova para adicionar questao.");
      return;
    }

    const alternatives = [
      questionForm.alt1,
      questionForm.alt2,
      questionForm.alt3,
      questionForm.alt4,
    ]
      .map((text, index) => ({ text, correct: index === Number(questionForm.correctIndex) }))
      .filter((item) => item.text.trim().length > 0);

    if (alternatives.length < 2) {
      toast.error("Informe ao menos duas alternativas.");
      return;
    }

    try {
      await createExamQuestion(Number(selectedExamId), {
        text: questionForm.text,
        question_type: questionForm.question_type,
        alternatives_attributes: alternatives,
      });
      toast.success("Questao adicionada.");
      setQuestionForm(emptyQuestionForm);
      const detail = await getExam(Number(selectedExamId));
      setSelectedExam(detail);
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao adicionar questao."));
    }
  }

  return (
    <Page>
      <Hero>
        <h2>Testes dinamicos</h2>
        <Lead>
          Crie provas, modele questoes e alternativas corretas, e use esses modelos ao criar processos seletivos.
        </Lead>
      </Hero>

      <Panel>
        <PanelTitle>{editingId ? "Editar prova" : "Nova prova"}</PanelTitle>
        <form onSubmit={handleExamSubmit}>
          <Grid>
            <Field>
              Titulo
              <Input
                required
                value={form.title}
                onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
              />
            </Field>
            <Field>
              Departamento
              <Input
                required
                value={form.department}
                onChange={(event) => setForm((prev) => ({ ...prev, department: event.target.value }))}
              />
            </Field>
          </Grid>

          <Field>
            Descricao
            <Textarea
              required
              value={form.description}
              onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
            />
          </Field>

          <Actions>
            <Button tone="brand" type="submit">
              {editingId ? "Salvar" : "Criar prova"}
            </Button>
            <Button type="button" tone="ghost" onClick={resetForm}>
              Limpar
            </Button>
          </Actions>
        </form>
      </Panel>

      <Panel>
        <PanelTitle>Provas cadastradas</PanelTitle>
        {items.length === 0 ? (
          <Empty>Nenhuma prova cadastrada.</Empty>
        ) : (
          <List>
            {items.map((item) => (
              <Item key={item.id}>
                <ItemTop>
                  <strong>{item.title}</strong>
                  <Actions>
                    <Button type="button" onClick={() => setSelectedExamId(String(item.id))}>
                      Visualizar
                    </Button>
                    <Button type="button" onClick={() => beginEdit(item)}>
                      Editar
                    </Button>
                    <Button type="button" tone="danger" onClick={() => void handleDelete(item.id)}>
                      Excluir
                    </Button>
                  </Actions>
                </ItemTop>
                <Meta>{item.department}</Meta>
              </Item>
            ))}
          </List>
        )}
      </Panel>

      <Panel>
        <PanelTitle>Modelo da prova (questoes)</PanelTitle>
        <Field>
          Prova para gerenciar perguntas
          <Select value={selectedExamId} onChange={(event) => setSelectedExamId(event.target.value)}>
            <option value="">Selecione</option>
            {items.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </Select>
        </Field>

        {selectedExam ? (
          <>
            <form onSubmit={handleQuestionSubmit}>
              <Grid>
                <Field>
                  Pergunta
                  <Textarea
                    required
                    value={questionForm.text}
                    onChange={(event) => setQuestionForm((prev) => ({ ...prev, text: event.target.value }))}
                  />
                </Field>
                <Field>
                  Tipo
                  <Input
                    value={questionForm.question_type}
                    onChange={(event) =>
                      setQuestionForm((prev) => ({ ...prev, question_type: event.target.value }))
                    }
                  />
                </Field>
                <Field>
                  Alternativa A
                  <Input
                    required
                    value={questionForm.alt1}
                    onChange={(event) => setQuestionForm((prev) => ({ ...prev, alt1: event.target.value }))}
                  />
                </Field>
                <Field>
                  Alternativa B
                  <Input
                    required
                    value={questionForm.alt2}
                    onChange={(event) => setQuestionForm((prev) => ({ ...prev, alt2: event.target.value }))}
                  />
                </Field>
                <Field>
                  Alternativa C
                  <Input
                    value={questionForm.alt3}
                    onChange={(event) => setQuestionForm((prev) => ({ ...prev, alt3: event.target.value }))}
                  />
                </Field>
                <Field>
                  Alternativa D
                  <Input
                    value={questionForm.alt4}
                    onChange={(event) => setQuestionForm((prev) => ({ ...prev, alt4: event.target.value }))}
                  />
                </Field>
                <Field>
                  Indice da correta
                  <Select
                    value={questionForm.correctIndex}
                    onChange={(event) =>
                      setQuestionForm((prev) => ({ ...prev, correctIndex: event.target.value }))
                    }
                  >
                    <option value="0">A</option>
                    <option value="1">B</option>
                    <option value="2">C</option>
                    <option value="3">D</option>
                  </Select>
                </Field>
              </Grid>

              <Actions>
                <Button tone="brand" type="submit">
                  Adicionar questao
                </Button>
              </Actions>
            </form>

            {selectedExam.questions?.length ? (
              <List>
                {selectedExam.questions.map((question) => (
                  <Item key={question.id}>
                    <strong>{question.text}</strong>
                    {question.alternatives.map((alternative) => (
                      <Meta key={alternative.id}>
                        {alternative.correct ? "[Correta]" : "[Opcao]"} {alternative.text}
                      </Meta>
                    ))}
                  </Item>
                ))}
              </List>
            ) : (
              <Empty>Essa prova ainda nao possui questoes.</Empty>
            )}
          </>
        ) : (
          <Empty>Selecione uma prova para visualizar e editar o modelo.</Empty>
        )}
      </Panel>
    </Page>
  );
}
