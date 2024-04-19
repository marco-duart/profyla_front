//NATIVE
import React, { ReactNode } from 'react';

//LIBRARIES
//COMPONENTS
//STYLES
import { CardButtonStyle } from './styles';
//UTILS

interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
  detail: boolean
}

const CardButton: React.FC<ButtonProps> = ({ onClick, children, detail }) => {
  return (
    <CardButtonStyle type="button" detail={detail} onClick={onClick? onClick : () => {}}>
      {children}
    </CardButtonStyle>
  );
};

export default CardButton;