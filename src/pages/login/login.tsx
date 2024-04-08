//NATIVE

//LIBRARIES

//COMPONENTS
import LoginForm from "../../components/forms/login-form";
import LoginCard from "../../components/shared/cards/login-card";
import TalentflowLogo from "../../components/shared/talentflow-logo";

//STYLES
import * as S from "./styles";

//UTILS

const Login = () => {
  return (
    <>
      <S.LoginPageStyle>
        <LoginCard>
          <S.TalentflowLogoStyle>
            <TalentflowLogo />
          </S.TalentflowLogoStyle>
          <LoginForm />
          <S.FooterLoginPageStyle>
            <small>Não tem cadastro?</small>
            <div>
              <S.LinkLoginPageStyle to="/register">Cadastre-se aqui</S.LinkLoginPageStyle> | <S.LinkLoginPageStyle to="/forgot-password">Esqueci a senha</S.LinkLoginPageStyle>
            </div>
          </S.FooterLoginPageStyle>
        </LoginCard>
      </S.LoginPageStyle>
    </>
  );
};

export default Login