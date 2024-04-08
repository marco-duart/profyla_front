//NATIVE
import { useState } from "react";
//LIBRARIES
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { cpf } from "cpf-cnpj-validator";
//COMPONENTS
import BaseButton from "../shared/buttons/base-button";
import { ForgetPassword } from "../../services/register";
//STYLES
import * as S from "./styles";
//UTILS
import { FORM_MESSAGE } from "../../utils/enums/form-message";

const forgotpasswordFormSchema = z.object({
  cpf: z
    .string()
    .min(11, FORM_MESSAGE.CPF_SIZE)
    .refine((value) => cpf.isValid(value), FORM_MESSAGE.CPF_VALID),
  email: z
    .string()
    .min(6, FORM_MESSAGE.EMAIL)
    .email(FORM_MESSAGE.EMAIL_FORMAT)
    .toLowerCase(),
});

type forgotpasswordFormData = z.infer<typeof forgotpasswordFormSchema>;

const ForgotPasswordForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<forgotpasswordFormData>({
    resolver: zodResolver(forgotpasswordFormSchema),
  });

  const handleForget = async (data: forgotpasswordFormData) => {
    const result = await ForgetPassword(data);
    if (!result.error) {
      navigate("/");
      console.log("Deu certo!", result);
      window.alert("Deu certo!");
    } else {
      console.log("Deu ruim!", result);
    }
  };

  return (
    <S.ForgotPasswordFormStyle onSubmit={handleSubmit(handleForget)}>
      <S.BaseTitleFormStyle>Esqueci minha senha</S.BaseTitleFormStyle>
      <div>
        <label htmlFor="email" hidden>
          Email
        </label>
        <S.BaseInputFormStyle
          {...register("email")}
          error={false}
          type="text"
          placeholder="email"
        />
        {errors.email && (
          <S.BaseSmallFormStyle>{errors.email.message}</S.BaseSmallFormStyle>
        )}
      </div>
      <div>
        <label htmlFor="cpf" hidden>
          CPF
        </label>
        <S.BaseInputFormStyle
          {...register("cpf")}
          error={false}
          type="text"
          placeholder="cpf"
        />
        {errors.cpf && (
          <S.BaseSmallFormStyle>{errors.cpf.message}</S.BaseSmallFormStyle>
        )}
      </div>
      <BaseButton type={"submit"}>CONFIRMAR</BaseButton>
    </S.ForgotPasswordFormStyle>
  );
};

export default ForgotPasswordForm;
