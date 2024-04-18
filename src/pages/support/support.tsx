import { useState } from "react";
import SupportForm from "../../components/forms/support-form";
import SupportCard from "../../components/shared/cards/support-card";
import * as S from "./styles";
import BaseIcon from "../../components/shared/icons/base-icon";
import { ArrowBack } from "@styled-icons/evaicons-solid/ArrowBack";

const Support = () => {
  const [message, setMessage] = useState("");
  const [messageScreen, setMessageScreen] = useState(false);

  const handleMessage = (message: string) => {
    setMessageScreen(true);
    setMessage(message);
  };

  return (
    <S.SupportPageStyle>
      <SupportCard>
        {messageScreen ? (
          <S.SupportDivStyle>
            <BaseIcon icon={ArrowBack} link="/user" />
            <S.BaseTitleStyle>{message}</S.BaseTitleStyle>
          </S.SupportDivStyle>
        ) : (
          <SupportForm handleMessage={handleMessage} />
        )}
      </SupportCard>
    </S.SupportPageStyle>
  );
};

export default Support;
