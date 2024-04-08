import ForgotPasswordCard from "../../components/shared/cards/forgotpassword-card";
import ForgotPasswordForm from "../../components/forms/forgotpassword-form";
import TalentflowLogo from "../../components/shared/talentflow-logo";
import * as S from "./styles";

const ForgotPassword = () => {
  return (
    <>
      <S.ForgotPageStyle>
        <ForgotPasswordCard>
          <S.TalentflowLogoStyle>
            <TalentflowLogo />
          </S.TalentflowLogoStyle>
          <ForgotPasswordForm />
        </ForgotPasswordCard>
      </S.ForgotPageStyle>
    </>
  );
};

export default ForgotPassword;
