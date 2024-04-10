//NATIVE
//LIBRARIES
import { Outlet } from "react-router-dom";

//COMPONENTS
import Sidebar from "../sidebar/sidebar";

//STYLES
import * as S from "./styles";
import Footer from "../common/footer";
import Header from "../common/header";

//UTILS

const BaseLayout = () => {
  return (
    <S.BaseLayoutPageStyled>
      <S.BaseLayoutSidebarStyled>
        <Sidebar />
      </S.BaseLayoutSidebarStyled>
      <S.BaseLayoutDivStyled>
        <div>Header</div>
        <div>
          <Outlet />
        </div>
        <Footer />
      </S.BaseLayoutDivStyled>
    </S.BaseLayoutPageStyled>
  );
};

export default BaseLayout;
