//NATIVE
import React, { ReactNode } from "react";

//LIBRARIES
import { ArrowBack } from "@styled-icons/evaicons-solid/ArrowBack";

//COMPONENTS

//STYLES
import { ConfirmAccountCardStyle } from "./styles";
import BaseIcon from "../icons/base-icon";

//UTILS
interface CardProps {
  children: ReactNode;
}

const ConfirmAccountCard: React.FC<CardProps> = ({ children }) => {
  return (
    <ConfirmAccountCardStyle>
      <BaseIcon icon={ArrowBack} link="/" />
      {children}
    </ConfirmAccountCardStyle>
  );
};

export default ConfirmAccountCard;
