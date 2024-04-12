import styled from "styled-components";

export const BaseLayoutPageStyled = styled.div`
  display: flex;
  width: 100vw;
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

export const BaseBackgroundStyle = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.white100};
`;
