//NATIVE
import React, { ReactNode } from "react";

//LIBRARIES
//COMPONENTS

//STYLES
import { FormButtonStyle } from "./styles";

//UTILS

interface Props {
  onClick?: () => void;
  children: ReactNode;
  type: "submit" | "reset";
}

const FormButton: React.FC<Props> = ({ onClick, children, type }) => {
  return (
    <FormButtonStyle type={type} onClick={onClick ? onClick : () => {}}>
      {children}
    </FormButtonStyle>
  );
};

export default FormButton;
