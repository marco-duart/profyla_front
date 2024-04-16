//NATIVE
import { useState } from "react";
//LIBRARIES
//COMPONENTS
import CompanyCard from "../../components/shared/cards/company-card";
import CompanyModal from "../../components/shared/modal/company-modal";
import { useFetchCompanies } from "../../hooks/company/use-fetch-companies";

//STYLES
import * as S from "./style";
//UTILS
import { Company } from "../../services/company/DTO";

const Cnpj = () => {
  const { companies } = useFetchCompanies();
  const [isOpen, setIsOpen] = useState(false);
  const [company, setCompany] = useState<Company>();
  const [currentPage, setCurrentPage] = useState<"company" | "job">("company");

  const handleCompany = (company: Company) => {
    setCompany(company);
    handleModal();
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {currentPage === "company" && (
        <S.CnpjContainerStyle>
          {companies?.map((company, index) => (
            <CompanyCard
              key={index}
              company={company}
              onClick={handleCompany}
            />
          ))}
          <CompanyModal
            isOpen={isOpen}
            company={company}
            onClose={handleModal}
          />
        </S.CnpjContainerStyle>
      )}
      {currentPage === "job" && (
        <S.CnpjContainerStyle>
          Listagem de Jobs
        </S.CnpjContainerStyle>
      )}
    </>
  );
};

export default Cnpj;
