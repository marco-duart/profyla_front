//NATIVE
import React from "react";

//LIBRARIES

//COMPONENTS
import { Company } from "../../../services/company/DTO"

//STYLES
import { CompanyCardStyle } from "./styles";

//UTILS

interface CardProps {
  company: Company;
}

const ConfirmAccountCard: React.FC<CardProps> = ({ company }) => {
  
  return (
    <CompanyCardStyle>
      <div>{company.company_name}</div>
      <div>{company.cnpj}</div>
      <div>{company.company_location}</div>
    </CompanyCardStyle>
  );
};

export default ConfirmAccountCard;
