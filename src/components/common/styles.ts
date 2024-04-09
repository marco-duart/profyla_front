import styled from "styled-components"

// HEADER
export const HeaderStyle = styled.header`
`

// FOOTER
export const FooterStyle = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100vw;
  height: 300px;
  background-color: ${props => props.theme.colors.lightGrey100};
`

export const FooterContentDivStyle = styled.div`
  width: 100%;
  height: 83%;
`


export const FooterEndDivStyle = styled.div`
  width: 100%;
  height: 17%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  background-color: #2D4068;
  font-family: ${props => props.theme.fontFamily.Roboto};
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.lightGrey100};
`