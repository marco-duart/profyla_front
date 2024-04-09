//NATIVE

//LIBRARIES

//COMPONENTS

//STYLES
import * as S from "./styles"
//UTILS

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <S.FooterStyle>
      <S.FooterContentDivStyle>
        
      </S.FooterContentDivStyle>
      <S.FooterEndDivStyle>
        <span>&copy; {year} IBC - Instituto Brasileiro de Coaching</span>
        <span>Av. Prof. Venerando Freitas Borges, 561 - Setor Jaó - Goiânia/ GO - CEP: 74.673-010 </span>
      </S.FooterEndDivStyle>
    </S.FooterStyle>
  )
}

export default Footer