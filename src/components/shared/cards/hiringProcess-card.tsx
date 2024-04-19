import React from "react";

// import { HiringProcessDetail } from "../../../services/hiringProcess/DTO";

import * as S from "./styles";

// interface CardProps {
//   hiringProcess: HiringProcessDetail;
// }

const HiringProcessCard = () => {
  return (
    <S.BaseCardStyle pointer={true}>
      <S.BaseCardTitleDivStyle>
        <S.BaseCardTitleStyle>Vaga 1</S.BaseCardTitleStyle>
      </S.BaseCardTitleDivStyle>
      <S.BaseCardContentStyle>
        <div>
          <span>Empresa </span> X
        </div>{" "}
        <div>
          <span>Salário</span> Y
        </div>{" "}
        <div>
          <span>Status: </span> OK
        </div>
        <div>
            <button >Detalhes</button>
        </div>
      </S.BaseCardContentStyle>
    </S.BaseCardStyle>
  );
};

export default HiringProcessCard;
