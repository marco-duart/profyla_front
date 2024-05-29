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
  message: string;
}

const NotificationModal: React.FC<Props> = ({ isOpen, onClose, message }) => {
  return (
    <S.ModalOverlayStyle isOpen={isOpen} onClick={onClose}>
      <S.NotificationModalContainerStyle onClick={(e) => e.stopPropagation()}>
        <S.ModalHeaderStyle>
          <CrudButton onClick={onClose} action="close">X</CrudButton>
        </S.ModalHeaderStyle>
        <S.ModalBodyStyle>
          {message}
        </S.ModalBodyStyle>
      </S.NotificationModalContainerStyle>
    </S.ModalOverlayStyle>
  );
};

export default NotificationModal;