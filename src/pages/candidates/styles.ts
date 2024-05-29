//NATIVE
//LIBRARIES

//COMPONENTS

//STYLES
import styled from "styled-components";
//UTILS

export const CandidateStyles = styled.div`
  width: 1500px;
  max-width: 90%;
  height: 832px;
  top: 307px;
  left: 306px;
  border-radius: 24px;
  box-shadow: ${(props) => props.theme.shadows.shadow100};
`;

export const SearchSpaceStyles = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  padding: 15px 15px 30px 15px;
`;

export const FooterStyles = styled.div``;

export const TableDivStyles = styled.div`
  display: flex;
  justify-content: center;
`;

export const SearchSelectStyles = styled.select``;

export const SearchStyles = styled.input`
  height: ${(props) => props.theme.heights.imputs.xsm};
  background-color: ${(props) => props.theme.colors.lightGrey200};
  border-radius: ${(props) => props.theme.radius.xl};
  padding: 0 20px;
  font-family: ${(props) => props.theme.fontFamily.Poppins};
  font-size: ${(props) => props.theme.fontSizes.md};

  &:focus {
    outline: none;
    border: 1px outset white;
  }
`;

export const TableStyles = styled.table`
  width: 98%;
  border-collapse: separate;
  border-spacing: 0 10px;
  border-radius: 10px;
  border: 1px solid black;
`;

export const TableHeaderStyles = styled.thead`
  border-top-right-radius: 10px;
  background-image: ${(props) => props.theme.gradients.ibcBlue};
`;

export const TableBodyStyles = styled.tbody``;
export const TRStyles = styled.tr`
  background-color: ${(props) => props.theme.colors.lightGrey500};
  :nth-child(odd) {
    background-color: ${(props) => props.theme.colors.lightGrey200};
  }
`;

export const THStyles = styled.th`
  color: ${(props) => props.theme.colors.white100};
  height: 72px;
`;

export const TDStyles = styled.td`
  height: 80px;
  padding: 5px;
  border-radius: 10px;
  border: 1px solid black;
`;
