import React, { ReactNode } from "react";
import { ForgotPasswordCardStyle } from "./styles";

interface CardProps {
  children: ReactNode;
}

const ForgotPasswordCard: React.FC<CardProps> = ({ children }) => {
  return <ForgotPasswordCardStyle>{children}</ForgotPasswordCardStyle>;
};

export default ForgotPasswordCard;
