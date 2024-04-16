import styled from "styled-components";

export const BaseButtonStyle = styled.button`
  width: ${(props) => props.theme.widths.buttons.xxxl};
  height: ${(props) => props.theme.heights.buttons.sm};
  background-color: ${(props) => props.theme.colors.lightBlue100};
  border: none;
  border-radius: ${(props) => props.theme.radius.xl};
  color: ${(props) => props.theme.colors.black100};
  font-family: ${(props) => props.theme.fontFamily.Sora};
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: ${props => props.theme.weights.black};
  cursor: pointer;

  :hover {
    color: ${(props) => props.theme.colors.white};
  }
`;

export const ModalButtonStyle = styled('button')<{ action: "close" | "edit" | "delete" | "cancel"}>`
  width: ${(props) => props.action === "close" ? props.theme.widths.buttons.close : props.theme.widths.buttons.sm};
  height: ${(props) => props.action === "close" ? props.theme.heights.buttons.close : props.theme.heights.buttons.xsm};

  background-color: ${(props) => {
    switch (props.action) {
      case "close": return props.theme.colors.lightGrey300;
      case "delete": return props.theme.colors.lightRed100;
      case "edit": return props.theme.colors.lightBlue100;
      case "cancel": return props.theme.colors.lightGrey300;
    }
  }};

  border: none;
  border-radius: ${(props) => props.theme.radius.xl};
  color: ${(props) => props.theme.colors.white};
  font-family: ${(props) => props.theme.fontFamily.Sora};
  font-size: ${(props) => props.theme.fontSizes.xsm};
  cursor: pointer;
`;