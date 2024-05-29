import styled from "styled-components"

export const DropzoneDivStyle = styled.div`
  width: 100px;
  height: 100px;
  display: grid;
  place-items: center;
  border: solid 3px ${props => props.theme.colors.lightBlue100};
  border-radius: 50%;
`

export const ImgStyle = styled.img`
  width: 95px;
  height: 95px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
`