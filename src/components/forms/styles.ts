import styled from "styled-components";

export const LoginFormStyle = styled.form`
  width: ${(props) => props.theme.widths.forms.xsm};
  height: ${(props) => props.theme.heights.forms.sm};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 20px;
  gap: 10px;

  .first-section {
    height: 65px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .second-section {
    display: flex;
    flex-direction: row-reverse;
    justify-content: start;
    align-items: center;
    gap: 10px;
    font-family: ${(props) => props.theme.fontFamily.Poppins};
    margin-bottom: 20px;
  }
`;

export const RegisterFormStyle = styled.form`
  width: ${(props) => props.theme.widths.forms.xsm};
  height: ${(props) => props.theme.heights.forms.md};
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  .first-section {
    height: 65px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
`;

export const ForgotPasswordFormStyle = styled.form`
  width: ${(props) => props.theme.widths.forms.xsm};
  height: ${(props) => props.theme.heights.forms.xsm};
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  div {
    height: 65px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
`;

//COMPANY
export const CrudFormStyle = styled.form`
  width: ${(props) => props.theme.widths.forms.xsm};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 20px;
  gap: 20px;
  margin-bottom: 10px;
`;

export const CrudInputDiv = styled.div`
  position: relative;

  label {
    border-radius: ${(props) => props.theme.radius.xm};
    padding: 0 5px;
    position: absolute;
    top: -17px;
    left: -10px;
    font-size: ${(props) => props.theme.fontSizes.xsm};
    color: ${(props) => props.theme.colors.black100};
    font-weight: bold;
  }
`;

export const CrudButtonsDiv = styled.div`
  display: flex;
  gap: 50px;
`;

export const BaseTitleFormStyle = styled.h1`
  width: 100%;
  margin-bottom: 15px;
  text-align: center;
  font-family: ${(props) => props.theme.fontFamily.Sora};
  margin-bottom: 20px;
`;

export const BaseInputFormStyle = styled("input")<{ error: boolean }>`
  width: 100%;
  height: ${(props) => props.theme.heights.imputs.sm};
  background-color: ${(props) => props.theme.colors.lightGrey200};
  border: ${(props) =>
    props.error ? `1px solid ${props.theme.colors.lightRed100}` : "none"};
  border-radius: ${(props) => props.theme.radius.xl};
  padding: 0 20px;
  font-family: ${(props) => props.theme.fontFamily.Poppins};
  font-size: ${(props) => props.theme.fontSizes.md};

  &:focus {
    outline: none;
    border: ${(props) => !props.error && "1px outset white"};
  }
`;

export const BaseTextAreaFormStyle = styled("textarea")<{ error: boolean }>`
  width: 100%;
  min-height: ${(props) => props.theme.heights.imputs.md};
  background-color: ${(props) => props.theme.colors.lightGrey200};
  border: ${(props) =>
    props.error ? `1px solid ${props.theme.colors.lightRed100}` : "none"};
  border-radius: ${(props) => props.theme.radius.xl};
  padding: 0 20px;
  font-family: ${(props) => props.theme.fontFamily.Poppins};
  font-size: ${(props) => props.theme.fontSizes.md};

  &:focus {
    outline: none;
    border: ${(props) => !props.error && "1px outset white"};
  }
`;

export const HandlePasswordDivStyle = styled.div`
  cursor: pointer;
`;

export const BaseCheckboxFormStyle = styled.input`
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
    color: ${(props) => props.theme.colors.black100};
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const BaseSmallFormStyle = styled.small`
  width: 100%;
  text-align: center;
  color: ${(props) => props.theme.colors.lightRed100};
`;

export const PasswordSectionFormStyle = styled.div`
  position: relative;
  height: 65px;
  display: flex;
  flex-direction: column;
  gap: 5px;

  div {
    position: absolute;
    width: 25px;
    margin-right: 10px;
    top: 50%;
    margin-top: -25px;
    right: 10px;
  }
`;
