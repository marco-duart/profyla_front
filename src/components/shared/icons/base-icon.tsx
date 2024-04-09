//NATIVE
import React from "react";

//LIBRARIES
import { StyledIcon } from "@styled-icons/styled-icon";

//COMPONENTS

//STYLES
import { IconsDivStyle } from "./styles";
import { Link } from "react-router-dom";

//UTILS

type Props = {
  icon: StyledIcon;
  link?: string;
  handleClick?: () => void;
};

const BaseIcon: React.FC<Props> = (props) => {
  const { link, handleClick, ...rest } = props;
  return (
    <IconsDivStyle>
      {link && (
        <Link to={link}>
          <rest.icon />
        </Link>
      )}
      {handleClick && <rest.icon onClick={() => handleClick()} />}
    </IconsDivStyle>
  );
};

export default BaseIcon;
