//NATIVE
import { useState } from "react";
//LIBRARIES
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
//COMPONENTS
import CrudButton from "../shared/buttons/crud-button";
//STYLES
import * as S from "./styles";
import { EyeFill, EyeSlashFill } from "styled-icons/bootstrap";
//UTILS
import { FORM_MESSAGE } from "../../utils/enums/form-message";
import { SUCCESSFUL_MESSAGE } from "../../utils/enums/successful-message";
import * as CONSTANTS from "../../utils/constants/constants";

const changePasswordFormSchema = z.object({
  currentPassword: z.string().min(8, FORM_MESSAGE.PASSWORD_SIZE),
  newPassword: z
    .string()
    .min(8, FORM_MESSAGE.PASSWORD_SIZE)
    .regex(CONSTANTS.PASSWORD_REGEX, FORM_MESSAGE.PASSWORD_RULE),
  confirm: z.string().min(8, FORM_MESSAGE.CONFIRM_PASSWORD),
});

type ChangePasswordFormData = z.infer<typeof changePasswordFormSchema>;

type Props = {
  handleModal: (message?: string) => void;
  handleChangePassword: (currentPassword: string, newPassword: string) => void;
};

const ChangePasswordForm: React.FC<Props> = ({
  handleModal,
  handleChangePassword,
}) => {
  const [currentPasswordIsOpen, setCurrentPasswordIsOpen] = useState(false);
  const [newPasswordIsOpen, setNewPasswordIsOpen] = useState(false);
  const [confirmIsOpen, setConfirmIsOpen] = useState(false);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordFormSchema),
  });

  const handlePassword = (
    name: "currentPassword" | "newPassword" | "confirm"
  ) => {
    switch (name) {
      case "currentPassword":
        setCurrentPasswordIsOpen(!currentPasswordIsOpen);
        break;
      case "newPassword":
        setNewPasswordIsOpen(!newPasswordIsOpen);
        break;
      case "confirm":
        setConfirmIsOpen(!confirmIsOpen);
        break;
    }
  };

  const cleanFields = () => {
    setValue("currentPassword", "");
    setValue("newPassword", "");
    setValue("confirm", "");
  };

  const handleSubmitForm = async (data: ChangePasswordFormData) => {
    const { currentPassword, newPassword } = data;
    handleChangePassword(currentPassword, newPassword);
    cleanFields();
    handleModal(SUCCESSFUL_MESSAGE.CHANGE_PASSWORD_REQUEST);
  };

  return (
    <S.CrudFormStyle onSubmit={handleSubmit(handleSubmitForm)}>
      <S.BaseSubtitleFormStyle>Senha atual:</S.BaseSubtitleFormStyle>
      <S.PasswordSectionFormStyle>
        <label htmlFor="currentPassword" hidden>
          Senha
        </label>
        <S.BaseInputFormStyle
          {...register("currentPassword")}
          type={currentPasswordIsOpen ? "text" : "password"}
          placeholder="Digite sua senha..."
          active={true}
          error={errors.currentPassword ? true : false}
        />
        <S.HandlePasswordDivStyle
          onClick={() => handlePassword("currentPassword")}
        >
          {currentPasswordIsOpen ? <EyeFill /> : <EyeSlashFill />}
        </S.HandlePasswordDivStyle>
        {errors.currentPassword && (
          <S.BaseSmallFormStyle>
            {errors.currentPassword.message}
          </S.BaseSmallFormStyle>
        )}
      </S.PasswordSectionFormStyle>
      <S.BaseSubtitleFormStyle>Nova senha:</S.BaseSubtitleFormStyle>
      <S.PasswordSectionFormStyle>
        <label htmlFor="newPassword" hidden>
          Senha
        </label>
        <S.BaseInputFormStyle
          {...register("newPassword")}
          type={newPasswordIsOpen ? "text" : "password"}
          placeholder="Digite a nova senha..."
          active={true}
          error={errors.newPassword ? true : false}
        />
        <S.HandlePasswordDivStyle onClick={() => handlePassword("newPassword")}>
          {newPasswordIsOpen ? <EyeFill /> : <EyeSlashFill />}
        </S.HandlePasswordDivStyle>
        {errors.newPassword && (
          <S.BaseSmallFormStyle>
            {errors.newPassword.message}
          </S.BaseSmallFormStyle>
        )}
      </S.PasswordSectionFormStyle>
      <S.BaseSubtitleFormStyle>Confirme a nova senha:</S.BaseSubtitleFormStyle>
      <S.PasswordSectionFormStyle>
        <label htmlFor="confirm" hidden>
          Senha
        </label>
        <S.BaseInputFormStyle
          {...register("confirm")}
          type={confirmIsOpen ? "text" : "password"}
          placeholder="Confirme a nova senha..."
          active={true}
          error={errors.confirm ? true : false}
        />
        <S.HandlePasswordDivStyle onClick={() => handlePassword("confirm")}>
          {confirmIsOpen ? <EyeFill /> : <EyeSlashFill />}
        </S.HandlePasswordDivStyle>
        {errors.confirm && (
          <S.BaseSmallFormStyle>{errors.confirm.message}</S.BaseSmallFormStyle>
        )}
      </S.PasswordSectionFormStyle>
      <S.CrudButtonsDiv>
        <CrudButton type="submit" action="save">
          Salvar
        </CrudButton>
      </S.CrudButtonsDiv>
    </S.CrudFormStyle>
  );
};

export default ChangePasswordForm;
