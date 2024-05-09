//NATIVE
import React, { useEffect, useState } from "react";
//LIBRARIES
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
//COMPONENTS
import CrudButton from "../shared/buttons/crud-button";
//STYLES
import * as S from "./styles";
//UTILS
import { FORM_MESSAGE } from "../../utils/enums/form-message";
import { useUserConfiguration } from "../../hooks/user/use-user-configuration";

const changeEmailFormSchema = z.object({
  email: z
    .string()
    .min(6, FORM_MESSAGE.EMAIL)
    .email(FORM_MESSAGE.EMAIL_FORMAT)
    .toLowerCase(),
});

type ChangeEmailFormData = z.infer<typeof changeEmailFormSchema>;

type Props = {
  email: string;
};

const ChangeEmailForm: React.FC<Props> = ({ email }) => {
  const { changeEmail } = useUserConfiguration()
  const [disabled, setDisabled] = useState<boolean>(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ChangeEmailFormData>({
    resolver: zodResolver(changeEmailFormSchema),
  });

  const handleDisableInput = () => {
    setDisabled(!disabled);
  };

  const handleSubmitForm = async (data: ChangeEmailFormData) => {
    changeEmail(data.email)
    //modal de erro ou sucesso?
    handleDisableInput()
  };

  useEffect(() => {
    if (!disabled) {
      setValue("email", "");
    } else if (disabled) {
      setValue("email", email);
    }
  }, [disabled]);

  return (
    <S.CrudFormStyle onSubmit={handleSubmit(handleSubmitForm)}>
      <S.BaseSubtitleFormStyle>Email:</S.BaseSubtitleFormStyle>
      <S.CrudInputDiv>
        <S.BaseInputFormStyle
          {...register("email")}
          type="text"
          placeholder="Novo email"
          disabled={disabled}
          active={!disabled}
          error={errors.email ? true : false}
        />
        {errors.email && (
          <S.BaseSmallFormStyle>{errors.email.message}</S.BaseSmallFormStyle>
        )}
      </S.CrudInputDiv>
      <S.CrudButtonsDiv>
        {disabled && (
          <CrudButton onClick={handleDisableInput} action="edit">
            Editar
          </CrudButton>
        )}
        {!disabled && (
          <CrudButton onClick={handleDisableInput} action="cancel">
            Cancelar
          </CrudButton>
        )}
        {!disabled && (
          <CrudButton type="submit" action="save">
            Salvar
          </CrudButton>
        )}
      </S.CrudButtonsDiv>
    </S.CrudFormStyle>
  );
};

export default ChangeEmailForm;
