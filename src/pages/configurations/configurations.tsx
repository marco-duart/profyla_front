import { useUserConfiguration } from "../../hooks/user/use-user-configuration";
import * as S from "./styles";
import PhotoDropzone from "../../components/photo-dropzone/photo-dropzone";
import ChangeEmailForm from "../../components/forms/change-email-form";
import UserInfoForm from "../../components/forms/user-info-form";
import ChangePasswordForm from "../../components/forms/change-password-form";

const Configurations = () => {
  const { user, changeNewsletter } = useUserConfiguration();

  return (
    <S.ContainerDivStyle>
      <S.TitleStyle>Configurações da Conta</S.TitleStyle>
      <PhotoDropzone userPhotoUrl={user?.photo_url || ""} />
      <S.SectionDivStyle>
        <S.SectionSideStyle className="v1">
          <UserInfoForm name={user?.name || ""} cpf={user?.cpf || ""} />
          <ChangeEmailForm email={user?.email || ""} />
          <S.CheckboxDivStyle>
            <S.SubtitleStyle htmlFor="">
              Receber e-mails com vagas?{" "}
            </S.SubtitleStyle>
            <S.CheckboxStyle
              type="checkbox"
              checked={user?.newsletter}
              onChange={() => changeNewsletter(!user?.newsletter)}
            />
          </S.CheckboxDivStyle>
        </S.SectionSideStyle>
        <S.SectionSideStyle>
          <ChangePasswordForm />
        </S.SectionSideStyle>
      </S.SectionDivStyle>
    </S.ContainerDivStyle>
  );
};

export default Configurations;
