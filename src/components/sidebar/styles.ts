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
  background-color: ${(props) => props.theme.colors.darkBlue100};
`;

export const SidebarStyle = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px 0px;
  padding-bottom: 40px;
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
  padding-left: 10px;
  gap: 25px;
  color: ${(props) => props.theme.colors.white};
  border-radius: 10px;
  :hover {
    background-color: ${(props) => props.theme.colors.white100};
    color: ${(props) => props.theme.colors.black100};
  }
  &.active {
    color: ${(props) => props.theme.colors.black100};
    background-color: ${(props) => props.theme.colors.lightBlue100};
  }
`;

export const MenuStyle = styled.div`
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
  img {
    width: 200px;
    height: 80px;
  }
`;

export const MenuIconStyle = styled.div`
  padding: 10px 10px 10px 10px;
  border-radius: 30px;
  color: ${(props) => props.theme.colors.white};
  :hover {
    background-color: ${(props) => props.theme.colors.darkBlue200};
  }
`;
export const IconStyle = styled.div`
  padding: 0px 10px 0px 10px;
  border-radius: 10px;
`;

export const NameStyle = styled.h3`
  font-family: ${(props) => props.theme.fontFamily.Sora};
  cursor: pointer;
`;

export const MenuNameStyle = styled.h2`
  color: ${(props) => props.theme.colors.black100};
  font-family: ${(props) => props.theme.fontFamily.Sora};
`;
