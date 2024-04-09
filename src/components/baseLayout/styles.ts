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
  width: 100%;
  padding: 25px;
  display: flex;
  flex-direction: column;
`;

export const IcoSidebarDivStyled = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;
