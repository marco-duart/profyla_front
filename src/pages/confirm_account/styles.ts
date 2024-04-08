import styled from "styled-components";
import backgroundImage from "../../assets/image/BG.jpg";

export const ConfirmPageStyle = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background-image: url(${backgroundImage});
  background-position: 50% 0;
  display: grid;
  place-items: center;
`;

export const TalentflowLogoStyle = styled.div`
  position: absolute;
  width: 200px;
  left: 50%;
  margin-left: -275px;
  top: -150px;
`;

export const BaseTitleFormStyle = styled.h1`
  width: 100%;
  margin-bottom: 15px;
  text-align: center;
  font-family: ${(props) => props.theme.fontFamily.Sora};
  margin-bottom: 20px;
`;
