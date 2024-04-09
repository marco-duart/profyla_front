import { StyledIcon } from "@styled-icons/styled-icon";
import { IconStyle } from "./styles";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
  icon: StyledIcon;
  setExpanded?: Dispatch<SetStateAction<boolean>>;
  expanded?: boolean;
};

const SideBarIcons: React.FC<Props> = (props) => {
  const { expanded, setExpanded, ...rest } = props;
  return (
    <IconStyle>
      <rest.icon onClick={() => (setExpanded && setExpanded(!expanded))} />
    </IconStyle>
  );
};

export default SideBarIcons;
