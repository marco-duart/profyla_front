//NATIVE
import React, { useEffect, useState } from "react";
//LIBRARIES
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
//COMPONENTS
import FormButton from "../shared/buttons/form-button";
import CrudButton from "../shared/buttons/crud-button";

//STYLES
import * as S from "./styles";
//UTILS
import { FORM_MESSAGE } from "../../utils/enums/form-message";
import { JobPosting } from "../../services/jobPosting/DTO";
import { Company } from "../../services/company/DTO";

import {
  CreateJobData,
  DeleteJobData,
  UpdateJobData,
} from "../../hooks/job/use-job-crud";
import { format } from "date-fns";

const jobFormSchema = z.object({
  id: z.coerce.number().nullable(),
  company_id: z.coerce.number(),
  title: z.string().min(3, FORM_MESSAGE.JOB_TITLE),
  description: z.string(),
  requirements: z.string(),
  job_location: z.string(),
  regime: z.string().min(3, FORM_MESSAGE.JOB_REGIME), //select
  modality: z.string().min(3, FORM_MESSAGE.JOB_MODALITY), //select
  salary: z.string().min(1, FORM_MESSAGE.JOB_SALARY),
  work_schedule: z.string(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
});

type JobFormData = z.infer<typeof jobFormSchema>;

type Props = {
  job?: JobPosting;
  company?: Company
  isOpen: boolean;
  onDelete: (params: DeleteJobData) => void;
  onEdit: (params: UpdateJobData) => void;
  onCreate: (params: CreateJobData) => void;
  onClose: () => void;
};

const JobForm: React.FC<Props> = ({
  job,
  company,
  isOpen,
  onClose,
  onCreate,
  onDelete,
  onEdit,
}) => {
  const [disabled, setDisabled] = useState<boolean>(job ? true : false);
  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
    setValue,
  } = useForm<JobFormData>({
    resolver: zodResolver(jobFormSchema),
  });

  // Disable input when action is view
  const handleDisableInput = () => {
    setDisabled(!disabled);
  };

  const handleSubmitForm = async (data: JobFormData) => {
    console.log("Oi")
    if (job && data.id) {
      const { id, ...rest } = data;
      if (!id) {
        return;
      }
      onEdit({ ...rest, id });
    } else {
      const { id, ...rest } = data;
      onCreate(rest);
    }
    onClose();
  };

  const handleDeleteForm = async () => {
    if (job) {
      onDelete({ id: job?.id });
      onClose();
    }
  };

  useEffect(() => {
    const date = new Date()
    if (job) {
      setDisabled(true);
      setValue("id", job.id);
      setValue("company_id", job.company_id);
      setValue("title", job.title);
      setValue("description", job.description);
      setValue("requirements", job.requirements);
      setValue("job_location", job.job_location);
      setValue("regime", job.regime);
      setValue("modality", job.modality);
      setValue("salary", job.salary);
      setValue("work_schedule", job.work_schedule);
      setValue("start_date", format(job.start_date, "yyyy-MM-dd"));
      setValue("end_date", format(job.end_date, "yyyy-MM-dd"));
    } else if(company) {
      setDisabled(false);
      setValue("id", null);
      setValue("company_id", company.id);
      setValue("title", "");
      setValue("description", "");
      setValue("requirements", "");
      setValue("job_location", "");
      setValue("regime", "");
      setValue("modality", "");
      setValue("salary", "");
      setValue("work_schedule", "");
      setValue("start_date", undefined);
      setValue("end_date", undefined);
    }
  }, [job, isOpen]);

  return (
    <S.CrudFormStyle onSubmit={handleSubmit(handleSubmitForm)}>
      <S.CrudInputDiv>
        <label htmlFor="title">Nome da vaga</label>
        <S.BaseInputFormStyle
          {...register("title")}
          type="text"
          placeholder="Nome da vaga"
          disabled={disabled}
          error={errors.title ? true : false}
        />
        {errors.title && (
          <S.BaseSmallFormStyle>
            {errors.title.message}
          </S.BaseSmallFormStyle>
        )}
      </S.CrudInputDiv>
      <S.CrudInputDiv>
        <label htmlFor="description">Descrição da vaga</label>
        <S.BaseTextAreaFormStyle
          {...register("description")}
          placeholder="Descrição da vaga"
          disabled={disabled}
          error={errors.description ? true : false}
        />
        {errors.description && (
          <S.BaseSmallFormStyle>
            {errors.description.message}
          </S.BaseSmallFormStyle>
        )}
      </S.CrudInputDiv>
      <S.CrudInputDiv>
        <label htmlFor="requirements">Requisitos da vaga</label>
        <S.BaseTextAreaFormStyle
          {...register("requirements")}
          placeholder="Requisitos da vaga"
          disabled={disabled}
          error={errors.requirements ? true : false}
        />
        {errors.requirements && (
          <S.BaseSmallFormStyle>
            {errors.requirements.message}
          </S.BaseSmallFormStyle>
        )}
      </S.CrudInputDiv>
      <S.CrudInputDiv>
        <label htmlFor="job_location">Cidade/Estado da vaga</label>
        <S.BaseInputFormStyle
          {...register("job_location")}
          type="text"
          placeholder="Cidade/Estado da vaga"
          disabled={disabled}
          error={errors.job_location ? true : false}
        />
        {errors.job_location && (
          <S.BaseSmallFormStyle>
            {errors.job_location.message}
          </S.BaseSmallFormStyle>
        )}
      </S.CrudInputDiv>
      <S.CrudInputDiv>
        <label htmlFor="regime">Regine de contratação</label>
        <S.BaseInputFormStyle
          {...register("regime")}
          type="text"
          placeholder="Regine de contratação"
          disabled={disabled}
          error={errors.regime ? true : false}
        />
        {errors.regime && (
          <S.BaseSmallFormStyle>
            {errors.regime.message}
          </S.BaseSmallFormStyle>
        )}
      </S.CrudInputDiv>
      <S.CrudInputDiv>
        <label htmlFor="modality">Modalidade de trabalho</label>
        <S.BaseInputFormStyle
          {...register("modality")}
          type="text"
          placeholder="Modalidade de trabalho"
          disabled={disabled}
          error={errors.modality ? true : false}
        />
        {errors.modality && (
          <S.BaseSmallFormStyle>
            {errors.modality.message}
          </S.BaseSmallFormStyle>
        )}
      </S.CrudInputDiv>
      <S.CrudInputDiv>
        <label htmlFor="salary">Salário</label>
        <S.BaseInputFormStyle
          {...register("salary")}
          type="text"
          placeholder="Salário"
          disabled={disabled}
          error={errors.salary ? true : false}
        />
        {errors.salary && (
          <S.BaseSmallFormStyle>
            {errors.salary.message}
          </S.BaseSmallFormStyle>
        )}
      </S.CrudInputDiv>
      <S.CrudInputDiv>
        <label htmlFor="work_schedule">Horário de trabalho</label>
        <S.BaseInputFormStyle
          {...register("work_schedule")}
          type="text"
          placeholder="Horário de trabalho"
          disabled={disabled}
          error={errors.work_schedule ? true : false}
        />
        {errors.work_schedule && (
          <S.BaseSmallFormStyle>
            {errors.work_schedule.message}
          </S.BaseSmallFormStyle>
        )}
      </S.CrudInputDiv>
      <S.CrudInputDiv>
        <label htmlFor="start_date">Início do contrato</label>
        <S.BaseInputFormStyle
          {...register("start_date")}
          type="date"
          placeholder="Início do contrato"
          disabled={disabled}
          error={errors.start_date ? true : false}
        />
        {errors.start_date && (
          <S.BaseSmallFormStyle>
            {errors.start_date.message}
          </S.BaseSmallFormStyle>
        )}
      </S.CrudInputDiv>
      <S.CrudInputDiv>
        <label htmlFor="end_date">Fim do contrato</label>
        <S.BaseInputFormStyle
          {...register("end_date")}
          type="date"
          placeholder="Fim do contrato"
          disabled={disabled}
          error={errors.end_date ? true : false}
        />
        {errors.end_date && (
          <S.BaseSmallFormStyle>
            {errors.end_date.message}
          </S.BaseSmallFormStyle>
        )}
      </S.CrudInputDiv>
      <S.CrudButtonsDiv>
        {(disabled && job) && (
          <CrudButton onClick={handleDisableInput} action="edit">
            Editar
          </CrudButton>
        )}
        {(!disabled && job) && (
          <CrudButton onClick={handleDisableInput} action="cancel">
            Cancelar
          </CrudButton>
        )}
        {job && (
          <CrudButton onClick={handleDeleteForm} action="delete">
            Excluir
          </CrudButton>
        )}
        {!disabled && <FormButton type="submit">Salvar</FormButton>}
      </S.CrudButtonsDiv>
      <div>{formState.errors.id && "id"}</div>
      <div>{formState.errors.company_id && "company_id"}</div>
    </S.CrudFormStyle>
  );
};

export default JobForm;
