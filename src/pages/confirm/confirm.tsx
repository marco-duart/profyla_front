//NATIVE
import { useEffect, useState } from "react";
//LIBRARIES
import { useParams } from "react-router-dom";
//COMPONENTS
import { ConfirmAccount } from "../../services/register";
import ConfirmAccountCard from "../../components/shared/cards/confirm-card";
import TalentflowLogo from "../../components/shared/talentflow-logo";
//STYLES
import * as S from "./styles";
//UTILS
import { EXCEPTION_MESSAGE } from "../../utils/enums/exception-message";
import { SUCCESSFUL_MESSAGE } from "../../utils/enums/successful-message";

const Confirm = () => {
  const { id, action_key } = useParams();
  const [ message, setMessage ] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      if (!id || !action_key) {
        handleMessage(EXCEPTION_MESSAGE.INVALID_PARAMS_FETCH)
        return;
      }
      const result = await ConfirmAccount({ id, action_key });

      if(result.success) {
        handleMessage(SUCCESSFUL_MESSAGE.ACCOUNT_CONFIRMED)
        return
      }

      handleMessage(EXCEPTION_MESSAGE.CONFIRM_ACCOUNT_FAILED)
    };
    fetchData();
  }, []);

  const handleMessage = (message: string) => {
    setMessage(message)
  }

  return (
    <>
      <S.ConfirmPageStyle>
        <ConfirmAccountCard>
          <S.TalentflowLogoStyle>
            <TalentflowLogo />
          </S.TalentflowLogoStyle>
          <S.BaseTitleFormStyle>
            {message}
          </S.BaseTitleFormStyle>
        </ConfirmAccountCard>
      </S.ConfirmPageStyle>
    </>
  );
};

export default Confirm;
