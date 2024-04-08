import { useParams } from "react-router-dom";
import ConfirmAccountCard from "../../components/shared/cards/confirm-card";
import TalentflowLogo from "../../components/shared/talentflow-logo";
import * as S from "./styles";
import { ConfirmAccount } from "../../services/register";
import { useEffect } from "react";

const Confirm = () => {
  const { id, action_key } = useParams();

  useEffect(() => {
    const teste = async () => {
      if (!id || !action_key) {
        console.log(id, action_key);
        return;
      }
      const result = ConfirmAccount({ id, action_key });
    };
    teste();
  }, []);

  return (
    <>
      <S.ConfirmPageStyle>
        <ConfirmAccountCard>
          <S.TalentflowLogoStyle>
            <TalentflowLogo />
          </S.TalentflowLogoStyle>
          SUCESSO!!!
        </ConfirmAccountCard>
      </S.ConfirmPageStyle>
    </>
  );
};

export default Confirm;
