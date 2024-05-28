//NATIVE

import { useCandidateCrud } from "../../hooks/candidates/use-candidates-crud";
import * as S from "./styles";

//LIBRARIES

//COMPONENTS

//STYLES

//UTILS
import { Candidate } from "../../services/candidate/DTO";
import React from "react";

// interface TableProps {
//   candidate: Candidate;
// }
const Candidates = () => {
  const { candidates } = useCandidateCrud();
  console.log(candidates);

  return (
    <div>
    <h1>Candidatos</h1>
    <S.CandidateStyles>
      <S.SearchSpaceStyles>
        <S.SearchStyles placeholder="Nome"/>
      </S.SearchSpaceStyles>
    <S.TableStyles>
      <S.TableHeaderStyles>
        <S.THStyles>Nome</S.THStyles>
        <S.THStyles>Email</S.THStyles>
        <S.THStyles>Telefone</S.THStyles>
        <S.THStyles>Cidade</S.THStyles>
      </S.TableHeaderStyles>
      <S.TableBodyStyles>
      {candidates?.map((candidate, index) => (
        <S.TRStyles key={index} >
          <S.TDStyles>{candidate.name}</S.TDStyles>
          <S.TDStyles>{candidate.email}</S.TDStyles>
          <S.TDStyles>{candidate.phone_number1}</S.TDStyles>
          <S.TDStyles>{candidate.address_city}</S.TDStyles>
        </S.TRStyles>
      ))}
      </S.TableBodyStyles>
    </S.TableStyles>
    
    </S.CandidateStyles>
    </div>
  )
};

export default Candidates;