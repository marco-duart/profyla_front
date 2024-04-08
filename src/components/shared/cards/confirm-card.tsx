import React, { ReactNode } from "react";
import { ConfirmAccountCardStyle } from "./styles";

interface CardProps {
  children: ReactNode;
}

const ConfirmAccountCard: React.FC<CardProps> = ({ children }) => {
  return <ConfirmAccountCardStyle>{children}</ConfirmAccountCardStyle>;
};

export default ConfirmAccountCard;
