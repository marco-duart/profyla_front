import { Outlet } from "react-router-dom";
import * as S from "./styles";
import Sidebar from "../sidebar/sidebar"

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
