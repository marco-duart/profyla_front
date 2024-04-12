//NATIVE
//LIBRARIES
import { Outlet } from "react-router-dom";

//COMPONENTS
import Sidebar from "../sidebar/sidebar";
import Footer from "../common/footer";
import Header from "../common/header";

//STYLES
import * as S from "./styles";
import { BaseBackgroundStyle } from "../../assets/styles/style";


//UTILS

const BaseLayout = () => {
  return (
    <S.BaseLayoutPageStyled>
      <S.BaseLayoutSidebarStyled>
        <Sidebar />
      </S.BaseLayoutSidebarStyled>
      <S.BaseLayoutDivStyled>
        <Header />
        <BaseBackgroundStyle>
          <Outlet />
        </BaseBackgroundStyle>
        <Footer />
      </S.BaseLayoutDivStyled>
    </S.BaseLayoutPageStyled>
  );
};

export default BaseLayout;
