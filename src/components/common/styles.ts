import styled from "styled-components"

// HEADER
export const HeaderStyle = styled.header`
`

// FOOTER
export const FooterStyle = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 300px;
`

export const FooterContentDivStyle = styled.div`
  width: 100%;
  height: 83%;
  padding: 50px 30px 0 30px;
  background-color: #2E466C;
  display: flex;
  justify-content: space-around;
`

export const FooterListStyle = styled.ul`
  list-style-type: none;
  display: flex;
  gap: 30px;

  span {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  h4 {
    font-family: ${props => props.theme.fontFamily.OpenSans};
    font-size: ${props => props.theme.fontSizes.sm};
    color: ${props => props.theme.colors.white};
  }
  a {
    text-decoration: none;
    font-family: ${props => props.theme.fontFamily.OpenSans};
    font-size: ${props => props.theme.fontSizes.xsm};
    color: ${props => props.theme.colors.white200};
  }
  div {
    width: 40px;
    height: 40px;
    margin-bottom: 25px;
  }
`

export const FooterEndDivStyle = styled.div`
  width: 100%;
  height: 17%;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  background-color: ${props => props.theme.colors.darkBlue200};
  font-family: ${props => props.theme.fontFamily.Roboto};
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.lightGrey100};

  span {
    display: flex;
    gap: 20px;
  }
  a{
    color: ${props => props.theme.colors.white}
  }
`