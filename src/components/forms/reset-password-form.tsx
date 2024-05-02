//NATIVE
import React, { useState } from "react";

//LIBRARIES
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

//COMPONENTS
import BaseButton from "../shared/buttons/base-button";
import { ResetPassword } from "../../services/register";

//STYLES
import * as S from "./styles";
import { EyeFill, EyeSlashFill } from "@styled-icons/bootstrap";

//UTILS
import { FORM_MESSAGE } from "../../utils/enums/form-message";
import * as CONSTANTS from "../../utils/constants/constants"
import { EXCEPTION_MESSAGE } from "../../utils/enums/exception-message";
import { SUCCESSFUL_MESSAGE } from "../../utils/enums/successful-message";

const resetPasswordFormSchema = z
  .object({
    password: z
      .string()
      .min(8, FORM_MESSAGE.PASSWORD_SIZE)
      .regex(CONSTANTS.PASSWORD_REGEX, FORM_MESSAGE.PASSWORD_RULE),
    confirm: z.string().min(8, FORM_MESSAGE.CONFIRM_PASSWORD),
  })
  .refine((data) => data.password === data.confirm, {
    message: FORM_MESSAGE.PASSWORD_CONFIRM_MATCH,
    path: ["confirm"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordFormSchema>;

type Props = {
  id?: string
  action_key?: string
  handleMessage: (message: string) => void
}

const ResetPasswordForm: React.FC<Props> = ({id, action_key, handleMessage}) => {
  const [passwordIsOpen, setPasswordIsOpen] = useState(false);
  const [confirmIsOpen, setConfirmIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordFormSchema),
  });

  const handleRegister = async (data: ResetPasswordFormData) => {
    const { confirm, ...rest } = data;

    if(!id || !action_key) {
      handleMessage(EXCEPTION_MESSAGE.INVALID_PARAMS_FETCH)
      return
    }

    const fetchData = { ...rest, id, action_key}
    const result = await ResetPassword(fetchData);

    if (result.success) {
      handleMessage(SUCCESSFUL_MESSAGE.PASSWORD_CHANGED);
    } else {
      handleMessage(EXCEPTION_MESSAGE.CHANGE_PASSWORD_FAILED);
    }
  };

  const handlePassword = (name: "password" | "confirm") => {
    name === "password"
      ? setPasswordIsOpen(!passwordIsOpen)
      : setConfirmIsOpen(!confirmIsOpen);
  };

  return (
    <S.RegisterFormStyle onSubmit={handleSubmit(handleRegister)}>
      <S.BaseTitleFormStyle>Nova senha</S.BaseTitleFormStyle>

      <S.PasswordSectionFormStyle>
        <label htmlFor="password" hidden>
          Senha
        </label>
        <S.BaseInputFormStyle
          {...register("password")}
          type={passwordIsOpen ? "text" : "password"}
          placeholder="Senha"
          error={errors.password ? true : false}
        />
        <S.HandlePasswordDivStyle onClick={() => handlePassword("password")}>
          {passwordIsOpen ? <EyeFill /> : <EyeSlashFill />}
        </S.HandlePasswordDivStyle>
        {errors.password && (
          <S.BaseSmallFormStyle>{errors.password.message}</S.BaseSmallFormStyle>
        )}
      </S.PasswordSectionFormStyle>

      <S.PasswordSectionFormStyle className="first-section">
        <label htmlFor="confirm" hidden>
          Confirmar Senha
        </label>
        <S.BaseInputFormStyle
          {...register("confirm")}
          type={confirmIsOpen ? "text" : "password"}
          placeholder="Confirmar Senha"
          error={errors.confirm ? true : false}
        />
        <S.HandlePasswordDivStyle onClick={() => handlePassword("confirm")}>
          {confirmIsOpen ? <EyeFill /> : <EyeSlashFill />}
        </S.HandlePasswordDivStyle>
        {errors.confirm && (
          <S.BaseSmallFormStyle>{errors.confirm.message}</S.BaseSmallFormStyle>
        )}
      </S.PasswordSectionFormStyle>

      <BaseButton type="submit">CADASTRAR-ME</BaseButton>
    </S.RegisterFormStyle>
  );
};

export default ResetPasswordForm;
