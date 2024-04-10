//NATIVE
//LIBRARIES
import { Outlet } from "react-router-dom";

//COMPONENTS
import Sidebar from "../sidebar/sidebar";
import Footer from "../common/footer";
import Header from "../common/header";

//STYLES
import * as S from "./styles";


//UTILS

const BaseLayout = () => {
  return (
    <S.BaseLayoutPageStyled>
      <S.BaseLayoutSidebarStyled>
        <Sidebar />
      </S.BaseLayoutSidebarStyled>
      <S.BaseLayoutDivStyled>
        <Header />
        <div>
          <Outlet />
        </div>
        <Footer />
      </S.BaseLayoutDivStyled>
    </S.BaseLayoutPageStyled>
  );
};

export default BaseLayout;
