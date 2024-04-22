//NATIVE
import React from "react";

//LIBRARIES
import Slider from "react-slick";
//COMPONENTS
import HiringProcessCard from "../../components/shared/cards/hiringProcess-card";
import TalentflowLogo from "../../components/shared/talentflow-logo";
import { useHiringProcessCrud } from "../../hooks/hiring/use-hiringProcess-context";
//STYLES
import * as S1 from "./styles";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import * as S from "../../components/shared/cards/styles";
//UTILS

const Home = () => {
  const { hiringProcesses } = useHiringProcessCrud("candidates");
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1
  };
  return (
    <S1.HomePageStyle>
      <S1.TalentflowLogoStyle>
        <TalentflowLogo />
      </S1.TalentflowLogoStyle>
      <S.WelcomeHomeCardStyle>
        <h1>Bem Vindo!!!</h1>
      </S.WelcomeHomeCardStyle>
      <S.WelcomeHomeCardStyle2>
        <S.HeaderCardStyle>
          <S.BaseTitleStyle>Vagas Disponíveis</S.BaseTitleStyle>
        </S.HeaderCardStyle>
      </S.WelcomeHomeCardStyle2>
      <S.WelcomeHomeCardStyle3>
        <S.HeaderCardStyle>
          <S.BaseTitleStyle>Vagas Candidatadas</S.BaseTitleStyle>
        </S.HeaderCardStyle>
        <S.CardContentStyle>
          <S1.SliderStyle {...settings}>
          {hiringProcesses?.map((hiringProcess, index) => (
            <HiringProcessCard 
            key={index}
            hiringProcess={hiringProcess}
            />
          ))}

          </S1.SliderStyle>
        </S.CardContentStyle>
      </S.WelcomeHomeCardStyle3>
    </S1.HomePageStyle>
  );
};

export default Home;
