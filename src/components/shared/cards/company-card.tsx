//NATIVE
import React from "react";

//LIBRARIES

//COMPONENTS
import { Company } from "../../../services/company/DTO"
import CardButton from "../buttons/card-button";

//STYLES
import * as S from "./styles";

//UTILS

interface CardProps {
  company: Company;
  onDetail: (company: Company) => void
  onJob: (company: Company, page: "company" | "job") => void
}

const CompanyCard: React.FC<CardProps> = ({ company, onDetail, onJob }) => {
  
  return (
    <S.BaseCardStyle pointer={false}>
      <S.BaseCardTitleDivStyle>
        <S.BaseCardTitleStyle>{company.company_name}</S.BaseCardTitleStyle>
      </S.BaseCardTitleDivStyle>
      <S.BaseCardContentStyle>
        <div><span>CNPJ: </span> {company.cnpj}</div>
        <div><span>Cidade: </span> {company.company_location}</div>
      </S.BaseCardContentStyle>
      <S.BaseCardFooterStyle>
        <CardButton detail={true} onClick={() => onDetail(company)}>Detalhes</CardButton>
        <CardButton detail={false} onClick={() => onJob(company, "job")}>Vagas</CardButton>
      </S.BaseCardFooterStyle>
    </S.BaseCardStyle>
  );
};

export default CompanyCard;
