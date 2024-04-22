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
padding-top: 20px;
padding-bottom: 40px;
.slick-list {
  overflow: visible;
}
.slick-slide .drop-shadow {
  box-shadow: none; //no shadow for a hidden slide
  transition: box-shadow 0.1s ease-in-out; //little effect to fade the shadow
}

.slick-slide.slick-active .drop-shadow {
  box-shadow: 0px 0px 43px 0px rgba(0, 0, 0, 0.35); 
}
`
