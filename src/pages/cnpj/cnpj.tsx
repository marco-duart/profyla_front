//NATIVE
import { useState } from "react";
//LIBRARIES
//COMPONENTS
import CompanyCard from "../../components/shared/cards/company-card";
import CompanyModal from "../../components/shared/modal/company-modal"
import { useFetchCompanies } from "../../hooks/company/use-fetch-companies";
import { useUserContext } from "../../hooks/use-user-context";
import { Company } from "../../services/company/DTO";
//STYLES
import * as S from "./style"
//UTILS

const Cnpj = () => {
  const { token } = useUserContext()
  const { companies } = useFetchCompanies({token})
  const [ isOpen, setIsOpen ] = useState(false)
  const [ company, setCompany ] = useState<Company>()

  const handleCompany = (company: Company) => {
    setCompany(company)
    handleModal()
  }

  const handleModal = () => {
    setIsOpen(!isOpen)
  }

  return (
   <S.CnpjContainerStyle>
     {
        companies?.map((company, index) => <CompanyCard key={index} company={company} onClick={handleCompany}/>)
     }
     <CompanyModal isOpen={isOpen} company={company} onClose={handleModal}/>
   </S.CnpjContainerStyle>
  )
};

export default Cnpj;
