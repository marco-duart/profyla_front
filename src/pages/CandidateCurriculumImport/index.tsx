import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { usePageMeta } from "../../hooks/usePageMeta";
import { applyImport, getImportDraft } from "../../services/curriculum";
import type { CurriculumImport } from "../../services/curriculum/dto";
import { formatDate } from "../../utils/format";
import { getApiErrorCode, getApiErrorMessage } from "../../utils/api-error";
import { maskPhone } from "../../utils/masks";
import { ConfirmDialog } from "../CandidateKit/ConfirmDialog";
import {
  Actions,
  Badge,
  Button,
  Checkbox,
  CheckboxField,
  Chip,
  ChipRow,
  Empty,
  FieldNote,
  Hero,
  Lead,
  List,
  Meta,
  Page,
  Panel,
  PanelTitle,
  ReviewLabel,
  ReviewRow,
  ReviewValue,
  Skeleton,
} from "../CandidateKit/styles";
import { missingRequired, type ImportField } from "./fields";
import { ImportItem } from "./ImportItem";

type Row = {
  key: string;
  selected: boolean;
  confidence: CurriculumImport.Confidence;
  warnings: string[];
  data: Record<string, string | null>;
  original: Record<string, string | null>;
};

type ListName = "employment" | "academic" | "professional" | "social";
type Lists = Record<ListName, Row[]>;
type ErrorsByKey = Record<string, Record<string, string[]>>;

const LISTS: Record<ListName, { section: string; fields: ImportField[]; heading: string }> = {
  employment: {
    section: "employment_histories",
    heading: "Experiência profissional",
    fields: [
      { name: "company_name", label: "Empresa", required: true },
      { name: "position", label: "Cargo", required: true },
      { name: "start_date", label: "Início", type: "date", required: true },
      { name: "end_date", label: "Fim (vazio = atual)", type: "date" },
      { name: "achievements", label: "Realizações", type: "textarea" },
    ],
  },
  academic: {
    section: "academic_histories",
    heading: "Formação acadêmica",
    fields: [
      { name: "title", label: "Curso", required: true },
      { name: "institution", label: "Instituição", required: true },
      { name: "degree", label: "Grau", required: true },
      { name: "start_date", label: "Início", type: "date", required: true },
      { name: "end_date", label: "Conclusão", type: "date" },
    ],
  },
  professional: {
    section: "professional_links",
    heading: "Links profissionais",
    fields: [
      { name: "title", label: "Título", required: true },
      { name: "link", label: "Endereço", required: true, full: true },
    ],
  },
  social: {
    section: "social_links",
    heading: "Redes sociais",
    fields: [
      { name: "title", label: "Título", required: true },
      { name: "link", label: "Endereço", required: true, full: true },
    ],
  },
};

const PROFILE_LABELS: Record<CurriculumImport.ProfileField, string> = {
  phone_number1: "Celular principal",
  phone_number2: "Celular secundário",
  address_city: "Cidade",
  address_neighborhood: "Bairro",
  birthplace: "Naturalidade",
  birthdate: "Data de nascimento",
  employee: "Empregado atualmente",
  resume: "Resumo profissional",
};

const SOURCE_NOTES: Record<string, string> = {
  summary_too_long: "O resumo do PDF é longo demais (mais de 2000 caracteres) e não foi sugerido.",
};

function displayProfile(field: CurriculumImport.ProfileField, value: string | boolean | null): string {
  if (value === null || value === "") return "-";
  if (typeof value === "boolean") return value ? "Sim" : "Não";
  if (field.startsWith("phone")) return maskPhone(value);
  if (field === "birthdate") return formatDate(value);
  return value;
}

function toRow<T extends object>(item: { key: string; selected: boolean; confidence: CurriculumImport.Confidence; warnings: string[]; data: T }): Row {
  const data = Object.fromEntries(Object.entries(item.data).map(([name, value]) => [name, value == null ? null : String(value)]));
  return { key: item.key, selected: item.selected, confidence: item.confidence, warnings: item.warnings, data, original: { ...data } };
}

function clean(data: Record<string, string | null>): Record<string, string | null> {
  return Object.fromEntries(Object.entries(data).map(([name, value]) => [name, value && value.trim() ? value.trim() : null]));
}

function itemTitle(list: ListName, data: Record<string, string | null>): string {
  if (list === "employment") return `Experiência: ${[data.position, data.company_name].filter(Boolean).join(" na ") || "sem título"}`;
  if (list === "academic") return `Formação: ${[data.degree, data.title].filter(Boolean).join(" em ") || "sem título"}`;
  return `Link: ${data.title || data.link || "sem título"}`;
}

function plural(count: number, one: string, many: string): string {
  return `${count} ${count === 1 ? one : many}`;
}

export function CandidateCurriculumImportPage() {
  usePageMeta("Importar currículo");
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "ready" | "unreadable" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [draft, setDraft] = useState<CurriculumImport.Draft | null>(null);
  const [profileSel, setProfileSel] = useState<Record<string, boolean>>({});
  const [lists, setLists] = useState<Lists>({ employment: [], academic: [], professional: [], social: [] });
  const [skillSel, setSkillSel] = useState<Record<number, boolean>>({});
  const [knowledgeSel, setKnowledgeSel] = useState<Record<number, boolean>>({});
  const [errors, setErrors] = useState<ErrorsByKey>({});
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  // One request per visit: React StrictMode runs the effect twice in development, and every draft counts
  // against the hourly limit.
  const request = useRef<Promise<CurriculumImport.Draft> | null>(null);

  useEffect(() => {
    let active = true;
    request.current ??= getImportDraft();
    request.current
      .then((result) => {
        if (!active) return;
        setDraft(result);
        setProfileSel(Object.fromEntries(result.profile.map((item) => [item.field, item.selected])));
        setLists({
          employment: result.employment_histories.map(toRow),
          academic: result.academic_histories.map(toRow),
          professional: result.professional_links.map(toRow),
          social: result.social_links.map(toRow),
        });
        setSkillSel(Object.fromEntries(result.skills.map((entry) => [entry.skill_id as number, entry.selected])));
        setKnowledgeSel(Object.fromEntries(result.knowledges.map((entry) => [entry.knowledge_id as number, entry.selected])));
        setStatus("ready");
      })
      .catch((error) => {
        if (!active) return;
        const code = getApiErrorCode(error);
        if (code === "unreadable_pdf") {
          setStatus("unreadable");
        } else if (code === "no_curriculum_file") {
          toast.error("Envie o seu currículo em PDF antes de importar.");
          navigate("/candidate/curriculum");
        } else {
          setErrorMessage(getApiErrorMessage(error, "Não foi possível ler o seu currículo."));
          setStatus("error");
        }
      });
    return () => {
      active = false;
    };
  }, [navigate]);

  function selectedRows(list: ListName): Row[] {
    return lists[list].filter((row) => row.selected && missingRequired(LISTS[list].fields, row.data).length === 0);
  }

  const selectedCount = useMemo(() => {
    const profile = Object.values(profileSel).filter(Boolean).length;
    const rows = (Object.keys(LISTS) as ListName[]).reduce((sum, list) => sum + lists[list].filter((row) => row.selected && missingRequired(LISTS[list].fields, row.data).length === 0).length, 0);
    return profile + rows + Object.values(skillSel).filter(Boolean).length + Object.values(knowledgeSel).filter(Boolean).length;
  }, [profileSel, lists, skillSel, knowledgeSel]);

  const replacements = (draft?.profile ?? []).filter((item) => profileSel[item.field] && item.current !== null && item.current !== "");

  function updateRow(list: ListName, key: string, patch: (row: Row) => Row) {
    setLists((current) => ({ ...current, [list]: current[list].map((row) => (row.key === key ? patch(row) : row)) }));
    setErrors((current) => (current[key] ? { ...current, [key]: {} } : current));
  }

  function buildPayload() {
    if (!draft) return null;
    const order: Record<string, string[]> = {};
    const items = (list: ListName) => {
      const rows = selectedRows(list);
      order[LISTS[list].section] = rows.map((row) => row.key);
      return rows.map((row) => ({ data: clean(row.data), edited: JSON.stringify(clean(row.data)) !== JSON.stringify(clean(row.original)) }));
    };
    const profile: CurriculumImport.ApplyPayload["profile"] = {};
    draft.profile.forEach((item) => {
      if (profileSel[item.field]) profile[item.field] = item.value;
    });
    const payload = {
      run_id: draft.run_id,
      profile,
      employment_histories: items("employment"),
      academic_histories: items("academic"),
      professional_links: items("professional"),
      social_links: items("social"),
      skill_ids: draft.skills.filter((entry) => skillSel[entry.skill_id as number]).map((entry) => entry.skill_id as number),
      knowledge_ids: draft.knowledges.filter((entry) => knowledgeSel[entry.knowledge_id as number]).map((entry) => entry.knowledge_id as number),
    } as unknown as CurriculumImport.ApplyPayload;
    return { payload, order };
  }

  async function apply() {
    const built = buildPayload();
    if (!built) return;
    setSaving(true);
    try {
      await applyImport(built.payload);
      toast.success(`Currículo atualizado com ${plural(selectedCount, "item", "itens")}.`);
      navigate("/candidate/curriculum");
    } catch (error) {
      showApplyError(error, built.order);
    } finally {
      setSaving(false);
      setConfirmOpen(false);
    }
  }

  function showApplyError(error: unknown, order: Record<string, string[]>) {
    const details = (error as { response?: { data?: { error?: { details?: Record<string, string[]> } } } })?.response?.data?.error?.details;
    if (getApiErrorCode(error) === "validation_error" && details) {
      const next: ErrorsByKey = {};
      const profileMessages: string[] = [];
      Object.entries(details).forEach(([path, messages]) => {
        const [section, index, field] = path.split(".");
        if (section === "profile") {
          profileMessages.push(`${PROFILE_LABELS[index as CurriculumImport.ProfileField] ?? index}: ${messages.join(", ")}`);
          return;
        }
        const key = order[section]?.[Number(index)];
        if (key && field) next[key] = { ...next[key], [field]: messages };
      });
      setErrors(next);
      toast.error(profileMessages.length ? profileMessages.join(" ") : "Corrija os itens destacados e tente novamente.");
      return;
    }
    toast.error(getApiErrorMessage(error, "Não foi possível atualizar o currículo."));
  }

  function submit() {
    if (replacements.length > 0) setConfirmOpen(true);
    else void apply();
  }

  if (status === "loading") {
    return (
      <Page aria-busy="true">
        <Hero><PanelTitle>Importar currículo</PanelTitle><Lead>Lendo o seu PDF...</Lead></Hero>
        <Panel><Skeleton /><Skeleton /><Skeleton /></Panel>
      </Page>
    );
  }

  if (status === "unreadable") {
    return (
      <Page>
        <Hero><PanelTitle>Importar currículo</PanelTitle></Hero>
        <Panel>
          <p>Não conseguimos ler o texto deste PDF. Ele parece ser uma imagem, estar protegido ou danificado.</p>
          <Actions>
            <Button type="button" tone="brand" onClick={() => navigate("/candidate/curriculum")}>Enviar outro PDF</Button>
            <Button type="button" tone="ghost" onClick={() => navigate("/candidate/curriculum")}>Preencher manualmente</Button>
          </Actions>
        </Panel>
      </Page>
    );
  }

  if (status === "error" || !draft) {
    return (
      <Page>
        <Hero><PanelTitle>Importar currículo</PanelTitle></Hero>
        <Panel>
          <p role="alert">{errorMessage || "Não foi possível ler o seu currículo."}</p>
          <Actions><Button type="button" tone="ghost" onClick={() => navigate("/candidate/curriculum")}>Voltar ao currículo</Button></Actions>
        </Panel>
      </Page>
    );
  }

  const totalFound =
    draft.profile.length + draft.employment_histories.length + draft.academic_histories.length + draft.professional_links.length +
    draft.social_links.length + draft.skills.length + draft.knowledges.length;

  if (totalFound === 0) {
    return (
      <Page>
        <Hero><PanelTitle>Importar currículo</PanelTitle></Hero>
        <Panel>
          <Empty>Não encontramos informações que pudéssemos aproveitar neste PDF.</Empty>
          <Actions><Button type="button" tone="ghost" onClick={() => navigate("/candidate/curriculum")}>Voltar ao currículo</Button></Actions>
        </Panel>
      </Page>
    );
  }

  const catalogCount = draft.skills.length + draft.knowledges.length;
  return (
    <Page>
      <Hero>
        <PanelTitle>Importar currículo</PanelTitle>
        <Lead>
          Encontramos {plural(draft.employment_histories.length, "experiência", "experiências")}, {plural(draft.academic_histories.length, "formação", "formações")},{" "}
          {plural(draft.professional_links.length + draft.social_links.length, "link", "links")} e {plural(catalogCount, "habilidade", "habilidades")}. Revise, ajuste o que quiser e
          escolha o que adicionar: nada é salvo antes de você confirmar.
        </Lead>
        {draft.source.skipped_duplicates > 0 ? <FieldNote>{plural(draft.source.skipped_duplicates, "item já estava", "itens já estavam")} no seu currículo e não aparece aqui.</FieldNote> : null}
        {draft.source.truncated ? <FieldNote>Lemos só as {draft.source.pages_read} primeiras páginas do PDF.</FieldNote> : null}
        {draft.source.notes.map((note) => (note in SOURCE_NOTES ? <FieldNote key={note}>{SOURCE_NOTES[note]}</FieldNote> : null))}
      </Hero>

      {draft.profile.length > 0 ? (
        <Panel>
          <PanelTitle>Contato e dados pessoais</PanelTitle>
          {draft.profile.map((item) => (
            <div key={item.field}>
              <ReviewRow>
                <ReviewLabel>{PROFILE_LABELS[item.field]}</ReviewLabel>
                <ReviewValue>
                  {item.current !== null && item.current !== "" ? `Atual: ${displayProfile(item.field, item.current)} → ` : ""}
                  {displayProfile(item.field, item.value)}
                </ReviewValue>
              </ReviewRow>
              <CheckboxField>
                <Checkbox
                  type="checkbox"
                  checked={Boolean(profileSel[item.field])}
                  onChange={(event) => setProfileSel((current) => ({ ...current, [item.field]: event.target.checked }))}
                  aria-label={`${item.current !== null && item.current !== "" ? "Substituir" : "Adicionar"} ${PROFILE_LABELS[item.field]}`}
                />
                <span>{item.current !== null && item.current !== "" ? "Substituir" : "Adicionar"}</span>
              </CheckboxField>
            </div>
          ))}
        </Panel>
      ) : null}

      {(Object.keys(LISTS) as ListName[]).map((list) =>
        lists[list].length > 0 ? (
          <Panel key={list}>
            <PanelTitle>{LISTS[list].heading}</PanelTitle>
            <List>
              {lists[list].map((row) => (
                <ImportItem
                  key={row.key}
                  title={itemTitle(list, row.data)}
                  confidence={row.confidence}
                  selected={row.selected}
                  fields={LISTS[list].fields}
                  data={row.data}
                  warnings={row.warnings}
                  errors={errors[row.key]}
                  onToggle={(selected) => updateRow(list, row.key, (current) => ({ ...current, selected }))}
                  onChange={(name, value) => updateRow(list, row.key, (current) => ({ ...current, data: { ...current.data, [name]: value } }))}
                />
              ))}
            </List>
          </Panel>
        ) : null,
      )}

      {catalogCount > 0 ? (
        <Panel>
          <PanelTitle>Habilidades e conhecimentos</PanelTitle>
          <ChipRow>
            {draft.skills.map((entry) => (
              <Chip key={`s${entry.skill_id}`} type="button" aria-pressed={Boolean(skillSel[entry.skill_id as number])} selected={Boolean(skillSel[entry.skill_id as number])}
                onClick={() => setSkillSel((current) => ({ ...current, [entry.skill_id as number]: !current[entry.skill_id as number] }))}>
                {entry.title}
              </Chip>
            ))}
            {draft.knowledges.map((entry) => (
              <Chip key={`k${entry.knowledge_id}`} type="button" aria-pressed={Boolean(knowledgeSel[entry.knowledge_id as number])} selected={Boolean(knowledgeSel[entry.knowledge_id as number])}
                onClick={() => setKnowledgeSel((current) => ({ ...current, [entry.knowledge_id as number]: !current[entry.knowledge_id as number] }))}>
                {entry.title}
              </Chip>
            ))}
          </ChipRow>
          {draft.unmatched_terms.length > 0 ? <Meta>Não estão no nosso catálogo: {draft.unmatched_terms.join(", ")}.</Meta> : null}
        </Panel>
      ) : null}

      <Panel css={{ position: "sticky", bottom: "88px", zIndex: 5, "@md": { bottom: "$3" } }}>
        <Actions>
          <Button type="button" tone="brand" disabled={selectedCount === 0 || saving} onClick={submit}>
            {saving ? "Salvando..." : `Adicionar ${plural(selectedCount, "item", "itens")} ao currículo`}
          </Button>
          <Button type="button" tone="ghost" disabled={saving} onClick={() => navigate("/candidate/curriculum")}>Cancelar</Button>
          {draft.source.columns_detected ? <Badge tone="neutral">Duas colunas lidas</Badge> : null}
        </Actions>
      </Panel>

      <ConfirmDialog
        open={confirmOpen}
        title="Substituir dados já preenchidos?"
        message="Estes campos do seu currículo serão substituídos pelo que foi encontrado no PDF:"
        confirmLabel="Substituir e adicionar"
        tone="brand"
        confirming={saving}
        onConfirm={() => void apply()}
        onCancel={() => setConfirmOpen(false)}
      >
        <ul>
          {replacements.map((item) => (
            <li key={item.field}>{PROFILE_LABELS[item.field]}: {displayProfile(item.field, item.current)} → {displayProfile(item.field, item.value)}</li>
          ))}
        </ul>
      </ConfirmDialog>
    </Page>
  );
}
