//NATIVE
import React from "react";
import { useNavigate } from "react-router-dom";
//LIBRARIES

//COMPONENTS

//STYLES
import * as S from "./styles";
//UTILS
import { ApplicationShow } from "../../../services/applicationStatus/DTO";

interface CardProps {
  applications: ApplicationShow;
}

const UserHiringProcessCard: React.FC<CardProps> = ({ applications }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/user/hiring-process/${applications.id}`);
  };

  return (
    <S.InnerSliderCardStyle pointer={true} onClick={() => handleNavigate()}>
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
          <span>Etapa </span> {applications.stage}
        </div>{" "}
      </S.BaseCardContentStyle>
    </S.InnerSliderCardStyle>
  );
};

export default UserHiringProcessCard;
