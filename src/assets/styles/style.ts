import styled from "styled-components"

export const BaseBackgroundStyle = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.white100};
  display: grid;
  place-items: center;
`