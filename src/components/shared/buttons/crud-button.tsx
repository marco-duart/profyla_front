//NATIVE
import React, { ReactNode } from 'react';

//LIBRARIES
//COMPONENTS

//STYLES
import { CrudButtonStyle } from './styles';

//UTILS

interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
  action: "close" | "edit" | "delete" | "cancel" | "new" | "save";
  type?: "submit" | "reset"
}

const CrudButton: React.FC<ButtonProps> = ({ onClick, children, action, type }) => {
  return (
    <CrudButtonStyle type={type || "button"} action={action} onClick={onClick? onClick : () => {}}>
      {children}
    </CrudButtonStyle>
  );
};

export default CrudButton;