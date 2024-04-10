import styled from "styled-components";

// HEADER
export const HeaderStyle = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100px;
  background-color: transparent;
`;

export const HeaderContentStyle = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  gap: 10px;
  padding-right: 20px;
  color: ${(props) => props.theme.colors.black100};
  font-family: ${(props) => props.theme.fontFamily.Sora};
  img {
    object-position: top;
    object-fit: cover;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 2px solid ${(props) => props.theme.colors.lightBlue100};
    filter: drop-shadow(0 0 8px ${(props) => props.theme.colors.darkBlue100});
  }
`;

// FOOTER
export const FooterStyle = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 300px;
  background-color: ${(props) => props.theme.colors.lightGrey100};
`;

export const FooterContentDivStyle = styled.div`
  width: 100%;
  height: 83%;
`;

export const FooterEndDivStyle = styled.div`
  width: 100%;
  height: 17%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  background-color: #2d4068;
  font-family: ${(props) => props.theme.fontFamily.Roboto};
  font-size: ${(props) => props.theme.fontSizes.sm};
  color: ${(props) => props.theme.colors.lightGrey100};
`;
