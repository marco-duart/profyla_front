//NATIVE
//LIBRARIES
//COMPONENTS
//STYLES
import { useEffect, useState } from "react";
import { Company } from "../../../services/company/DTO";
import CompanyForm from "../../forms/company-form";
import ModalButton from "../buttons/modal-button";
import * as S from "./style";

//UTILS

interface Props {
  isOpen: boolean;
  company?: Company
  onDelete?: () => void;
  onClose: () => void;
}

const CompanyModal: React.FC<Props> = ({ isOpen, company, onDelete, onClose, }) => {
  const [ disabled, setDisabled ] = useState<boolean>(company ? true : false)

  // Disable input when action is view
  const handleDisableInput = () => {
    setDisabled(!disabled)
  }

  useEffect(() => {
    if(company) {
      setDisabled(true)
    }
  }, [company])

  return (
    <S.ModalOverlay isOpen={isOpen} onClick={onClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <S.ModalHeader>
          <S.ModalTitle>Detalhes</S.ModalTitle>
          <ModalButton onClick={onClose} action="close">X</ModalButton>
        </S.ModalHeader>
        <S.ModalBody>
          <CompanyForm company={company} disabled={disabled} handleDisableInput={handleDisableInput}/>
        </S.ModalBody>
        <S.ModalActions>
          {disabled ? <ModalButton onClick={handleDisableInput} action="edit">Editar</ModalButton> : <ModalButton onClick={handleDisableInput} action="cancel">Cancelar</ModalButton>}
          {company && <ModalButton onClick={onDelete} action="delete">Excluir</ModalButton>}
        </S.ModalActions>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};

export default CompanyModal;