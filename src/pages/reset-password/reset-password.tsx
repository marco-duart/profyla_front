//NATIVE
import { useEffect, useState } from "react";
//LIBRARIES
import { useParams } from "react-router-dom";
//COMPONENTS
import ForgotPasswordCard from "../../components/shared/cards/forgotpassword-card";
import ResetPasswordForm from "../../components/forms/reset-password-form";
import TalentflowLogo from "../../components/shared/talentflow-logo";
//STYLES
import * as S from "./styles";
//UTILS
import { EXCEPTION_MESSAGE } from "../../utils/enums/exception-message";

const ResetPassword = () => {
  const { id, action_key } = useParams();
  const [ message, setMessage ] = useState("")
  const [ messageScreen, setMessageScreen ] = useState(false)

  const handleMessage = (message: string) => {
    setMessageScreen(true)
    setMessage(message)
  }

  useEffect(() => {
    if(!id || !action_key) {
      handleMessage(EXCEPTION_MESSAGE.INVALID_PARAMS_FETCH)
    }
  }, [])

  return (
    <>
      <S.ResetPasswordPageStyle>
        <ForgotPasswordCard>
          <S.TalentflowLogoStyle>
            <TalentflowLogo />
          </S.TalentflowLogoStyle>
          {messageScreen ? <S.BaseTitleStyle>{message}</S.BaseTitleStyle> : <ResetPasswordForm id={id} action_key={action_key} handleMessage={handleMessage} />}
        </ForgotPasswordCard>
      </S.ResetPasswordPageStyle>
    </>
  );
};

export default ResetPassword;
