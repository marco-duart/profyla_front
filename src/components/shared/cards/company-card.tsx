//NATIVE
import React from "react";

//LIBRARIES

//COMPONENTS
import { Company } from "../../../services/company/DTO"

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
    <S.BaseCardStyle>
      <S.BaseCardTitleDivStyle>
        <S.BaseCardTitleStyle>{company.company_name}</S.BaseCardTitleStyle>
      </S.BaseCardTitleDivStyle>
      <S.BaseCardContentStyle>
        <div><span>CNPJ: </span> {company.cnpj}</div>
        <div><span>Cidade: </span> {company.company_location}</div>
      </S.BaseCardContentStyle>
      <S.BaseCardFooterStyle>
        <button onClick={() => onDetail(company)}>Detalhes</button>
        <button onClick={() => onJob(company, "job")}>Vagas</button>
      </S.BaseCardFooterStyle>
    </S.BaseCardStyle>
  );
};

export default CompanyCard;
