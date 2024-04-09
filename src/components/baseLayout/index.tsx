
//NATIVE
//LIBRARIES
import { Outlet } from "react-router-dom";

//COMPONENTS
import Sidebar from "../sidebar/sidebar"

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
        <div>Header</div>
        <Outlet />
      </S.BaseLayoutDivStyled>
    </S.BaseLayoutPageStyled>
  );
};

export default BaseLayout;
