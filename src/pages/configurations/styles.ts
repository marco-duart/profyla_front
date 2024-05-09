import styled from "styled-components"

export const ContainerDivStyle = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding-left: 40px;
`

export const SectionDivStyle = styled.div`
  display: flex;

  .v1 {
    border-right: 3px solid ${props => props.theme.colors.lightGrey200};
    margin-right: 20px;
  }
`

export const SectionSideStyle = styled.div`
  width: 40%;
  min-width: 450px;
`

export const TitleStyle = styled.h2`
  font-family: ${props => props.theme.fontFamily.Poppins};
`

export const SubtitleStyle = styled.label`
  font-family: ${(props) => props.theme.fontFamily.Sora};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.weights.bold};
`;

export const CheckboxStyle = styled.input`
  all: unset;
  display: inline-block;
  cursor: pointer;
  border: 1px solid ${(props) => props.theme.colors.white200};
  width: 18px;
  height: 18px;
  border-radius: ${(props) => props.theme.radius.sm};

  &:checked {
    background-color: ${(props) => props.theme.colors.lightBlue100};
  }
  &:checked::before {
    content: "✓";
    font-size: 14px;
    color: ${(props) => props.theme.colors.white100};
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const CheckboxDivStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`