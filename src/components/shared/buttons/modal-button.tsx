//NATIVE
import React, { ReactNode } from 'react';

//LIBRARIES
//COMPONENTS

//STYLES
import { ModalButtonStyle } from './styles';

//UTILS

interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
  action: "close" | "edit" | "delete"
}

const ModalButton: React.FC<ButtonProps> = ({ onClick, children, action }) => {
  return (
    <ModalButtonStyle action={action} onClick={onClick? onClick : () => {}}>
      {children}
    </ModalButtonStyle>
  );
};

export default ModalButton;