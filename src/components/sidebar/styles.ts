import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const SidebarStyle = styled("nav")<{ expanded: boolean }>`
  width: ${(props) => (props.expanded ? "320px" : "80px")};
  height: 100%;
  position: relative;
  background-color: ${(props) => props.theme.colors.white};
`;

export const DivS = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px 0px;
  padding-bottom: 100px;

`;

export const Link = styled(NavLink)`

  text-decoration: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  gap: 25px;
  color: ${(props) => props.theme.colors.lightGrey300};
  :hover {
    color: ${(props) => props.theme.colors.darkBlue200};
  }
  &.active {
    color: ${(props) => props.theme.colors.darkBlue200};
    background-color: aquamarine;
  }
`;

export const Div2 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
`;
export const MenuStyle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 25px;
  padding-left: 20px;
  color: ${(props) => props.theme.colors.lightGrey300};
  :hover {
    color: ${(props) => props.theme.colors.darkBlue200};
  }
`;

export const ExitStyle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 30px;
  gap: 25px;
`;

export const NameStyle = styled.h3`
  cursor: pointer;
`;
export const NameStyle2 = styled.h2`
  cursor: pointer;
  color: ${(props) => props.theme.colors.lightGrey300};
  :hover {
    color: ${(props) => props.theme.colors.darkBlue200};
  }
`;

export const LinkPageStyle = styled(Link)`
  font-size: ${(props) => props.theme.fontSizes.lg};
`;
