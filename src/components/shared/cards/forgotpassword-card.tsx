//NATIVE
import React, { ReactNode } from "react";

//LIBRARIES
import { ArrowBack } from "@styled-icons/evaicons-solid/ArrowBack"

//COMPONENTS
import BaseIcon from "../icons/base-icon";

//STYLES
import { ForgotPasswordCardStyle } from "./styles";

//UTILS

interface CardProps {
  children: ReactNode;
}

const ForgotPasswordCard: React.FC<CardProps> = ({ children }) => {
  return (
    <ForgotPasswordCardStyle>
      <BaseIcon icon={ArrowBack} link="/" />
      {children}
    </ForgotPasswordCardStyle>
  );
};

export default ForgotPasswordCard;
