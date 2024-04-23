//NATIVE
import React, { ReactNode } from "react";
import * as S from "./styles";

//LIBRARIES
//COMPONENTS
//STYLES
//UTILS

interface CardProps {
  children: ReactNode;
  title: string | undefined;
  subTitle:string | undefined;
}

const ContentCard: React.FC<CardProps> = ({ children, title, subTitle }) => {
  return (
    <>
    <S.ContentCardStyle>
      <S.ContentCardHeader>
        <h2>{title}</h2>
        <h3>{subTitle}</h3>
      </S.ContentCardHeader>
      <S.ContentCardBody>
        {children}
      </S.ContentCardBody>
    </S.ContentCardStyle>
    </>
  );
};

export default ContentCard;
