//NATIVE
//LIBRARIES
//COMPONENTS
//STYLES
import { Company } from "../../../services/company/DTO";
import ModalButton from "../buttons/modal-button";
import * as S from "./style";

//UTILS

interface Props {
  isOpen: boolean;
  company?: Company
  onEdit?: () => void;
  onDelete?: () => void;
  onClose: () => void;
}

const CompanyModal: React.FC<Props> = ({ isOpen, company, onEdit, onDelete, onClose, }) => {
  return (
    <S.ModalOverlay isOpen={isOpen} onClick={onClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <S.ModalHeader>
          <S.ModalTitle>Detalhes</S.ModalTitle>
          <ModalButton onClick={onClose} action="close">Fechar</ModalButton>
        </S.ModalHeader>
        <S.ModalBody>
          <p>ID: {company?.id}</p>
          <p>Nome: {company?.company_name}</p>
          <p>CNPJ: {company?.cnpj}</p>
          <p>Setor: {company?.sector}</p>
          <p>Cidade: {company?.company_location}</p>
          <p>Qtd. de funcionátios: {company?.company_size}</p>
        </S.ModalBody>
        <S.ModalActions>
          <ModalButton onClick={onEdit} action="edit">Editar</ModalButton>
          <ModalButton onClick={onDelete} action="delete">Excluir</ModalButton>
        </S.ModalActions>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};

export default CompanyModal;