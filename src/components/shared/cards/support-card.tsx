//NATIVE
import React, { ReactNode } from "react";

//LIBRARIES

//COMPONENTS

//STYLES
import { SupportCardStyle } from "./styles";

//UTILS
interface CardProps {
  children: ReactNode;
}

const SupportCard: React.FC<CardProps> = ({ children }) => {
  return <SupportCardStyle>{children}</SupportCardStyle>;
};

export default SupportCard;
