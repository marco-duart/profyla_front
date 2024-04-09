import styled from "styled-components";
import backgroundImage from '../../assets/image/BG.jpg'

export const BaseLayoutPageStyled = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-image: url(${backgroundImage});
  background-position: 50% 0;
`;


export const BaseLayoutSidebarStyled = styled.div`
  display: flex;
`;

export const BaseLayoutDivStyled = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

`;

export const IcoSidebarDivStyled = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;
