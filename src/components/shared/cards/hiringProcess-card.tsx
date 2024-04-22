import React from "react";

import { HiringProcessShow } from "../../../services/hiringProcess/DTO";

import * as S from "./styles";

interface CardProps {
  hiringProcess: HiringProcessShow;
}

const HiringProcessCard: React.FC<CardProps> = ({ hiringProcess }) => {

  return (
    <S.BaseCardStyle pointer={true}>
      <S.BaseCardTitleDivStyle>
        <S.BaseCardTitleStyle>{hiringProcess.title}</S.BaseCardTitleStyle>
      </S.BaseCardTitleDivStyle>
      <S.BaseCardContentStyle>
        <div>
          <span>Empresa </span> {hiringProcess.business_name}
        </div>{" "}
        <div>
          <span>Salário</span> {hiringProcess.salary}
        </div>{" "}
        <div>
          <span>Status: </span> {hiringProcess.status}
        </div>
        <div>
            <button >Detalhes</button>
        </div>
      </S.BaseCardContentStyle>
    </S.BaseCardStyle>
  );
};

export default HiringProcessCard;
