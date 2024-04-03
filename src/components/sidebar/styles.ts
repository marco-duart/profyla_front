import styled from "styled-components";

export const SidebarStyle = styled('nav')<{expanded:boolean}>`
  width: ${(props) => props.expanded ? props.theme.widths.cards.xl : "80px"};
  height: 100%;
  position: relative;
  background-color: ${(props) => props.theme.colors.white};

`;

export const DivS = styled.div`
height: 100%;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: flex-start;
padding: 20px 20px;
padding-bottom: 100px;
`;

export const MenuStyle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 25px;
`;

export const ExitStyle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 30px;
  gap: 25px;
`;
export const IconStyle = styled.div`
cursor: pointer;
width: 40px;
height: 40px;
`;
