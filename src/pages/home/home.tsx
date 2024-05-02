//NATIVE

//LIBRARIES

//COMPONENTS
import HiringProcessCard from "../../components/shared/cards/hiringProcess-card";
import TalentflowLogo from "../../components/shared/talentflow-logo";
import { useHiringProcessCrud } from "../../hooks/hiring/use-hiringProcess-context";
import { useApplicationCrud } from "../../hooks/application/use-application-crud";
//STYLES
import * as S1 from "./styles";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import * as S from "../../components/shared/cards/styles";
import UserHiringProcessCard from "../../components/shared/cards/userHiringProcess-card";
//UTILS

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <S1.CustomPrevArrow onClick={onClick}>
      <S1.ArrowIcon style={{ transform: "rotate(135deg)" }} />
    </S1.CustomPrevArrow>
  );
};

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <S1.CustomNextArrow onClick={onClick}>
      <S1.ArrowIcon style={{ transform: "rotate(-45deg)" }} />
    </S1.CustomNextArrow>
  );
};
const Home = () => {
  const { hiringProcesses } = useHiringProcessCrud("candidates");
  const { applications } = useApplicationCrud("candidates");
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  const settings2 = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <S1.HomePageStyle>
      <S1.TalentflowLogoStyle>
        <TalentflowLogo />
      </S1.TalentflowLogoStyle>
      <S.WelcomeHomeCardStyle>
        <h1>Bem Vindo!!!</h1>
      </S.WelcomeHomeCardStyle>
      <S.HiringProcessCardStyle>
        <S.HeaderCardStyle>
          <S.BaseTitleStyle>Vagas Disponíveis</S.BaseTitleStyle>
        </S.HeaderCardStyle>
        <S.CardContentStyle>
          <S1.SliderStyle {...settings2}>
            {hiringProcesses?.map((hiringProcess, index) => (
              <HiringProcessCard key={index} hiringProcess={hiringProcess} />
            ))}
          </S1.SliderStyle>
        </S.CardContentStyle>
      </S.HiringProcessCardStyle>
      <S.ApplicationCardStyle>
        <S.HeaderCardStyle>
          <S.BaseTitleStyle>Vagas Candidatadas</S.BaseTitleStyle>
        </S.HeaderCardStyle>
        <S.CardContentStyle>
          <S1.SliderStyle {...settings}>
            {applications?.map((applications, index) => (
              <UserHiringProcessCard key={index} applications={applications} />
            ))}
          </S1.SliderStyle>
        </S.CardContentStyle>
      </S.ApplicationCardStyle>
    </S1.HomePageStyle>
  );
};

export default Home;
