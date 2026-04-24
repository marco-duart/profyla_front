import { type FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import { createApplication, listCandidateApplications } from "../../services/applications";
import type { ListApplications } from "../../services/applications/dto";
import { createCandidateProfile } from "../../services/candidates";
import type { CreateCandidateProfile } from "../../services/candidates/dto";
import {
  Actions,
  ApplicationItem,
  ApplicationsList,
  Card,
  CardTitle,
  ContentGrid,
  ExitButton,
  Field,
  Form,
  FormGrid,
  Header,
  HeaderInfo,
  HeaderSubtitle,
  HeaderTitle,
  Input,
  Muted,
  Page,
  PrimaryButton,
  SecondaryButton,
  Select,
  TextArea,
} from "./styles";

const initialProfileData: CreateCandidateProfile.Params = {
  phone_number1: "11999999999",
  phone_number2: "11888888888",
  employee: false,
  resume: "Profissional orientado a produto e experiencia do candidato.",
  birthplace: "Sao Paulo",
  gender: "Nao informado",
  birthdate: "1992-06-15",
  marital_status: "Single",
  address_neighborhood: "Centro",
  address_city: "Sao Paulo",
  mother_name: "Nome da mae",
  spouse_name: "N/A",
  number_of_children: 0,
  residence_status: "Rented",
  possessions: "Notebook",
  other_incomes: false,
  relatives_in_company: false,
  pcd: "No",
  smoker: false,
  alcohol_consumer: false,
  medication_user: false,
  first_question: "Sou colaborativo e orientado a resultados.",
  second_question: "Quero evoluir lideranca tecnica.",
  third_question: "Consolidar carreira em produto digital.",
  fourth_question: "Minha rede de apoio familiar.",
  fifth_question: "Construir software com impacto positivo.",
};

function boolFromSelect(value: string): boolean {
  return value === "true";
}

export function CandidateHomePage() {
  const { user, signOutSession } = useAuth();

  const [profileData, setProfileData] = useState<CreateCandidateProfile.Params>(initialProfileData);
  const [applications, setApplications] = useState<ListApplications.Item[]>([]);
  const [hiringProcessStageId, setHiringProcessStageId] = useState<string>("");
  const [loadingApplications, setLoadingApplications] = useState<boolean>(false);

  async function handleSignOut(): Promise<void> {
    await signOutSession();
    toast.success("Sessao encerrada.");
  }

  async function handleProfileSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    try {
      await createCandidateProfile(profileData);
      toast.success("Perfil de candidato criado com sucesso.");
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : "Erro ao criar perfil.";
      toast.error(message);
    }
  }

  async function handleLoadApplications(): Promise<void> {
    setLoadingApplications(true);
    try {
      const response = await listCandidateApplications();
      setApplications(response);
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : "Erro ao listar candidaturas.";
      toast.error(message);
    } finally {
      setLoadingApplications(false);
    }
  }

  async function handleCreateApplication(): Promise<void> {
    if (!hiringProcessStageId) {
      toast.error("Informe o ID da etapa para se candidatar.");
      return;
    }

    try {
      await createApplication({ hiring_process_stage_id: Number(hiringProcessStageId) });
      toast.success("Candidatura criada.");
      await handleLoadApplications();
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : "Erro ao criar candidatura.";
      toast.error(message);
    }
  }

  function setBooleanField(
    fieldName:
      | "employee"
      | "other_incomes"
      | "relatives_in_company"
      | "smoker"
      | "alcohol_consumer"
      | "medication_user",
    value: string,
  ) {
    setProfileData((current) => ({
      ...current,
      [fieldName]: boolFromSelect(value),
    }));
  }

  return (
    <Page>
      <Header>
        <HeaderInfo>
          <HeaderTitle>Area do Candidato</HeaderTitle>
          <HeaderSubtitle>
            {user?.name} | {user?.email} | perfil {user?.role}
          </HeaderSubtitle>
        </HeaderInfo>

        <ExitButton type="button" onClick={handleSignOut}>
          Sair
        </ExitButton>
      </Header>

      <ContentGrid>
        <Card>
          <CardTitle>Cadastro Inicial de Perfil</CardTitle>
          <Muted>
            Este formulario envia os campos obrigatorios esperados pelo endpoint de criacao de candidato.
          </Muted>

          <Form onSubmit={handleProfileSubmit}>
            <FormGrid>
              <Field>
                Celular principal
                <Input
                  value={profileData.phone_number1}
                  onChange={(event) =>
                    setProfileData((current) => ({ ...current, phone_number1: event.target.value }))
                  }
                />
              </Field>

              <Field>
                Celular secundario
                <Input
                  value={profileData.phone_number2}
                  onChange={(event) =>
                    setProfileData((current) => ({ ...current, phone_number2: event.target.value }))
                  }
                />
              </Field>

              <Field>
                Cidade
                <Input
                  value={profileData.address_city}
                  onChange={(event) =>
                    setProfileData((current) => ({ ...current, address_city: event.target.value }))
                  }
                />
              </Field>

              <Field>
                Bairro
                <Input
                  value={profileData.address_neighborhood}
                  onChange={(event) =>
                    setProfileData((current) => ({ ...current, address_neighborhood: event.target.value }))
                  }
                />
              </Field>

              <Field>
                Data de nascimento
                <Input
                  type="date"
                  value={profileData.birthdate}
                  onChange={(event) =>
                    setProfileData((current) => ({ ...current, birthdate: event.target.value }))
                  }
                />
              </Field>

              <Field>
                Nome da mae
                <Input
                  value={profileData.mother_name}
                  onChange={(event) =>
                    setProfileData((current) => ({ ...current, mother_name: event.target.value }))
                  }
                />
              </Field>

              <Field>
                Empregado atualmente?
                <Select
                  value={String(profileData.employee)}
                  onChange={(event) => setBooleanField("employee", event.target.value)}
                >
                  <option value="false">Nao</option>
                  <option value="true">Sim</option>
                </Select>
              </Field>

              <Field>
                Fumante?
                <Select
                  value={String(profileData.smoker)}
                  onChange={(event) => setBooleanField("smoker", event.target.value)}
                >
                  <option value="false">Nao</option>
                  <option value="true">Sim</option>
                </Select>
              </Field>
            </FormGrid>

            <Field>
              Resumo profissional
              <TextArea
                value={profileData.resume}
                onChange={(event) =>
                  setProfileData((current) => ({ ...current, resume: event.target.value }))
                }
              />
            </Field>

            <Actions>
              <PrimaryButton type="submit">Salvar perfil</PrimaryButton>
              <SecondaryButton
                type="button"
                onClick={() => setProfileData(initialProfileData)}
              >
                Restaurar modelo
              </SecondaryButton>
            </Actions>
          </Form>
        </Card>

        <Card>
          <CardTitle>Candidaturas</CardTitle>
          <Muted>
            No backend atual, vagas e processos estao em rotas admin. Para testar candidatura, use o ID de uma etapa.
          </Muted>

          <Field>
            ID da etapa do processo (hiring_process_stage_id)
            <Input
              value={hiringProcessStageId}
              onChange={(event) => setHiringProcessStageId(event.target.value)}
              placeholder="Ex.: 1"
            />
          </Field>

          <Actions>
            <PrimaryButton type="button" onClick={handleCreateApplication}>
              Criar candidatura
            </PrimaryButton>
            <SecondaryButton type="button" onClick={handleLoadApplications}>
              {loadingApplications ? "Carregando..." : "Atualizar lista"}
            </SecondaryButton>
          </Actions>

          {applications.length === 0 ? (
            <Muted>Nenhuma candidatura carregada ainda.</Muted>
          ) : (
            <ApplicationsList>
              {applications.map((item) => (
                <ApplicationItem key={item.id}>
                  <strong>Aplicacao #{item.id}</strong>
                  <span>Etapa: {item.stage ?? item.hiring_process_stage_id ?? "-"}</span>
                  <span>Vaga: {item.job_name ?? "-"}</span>
                </ApplicationItem>
              ))}
            </ApplicationsList>
          )}
        </Card>
      </ContentGrid>
    </Page>
  );
}
