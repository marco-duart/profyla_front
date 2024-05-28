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
export const SearchSpaceStyles = styled.div``;

export const SearchStyles = styled.input``;

export const TableStyles = styled.table`
  width: 100%;
  border-radius: 10px;
  border-collapse: separate;
  border-spacing: 0 15px;
`;
export const TableHeaderStyles = styled.thead`
  background-image: ${(props) => props.theme.gradients.ibcBlue};
`;
export const TableBodyStyles = styled.tbody``;
export const TRStyles = styled.tr`
    background-color: ${(props) => props.theme.colors.lightGrey100};
  :nth-child(odd) {
    background-color: ${(props) => props.theme.colors.lightGrey200};
  }  
`;
export const THStyles = styled.th`
  color: ${(props) => props.theme.colors.white100};
  height: 72px;
  border-radius: 10px;
`;
export const TDStyles = styled.td`
  height: 80px;
  padding: 5px;
`;
