//NATIVE
//LIBRARIES
//COMPONENTS
//STYLES
import { Company } from "../../../services/company/DTO";
import CompanyForm from "../../forms/company-form";
import CrudButton from "../buttons/crud-button";
import * as S from "./style";

//UTILS
import { CreateCompanyData, DeleteCompanyData, UpdateCompanyData, useCompanyCrud } from "../../../hooks/company/use-company-crud"

interface Props {
  isOpen: boolean;
  company?: Company
  onDelete: (params: DeleteCompanyData) => void;
  onEdit: (params: UpdateCompanyData) => void;
  onCreate: (params: CreateCompanyData) => void;
  onClose: () => void;
}

const CompanyModal: React.FC<Props> = ({ isOpen, company, onClose, onCreate, onDelete, onEdit}) => {


  return (
    <S.ModalOverlay isOpen={isOpen} onClick={onClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <S.ModalHeader>
          <S.ModalTitle>Detalhes</S.ModalTitle>
          <CrudButton onClick={onClose} action="close">X</CrudButton>
        </S.ModalHeader>
        <S.ModalBody>
          <CompanyForm company={company} onClose={onClose} onCreate={onCreate} onDelete={onDelete} onEdit={onEdit}/>
        </S.ModalBody>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};

export default CompanyModal;