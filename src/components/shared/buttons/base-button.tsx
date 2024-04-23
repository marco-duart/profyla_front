//NATIVE
import React, { ReactNode } from "react";

//LIBRARIES
//COMPONENTS

//STYLES
import { BaseButtonStyle } from "./styles";

//UTILS

interface Props {
  onClick?: () => void;
  children: ReactNode;
  type: "button" | "submit" | "reset";
}

const BaseButton: React.FC<Props> = ({ onClick, children, type }) => {
  return (
    <BaseButtonStyle type={type} onClick={onClick ? onClick : () => {}}>
      {children}
    </BaseButtonStyle>
  );
};

export default BaseButton;
