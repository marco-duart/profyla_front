import styled from "styled-components";

export const ModalOverlay = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContainer = styled.div`
  position: fixed;
  width: ${(props) => props.theme.widths.forms.md};
  height: ${(props) => props.theme.heights.forms.md};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.radius.md};
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.div`
  width: 100%;
  height: 70px;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgb(2, 0, 36);
  background: ${(props) => props.theme.gradients.ibcBlue};
  border-radius: ${(props) => props.theme.radius.header2};
`;

export const ModalTitle = styled.h2`
  font-family: ${(props) => props.theme.fontFamily.OpenSans};
  font-size: ${(props) => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.white100};
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-family: ${(props) => props.theme.fontFamily.OpenSans};
  font-size: ${(props) => props.theme.fontSizes.sm};
  padding: 30px 30px 0 30px;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 15px;
  padding: 0 30px;
`;
