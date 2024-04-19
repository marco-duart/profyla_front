import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const HomePageStyle = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  display: grid;
  place-items: center;
`;

export const HomePageStyle2 = styled.div`
  width: 100%;
  height: 100%;
`;

export const TalentflowLogoStyle = styled.div`
  position: absolute;
  width: 200px;
  left: 50%;
  margin-left: -275px;
  top: -50px;
`
export const SliderStyle = styled(Slider)`
width: 95%;
height: 120%;
padding: 10px;
margin: 10px;
`
