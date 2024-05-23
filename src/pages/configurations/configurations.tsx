//NATIVE
import { useState } from "react";
//LIBRARIES
//COMPONENTS
import PhotoDropzone from "../../components/photo-dropzone/photo-dropzone";
import ChangeEmailForm from "../../components/forms/change-email-form";
import UserInfoForm from "../../components/forms/user-info-form";
import ChangePasswordForm from "../../components/forms/change-password-form";
import NotificationModal from "../../components/shared/modal/notification-modal";
//STYLES
import * as S from "./styles";
//UTILS
import { useUserConfiguration } from "../../hooks/user/use-user-configuration";

const Configurations = () => {
  const { user, message, changeNewsletter, changeEmail, changePassword } =
    useUserConfiguration();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleChangeEmail = async (newEmail: string) => {
    changeEmail(newEmail);
    handleModal();
  };

  const handleChangePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    changePassword(currentPassword, newPassword);
  };

  return (
    <S.ContainerDivStyle>
      <S.TitleStyle>Configurações da Conta</S.TitleStyle>
      <PhotoDropzone userPhotoUrl={user?.photo_url || ""} />
      <S.SectionDivStyle>
        <S.SectionSideStyle className="v1">
          <UserInfoForm name={user?.name || ""} cpf={user?.cpf || ""} />
          <ChangeEmailForm
            handleModal={handleModal}
            handleChangeEmail={handleChangeEmail}
            email={user?.email || ""}
          />
          <S.CheckboxDivStyle>
            <S.SubtitleStyle htmlFor="newsletter">
              Receber e-mails com vagas?{" "}
            </S.SubtitleStyle>
            <S.CheckboxStyle
              name="newsletter"
              type="checkbox"
              checked={user?.newsletter}
              onChange={() => changeNewsletter(!user?.newsletter)}
            />
          </S.CheckboxDivStyle>
        </S.SectionSideStyle>
        <S.SectionSideStyle>
          <ChangePasswordForm
            handleModal={handleModal}
            handleChangePassword={handleChangePassword}
          />
        </S.SectionSideStyle>
      </S.SectionDivStyle>
      <NotificationModal
        isOpen={isOpen}
        onClose={handleModal}
        message={message}
      />
    </S.ContainerDivStyle>
  );
};

export default Configurations;
