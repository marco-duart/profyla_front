import { type FormEvent, useEffect, useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import toast from "react-hot-toast";
import {
  createAcademic,
  createEmployment,
  createProfessionalLink,
  createSocialLink,
  deleteAcademic,
  deleteEmployment,
  deleteProfessionalLink,
  deleteSocialLink,
  getCurriculum,
} from "../../services/curriculum";
import type { CurriculumData } from "../../services/curriculum/dto";
import { createCandidateProfile } from "../../services/candidates";
import type { CreateCandidateProfile } from "../../services/candidates/dto";
import { getApiErrorMessage } from "../../utils/api-error";
import {
  AddButton,
  CancelButton,
  EditButton,
  Field,
  FormActions,
  FormGrid,
  Hero,
  InlineForm,
  Input,
  ItemCard,
  ItemContent,
  ItemList,
  ItemMeta,
  ItemTitle,
  Lead,
  ProfileCard,
  ProfileField,
  ProfileLabel,
  ProfileRow,
  ProfileValue,
  RemoveButton,
  SaveButton,
  Section,
  SectionHeader,
  SectionHint,
  SectionTitle,
  Textarea,
  Wrapper,
} from "./styles";

// ── tipos de form inline ─────────────────────────────────────────
type AcademicForm = { title: string; institution: string; degree: string; start_date: string; end_date: string };
type EmploymentForm = { company_name: string; position: string; salary: string; start_date: string; end_date: string; leaving_reason: string };
type LinkForm = { title: string; link: string };

const emptyAcademic: AcademicForm = { title: "", institution: "", degree: "", start_date: "", end_date: "" };
const emptyEmployment: EmploymentForm = { company_name: "", position: "", salary: "", start_date: "", end_date: "", leaving_reason: "" };
const emptyLink: LinkForm = { title: "", link: "" };

export function CandidateCurriculumPage() {
  const [curriculum, setCurriculum] = useState<CurriculumData.Response | null>(null);

  // perfil
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ phone_number1: "", phone_number2: "", resume: "", address_city: "", address_neighborhood: "" });

  // forms inline
  const [showAcademicForm, setShowAcademicForm] = useState(false);
  const [academicForm, setAcademicForm] = useState<AcademicForm>(emptyAcademic);

  const [showEmploymentForm, setShowEmploymentForm] = useState(false);
  const [employmentForm, setEmploymentForm] = useState<EmploymentForm>(emptyEmployment);

  const [showProfessionalForm, setShowProfessionalForm] = useState(false);
  const [professionalForm, setProfessionalForm] = useState<LinkForm>(emptyLink);

  const [showSocialForm, setShowSocialForm] = useState(false);
  const [socialForm, setSocialForm] = useState<LinkForm>(emptyLink);

  async function loadCurriculum() {
    const response = await getCurriculum();
    setCurriculum(response);
    if (response.candidate_profile) {
      setProfileForm({
        phone_number1: response.candidate_profile.phone_number1 ?? current.phone_number1,
        phone_number2: response.candidate_profile.phone_number2 ?? current.phone_number2,
        resume: response.candidate_profile.resume ?? current.resume,
        address_city: response.candidate_profile.address_city ?? current.address_city,
        address_neighborhood: response.candidate_profile.address_neighborhood ?? current.address_neighborhood,
      });
    }
  }

  useEffect(() => {
    void loadCurriculum();
  }, []);

  async function handleProfileSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await createCandidateProfile({
        phone_number1: profileForm.phone_number1,
        phone_number2: profileForm.phone_number2,
        resume: profileForm.resume,
        address_city: profileForm.address_city,
        address_neighborhood: profileForm.address_neighborhood,
        employee: false,
        birthplace: "",
        gender: "Nao informado",
        birthdate: "1990-01-01",
        marital_status: "Single",
        mother_name: "",
        spouse_name: "N/A",
        number_of_children: 0,
        residence_status: "Rented",
        possessions: "",
        other_incomes: false,
        relatives_in_company: false,
        pcd: "No",
        smoker: false,
        alcohol_consumer: false,
        medication_user: false,
        first_question: "",
        second_question: "",
        third_question: "",
        fourth_question: "",
        fifth_question: "",
      });
      toast.success("Perfil salvo.");
      setEditingProfile(false);
      await loadCurriculum();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao salvar perfil."));
    }
  }

  async function handleAcademicSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await createAcademic({
        title: academicForm.title,
        institution: academicForm.institution,
        degree: academicForm.degree,
        start_date: academicForm.start_date || undefined,
        end_date: academicForm.end_date || undefined,
      });
      setAcademicForm(emptyAcademic);
      setShowAcademicForm(false);
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
      setShowEmploymentForm(false);
      toast.success("Experiencia adicionada.");
      await loadCurriculum();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao cadastrar experiencia."));
    }
  }

  async function handleProfessionalSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await createProfessionalLink({ title: professionalForm.title, link: professionalForm.link });
      setProfessionalForm(emptyLink);
      setShowProfessionalForm(false);
      toast.success("Link profissional adicionado.");
      await loadCurriculum();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao cadastrar link profissional."));
    }
  }

  async function handleSocialSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await createSocialLink({ title: socialForm.title, link: socialForm.link });
      setSocialForm(emptyLink);
      setShowSocialForm(false);
      toast.success("Link social adicionado.");
      await loadCurriculum();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao cadastrar link social."));
    }
  }

  if (!curriculum) {
    return <p>Carregando curriculo...</p>;
  }

  return (
    <Wrapper>
      <Hero>
        <h2>Curriculo</h2>
        <Lead>Mantenha seu perfil atualizado. Clique em + para adicionar e no item para remover.</Lead>
      </Hero>

      {/* ── Perfil ── */}
      <Section>
        <SectionHeader>
          <SectionTitle>Dados pessoais</SectionTitle>
          <EditButton type="button" onClick={() => setEditingProfile((v) => !v)}>
            {editingProfile ? "Cancelar" : "Editar"}
          </EditButton>
        </SectionHeader>

        {editingProfile ? (
          <InlineForm as="form" onSubmit={handleProfileSave}>
            <FormGrid>
              <Field>
                Celular principal
                <Input value={profileForm.phone_number1} onChange={(e) => setProfileForm((p) => ({ ...p, phone_number1: e.target.value }))} />
              </Field>
              <Field>
                Celular secundario
                <Input value={profileForm.phone_number2} onChange={(e) => setProfileForm((p) => ({ ...p, phone_number2: e.target.value }))} />
              </Field>
              <Field>
                Cidade
                <Input value={profileForm.address_city} onChange={(e) => setProfileForm((p) => ({ ...p, address_city: e.target.value }))} />
              </Field>
              <Field>
                Bairro
                <Input value={profileForm.address_neighborhood} onChange={(e) => setProfileForm((p) => ({ ...p, address_neighborhood: e.target.value }))} />
              </Field>
            </FormGrid>
            <Field>
              Resumo profissional
              <Textarea value={profileForm.resume} onChange={(e) => setProfileForm((p) => ({ ...p, resume: e.target.value }))} placeholder="Descreva em 2-3 frases seu perfil e objetivos profissionais." />
            </Field>
            <FormActions>
              <SaveButton type="submit">Salvar</SaveButton>
              <CancelButton type="button" onClick={() => setEditingProfile(false)}>Cancelar</CancelButton>
            </FormActions>
          </InlineForm>
        ) : (
          <ProfileCard>
            <ProfileRow>
              {profileForm.phone_number1 ? (
                <ProfileField>
                  <ProfileLabel>Celular</ProfileLabel>
                  <ProfileValue>{profileForm.phone_number1}</ProfileValue>
                </ProfileField>
              ) : null}
              {curriculum.candidate_profile?.address_city ? (
                <ProfileField>
                  <ProfileLabel>Cidade</ProfileLabel>
                  <ProfileValue>{curriculum.candidate_profile.address_city}</ProfileValue>
                </ProfileField>
              ) : null}
              {curriculum.candidate_profile?.address_neighborhood ? (
                <ProfileField>
                  <ProfileLabel>Bairro</ProfileLabel>
                  <ProfileValue>{curriculum.candidate_profile.address_neighborhood}</ProfileValue>
                </ProfileField>
              ) : null}
            </ProfileRow>
            {curriculum.candidate_profile?.resume ? (
              <p style={{ fontSize: "14px" }}>{curriculum.candidate_profile.resume}</p>
            ) : (
              <SectionHint>Nenhum dado preenchido ainda. Clique em Editar para comecar.</SectionHint>
            )}
          </ProfileCard>
        )}
      </Section>

      {/* ── Formacao academica ── */}
      <Section>
        <SectionHeader>
          <div>
            <SectionTitle>Formacao academica</SectionTitle>
            <SectionHint>Cursos, graduacoes ou titulacoes relevantes.</SectionHint>
          </div>
          <AddButton type="button" onClick={() => setShowAcademicForm((v) => !v)}>
            {showAcademicForm ? "—" : "+ Adicionar"}
          </AddButton>
        </SectionHeader>

        <ItemList>
          {curriculum.academic_histories.map((item) => (
            <ItemCard key={item.id}>
              <ItemContent>
                <ItemTitle>{item.title}</ItemTitle>
                <ItemMeta>{item.institution}{item.degree ? ` · ${item.degree}` : ""}{item.start_date ? ` · ${item.start_date}` : ""}</ItemMeta>
              </ItemContent>
              <RemoveButton type="button" onClick={() => void deleteAcademic(item.id).then(loadCurriculum)}>Remover</RemoveButton>
            </ItemCard>
          ))}
        </ItemList>

        {showAcademicForm ? (
          <InlineForm as="form" onSubmit={handleAcademicSubmit}>
            <FormGrid>
              <Field>
                Curso ou titulo *
                <Input required value={academicForm.title} onChange={(e) => setAcademicForm((p) => ({ ...p, title: e.target.value }))} placeholder="Ex: Analise e Desenvolvimento de Sistemas" />
              </Field>
              <Field>
                Instituicao
                <Input value={academicForm.institution} onChange={(e) => setAcademicForm((p) => ({ ...p, institution: e.target.value }))} placeholder="Ex: FIAP" />
              </Field>
              <Field>
                Grau
                <Input value={academicForm.degree} onChange={(e) => setAcademicForm((p) => ({ ...p, degree: e.target.value }))} placeholder="Ex: Tecnologo, Bacharelado" />
              </Field>
              <Field>
                Inicio
                <Input type="date" value={academicForm.start_date} onChange={(e) => setAcademicForm((p) => ({ ...p, start_date: e.target.value }))} />
              </Field>
              <Field>
                Conclusao (ou previsao)
                <Input type="date" value={academicForm.end_date} onChange={(e) => setAcademicForm((p) => ({ ...p, end_date: e.target.value }))} />
              </Field>
            </FormGrid>
            <FormActions>
              <SaveButton type="submit">Adicionar</SaveButton>
              <CancelButton type="button" onClick={() => { setShowAcademicForm(false); setAcademicForm(emptyAcademic); }}>Cancelar</CancelButton>
            </FormActions>
          </InlineForm>
        ) : null}
      </Section>

      {/* ── Experiencia profissional ── */}
      <Section>
        <SectionHeader>
          <div>
            <SectionTitle>Experiencia profissional</SectionTitle>
            <SectionHint>Liste as experiencias mais relevantes para as vagas que quer acompanhar.</SectionHint>
          </div>
          <AddButton type="button" onClick={() => setShowEmploymentForm((v) => !v)}>
            {showEmploymentForm ? "—" : "+ Adicionar"}
          </AddButton>
        </SectionHeader>

        <ItemList>
          {curriculum.employment_histories.map((item) => (
            <ItemCard key={item.id}>
              <ItemContent>
                <ItemTitle>{item.position}</ItemTitle>
                <ItemMeta>{item.company_name}{item.start_date ? ` · ${item.start_date}` : ""}{item.salary ? ` · R$ ${item.salary}` : ""}</ItemMeta>
              </ItemContent>
              <RemoveButton type="button" onClick={() => void deleteEmployment(item.id).then(loadCurriculum)}>Remover</RemoveButton>
            </ItemCard>
          ))}
        </ItemList>

        {showEmploymentForm ? (
          <InlineForm as="form" onSubmit={handleEmploymentSubmit}>
            <FormGrid>
              <Field>
                Empresa *
                <Input required value={employmentForm.company_name} onChange={(e) => setEmploymentForm((p) => ({ ...p, company_name: e.target.value }))} placeholder="Ex: IBC Tecnologia" />
              </Field>
              <Field>
                Cargo *
                <Input required value={employmentForm.position} onChange={(e) => setEmploymentForm((p) => ({ ...p, position: e.target.value }))} placeholder="Ex: Desenvolvedor Backend" />
              </Field>
              <Field>
                Salario
                <Input value={employmentForm.salary} onChange={(e) => setEmploymentForm((p) => ({ ...p, salary: e.target.value }))} placeholder="Ex: 5000" />
              </Field>
              <Field>
                Inicio
                <Input type="date" value={employmentForm.start_date} onChange={(e) => setEmploymentForm((p) => ({ ...p, start_date: e.target.value }))} />
              </Field>
              <Field>
                Saida
                <Input type="date" value={employmentForm.end_date} onChange={(e) => setEmploymentForm((p) => ({ ...p, end_date: e.target.value }))} />
              </Field>
            </FormGrid>
            <Field>
              Motivo da saida
              <Input value={employmentForm.leaving_reason} onChange={(e) => setEmploymentForm((p) => ({ ...p, leaving_reason: e.target.value }))} placeholder="Opcional" />
            </Field>
            <FormActions>
              <SaveButton type="submit">Adicionar</SaveButton>
              <CancelButton type="button" onClick={() => { setShowEmploymentForm(false); setEmploymentForm(emptyEmployment); }}>Cancelar</CancelButton>
            </FormActions>
          </InlineForm>
        ) : null}
      </Section>

      {/* ── Links profissionais ── */}
      <Section>
        <SectionHeader>
          <div>
            <SectionTitle>Links profissionais</SectionTitle>
            <SectionHint>LinkedIn, portfolio, GitHub e similares.</SectionHint>
          </div>
          <AddButton type="button" onClick={() => setShowProfessionalForm((v) => !v)}>
            {showProfessionalForm ? "—" : "+ Adicionar"}
          </AddButton>
        </SectionHeader>

        <ItemList>
          {curriculum.professional_links.map((item) => (
            <ItemCard key={item.id}>
              <ItemContent>
                <ItemTitle>{item.title}</ItemTitle>
                <ItemMeta>{item.link}</ItemMeta>
              </ItemContent>
              <RemoveButton type="button" onClick={() => void deleteProfessionalLink(item.id).then(loadCurriculum)}>Remover</RemoveButton>
            </ItemCard>
          ))}
        </ItemList>

        {showProfessionalForm ? (
          <InlineForm as="form" onSubmit={handleProfessionalSubmit}>
            <FormGrid>
              <Field>
                Titulo *
                <Input required value={professionalForm.title} onChange={(e) => setProfessionalForm((p) => ({ ...p, title: e.target.value }))} placeholder="Ex: LinkedIn, GitHub" />
              </Field>
              <Field>
                URL *
                <Input required type="url" value={professionalForm.link} onChange={(e) => setProfessionalForm((p) => ({ ...p, link: e.target.value }))} placeholder="https://" />
              </Field>
            </FormGrid>
            <FormActions>
              <SaveButton type="submit">Adicionar</SaveButton>
              <CancelButton type="button" onClick={() => { setShowProfessionalForm(false); setProfessionalForm(emptyLink); }}>Cancelar</CancelButton>
            </FormActions>
          </InlineForm>
        ) : null}
      </Section>

      {/* ── Links sociais ── */}
      <Section>
        <SectionHeader>
          <div>
            <SectionTitle>Links sociais</SectionTitle>
            <SectionHint>Redes sociais complementares ao perfil profissional.</SectionHint>
          </div>
          <AddButton type="button" onClick={() => setShowSocialForm((v) => !v)}>
            {showSocialForm ? "—" : "+ Adicionar"}
          </AddButton>
        </SectionHeader>

        <ItemList>
          {curriculum.social_links.map((item) => (
            <ItemCard key={item.id}>
              <ItemContent>
                <ItemTitle>{item.title}</ItemTitle>
                <ItemMeta>{item.link}</ItemMeta>
              </ItemContent>
              <RemoveButton type="button" onClick={() => void deleteSocialLink(item.id).then(loadCurriculum)}>Remover</RemoveButton>
            </ItemCard>
          ))}
        </ItemList>

        {showSocialForm ? (
          <InlineForm as="form" onSubmit={handleSocialSubmit}>
            <FormGrid>
              <Field>
                Titulo *
                <Input required value={socialForm.title} onChange={(e) => setSocialForm((p) => ({ ...p, title: e.target.value }))} placeholder="Ex: Instagram, Twitter" />
              </Field>
              <Field>
                URL *
                <Input required type="url" value={socialForm.link} onChange={(e) => setSocialForm((p) => ({ ...p, link: e.target.value }))} placeholder="https://" />
              </Field>
            </FormGrid>
            <FormActions>
              <SaveButton type="submit">Adicionar</SaveButton>
              <CancelButton type="button" onClick={() => { setShowSocialForm(false); setSocialForm(emptyLink); }}>Cancelar</CancelButton>
            </FormActions>
          </InlineForm>
        ) : null}
      </Section>
    </Wrapper>
  );
}
