import { type ChangeEvent, type FormEvent, useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FiArrowLeft, FiArrowRight, FiCheck } from "react-icons/fi";
import {
  addKnowledge,
  addSkill,
  createAcademic,
  createDocument,
  createEmployment,
  createProfessionalLink,
  createSocialLink,
  deleteAcademic,
  deleteDocument,
  deleteEmployment,
  deleteProfessionalLink,
  deleteSocialLink,
  getCurriculum,
  getKnowledgesCatalog,
  getSkillsCatalog,
  removeKnowledge,
  removeSkill,
} from "../../services/curriculum";
import type { CatalogItem, CurriculumData } from "../../services/curriculum/dto";
import { createCandidateProfile } from "../../services/candidates";
import type { CreateCandidateProfile } from "../../services/candidates/dto";
import { getApiErrorMessage } from "../../utils/api-error";
import {
  Actions,
  Badge,
  Button,
  Chip,
  ChipRow,
  Dropzone,
  Empty,
  Field,
  Grid,
  Hero,
  Item,
  ItemTop,
  Lead,
  List,
  Meta,
  Page,
  Panel,
  PanelTitle,
  ReviewLabel,
  ReviewRow,
  ReviewValue,
  Select,
  StepBody,
  StepCount,
  StepFill,
  StepHelp,
  StepNav,
  StepQuestion,
  StepTrack,
  Textarea,
  Input as KitInput,
  WizardShell,
} from "../CandidateKit/styles";

const OPEN_QUESTIONS = [
  "Descreva suas principais caracteristicas. O que mais admira em voce? O que voce considera como sua caracteristica mais marcante.",
  "Existe algo que voce gostaria de mudar, alguns pontos de melhoria?",
  "Como voce se imagina daqui ha 5 anos (vida pessoal, profissional e academica)?",
  "Quem sao as pessoas mais importantes para voce?",
  "Qual o seu maior sonho?",
];

type ProfileDraft = Omit<CreateCandidateProfile.Params, "employee" | "other_incomes" | "relatives_in_company" | "smoker" | "alcohol_consumer" | "medication_user"> & {
  employee: boolean | null;
  other_incomes: boolean | null;
  relatives_in_company: boolean | null;
  smoker: boolean | null;
  alcohol_consumer: boolean | null;
  medication_user: boolean | null;
};

const emptyProfile: ProfileDraft = {
  phone_number1: "",
  phone_number2: "",
  employee: null,
  resume: "",
  birthplace: "",
  gender: "",
  birthdate: "",
  marital_status: "",
  address_neighborhood: "",
  address_city: "",
  mother_name: "",
  spouse_name: "",
  number_of_children: 0,
  residence_status: "",
  possessions: "",
  other_incomes: null,
  relatives_in_company: null,
  pcd: "",
  smoker: null,
  alcohol_consumer: null,
  medication_user: null,
  first_question: "",
  second_question: "",
  third_question: "",
  fourth_question: "",
  fifth_question: "",
};

type AcademicForm = { title: string; institution: string; degree: string; start_date: string; end_date: string };
type EmploymentForm = { company_name: string; position: string; salary: string; start_date: string; end_date: string; leaving_reason: string };
type LinkForm = { title: string; link: string };
type DocumentForm = { document_name: string; document_number: string; image: File | null };

const emptyAcademic: AcademicForm = { title: "", institution: "", degree: "", start_date: "", end_date: "" };
const emptyEmployment: EmploymentForm = { company_name: "", position: "", salary: "", start_date: "", end_date: "", leaving_reason: "" };
const emptyLink: LinkForm = { title: "", link: "" };
const emptyDocument: DocumentForm = { document_name: "", document_number: "", image: null };

const STEP_IDS = [
  "phones", "address", "personal", "family", "habits", "resume", "questions",
  "academic", "employment", "links", "skills", "knowledges", "documents", "review",
] as const;
type StepId = (typeof STEP_IDS)[number];

const STEP_LABELS: Record<StepId, string> = {
  phones: "Contato",
  address: "Endereco",
  personal: "Dados pessoais",
  family: "Familia",
  habits: "Moradia e habitos",
  resume: "Resumo profissional",
  questions: "Sobre voce",
  academic: "Formacao academica",
  employment: "Experiencia profissional",
  links: "Links",
  skills: "Habilidades",
  knowledges: "Conhecimentos",
  documents: "Documentos",
  review: "Revisao",
};

function BoolToggle({ value, onChange }: { value: boolean | null; onChange: (next: boolean) => void }) {
  return (
    <Actions>
      <Button type="button" tone={value === true ? "brand" : "ghost"} onClick={() => onChange(true)}>Sim</Button>
      <Button type="button" tone={value === false ? "brand" : "ghost"} onClick={() => onChange(false)}>Nao</Button>
    </Actions>
  );
}

function displayValue(value?: string | number | null): string {
  if (value === undefined || value === null || value === "") return "-";
  return String(value);
}

function displayBool(value?: boolean): string {
  if (value === undefined) return "-";
  return value ? "Sim" : "Nao";
}

function displayDate(value?: string): string {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("pt-BR");
}

function CurriculumView({ curriculum, onEdit }: { curriculum: CurriculumData.Response; onEdit: () => void }) {
  const profile = curriculum.candidate_profile;
  const links = [...curriculum.professional_links, ...curriculum.social_links];

  return (
    <Page>
      <Hero>
        <div>
          <PanelTitle>Seu curriculo</PanelTitle>
          <Lead>Isso e o que os recrutadores veem quando avaliam sua candidatura.</Lead>
        </div>
        <Actions>
          <Button type="button" tone="brand" onClick={onEdit}>Editar curriculo</Button>
        </Actions>
      </Hero>

      {profile?.resume ? (
        <Panel>
          <PanelTitle>Resumo profissional</PanelTitle>
          <p>{profile.resume}</p>
        </Panel>
      ) : null}

      <Panel>
        <PanelTitle>Contato e dados pessoais</PanelTitle>
        <ReviewRow><ReviewLabel>Celular principal</ReviewLabel><ReviewValue>{displayValue(profile?.phone_number1)}</ReviewValue></ReviewRow>
        <ReviewRow><ReviewLabel>Celular secundario</ReviewLabel><ReviewValue>{displayValue(profile?.phone_number2)}</ReviewValue></ReviewRow>
        <ReviewRow><ReviewLabel>Cidade</ReviewLabel><ReviewValue>{displayValue(profile?.address_city)}</ReviewValue></ReviewRow>
        <ReviewRow><ReviewLabel>Bairro</ReviewLabel><ReviewValue>{displayValue(profile?.address_neighborhood)}</ReviewValue></ReviewRow>
        <ReviewRow><ReviewLabel>Naturalidade</ReviewLabel><ReviewValue>{displayValue(profile?.birthplace)}</ReviewValue></ReviewRow>
        <ReviewRow><ReviewLabel>Data de nascimento</ReviewLabel><ReviewValue>{displayDate(profile?.birthdate)}</ReviewValue></ReviewRow>
        <ReviewRow><ReviewLabel>Genero</ReviewLabel><ReviewValue>{displayValue(profile?.gender)}</ReviewValue></ReviewRow>
        <ReviewRow><ReviewLabel>Estado civil</ReviewLabel><ReviewValue>{displayValue(profile?.marital_status)}</ReviewValue></ReviewRow>
      </Panel>

      <Panel>
        <PanelTitle>Familia, moradia e habitos</PanelTitle>
        <ReviewRow><ReviewLabel>Nome da mae</ReviewLabel><ReviewValue>{displayValue(profile?.mother_name)}</ReviewValue></ReviewRow>
        <ReviewRow><ReviewLabel>Nome do conjuge</ReviewLabel><ReviewValue>{displayValue(profile?.spouse_name)}</ReviewValue></ReviewRow>
        <ReviewRow><ReviewLabel>Numero de filhos</ReviewLabel><ReviewValue>{displayValue(profile?.number_of_children)}</ReviewValue></ReviewRow>
        <ReviewRow><ReviewLabel>Parentes na empresa</ReviewLabel><ReviewValue>{displayBool(profile?.relatives_in_company)}</ReviewValue></ReviewRow>
        <ReviewRow><ReviewLabel>Situacao de moradia</ReviewLabel><ReviewValue>{displayValue(profile?.residence_status)}</ReviewValue></ReviewRow>
        <ReviewRow><ReviewLabel>Bens</ReviewLabel><ReviewValue>{displayValue(profile?.possessions)}</ReviewValue></ReviewRow>
        <ReviewRow><ReviewLabel>PCD</ReviewLabel><ReviewValue>{displayValue(profile?.pcd)}</ReviewValue></ReviewRow>
        <ReviewRow><ReviewLabel>Empregado atualmente</ReviewLabel><ReviewValue>{displayBool(profile?.employee)}</ReviewValue></ReviewRow>
        <ReviewRow><ReviewLabel>Outras rendas</ReviewLabel><ReviewValue>{displayBool(profile?.other_incomes)}</ReviewValue></ReviewRow>
        <ReviewRow><ReviewLabel>Fumante</ReviewLabel><ReviewValue>{displayBool(profile?.smoker)}</ReviewValue></ReviewRow>
        <ReviewRow><ReviewLabel>Consome bebida alcoolica</ReviewLabel><ReviewValue>{displayBool(profile?.alcohol_consumer)}</ReviewValue></ReviewRow>
        <ReviewRow><ReviewLabel>Uso continuo de medicacao</ReviewLabel><ReviewValue>{displayBool(profile?.medication_user)}</ReviewValue></ReviewRow>
      </Panel>

      <Panel>
        <PanelTitle>Sobre voce</PanelTitle>
        {OPEN_QUESTIONS.map((question, index) => {
          const key = (["first_question", "second_question", "third_question", "fourth_question", "fifth_question"] as const)[index];
          const answer = profile?.[key];
          if (!answer) return null;
          return (
            <div key={key}>
              <Meta>{question}</Meta>
              <p>{answer}</p>
            </div>
          );
        })}
      </Panel>

      <Panel>
        <PanelTitle>Formacao academica</PanelTitle>
        {curriculum.academic_histories.length === 0 ? (
          <Empty>Nenhuma formacao cadastrada ainda.</Empty>
        ) : (
          <List>
            {curriculum.academic_histories.map((item) => (
              <Item key={item.id}>
                <strong>{item.title}</strong>
                <Meta>{item.institution}{item.degree ? ` - ${item.degree}` : ""}</Meta>
                <Meta>{displayDate(item.start_date)} - {item.end_date ? displayDate(item.end_date) : "atual"}</Meta>
              </Item>
            ))}
          </List>
        )}
      </Panel>

      <Panel>
        <PanelTitle>Experiencia profissional</PanelTitle>
        {curriculum.employment_histories.length === 0 ? (
          <Empty>Nenhuma experiencia cadastrada ainda.</Empty>
        ) : (
          <List>
            {curriculum.employment_histories.map((item) => (
              <Item key={item.id}>
                <strong>{item.position}</strong>
                <Meta>{item.company_name}{item.salary ? ` - R$ ${item.salary}` : ""}</Meta>
                <Meta>{displayDate(item.start_date)} - {item.end_date ? displayDate(item.end_date) : "atual"}</Meta>
              </Item>
            ))}
          </List>
        )}
      </Panel>

      <Panel>
        <PanelTitle>Links</PanelTitle>
        {links.length === 0 ? (
          <Empty>Nenhum link cadastrado ainda.</Empty>
        ) : (
          <List>
            {links.map((item) => (
              <Item key={item.id}>
                <ItemTop>
                  <strong>{item.title}</strong>
                </ItemTop>
                <a href={item.link} target="_blank" rel="noreferrer">{item.link}</a>
              </Item>
            ))}
          </List>
        )}
      </Panel>

      <Panel>
        <PanelTitle>Habilidades e conhecimentos</PanelTitle>
        <ChipRow>
          {curriculum.skills.map((item) => <Chip key={`skill-${item.id}`} type="button" disabled>{item.title}</Chip>)}
          {curriculum.knowledges.map((item) => <Chip key={`knowledge-${item.id}`} type="button" disabled>{item.title}</Chip>)}
          {curriculum.skills.length === 0 && curriculum.knowledges.length === 0 ? (
            <Empty>Nenhuma habilidade ou conhecimento marcado ainda.</Empty>
          ) : null}
        </ChipRow>
      </Panel>

      <Panel>
        <PanelTitle>Documentos</PanelTitle>
        {curriculum.documents.length === 0 ? (
          <Empty>Nenhum documento anexado ainda.</Empty>
        ) : (
          <List>
            {curriculum.documents.map((item) => (
              <Item key={item.id}>
                <ItemTop>
                  <strong>{item.document_name}</strong>
                  {item.image_url ? <Badge tone="positive">Anexado</Badge> : null}
                </ItemTop>
                <Meta>{item.document_number}</Meta>
                {item.image_url ? <a href={item.image_url} target="_blank" rel="noreferrer">Ver arquivo</a> : null}
              </Item>
            ))}
          </List>
        )}
      </Panel>

      <Actions>
        <Button type="button" tone="brand" onClick={onEdit}>Editar curriculo</Button>
      </Actions>
    </Page>
  );
}

export function CandidateCurriculumPage() {
  const [curriculum, setCurriculum] = useState<CurriculumData.Response | null>(null);
  const [mode, setMode] = useState<"view" | "edit">("edit");
  const modeInitialized = useRef(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState<ProfileDraft>(emptyProfile);

  const [academicForm, setAcademicForm] = useState<AcademicForm>(emptyAcademic);
  const [employmentForm, setEmploymentForm] = useState<EmploymentForm>(emptyEmployment);
  const [professionalForm, setProfessionalForm] = useState<LinkForm>(emptyLink);
  const [socialForm, setSocialForm] = useState<LinkForm>(emptyLink);
  const [documentForm, setDocumentForm] = useState<DocumentForm>(emptyDocument);

  const [skillsCatalog, setSkillsCatalog] = useState<CatalogItem.Item[]>([]);
  const [knowledgesCatalog, setKnowledgesCatalog] = useState<CatalogItem.Item[]>([]);

  async function loadCurriculum() {
    const response = await getCurriculum();
    setCurriculum(response);
    const savedProfile = response.candidate_profile;
    if (savedProfile) {
      setProfile((current) => ({
        ...current,
        phone_number1: savedProfile.phone_number1 ?? current.phone_number1,
        phone_number2: savedProfile.phone_number2 ?? current.phone_number2,
        employee: savedProfile.employee ?? current.employee,
        resume: savedProfile.resume ?? current.resume,
        birthplace: savedProfile.birthplace ?? current.birthplace,
        gender: savedProfile.gender ?? current.gender,
        birthdate: savedProfile.birthdate ?? current.birthdate,
        marital_status: savedProfile.marital_status ?? current.marital_status,
        address_neighborhood: savedProfile.address_neighborhood ?? current.address_neighborhood,
        address_city: savedProfile.address_city ?? current.address_city,
        mother_name: savedProfile.mother_name ?? current.mother_name,
        spouse_name: savedProfile.spouse_name ?? current.spouse_name,
        number_of_children: savedProfile.number_of_children ?? current.number_of_children,
        residence_status: savedProfile.residence_status ?? current.residence_status,
        possessions: savedProfile.possessions ?? current.possessions,
        other_incomes: savedProfile.other_incomes ?? current.other_incomes,
        relatives_in_company: savedProfile.relatives_in_company ?? current.relatives_in_company,
        pcd: savedProfile.pcd ?? current.pcd,
        smoker: savedProfile.smoker ?? current.smoker,
        alcohol_consumer: savedProfile.alcohol_consumer ?? current.alcohol_consumer,
        medication_user: savedProfile.medication_user ?? current.medication_user,
        first_question: savedProfile.first_question ?? current.first_question,
        second_question: savedProfile.second_question ?? current.second_question,
        third_question: savedProfile.third_question ?? current.third_question,
        fourth_question: savedProfile.fourth_question ?? current.fourth_question,
        fifth_question: savedProfile.fifth_question ?? current.fifth_question,
      }));
    }

    if (!modeInitialized.current) {
      modeInitialized.current = true;
      setMode(savedProfile ? "view" : "edit");
    }
  }

  function startEditing() {
    setStepIndex(0);
    setMode("edit");
  }

  useEffect(() => {
    void loadCurriculum();
    void getSkillsCatalog().then(setSkillsCatalog);
    void getKnowledgesCatalog().then(setKnowledgesCatalog);
  }, []);

  const step = STEP_IDS[stepIndex];
  const totalSteps = STEP_IDS.length;
  const progressPct = Math.round(((stepIndex + 1) / totalSteps) * 100);

  function goBack() {
    setStepIndex((index) => Math.max(0, index - 1));
  }

  function goNext() {
    setStepIndex((index) => Math.min(totalSteps - 1, index + 1));
  }

  async function saveProfileAndAdvance() {
    if (
      profile.employee === null || profile.other_incomes === null || profile.relatives_in_company === null ||
      profile.smoker === null || profile.alcohol_consumer === null || profile.medication_user === null
    ) {
      toast.error("Responda todas as perguntas de sim ou nao antes de continuar.");
      return;
    }

    setSaving(true);
    try {
      await createCandidateProfile({
        ...profile,
        employee: profile.employee!,
        other_incomes: profile.other_incomes!,
        relatives_in_company: profile.relatives_in_company!,
        smoker: profile.smoker!,
        alcohol_consumer: profile.alcohol_consumer!,
        medication_user: profile.medication_user!,
      });
      toast.success("Dados salvos.");
      goNext();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao salvar seus dados."));
    } finally {
      setSaving(false);
    }
  }

  async function handleAcademicSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await createAcademic({
        title: academicForm.title,
        institution: academicForm.institution || undefined,
        degree: academicForm.degree || undefined,
        start_date: academicForm.start_date || undefined,
        end_date: academicForm.end_date || undefined,
      });
      setAcademicForm(emptyAcademic);
      toast.success("Formacao adicionada.");
      await loadCurriculum();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao cadastrar formacao."));
    }
  }

  async function handleEmploymentSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await createEmployment({
        company_name: employmentForm.company_name,
        position: employmentForm.position,
        salary: employmentForm.salary || undefined,
        start_date: employmentForm.start_date || undefined,
        end_date: employmentForm.end_date || undefined,
        leaving_reason: employmentForm.leaving_reason || undefined,
      });
      setEmploymentForm(emptyEmployment);
      toast.success("Experiencia adicionada.");
      await loadCurriculum();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao cadastrar experiencia."));
    }
  }

  async function handleProfessionalSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await createProfessionalLink(professionalForm);
      setProfessionalForm(emptyLink);
      toast.success("Link adicionado.");
      await loadCurriculum();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao cadastrar link."));
    }
  }

  async function handleSocialSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await createSocialLink(socialForm);
      setSocialForm(emptyLink);
      toast.success("Link adicionado.");
      await loadCurriculum();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao cadastrar link."));
    }
  }

  async function handleDocumentSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!documentForm.document_name || !documentForm.document_number) {
      toast.error("Preencha nome e numero do documento.");
      return;
    }
    try {
      await createDocument({
        document_name: documentForm.document_name,
        document_number: documentForm.document_number,
        image: documentForm.image ?? undefined,
      });
      setDocumentForm(emptyDocument);
      toast.success("Documento adicionado.");
      await loadCurriculum();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao anexar documento."));
    }
  }

  function handleDocumentFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    setDocumentForm((current) => ({ ...current, image: file }));
  }

  const mySkillIds = useMemo(() => new Set(curriculum?.skills.map((item) => item.skill_id) ?? []), [curriculum]);
  const myKnowledgeIds = useMemo(() => new Set(curriculum?.knowledges.map((item) => item.knowledge_id) ?? []), [curriculum]);

  async function toggleSkill(skillId: number) {
    const existing = curriculum?.skills.find((item) => item.skill_id === skillId);
    try {
      if (existing) {
        await removeSkill(existing.id);
      } else {
        await addSkill(skillId);
      }
      await loadCurriculum();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao atualizar habilidades."));
    }
  }

  async function toggleKnowledge(knowledgeId: number) {
    const existing = curriculum?.knowledges.find((item) => item.knowledge_id === knowledgeId);
    try {
      if (existing) {
        await removeKnowledge(existing.id);
      } else {
        await addKnowledge(knowledgeId);
      }
      await loadCurriculum();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao atualizar conhecimentos."));
    }
  }

  if (!curriculum) {
    return <p>Carregando curriculo...</p>;
  }

  if (mode === "view") {
    return <CurriculumView curriculum={curriculum} onEdit={startEditing} />;
  }

  return (
    <WizardShell>
      <div>
        <StepTrack>
          <StepFill style={{ width: `${progressPct}%` }} />
        </StepTrack>
        <StepCount>Etapa {stepIndex + 1} de {totalSteps} - {STEP_LABELS[step]}</StepCount>
        {curriculum.candidate_profile ? (
          <Button type="button" tone="ghost" onClick={() => setMode("view")}>Voltar para visualizacao</Button>
        ) : null}
      </div>

      <StepBody>
        {step === "phones" ? (
          <>
            <StepQuestion>Como podemos falar com voce?</StepQuestion>
            <StepHelp>Usamos isso para avisar sobre novidades na sua candidatura.</StepHelp>
            <Grid>
              <Field>
                Celular principal
                <KitInput value={profile.phone_number1} onChange={(e) => setProfile((p) => ({ ...p, phone_number1: e.target.value }))} placeholder="(11) 90000-0000" />
              </Field>
              <Field>
                Celular secundario (opcional)
                <KitInput value={profile.phone_number2} onChange={(e) => setProfile((p) => ({ ...p, phone_number2: e.target.value }))} placeholder="(11) 90000-0000" />
              </Field>
            </Grid>
          </>
        ) : null}

        {step === "address" ? (
          <>
            <StepQuestion>Onde voce mora?</StepQuestion>
            <Grid>
              <Field>
                Cidade
                <KitInput value={profile.address_city} onChange={(e) => setProfile((p) => ({ ...p, address_city: e.target.value }))} />
              </Field>
              <Field>
                Bairro
                <KitInput value={profile.address_neighborhood} onChange={(e) => setProfile((p) => ({ ...p, address_neighborhood: e.target.value }))} />
              </Field>
            </Grid>
          </>
        ) : null}

        {step === "personal" ? (
          <>
            <StepQuestion>Um pouco sobre voce</StepQuestion>
            <Grid>
              <Field>
                Data de nascimento
                <KitInput type="date" value={profile.birthdate} onChange={(e) => setProfile((p) => ({ ...p, birthdate: e.target.value }))} />
              </Field>
              <Field>
                Naturalidade
                <KitInput value={profile.birthplace} onChange={(e) => setProfile((p) => ({ ...p, birthplace: e.target.value }))} placeholder="Cidade onde nasceu" />
              </Field>
              <Field>
                Genero
                <KitInput value={profile.gender} onChange={(e) => setProfile((p) => ({ ...p, gender: e.target.value }))} />
              </Field>
              <Field>
                Estado civil
                <Select value={profile.marital_status} onChange={(e) => setProfile((p) => ({ ...p, marital_status: e.target.value }))}>
                  <option value="">Selecione</option>
                  <option value="Solteiro(a)">Solteiro(a)</option>
                  <option value="Casado(a)">Casado(a)</option>
                  <option value="Divorciado(a)">Divorciado(a)</option>
                  <option value="Viuvo(a)">Viuvo(a)</option>
                  <option value="Uniao estavel">Uniao estavel</option>
                </Select>
              </Field>
            </Grid>
          </>
        ) : null}

        {step === "family" ? (
          <>
            <StepQuestion>Familia</StepQuestion>
            <Grid>
              <Field>
                Nome da mae
                <KitInput value={profile.mother_name} onChange={(e) => setProfile((p) => ({ ...p, mother_name: e.target.value }))} />
              </Field>
              <Field>
                Nome do conjuge (se houver)
                <KitInput value={profile.spouse_name} onChange={(e) => setProfile((p) => ({ ...p, spouse_name: e.target.value === "" ? "N/A" : e.target.value }))} placeholder="N/A" />
              </Field>
              <Field>
                Numero de filhos
                <KitInput type="number" min={0} value={profile.number_of_children} onChange={(e) => setProfile((p) => ({ ...p, number_of_children: Number(e.target.value) }))} />
              </Field>
            </Grid>
            <Field>
              Voce tem parentes trabalhando na empresa?
              <BoolToggle value={profile.relatives_in_company} onChange={(v) => setProfile((p) => ({ ...p, relatives_in_company: v }))} />
            </Field>
          </>
        ) : null}

        {step === "habits" ? (
          <>
            <StepQuestion>Moradia e habitos</StepQuestion>
            <Grid>
              <Field>
                Situacao de moradia
                <Select value={profile.residence_status} onChange={(e) => setProfile((p) => ({ ...p, residence_status: e.target.value }))}>
                  <option value="">Selecione</option>
                  <option value="Propria">Propria</option>
                  <option value="Alugada">Alugada</option>
                  <option value="Financiada">Financiada</option>
                  <option value="Com familiares">Com familiares</option>
                </Select>
              </Field>
              <Field>
                Bens que possui (opcional)
                <KitInput value={profile.possessions} onChange={(e) => setProfile((p) => ({ ...p, possessions: e.target.value }))} placeholder="Ex: carro, notebook" />
              </Field>
              <Field>
                PCD
                <Select value={profile.pcd} onChange={(e) => setProfile((p) => ({ ...p, pcd: e.target.value }))}>
                  <option value="">Selecione</option>
                  <option value="Nao">Nao</option>
                  <option value="Sim">Sim</option>
                </Select>
              </Field>
            </Grid>
            <Field>
              Esta empregado atualmente?
              <BoolToggle value={profile.employee} onChange={(v) => setProfile((p) => ({ ...p, employee: v }))} />
            </Field>
            <Field>
              Possui outras rendas?
              <BoolToggle value={profile.other_incomes} onChange={(v) => setProfile((p) => ({ ...p, other_incomes: v }))} />
            </Field>
            <Field>
              Fumante?
              <BoolToggle value={profile.smoker} onChange={(v) => setProfile((p) => ({ ...p, smoker: v }))} />
            </Field>
            <Field>
              Consome bebida alcoolica?
              <BoolToggle value={profile.alcohol_consumer} onChange={(v) => setProfile((p) => ({ ...p, alcohol_consumer: v }))} />
            </Field>
            <Field>
              Faz uso continuo de medicacao?
              <BoolToggle value={profile.medication_user} onChange={(v) => setProfile((p) => ({ ...p, medication_user: v }))} />
            </Field>
          </>
        ) : null}

        {step === "resume" ? (
          <>
            <StepQuestion>Resumo profissional</StepQuestion>
            <StepHelp>Duas ou tres frases sobre seu perfil e objetivos ja ajudam bastante.</StepHelp>
            <Textarea value={profile.resume} onChange={(e) => setProfile((p) => ({ ...p, resume: e.target.value }))} placeholder="Conte um pouco sobre sua trajetoria e o que voce busca agora." />
          </>
        ) : null}

        {step === "questions" ? (
          <>
            <StepQuestion>Um pouco mais sobre voce</StepQuestion>
            {OPEN_QUESTIONS.map((question, index) => {
              const key = (["first_question", "second_question", "third_question", "fourth_question", "fifth_question"] as const)[index];
              return (
                <Field key={key}>
                  {question}
                  <Textarea value={profile[key]} onChange={(e) => setProfile((p) => ({ ...p, [key]: e.target.value }))} />
                </Field>
              );
            })}
          </>
        ) : null}

        {step === "academic" ? (
          <>
            <StepQuestion>Formacao academica</StepQuestion>
            <List>
              {curriculum.academic_histories.length === 0 ? <Empty>Nenhuma formacao cadastrada ainda.</Empty> : null}
              {curriculum.academic_histories.map((item) => (
                <Item key={item.id}>
                  <ItemTop>
                    <strong>{item.title}</strong>
                    <Button type="button" tone="danger" onClick={() => void deleteAcademic(item.id).then(loadCurriculum)}>Remover</Button>
                  </ItemTop>
                  <Meta>{item.institution}{item.degree ? ` - ${item.degree}` : ""}{item.start_date ? ` - ${item.start_date}` : ""}</Meta>
                </Item>
              ))}
            </List>
            <form onSubmit={handleAcademicSubmit}>
              <Grid>
                <Field>
                  Curso ou titulo *
                  <KitInput required value={academicForm.title} onChange={(e) => setAcademicForm((p) => ({ ...p, title: e.target.value }))} />
                </Field>
                <Field>
                  Instituicao
                  <KitInput value={academicForm.institution} onChange={(e) => setAcademicForm((p) => ({ ...p, institution: e.target.value }))} />
                </Field>
                <Field>
                  Grau
                  <KitInput value={academicForm.degree} onChange={(e) => setAcademicForm((p) => ({ ...p, degree: e.target.value }))} />
                </Field>
                <Field>
                  Inicio
                  <KitInput type="date" value={academicForm.start_date} onChange={(e) => setAcademicForm((p) => ({ ...p, start_date: e.target.value }))} />
                </Field>
                <Field>
                  Conclusao (ou previsao)
                  <KitInput type="date" value={academicForm.end_date} onChange={(e) => setAcademicForm((p) => ({ ...p, end_date: e.target.value }))} />
                </Field>
              </Grid>
              <Actions>
                <Button type="submit" tone="brand">+ Adicionar formacao</Button>
              </Actions>
            </form>
          </>
        ) : null}

        {step === "employment" ? (
          <>
            <StepQuestion>Experiencia profissional</StepQuestion>
            <List>
              {curriculum.employment_histories.length === 0 ? <Empty>Nenhuma experiencia cadastrada ainda.</Empty> : null}
              {curriculum.employment_histories.map((item) => (
                <Item key={item.id}>
                  <ItemTop>
                    <strong>{item.position}</strong>
                    <Button type="button" tone="danger" onClick={() => void deleteEmployment(item.id).then(loadCurriculum)}>Remover</Button>
                  </ItemTop>
                  <Meta>{item.company_name}{item.start_date ? ` - ${item.start_date}` : ""}{item.salary ? ` - R$ ${item.salary}` : ""}</Meta>
                </Item>
              ))}
            </List>
            <form onSubmit={handleEmploymentSubmit}>
              <Grid>
                <Field>
                  Empresa *
                  <KitInput required value={employmentForm.company_name} onChange={(e) => setEmploymentForm((p) => ({ ...p, company_name: e.target.value }))} />
                </Field>
                <Field>
                  Cargo *
                  <KitInput required value={employmentForm.position} onChange={(e) => setEmploymentForm((p) => ({ ...p, position: e.target.value }))} />
                </Field>
                <Field>
                  Salario
                  <KitInput value={employmentForm.salary} onChange={(e) => setEmploymentForm((p) => ({ ...p, salary: e.target.value }))} />
                </Field>
                <Field>
                  Inicio
                  <KitInput type="date" value={employmentForm.start_date} onChange={(e) => setEmploymentForm((p) => ({ ...p, start_date: e.target.value }))} />
                </Field>
                <Field>
                  Saida
                  <KitInput type="date" value={employmentForm.end_date} onChange={(e) => setEmploymentForm((p) => ({ ...p, end_date: e.target.value }))} />
                </Field>
              </Grid>
              <Actions>
                <Button type="submit" tone="brand">+ Adicionar experiencia</Button>
              </Actions>
            </form>
          </>
        ) : null}

        {step === "links" ? (
          <>
            <StepQuestion>Links</StepQuestion>
            <StepHelp>LinkedIn, portfolio, GitHub e redes sociais complementares.</StepHelp>
            <List>
              {[...curriculum.professional_links, ...curriculum.social_links].length === 0 ? <Empty>Nenhum link cadastrado ainda.</Empty> : null}
              {curriculum.professional_links.map((item) => (
                <Item key={`prof-${item.id}`}>
                  <ItemTop>
                    <strong>{item.title}</strong>
                    <Button type="button" tone="danger" onClick={() => void deleteProfessionalLink(item.id).then(loadCurriculum)}>Remover</Button>
                  </ItemTop>
                  <Meta>{item.link}</Meta>
                </Item>
              ))}
              {curriculum.social_links.map((item) => (
                <Item key={`social-${item.id}`}>
                  <ItemTop>
                    <strong>{item.title}</strong>
                    <Button type="button" tone="danger" onClick={() => void deleteSocialLink(item.id).then(loadCurriculum)}>Remover</Button>
                  </ItemTop>
                  <Meta>{item.link}</Meta>
                </Item>
              ))}
            </List>
            <form onSubmit={handleProfessionalSubmit}>
              <Grid>
                <Field>
                  Titulo (profissional) *
                  <KitInput required value={professionalForm.title} onChange={(e) => setProfessionalForm((p) => ({ ...p, title: e.target.value }))} placeholder="Ex: LinkedIn" />
                </Field>
                <Field>
                  URL *
                  <KitInput required type="url" value={professionalForm.link} onChange={(e) => setProfessionalForm((p) => ({ ...p, link: e.target.value }))} placeholder="https://" />
                </Field>
              </Grid>
              <Actions>
                <Button type="submit" tone="brand">+ Adicionar link profissional</Button>
              </Actions>
            </form>
            <form onSubmit={handleSocialSubmit}>
              <Grid>
                <Field>
                  Titulo (social) *
                  <KitInput required value={socialForm.title} onChange={(e) => setSocialForm((p) => ({ ...p, title: e.target.value }))} placeholder="Ex: Instagram" />
                </Field>
                <Field>
                  URL *
                  <KitInput required type="url" value={socialForm.link} onChange={(e) => setSocialForm((p) => ({ ...p, link: e.target.value }))} placeholder="https://" />
                </Field>
              </Grid>
              <Actions>
                <Button type="submit" tone="brand">+ Adicionar link social</Button>
              </Actions>
            </form>
          </>
        ) : null}

        {step === "skills" ? (
          <>
            <StepQuestion>Suas habilidades</StepQuestion>
            <StepHelp>Toque para marcar as habilidades que voce tem.</StepHelp>
            <ChipRow>
              {skillsCatalog.map((skill) => (
                <Chip key={skill.id} type="button" selected={mySkillIds.has(skill.id)} onClick={() => void toggleSkill(skill.id)}>
                  {mySkillIds.has(skill.id) ? <FiCheck size={14} /> : null} {skill.title}
                </Chip>
              ))}
              {skillsCatalog.length === 0 ? <Empty>Nenhuma habilidade cadastrada no sistema ainda.</Empty> : null}
            </ChipRow>
          </>
        ) : null}

        {step === "knowledges" ? (
          <>
            <StepQuestion>Seus conhecimentos</StepQuestion>
            <StepHelp>Toque para marcar os conhecimentos que voce tem.</StepHelp>
            <ChipRow>
              {knowledgesCatalog.map((knowledge) => (
                <Chip key={knowledge.id} type="button" selected={myKnowledgeIds.has(knowledge.id)} onClick={() => void toggleKnowledge(knowledge.id)}>
                  {myKnowledgeIds.has(knowledge.id) ? <FiCheck size={14} /> : null} {knowledge.title}
                </Chip>
              ))}
              {knowledgesCatalog.length === 0 ? <Empty>Nenhum conhecimento cadastrado no sistema ainda.</Empty> : null}
            </ChipRow>
          </>
        ) : null}

        {step === "documents" ? (
          <>
            <StepQuestion>Documentos</StepQuestion>
            <StepHelp>Anexe documentos como RG, CNH ou certificados.</StepHelp>
            <List>
              {curriculum.documents.length === 0 ? <Empty>Nenhum documento anexado ainda.</Empty> : null}
              {curriculum.documents.map((item) => (
                <Item key={item.id}>
                  <ItemTop>
                    <strong>{item.document_name}</strong>
                    <Button type="button" tone="danger" onClick={() => void deleteDocument(item.id).then(loadCurriculum)}>Remover</Button>
                  </ItemTop>
                  <Meta>{item.document_number}</Meta>
                  {item.image_url ? <a href={item.image_url} target="_blank" rel="noreferrer">Ver arquivo</a> : null}
                </Item>
              ))}
            </List>
            <form onSubmit={handleDocumentSubmit}>
              <Grid>
                <Field>
                  Nome do documento *
                  <KitInput required value={documentForm.document_name} onChange={(e) => setDocumentForm((p) => ({ ...p, document_name: e.target.value }))} placeholder="Ex: RG, CNH" />
                </Field>
                <Field>
                  Numero *
                  <KitInput required value={documentForm.document_number} onChange={(e) => setDocumentForm((p) => ({ ...p, document_number: e.target.value }))} />
                </Field>
              </Grid>
              <Dropzone>
                {documentForm.image ? documentForm.image.name : "Toque para escolher um arquivo (opcional)"}
                <input type="file" accept="image/*,.pdf" hidden onChange={handleDocumentFile} />
              </Dropzone>
              <Actions>
                <Button type="submit" tone="brand">+ Adicionar documento</Button>
              </Actions>
            </form>
          </>
        ) : null}

        {step === "review" ? (
          <>
            <StepQuestion>Tudo certo!</StepQuestion>
            <StepHelp>Confira um resumo do que foi preenchido.</StepHelp>
            <ReviewRow><ReviewLabel>Telefone</ReviewLabel><ReviewValue>{profile.phone_number1 || "-"}</ReviewValue></ReviewRow>
            <ReviewRow><ReviewLabel>Cidade</ReviewLabel><ReviewValue>{profile.address_city || "-"}</ReviewValue></ReviewRow>
            <ReviewRow><ReviewLabel>Formacoes</ReviewLabel><ReviewValue>{curriculum.academic_histories.length}</ReviewValue></ReviewRow>
            <ReviewRow><ReviewLabel>Experiencias</ReviewLabel><ReviewValue>{curriculum.employment_histories.length}</ReviewValue></ReviewRow>
            <ReviewRow><ReviewLabel>Links</ReviewLabel><ReviewValue>{curriculum.professional_links.length + curriculum.social_links.length}</ReviewValue></ReviewRow>
            <ReviewRow><ReviewLabel>Habilidades</ReviewLabel><ReviewValue>{curriculum.skills.length}</ReviewValue></ReviewRow>
            <ReviewRow><ReviewLabel>Conhecimentos</ReviewLabel><ReviewValue>{curriculum.knowledges.length}</ReviewValue></ReviewRow>
            <ReviewRow><ReviewLabel>Documentos</ReviewLabel><ReviewValue>{curriculum.documents.length}</ReviewValue></ReviewRow>
          </>
        ) : null}
      </StepBody>

      <StepNav>
        <Button type="button" tone="ghost" onClick={goBack} disabled={stepIndex === 0}>
          <FiArrowLeft /> Voltar
        </Button>
        {step === "questions" ? (
          <Button type="button" tone="brand" onClick={() => void saveProfileAndAdvance()} disabled={saving}>
            {saving ? "Salvando..." : <>Salvar e continuar <FiArrowRight /></>}
          </Button>
        ) : step === "review" ? (
          <Button type="button" tone="brand" onClick={() => setMode("view")}>
            Concluir e ver curriculo <FiCheck />
          </Button>
        ) : (
          <Button type="button" tone="brand" onClick={goNext}>
            Continuar <FiArrowRight />
          </Button>
        )}
      </StepNav>
    </WizardShell>
  );
}
