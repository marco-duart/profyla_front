//NATIVE
import { useEffect, useState } from "react";
//LIBRARIES
//COMPONENTS
import CrudButton from "../../components/shared/buttons/crud-button";
import ContentCard from "../../components/shared/cards/content-card";
import CompanyCard from "../../components/shared/cards/company-card";
import CompanyForm from "../../components/forms/company-form";
import JobCard from "../../components/shared/cards/job-card";
import JobForm from "../../components/forms/job-form";
import BaseModal from "../../components/shared/modal/base-modal";
import { useCompanyCrud } from "../../hooks/company/use-company-crud";
import { useJobPostingCrud } from "../../hooks/job/use-job-crud";
//STYLES
import * as S from "./styles";
//UTILS
import { Company } from "../../services/company/DTO";
import { JobPosting } from "../../services/job-posting/DTO";

const Cnpj = () => {
  const { companies, createCompany, updateCompany, deleteCompany } =
    useCompanyCrud();
  const {
    jobPostings,
    fetchJobPostings,
    createJobPosting,
    updateJobPosting,
    deleteJobPosting,
  } = useJobPostingCrud();

  const [company, setCompany] = useState<Company>();
  const [job, setJob] = useState<JobPosting>();
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<"company" | "job">("company");

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handlePage = (company: Company, page: "company" | "job") => {
    setCompany(company);
    setCurrentPage(page);
  };

  const handleNew = () => {
    handleModal();
  };

  const handleCompany = (company: Company) => {
    setCompany(company);
    handleModal();
  };

  const handleJob = (job: JobPosting) => {
    setJob(job);
    handleModal();
  };

  useEffect(() => {
    if (currentPage === "job" && company?.id) {
      fetchJobPostings(company.id);
    }
  }, [currentPage, company?.id, useJobPostingCrud]);

  useEffect(() => {
    if (!isOpen) {
      currentPage === "company" && setCompany(undefined);
      currentPage === "job" && setJob(undefined);
    }
  }, [isOpen]);

  return (
    <>
      {currentPage === "company" && (
        <S.CnpjContainerStyle>
          <S.CnpjButtonDivStyle>
            <CrudButton action="new" onClick={handleNew}>
              Novo
            </CrudButton>
          </S.CnpjButtonDivStyle>
          {companies?.map((company, index) => (
            <CompanyCard
              key={index}
              company={company}
              onDetail={handleCompany}
              onJob={handlePage}
            />
          ))}
        </S.CnpjContainerStyle>
      )}
      {currentPage === "job" && (
        <ContentCard title={company?.company_name} subTitle={company?.cnpj}>
          <S.CnpjButtonDivStyle>
            <CrudButton action="new" onClick={handleNew}>
              Novo
            </CrudButton>
          </S.CnpjButtonDivStyle>
          {jobPostings?.map((job, index) => (
            <JobCard key={index} job={job} onDetail={handleJob} />
          ))}
        </ContentCard>
      )}
      <BaseModal isOpen={isOpen} onClose={handleModal}>
        {currentPage === "company" ? (
          <CompanyForm
            company={company}
            isOpen={isOpen}
            onClose={handleModal}
            onCreate={createCompany}
            onDelete={deleteCompany}
            onEdit={updateCompany}
          />
        ) : (
          <JobForm
            company={company}
            job={job}
            isOpen={isOpen}
            onClose={handleModal}
            onCreate={createJobPosting}
            onDelete={deleteJobPosting}
            onEdit={updateJobPosting}
          />
        )}
      </BaseModal>
    </>
  );
};

export default Cnpj;
