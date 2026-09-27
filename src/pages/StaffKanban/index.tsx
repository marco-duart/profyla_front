import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCorners,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { listAdminApplications, moveApplicationStage } from "../../services/admin/applications";
import type { AdminApplication } from "../../services/admin/applications/dto";
import { listCompanies } from "../../services/admin/companies";
import type { AdminCompany } from "../../services/admin/companies/dto";
import { getHiring, listHirings } from "../../services/admin/hirings";
import type { AdminHiring } from "../../services/admin/hirings/dto";
import { listJobs } from "../../services/admin/jobs";
import type { AdminJob } from "../../services/admin/jobs/dto";
import { getApiErrorMessage } from "../../utils/api-error";
import { ConfirmDialog } from "../StaffKit/ConfirmDialog";
import {
  Actions,
  Button,
  Empty,
  Field,
  Hero,
  Input,
  Lead,
  Page,
  Panel,
  Select,
  Textarea,
} from "../StaffKit/styles";
import {
  Badge,
  BoardViewport,
  Card,
  CardMeta,
  CardTitle,
  Column,
  ColumnDropZone,
  ColumnFoot,
  ColumnHeader,
  ColumnTitle,
  DragHint,
  DropPreviewCard,
  Filters,
  KanbanBoard,
  Modal,
  Overlay,
  PrestigeLead,
  PrestigePanel,
  PrestigeTitle,
} from "./styles";

type MoveDraft = {
  application: AdminApplication.Item;
  targetStage: AdminHiring.Stage;
};

type FeedbackForm = {
  feedback_title: string;
  overall_assessment: string;
  specific_comment: string;
  improvements: string;
};

type SortableCardProps = {
  application: AdminApplication.Item;
  isActiveDragging: boolean;
  onQuickReject: (application: AdminApplication.Item) => Promise<void>;
  disableReject: boolean;
};

type StageColumnProps = {
  stage: AdminHiring.Stage;
  stageCards: AdminApplication.Item[];
  previewIndex: number;
  isOverColumn: boolean;
  activeCardId: number | null;
  onQuickReject: (application: AdminApplication.Item) => Promise<void>;
};

const emptyFeedback: FeedbackForm = {
  feedback_title: "Atualizacao de etapa",
  overall_assessment: "",
  specific_comment: "",
  improvements: "",
};

const terminalStages = new Set(["REPROVADO", "DESISTIU", "CONTRATADO"]);

function asCardId(applicationId: number): string {
  return `card-${applicationId}`;
}

function asColumnId(stageId: number): string {
  return `column-${stageId}`;
}

function parseCardId(id: string | number | null | undefined): number | null {
  if (typeof id !== "string" || !id.startsWith("card-")) {
    return null;
  }

  const parsed = Number(id.replace("card-", ""));
  return Number.isNaN(parsed) ? null : parsed;
}

function parseColumnId(id: string | number | null | undefined): number | null {
  if (typeof id !== "string" || !id.startsWith("column-")) {
    return null;
  }

  const parsed = Number(id.replace("column-", ""));
  return Number.isNaN(parsed) ? null : parsed;
}

function SortableCard({ application, isActiveDragging, onQuickReject, disableReject }: SortableCardProps) {
  const sortable = useSortable({ id: asCardId(application.id) });
  const style = {
    transform: CSS.Transform.toString(sortable.transform),
    transition: sortable.transition,
  };

  return (
    <Card
      ref={sortable.setNodeRef}
      style={style}
      {...sortable.attributes}
      {...sortable.listeners}
      dragging={isActiveDragging}
    >
      <CardTitle>{application.candidate_name || "Candidato sem nome"}</CardTitle>
      <CardMeta>{application.candidate_email || "Email nao informado"}</CardMeta>
      <CardMeta>Vaga: {application.job_name}</CardMeta>
      <CardMeta>Empresa: {application.company_name}</CardMeta>
      <Actions>
        {application.candidate_user_id ? (
          <Link to={`/staff/candidates/${application.candidate_user_id}`} onPointerDown={(event) => event.stopPropagation()}>
            <Button type="button">Ver perfil</Button>
          </Link>
        ) : null}
        <Button
          type="button"
          tone="danger"
          onClick={() => void onQuickReject(application)}
          disabled={disableReject}
        >
          Reprovar agora
        </Button>
      </Actions>
    </Card>
  );
}

function StageColumn({
  stage,
  stageCards,
  previewIndex,
  isOverColumn,
  activeCardId,
  onQuickReject,
}: StageColumnProps) {
  const stageCardIds = stageCards.map((item) => asCardId(item.id));
  const droppable = useDroppable({ id: asColumnId(stage.id) });

  return (
    <Column ref={droppable.setNodeRef} isActiveColumn={isOverColumn || droppable.isOver}>
      <ColumnHeader>
        <ColumnTitle>{stage.title}</ColumnTitle>
        <Badge>{stageCards.length}</Badge>
      </ColumnHeader>

      <ColumnDropZone isOver={isOverColumn || droppable.isOver}>
        {stageCards.length === 0 && previewIndex < 0 ? <Empty>Sem candidatos nesta etapa.</Empty> : null}

        <SortableContext items={stageCardIds} strategy={verticalListSortingStrategy}>
          {stageCards.map((application, index) => (
            <div key={application.id}>
              {previewIndex === index ? (
                <DropPreviewCard>Solte aqui para mover para {stage.title}</DropPreviewCard>
              ) : null}
              <SortableCard
                application={application}
                isActiveDragging={activeCardId === application.id}
                onQuickReject={onQuickReject}
                disableReject={terminalStages.has(application.stage)}
              />
            </div>
          ))}
        </SortableContext>

        {previewIndex === stageCards.length && activeCardId ? (
          <DropPreviewCard>Solte aqui para mover para {stage.title}</DropPreviewCard>
        ) : null}
      </ColumnDropZone>

      <ColumnFoot>
        {terminalStages.has(stage.title)
          ? "Etapa terminal: movimentos para ca exigem atencao de comunicacao ao candidato."
          : "Etapa ativa: acompanhe SLA e avance candidatos com criterio."}
      </ColumnFoot>
    </Column>
  );
}

export function StaffKanbanPage() {
  const [companies, setCompanies] = useState<AdminCompany.Item[]>([]);
  const [jobs, setJobs] = useState<AdminJob.Item[]>([]);
  const [hirings, setHirings] = useState<AdminHiring.Item[]>([]);
  const [stages, setStages] = useState<AdminHiring.Stage[]>([]);
  const [applications, setApplications] = useState<AdminApplication.Item[]>([]);

  const [selectedCompanyId, setSelectedCompanyId] = useState<string>("");
  const [selectedJobId, setSelectedJobId] = useState<string>("");
  const [selectedHiringId, setSelectedHiringId] = useState<string>("");

  const [moveDraft, setMoveDraft] = useState<MoveDraft | null>(null);
  const [pendingQuickReject, setPendingQuickReject] = useState<AdminApplication.Item | null>(null);
  const [rejecting, setRejecting] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState<FeedbackForm>(emptyFeedback);
  const [search, setSearch] = useState<string>("");

  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  const [overId, setOverId] = useState<string | number | null>(null);
  const [boardSnapshot, setBoardSnapshot] = useState<AdminApplication.Item[]>([]);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const stagesById = useMemo(() => {
    const map = new Map<number, AdminHiring.Stage>();
    stages.forEach((stage) => map.set(stage.id, stage));
    return map;
  }, [stages]);

  const jobsByCompany = useMemo(() => {
    if (!selectedCompanyId) {
      return jobs;
    }

    return jobs.filter((job) => job.company_id === Number(selectedCompanyId));
  }, [jobs, selectedCompanyId]);

  const hiringsByJob = useMemo(() => {
    if (!selectedJobId) {
      return hirings;
    }

    return hirings.filter((hiring) => hiring.job_posting_id === Number(selectedJobId));
  }, [hirings, selectedJobId]);

  const activeApplication = useMemo(
    () => applications.find((item) => item.id === activeCardId) ?? null,
    [applications, activeCardId],
  );

  async function loadBaseData() {
    const [companiesResponse, jobsResponse, hiringsResponse] = await Promise.all([
      listCompanies(),
      listJobs(),
      listHirings(),
    ]);

    setCompanies(companiesResponse);
    setJobs(jobsResponse);
    setHirings(hiringsResponse);
  }

  useEffect(() => {
    void loadBaseData();
  }, []);

  useEffect(() => {
    if (!selectedHiringId) {
      setStages([]);
      setApplications([]);
      return;
    }

    async function loadBoardData() {
      try {
        const [hiringDetail, allApplications] = await Promise.all([
          getHiring(Number(selectedHiringId)),
          listAdminApplications(search || undefined),
        ]);

        setStages(hiringDetail.stages ?? []);
        setApplications(allApplications.filter((item) => item.hiring_process_id === Number(selectedHiringId)));
      } catch (error) {
        toast.error(getApiErrorMessage(error, "Erro ao carregar kanban."));
      }
    }

    void loadBoardData();
  }, [selectedHiringId, search]);

  async function refreshBoard() {
    if (!selectedHiringId) {
      return;
    }

    const allApplications = await listAdminApplications(search || undefined);
    setApplications(allApplications.filter((item) => item.hiring_process_id === Number(selectedHiringId)));
  }

  function findTargetStageId(currentOverId: string | number | null): number | null {
    const columnId = parseColumnId(currentOverId);
    if (columnId) {
      return columnId;
    }

    const cardId = parseCardId(currentOverId);
    if (!cardId) {
      return null;
    }

    const application = applications.find((item) => item.id === cardId);
    return application?.stage_id ?? null;
  }

  function getPreviewIndex(stageCards: AdminApplication.Item[], stageId: number): number {
    if (!activeCardId) {
      return -1;
    }

    const targetStageId = findTargetStageId(overId);
    if (targetStageId !== stageId) {
      return -1;
    }

    const overCardId = parseCardId(overId);
    if (overCardId) {
      const idx = stageCards.findIndex((item) => item.id === overCardId);
      return idx >= 0 ? idx : stageCards.length;
    }

    return stageCards.length;
  }

  function openMoveConfirmationByIds(applicationId: number, targetStageId: number) {
    const application = applications.find((item) => item.id === applicationId);
    const targetStage = stagesById.get(targetStageId);

    if (!application || !targetStage || application.stage_id === targetStage.id) {
      return;
    }

    setFeedbackForm(emptyFeedback);
    setMoveDraft({ application, targetStage });
  }

  async function handleMoveConfirm() {
    if (!moveDraft) {
      return;
    }

    try {
      await moveApplicationStage({
        application_id: moveDraft.application.id,
        hiring_process_stage_id: moveDraft.targetStage.id,
        feedback_title: feedbackForm.feedback_title || undefined,
        overall_assessment: feedbackForm.overall_assessment
          ? Number(feedbackForm.overall_assessment)
          : undefined,
        specific_comment: feedbackForm.specific_comment || undefined,
        improvements: feedbackForm.improvements || undefined,
      });

      toast.success("Candidato movido com sucesso.");
      setMoveDraft(null);
      setBoardSnapshot([]);
      await refreshBoard();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao mover candidatura."));
      setApplications(boardSnapshot);
      setMoveDraft(null);
    }
  }

  async function handleQuickReject(application: AdminApplication.Item) {
    const rejectStage = stages.find((stage) => stage.title === "REPROVADO");
    if (!rejectStage) {
      toast.error("Nao existe etapa REPROVADO nesse processo.");
      return;
    }

    setPendingQuickReject(application);
  }

  async function confirmQuickReject() {
    if (!pendingQuickReject) return;
    const rejectStage = stages.find((stage) => stage.title === "REPROVADO");
    if (!rejectStage) return;

    setRejecting(true);
    try {
      await moveApplicationStage({
        application_id: pendingQuickReject.id,
        hiring_process_stage_id: rejectStage.id,
        feedback_title: "Resultado do processo",
        specific_comment: "Candidatura encerrada nesta etapa.",
      });
      toast.success("Candidato reprovado.");
      setPendingQuickReject(null);
      await refreshBoard();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao reprovar candidato."));
    } finally {
      setRejecting(false);
    }
  }

  function handleDragStart(event: DragStartEvent) {
    const cardId = parseCardId(event.active.id);
    if (!cardId) {
      return;
    }

    setBoardSnapshot(applications);
    setActiveCardId(cardId);
  }

  function handleDragOver(event: DragOverEvent) {
    setOverId(event.over?.id ?? null);
  }

  function handleDragCancel() {
    if (boardSnapshot.length > 0) {
      setApplications(boardSnapshot);
    }

    setActiveCardId(null);
    setOverId(null);
  }

  function handleDragEnd(event: DragEndEvent) {
    const sourceApplicationId = parseCardId(event.active.id);
    const targetStageId = findTargetStageId(event.over?.id ?? null);

    setActiveCardId(null);
    setOverId(null);

    if (!sourceApplicationId || !targetStageId) {
      if (boardSnapshot.length > 0) {
        setApplications(boardSnapshot);
      }
      return;
    }

    openMoveConfirmationByIds(sourceApplicationId, targetStageId);
  }

  return (
    <Page>
      <Hero>
        <h2>Kanban do processo seletivo</h2>
        <Lead>
          Centro de controle do RH: acompanhe candidatos por etapa, arraste horizontalmente com preview de queda e confirme toda movimentacao critica.
        </Lead>
      </Hero>

      <PrestigePanel>
        <PrestigeTitle>Painel principal do RH</PrestigeTitle>
        <PrestigeLead>
          Este e o coracao operacional da selecao. O board e obrigatoriamente horizontal: sem quebra de linha, com scroll lateral continuo e colunas verticais de alta legibilidade.
        </PrestigeLead>
        <DragHint>
          Arraste um card e passe sobre colunas/cards para ver preview de onde ele cairia. A mudanca so e aplicada apos confirmacao.
        </DragHint>
      </PrestigePanel>

      <Panel>
        <h3>Contexto do processo</h3>
        <Filters>
          <Field>
            Empresa
            <Select
              value={selectedCompanyId}
              onChange={(event) => {
                setSelectedCompanyId(event.target.value);
                setSelectedJobId("");
                setSelectedHiringId("");
              }}
            >
              <option value="">Selecione</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.company_name}
                </option>
              ))}
            </Select>
          </Field>

          <Field>
            Vaga
            <Select
              value={selectedJobId}
              onChange={(event) => {
                setSelectedJobId(event.target.value);
                setSelectedHiringId("");
              }}
            >
              <option value="">Selecione</option>
              {jobsByCompany.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.title}
                </option>
              ))}
            </Select>
          </Field>

          <Field>
            Processo seletivo
            <Select value={selectedHiringId} onChange={(event) => setSelectedHiringId(event.target.value)}>
              <option value="">Selecione</option>
              {hiringsByJob.map((hiring) => (
                <option key={hiring.id} value={hiring.id}>
                  Processo #{hiring.id} ({hiring.status})
                </option>
              ))}
            </Select>
          </Field>
        </Filters>

        <Field>
          Busca rapida por candidato/vaga
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Nome do candidato ou vaga"
          />
        </Field>
      </Panel>

      <Panel>
        <h3>Board Kanban</h3>
        {!selectedHiringId ? (
          <Empty>Selecione empresa, vaga e processo para abrir o kanban.</Empty>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragCancel={handleDragCancel}
            onDragEnd={handleDragEnd}
          >
            <BoardViewport>
              <KanbanBoard>
                {stages.map((stage) => {
                  const stageCards = applications.filter((application) => application.stage_id === stage.id);
                  const overStageId = findTargetStageId(overId);
                  const previewIndex = getPreviewIndex(stageCards, stage.id);
                  const isOverColumn = overStageId === stage.id && Boolean(activeCardId);

                  return (
                    <StageColumn
                      key={stage.id}
                      stage={stage}
                      stageCards={stageCards}
                      previewIndex={previewIndex}
                      isOverColumn={isOverColumn}
                      activeCardId={activeCardId}
                      onQuickReject={handleQuickReject}
                    />
                  );
                })}
              </KanbanBoard>
            </BoardViewport>

            <DragOverlay>
              {activeApplication ? (
                <Card overlay>
                  <CardTitle>{activeApplication.candidate_name || "Candidato"}</CardTitle>
                  <CardMeta>{activeApplication.candidate_email || "Email nao informado"}</CardMeta>
                  <CardMeta>Vaga: {activeApplication.job_name}</CardMeta>
                </Card>
              ) : null}
            </DragOverlay>
          </DndContext>
        )}
      </Panel>

      {moveDraft ? (
        <Overlay>
          <Modal>
            <h3>Confirmar movimentacao de candidato</h3>
            <p>
              Mover <strong>{moveDraft.application.candidate_name || "candidato"}</strong> para etapa <strong>{moveDraft.targetStage.title}</strong>?
            </p>

            <Field>
              Titulo do feedback
              <Input
                value={feedbackForm.feedback_title}
                onChange={(event) =>
                  setFeedbackForm((prev) => ({ ...prev, feedback_title: event.target.value }))
                }
              />
            </Field>

            <Field>
              Avaliacao geral (1-10)
              <Input
                type="number"
                min={1}
                max={10}
                value={feedbackForm.overall_assessment}
                onChange={(event) =>
                  setFeedbackForm((prev) => ({ ...prev, overall_assessment: event.target.value }))
                }
              />
            </Field>

            <Field>
              Comentario
              <Textarea
                value={feedbackForm.specific_comment}
                onChange={(event) =>
                  setFeedbackForm((prev) => ({ ...prev, specific_comment: event.target.value }))
                }
              />
            </Field>

            <Field>
              Melhorias sugeridas
              <Textarea
                value={feedbackForm.improvements}
                onChange={(event) =>
                  setFeedbackForm((prev) => ({ ...prev, improvements: event.target.value }))
                }
              />
            </Field>

            <Actions>
              <Button tone="brand" type="button" onClick={() => void handleMoveConfirm()}>
                Confirmar movimentacao
              </Button>
              <Button
                type="button"
                onClick={() => {
                  if (boardSnapshot.length > 0) {
                    setApplications(boardSnapshot);
                  }
                  setMoveDraft(null);
                }}
              >
                Cancelar
              </Button>
            </Actions>
          </Modal>
        </Overlay>
      ) : null}

      <ConfirmDialog
        open={pendingQuickReject !== null}
        title="Reprovar candidato"
        message={`Reprovar ${pendingQuickReject?.candidate_name || "candidato"} agora? Essa acao move a candidatura para a etapa REPROVADO.`}
        confirming={rejecting}
        onConfirm={() => void confirmQuickReject()}
        onCancel={() => setPendingQuickReject(null)}
      />
    </Page>
  );
}
