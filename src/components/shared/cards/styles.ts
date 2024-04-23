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


//BASE CARD
export const BaseCardStyle = styled("div")<{ pointer: boolean}>`
  width: ${(props) => props.theme.widths.cards.xl};
  height: ${(props) => props.theme.heights.cards.md};
  background-color: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.radius.md};
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: ${(props) => props.theme.shadows.shadow};
  padding: 30px 0 0 0;
  cursor: ${props => props.pointer ? "pointer" : "default" };
  :hover {
    box-shadow: ${(props) => props.theme.glows.glow100};
    transition: all 0.3s;
  }
`;

export const BaseCardTitleDivStyle = styled.div`
  width: 100%;
  height: 30%;
  border-radius: ${(props) => props.theme.radius.header2};
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(2, 0, 36);
  background: ${(props) => props.theme.gradients.ibcBlue};
`;

export const BaseCardTitleStyle = styled.h3`
  font-family: ${(props) => props.theme.fontFamily.OpenSans};
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: ${(props) => props.theme.weights.bold};
  color: ${(props) => props.theme.colors.white};
`;

export const BaseCardContentStyle = styled.div`
  div {
    font-family: ${(props) => props.theme.fontFamily.OpenSans};
    font-size: ${(props) => props.theme.fontSizes.sm};
  }
  span {
    font-weight: ${(props) => props.theme.weights.bold};
  }
`;

export const BaseCardFooterStyle = styled.div`
  display: flex;
  gap: 10px;
  position: absolute;
  bottom: 20px;
  button {
    width: ${(props) => props.theme.widths.buttons.sm};
    height: ${(props) => props.theme.heights.buttons.xsm};
    border: none;
    border-radius: ${(props) => props.theme.radius.xl};
    color: ${(props) => props.theme.colors.white};
    font-family: ${(props) => props.theme.fontFamily.Sora};
    font-size: ${(props) => props.theme.fontSizes.xsm};
    cursor: pointer;
  }
`;

//CONTENT CARD

export const ContentCardStyle = styled.div`
  width: 95%;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.radius.md};
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: ${(props) => props.theme.shadows.shadow};
`;

export const ContentCardHeader = styled.div`
  width: 100%;
  height: 130px;
  padding: 0 30px;
  background-image: ${props => props.theme.gradients.ibcBlue};
  border-radius: ${props => props.theme.radius.header2};
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
  color: ${props => props.theme.colors.white100};
  font-family: ${props => props.theme.fontFamily.OpenSans};
`

export const ContentCardBody = styled.div`
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 30px 0;
`
//HOME CARD
export const WelcomeHomeCardStyle = styled.div`
  max-width: ${props => props.theme.widths.cards.xxxl};
  min-width: 35%;
  height: ${props => props.theme.heights.cards.xl};
  position: absolute;
  top: 80px;
  left: 40px;
  background-color: ${props => props.theme.colors.lightBlue100};
  border-radius: ${props => props.theme.radius.md};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`
export const JobsCardStyle = styled.div`
  width: ${props => props.theme.widths.cards.xl};
  height: 300px;
  background-color: ${props => props.theme.colors.white100};
  box-shadow: 5px 10px 15px 5px rgba(0.2,0.2,0.2,0.2);
  border-radius: ${props => props.theme.radius.md};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const CardContentStyle = styled.div`
    width: calc(100% + 30px); //we need more width for the shadows on the edges
    padding: 10px 40px; //space for the shadows
    overflow: hidden; //hide the overflow
`
export const HiringProcessCardStyle = styled.div`
  max-width: 800px;
  min-width: 59%;
  height: ${props => props.theme.heights.cards.xl};
  position: absolute;
  top: 80px;
  right: 40px;
  background-color: ${props => props.theme.colors.white100};
  border-radius: ${props => props.theme.radius.md};
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 5px 10px 15px 5px rgba(0.2,0.2,0.2,0.2);
  padding: 20px 0;
`

export const ApplicationCardStyle = styled.div`
  max-width: 1760px;
  min-width: 80%;
  height: ${props => props.theme.heights.cards.xxl};
  position: absolute;
  bottom: 0px;
  left: 40px;
  right: 40px;
  background-color: ${props => props.theme.colors.white100};
  border-radius: ${props => props.theme.radius.md};
  display: flex;
  box-shadow: 10px 10px 10px 10px rgba(0.2,0.2,0.2,0.2);
  padding: 80px 0;
`

export const HeaderCardStyle = styled.div`
width: 100%;
height: 80px;
position: absolute;
top: 0;
border-radius: 10px 10px 0px 0px;
background-image: ${props => props.theme.gradients.ibcBlue};
`

export const BaseTitleStyle = styled.h1`
  width: 100%;
  margin-top: 18px;
  text-align: center;
  font-family: ${(props) => props.theme.fontFamily.Sora};
  color: ${(props) => props.theme.colors.white};
`;
// background-color: ${(props) =>
// props.action === "detail"
// ? props.theme.colors.lightGrey300
// : props.theme.colors.lightBlue100};