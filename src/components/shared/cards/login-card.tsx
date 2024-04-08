//NATIVE
import React, { ReactNode } from 'react';
//LIBRARIES

//COMPONENTS

//STYLES
import * as S from './styles';
//UTILS

interface CardProps {
  children: ReactNode;
}

const LoginCard: React.FC<CardProps> = ({children}) => {
  return (
    <S.LoginCardStyle>
      {children}
    </S.LoginCardStyle>
  );
};

export default LoginCard;