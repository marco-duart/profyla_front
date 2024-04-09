//NATIVE
import { NavLink } from "react-router-dom";
//LIBRARIES

//COMPONENTS

//STYLES
import styled from "styled-components";
//UTILS

export const SidebarNavStyle = styled("nav")<{ expanded: boolean }>`
  width: ${(props) => (props.expanded ? "320px" : "80px")};
  height: 100%;
  position: relative;
  background-color: ${(props) => props.theme.colors.white};
`;

export const SidebarStyle = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px 0px;
  padding-bottom: 100px;
`;

export const SidebarIconStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
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
    background-color: ${(props) => props.theme.colors.lightBlue100};
    color: ${(props) => props.theme.colors.black100};
  }
  &.active {
    color: ${(props) => props.theme.colors.white100};
    background-color: ${(props) => props.theme.colors.lightBlue100};
  }
`;

export const MenuStyle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 25px;
  padding-left: 20px;
  color: ${(props) => props.theme.colors.lightGrey300};
  :hover {
    color: ${(props) => props.theme.colors.black100};
  }
`;

export const FooterLink = styled(NavLink)`
  text-decoration: none;
  color: ${(props) => props.theme.colors.lightGrey300};
  :hover {
    color: ${(props) => props.theme.colors.black100};
  }
  &.active {
    color: ${(props) => props.theme.colors.black100};
  }
`;

export const ExitStyle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 0px 10px 40px;
`;

export const NameStyle = styled.h3`
  font-family: ${(props) => props.theme.fontFamily.Sora};
  cursor: pointer;
`;

export const MenuNameStyle = styled.h2`
  color: ${(props) => props.theme.colors.black100};
  font-family: ${(props) => props.theme.fontFamily.Sora};
`;

export const ExitNameStyle = styled.h2`
  font-family: ${(props) => props.theme.fontFamily.Sora};
  cursor: pointer;
`;
