import React from "react";

import { HiringProcessShow } from "../../../services/hiringProcess/DTO";
import { ApplicationShow } from "../../../services/applicationStatus/DTO";

import * as S from "./styles";

interface CardProps {
  applications: ApplicationShow;
}

const UserHiringProcessCard: React.FC<CardProps> = ({ applications }) => {
  return (
    <S.BaseCardStyle pointer={true}>
      <S.BaseCardTitleDivStyle>
        <S.BaseCardTitleStyle>{applications.title}</S.BaseCardTitleStyle>
      </S.BaseCardTitleDivStyle>
      <S.BaseCardContentStyle>
        <div>
          <span>Empresa </span> {applications.business_name}
        </div>{" "}       
         <div>      
          <span>Status </span> {applications.status}
        </div>{" "}       
         <div>
          <span>Salário </span> {applications.salary}
        </div>{" "}       
         <div>
          <span>Estágio </span> {applications.stage}
        </div>{" "}
      </S.BaseCardContentStyle>
    </S.BaseCardStyle>
  );
};

export default UserHiringProcessCard;