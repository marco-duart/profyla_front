import styled from "styled-components";

export const LoginCardStyle = styled.div`
  width: ${(props) => props.theme.widths.cards.xxl};
  height: ${(props) => props.theme.heights.cards.xxl};
  position: relative;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.radius.md};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: ${(props) => props.theme.glows.glow100};
  padding: 20px 0;
`;

export const RegisterCardStyle = styled.div`
  width: ${(props) => props.theme.widths.cards.xxl};
  height: ${(props) => props.theme.heights.cards.xxxl};
  position: relative;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.radius.md};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: ${(props) => props.theme.glows.glow100};
  padding: 20px 0;
`;
export const ForgotPasswordCardStyle = styled.div`
  width: ${(props) => props.theme.widths.cards.xxl};
  height: ${(props) => props.theme.heights.cards.xl};
  position: relative;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.radius.md};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: ${(props) => props.theme.glows.glow100};
  padding: 20px 0;
`;
export const ConfirmAccountCardStyle = styled.div`
  width: ${(props) => props.theme.widths.cards.xxxl};
  height: ${(props) => props.theme.heights.cards.lg};
  position: relative;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.radius.md};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: ${(props) => props.theme.glows.glow100};
  padding: 20px 0;
`;

//COMPANY CARD
export const CompanyCardStyle = styled.div`
  width: ${(props) => props.theme.widths.cards.lg};
  height: ${(props) => props.theme.heights.cards.lg};
  background-color: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.radius.md};
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 35px;
  box-shadow: ${(props) => props.theme.shadows.shadow100};
  padding: 20px 0;

  :hover {
    box-shadow: ${(props) => props.theme.shadows.shadow};
    transition: all 0.3s;
  }
`;

export const CompanyCardTitleDivStyle = styled.div`
  width: 100%;
  height: 30%;
  border-radius: ${(props) => props.theme.radius.header2};
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(2, 0, 36);
  background: ${props => props.theme.gradients.ibcBlue}
`;

export const CompanyCardTitleStyle = styled.h3`
  font-family: ${(props) => props.theme.fontFamily.OpenSans};
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: ${(props) => props.theme.weights.bold};
  color: ${props => props.theme.colors.white};
`;

export const CompanyCardContentStyle = styled.div`
  div {
    font-family: ${(props) => props.theme.fontFamily.OpenSans};
    font-size: ${(props) => props.theme.fontSizes.sm};
  }
  span {
    font-weight: ${(props) => props.theme.weights.bold};
  }
`;
