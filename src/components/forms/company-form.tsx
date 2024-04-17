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
import { Company } from "../../services/company/DTO";

import {
  CreateCompanyData,
  DeleteCompanyData,
  UpdateCompanyData,
} from "../../hooks/company/use-company-crud";

const companyFormSchema = z.object({
  id: z.coerce.number().nullable(),
  company_name: z.string().min(6, FORM_MESSAGE.NAME),
  cnpj: z.string().min(14, FORM_MESSAGE.CNPJ_SIZE),
  sector: z.string().min(3, FORM_MESSAGE.COMPANY_SECTOR),
  company_location: z.string().min(3, FORM_MESSAGE.COMPANY_LOCATION),
  company_size: z.coerce.number().positive(FORM_MESSAGE.COMPANY_SIZE),
});

type CompanyFormData = z.infer<typeof companyFormSchema>;

type Props = {
  company?: Company;
  onDelete: (params: DeleteCompanyData) => void;
  onEdit: (params: UpdateCompanyData) => void;
  onCreate: (params: CreateCompanyData) => void;
  onClose: () => void;
};

const CompanyForm: React.FC<Props> = ({
  company,
  onClose,
  onCreate,
  onDelete,
  onEdit,
}) => {
  const [disabled, setDisabled] = useState<boolean>(company ? true : false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companyFormSchema),
  });

  // Disable input when action is view
  const handleDisableInput = () => {
    setDisabled(!disabled);
  };

  const handleSubmitForm = async (data: CompanyFormData) => {
    if (company && data.id) {
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
    if (company) {
      onDelete({ id: company?.id });
      onClose();
    }
  };

  useEffect(() => {
    if (company) {
      setDisabled(true);
      setValue("id", company.id);
      setValue("company_name", company.company_name);
      setValue("cnpj", company.cnpj);
      setValue("sector", company.sector);
      setValue("company_location", company.company_location);
      setValue("company_size", company.company_size);
    } else {
      setDisabled(false);
      setValue("id", null);
      setValue("company_name", "");
      setValue("cnpj", "");
      setValue("sector", "");
      setValue("company_location", "");
      setValue("company_size", 0);
    }
  }, [company]);

  return (
    <S.CompanyFormStyle onSubmit={handleSubmit(handleSubmitForm)}>
      <S.CompanyInputDiv>
        <label htmlFor="company_name">Nome da Empresa</label>
        <S.BaseInputFormStyle
          {...register("company_name")}
          type="text"
          placeholder="Nome da empresa/CNPJ"
          disabled={disabled}
          error={errors.company_name ? true : false}
        />
        {errors.company_name && (
          <S.BaseSmallFormStyle>
            {errors.company_name.message}
          </S.BaseSmallFormStyle>
        )}
      </S.CompanyInputDiv>
      <S.CompanyInputDiv>
        <label htmlFor="cnpj">CNPJ</label>
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
      </S.CompanyInputDiv>
      <S.CompanyInputDiv>
        <label htmlFor="sector">Setor/Área</label>
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
      </S.CompanyInputDiv>
      <S.CompanyInputDiv>
        <label htmlFor="company_location">Cidade/Estado</label>
        <S.BaseInputFormStyle
          {...register("company_location")}
          type="text"
          placeholder="Localização da empresa. Cidade/Estado"
          disabled={disabled}
          error={errors.company_location ? true : false}
        />
        {errors.company_location && (
          <S.BaseSmallFormStyle>
            {errors.company_location.message}
          </S.BaseSmallFormStyle>
        )}
      </S.CompanyInputDiv>
      <S.CompanyInputDiv>
        <label htmlFor="company_size">Quantidade de funcionários</label>
        <S.BaseInputFormStyle
          {...register("company_size")}
          type="number"
          placeholder="Quantidade de funcionários"
          disabled={disabled}
          error={errors.company_size ? true : false}
        />
        {errors.company_size && (
          <S.BaseSmallFormStyle>
            {errors.company_size.message}
          </S.BaseSmallFormStyle>
        )}
      </S.CompanyInputDiv>
      <S.CrudButtonsDiv>
        {disabled ? (
          <CrudButton onClick={handleDisableInput} action="edit">
            Editar
          </CrudButton>
        ) : (
          <CrudButton onClick={handleDisableInput} action="cancel">
            Cancelar
          </CrudButton>
        )}
        {company && (
          <CrudButton onClick={handleDeleteForm} action="delete">
            Excluir
          </CrudButton>
        )}
        {!disabled && <FormButton type="submit">Salvar</FormButton>}
      </S.CrudButtonsDiv>
    </S.CompanyFormStyle>
  );
};

export default CompanyForm;
