//NATIVE
import React from "react";
import { useNavigate } from "react-router-dom";
//LIBRARIES

//COMPONENTS

//STYLES
import * as S from "./styles";
//UTILS
import { HiringProcessShow } from "../../../services/hiring-process/DTO";

interface CardProps {
  hiringProcess: HiringProcessShow;
}

const HiringProcessCard: React.FC<CardProps> = ({ hiringProcess }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/user/jobs/${hiringProcess.id}`);
  };

  return (
    <S.InnerSliderCardStyle pointer={true} onClick={() => handleNavigate()}>
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
      </S.BaseCardContentStyle>
    </S.InnerSliderCardStyle>
  );
};

export default HiringProcessCard;
