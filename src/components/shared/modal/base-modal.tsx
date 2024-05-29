//NATIVE
//LIBRARIES
//COMPONENTS
//STYLES
import CrudButton from "../buttons/crud-button";
import * as S from "./style";
//UTILS
interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BaseModal: React.FC<Props> = ({ isOpen, onClose, children}) => {
  return (
    <S.ModalOverlayStyle isOpen={isOpen} onClick={onClose}>
      <S.BaseModalContainerStyle onClick={(e) => e.stopPropagation()}>
        <S.ModalHeaderStyle>
          <S.ModalTitleStyle>Detalhes</S.ModalTitleStyle>
          <CrudButton onClick={onClose} action="close">X</CrudButton>
        </S.ModalHeaderStyle>
        <S.ModalBodyStyle>
          {children}
        </S.ModalBodyStyle>
      </S.BaseModalContainerStyle>
    </S.ModalOverlayStyle>
  );
};

export default BaseModal;