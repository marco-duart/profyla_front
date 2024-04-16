//NATIVE
import { useUserContext } from "../../hooks/use-user-context";
import TalentflowLogo from "../shared/talentflow-logo";
//LIBRARIES

//COMPONENTS

//STYLES
import * as S from "./styles";
//UTILS

const Header = () => {
  const { user } = useUserContext();
  const abrev = user ? user.name.split(" ") : "";
  const nome = abrev[0].concat(" ", abrev[1]);
  return (
    <S.HeaderStyle>
      <S.HeaderContentStyle>
        <h3>{nome}</h3>
        <img src={user?.photo_url} />
      </S.HeaderContentStyle>
    </S.HeaderStyle>
  );
};

export default Header;
