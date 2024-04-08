//NATIVE

//LIBRARIES

//COMPONENTS
import RegisterForm from "../../components/forms/register-form";
import RegisterCard from "../../components/shared/cards/register-card";
import TalentflowLogo from "../../components/shared/talentflow-logo";

//STYLES
import * as S from "./styles";

//UTILS

const Register = () => {
  return (
    <>
      <S.RegisterPageStyle>
        <RegisterCard>
          <S.TalentflowLogoStyle>
            <TalentflowLogo />
          </S.TalentflowLogoStyle>
          <RegisterForm />
        </RegisterCard>
      </S.RegisterPageStyle>
    </>
  );
};

export default Register