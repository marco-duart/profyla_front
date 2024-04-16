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
  onClick: (company: Company) => void
}

const CompanyCard: React.FC<CardProps> = ({ company, onClick }) => {
  
  return (
    <S.CompanyCardStyle onClick={() => onClick(company)}>
      <S.CompanyCardTitleDivStyle>
        <S.CompanyCardTitleStyle>{company.company_name}</S.CompanyCardTitleStyle>
      </S.CompanyCardTitleDivStyle>
      <S.CompanyCardContentStyle>
        <div><span>CNPJ: </span> {company.cnpj}</div>
        <div><span>Cidade: </span> {company.company_location}</div>
      </S.CompanyCardContentStyle>
    </S.CompanyCardStyle>
  );
};

export default CompanyCard;
