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
    <S.CompanyCardStyle>
      <S.CompanyCardTitleDivStyle>
        <S.CompanyCardTitleStyle>{company.company_name}</S.CompanyCardTitleStyle>
      </S.CompanyCardTitleDivStyle>
      <S.CompanyCardContentStyle>
        <div><span>CNPJ: </span> {company.cnpj}</div>
        <div><span>Cidade: </span> {company.company_location}</div>
      </S.CompanyCardContentStyle>
      <S.CompanyCardFooterStyle>
        <button onClick={() => onDetail(company)}>Detalhes</button>
        <button onClick={() => onJob(company, "job")}>Vagas</button>
      </S.CompanyCardFooterStyle>
    </S.CompanyCardStyle>
  );
};

export default CompanyCard;
