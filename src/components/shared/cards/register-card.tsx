//NATIVE
import React, { ReactNode } from 'react';
//LIBRARIES

//COMPONENTS

//STYLES
import { RegisterCardStyle } from './styles';
//UTILS

interface CardProps {
  children: ReactNode;
}

const RegisterCard: React.FC<CardProps> = ({children}) => {
  return (
    <RegisterCardStyle>
      {children}
    </RegisterCardStyle>
  );
};

export default RegisterCard;