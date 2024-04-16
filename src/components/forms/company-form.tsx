//NATIVE
import React, { useEffect } from "react";
//LIBRARIES
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
//COMPONENTS
import BaseButton from "../shared/buttons/base-button";
import { UpdateCompany } from "../../services/company";

//STYLES
import * as S from "./styles";
//UTILS
import { FORM_MESSAGE } from "../../utils/enums/form-message";
import { Company } from "../../services/company/DTO";

const companyFormSchema = z.object({
  id: z.coerce.number().optional(),
  company_name: z.string().min(6, FORM_MESSAGE.NAME),
  cnpj: z.string().min(14, FORM_MESSAGE.CNPJ_SIZE),
  sector: z.string().min(14, FORM_MESSAGE.CNPJ_SIZE),
  company_location: z.string().min(14, FORM_MESSAGE.CNPJ_SIZE),
  company_size: z.coerce.number().positive().min(14, FORM_MESSAGE.CNPJ_SIZE),
});

type CompanyFormData = z.infer<typeof companyFormSchema>;

type Props = {
  company?: Company
  disabled: boolean
  handleDisableInput: () => void
}

const CompanyForm: React.FC<Props> = ({ company, disabled }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companyFormSchema),
  });
  
  const handleSubmitForm = async () => {
    //const result = company ? await UpdateCompany()
  }

  useEffect(() => {
    if (company) {
      setValue("id", company.id)
      setValue("company_name", company.company_name);
      setValue("cnpj", company.cnpj);
      setValue("sector", company.sector);
      setValue("company_location", company.company_location);
      setValue("company_size", company.company_size);
    }
  }, [company]);

  return (
    <S.CompanyFormStyle onSubmit={handleSubmit(handleSubmitForm)}>
      <div>
        <label htmlFor="id" hidden>
          Id
        </label>
        <S.BaseInputFormStyle
          {...register("id")}
          type="text"
          placeholder="Nome da empresa/CNPJ"
          disabled={disabled}
          error={errors.company_name ? true : false}
        />
      </div>
      <div>
        <label htmlFor="company_name" hidden>
          Nome da Empresa
        </label>
        <S.BaseInputFormStyle
          {...register("company_name")}
          type="text"
          placeholder="Nome da empresa/CNPJ"
          disabled={disabled}
          error={errors.company_name ? true : false}
        />
        {errors.company_name && (
          <S.BaseSmallFormStyle>{errors.company_name.message}</S.BaseSmallFormStyle>
        )}
      </div>
      <div>
        <label htmlFor="cnpj" hidden>
          CNPJ
        </label>
        <S.BaseInputFormStyle
          {...register("cnpj")}
          type="text"
          placeholder="CNPJ"
          disabled={disabled}
          error={errors.cnpj ? true : false}
        />
        {errors.cnpj && (
          <S.BaseSmallFormStyle>{errors.cnpj.message}</S.BaseSmallFormStyle>
        )}
      </div>
      <div>
        <label htmlFor="sector" hidden>
          Setor/Área
        </label>
        <S.BaseInputFormStyle
          {...register("sector")}
          type="text"
          placeholder="Setor ou categoria da empresa/cnpj"
          disabled={disabled}
          error={errors.sector ? true : false}
        />
        {errors.sector && (
          <S.BaseSmallFormStyle>{errors.sector.message}</S.BaseSmallFormStyle>
        )}
      </div>
      <div>
        <label htmlFor="company_location" hidden>
          Cidade/Estado
        </label>
        <S.BaseInputFormStyle
          {...register("company_location")}
          type="text"
          placeholder="Localização da empresa. Cidade/Estado"
          disabled={disabled}
          error={errors.company_location ? true : false}
        />
        {errors.company_location && (
          <S.BaseSmallFormStyle>{errors.company_location.message}</S.BaseSmallFormStyle>
        )}
      </div>
      <div>
        <label htmlFor="company_size" hidden>
          Quantidade de funcionários
        </label>
        <S.BaseInputFormStyle
          {...register("company_size")}
          type="number"
          placeholder="Quantidade de funcionários"
          disabled={disabled}
          error={errors.company_size ? true : false}
        />
        {errors.company_size && (
          <S.BaseSmallFormStyle>{errors.company_size.message}</S.BaseSmallFormStyle>
        )}
      </div>
      <BaseButton type="submit">SALVAR</BaseButton>
    </S.CompanyFormStyle>
  );
};

export default CompanyForm;
