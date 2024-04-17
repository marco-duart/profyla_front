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
  action: "close" | "edit" | "delete" | "cancel" | "new"
}

const CrudButton: React.FC<ButtonProps> = ({ onClick, children, action }) => {
  return (
    <CrudButtonStyle type="button" action={action} onClick={onClick? onClick : () => {}}>
      {children}
    </CrudButtonStyle>
  );
};

export default CrudButton;