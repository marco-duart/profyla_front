//NATIVE
import { useEffect, useState } from "react";
//LIBRARIES
//COMPONENTS
import CompanyCard from "../../components/shared/cards/company-card";
import CompanyModal from "../../components/shared/modal/company-modal";
import { useCompanyCrud } from "../../hooks/company/use-company-crud";
import { useJobPostingCrud } from "../../hooks/job/use-job-crud";

//STYLES
import * as S from "./style";
//UTILS
import { Company } from "../../services/company/DTO";
import CrudButton from "../../components/shared/buttons/crud-button";

const Cnpj = () => {
  const { companies, createCompany, updateCompany, deleteCompany } = useCompanyCrud();
  const [company, setCompany] = useState<Company>();

  const { jobPostings } = useJobPostingCrud(2)

  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<"company" | "job">("company");

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handlePage = (company: Company, page: "company" | "job") => {
    console.log(jobPostings)
    setCompany(company);
    setCurrentPage(page)
  }

  const handleNewCompany = () => {
    handleModal()
  }

  const handleCompany = (company: Company) => {
    setCompany(company);
    handleModal();
  };

  useEffect(() => {
    if(!isOpen) {
      setCompany(undefined);
    }
  }, [isOpen])

  return (
    <>
      {currentPage === "company" && (
        <S.CnpjContainerStyle>
          <S.CnpjButtonDivStyle>
            <CrudButton action="new" onClick={handleNewCompany}>Novo</CrudButton>
          </S.CnpjButtonDivStyle>
          {companies?.map((company, index) => (
            <CompanyCard
              key={index}
              company={company}
              onDetail={handleCompany}
              onJob={handlePage}
              
            />
          ))}
          <CompanyModal
            isOpen={isOpen}
            company={company}
            onClose={handleModal}
            onCreate={createCompany}
            onEdit={updateCompany}
            onDelete={deleteCompany}
          />
        </S.CnpjContainerStyle>
      )}
      {currentPage === "job" && (
        <S.CnpjContainerStyle>
          {jobPostings?.map((job, index) => (
            <div key={index}>
              {job.title}
            </div>
          ))}
        </S.CnpjContainerStyle>
      )}
    </>
  );
};

export default Cnpj;
