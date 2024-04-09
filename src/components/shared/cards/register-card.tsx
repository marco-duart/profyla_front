//NATIVE
import React, { ReactNode } from 'react';

//LIBRARIES
import { ArrowBack } from "@styled-icons/evaicons-solid/ArrowBack"

//COMPONENTS
import BaseIcon from '../icons/base-icon';

//STYLES
import { RegisterCardStyle } from './styles';

//UTILS

interface CardProps {
  children: ReactNode;
}

const RegisterCard: React.FC<CardProps> = ({children}) => {
  return (
    <RegisterCardStyle>
      <BaseIcon icon={ArrowBack} link='/'/>
      {children}
    </RegisterCardStyle>
  );
};

export default RegisterCard;