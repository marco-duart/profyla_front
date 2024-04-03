// import { S.DivS, S.ExitStyle, S.IconStyle, S.MenuStyle, S.SidebarStyle } from "./styles";
import * as S from "./styles"
import { Dashboard } from "@styled-icons/material-rounded/Dashboard";
import { Notifications } from "@styled-icons/ionicons-solid/Notifications";
import { Settings } from "@styled-icons/material/Settings";
import { Task } from "styled-icons/boxicons-regular";
import { WorkOutline } from "styled-icons/material-rounded";
import { UserTie } from "styled-icons/fa-solid";
import { MenuAltLeft } from "styled-icons/boxicons-regular";
import { Menu } from "styled-icons/boxicons-regular";
import { useState } from "react";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);
  console.log(expanded);

  return (
    <S.SidebarStyle expanded={expanded}>
      <S.DivS>
        <div>
          <S.MenuStyle>
            <S.IconStyle onClick={() => setExpanded(!expanded)}>
              {!expanded &&  <MenuAltLeft />}
              {expanded &&  <Menu />}
            </S.IconStyle>
            {expanded && <h1>Menu</h1>}
          </S.MenuStyle>
          <S.MenuStyle>
            <S.IconStyle>
              <Dashboard />
            </S.IconStyle>
            <div> {expanded && <h3>Dashboard</h3>} </div>
          </S.MenuStyle>
          <S.MenuStyle>
            <S.IconStyle>
              <UserTie />
            </S.IconStyle>
            <div> {expanded && <h3>Perfil</h3>} </div>
          </S.MenuStyle>
          <S.MenuStyle>
            <S.IconStyle>
              <WorkOutline />
            </S.IconStyle>
            <div> {expanded && <h3>Vagas</h3>} </div>
          </S.MenuStyle>
          <S.MenuStyle>
            <S.IconStyle>
              <Task />
            </S.IconStyle>
            <div> {expanded && <h3>Processos Seletivos</h3>} </div>
          </S.MenuStyle>
          <S.MenuStyle>
            <S.IconStyle>
              <Settings />
            </S.IconStyle>
            <div> {expanded && <h3>Configurações</h3>} </div>
          </S.MenuStyle>
          <S.MenuStyle>
            <S.IconStyle>
              <Notifications />
            </S.IconStyle>
            <div> {expanded && <h3>Notificações</h3>} </div>
          </S.MenuStyle>
        </div>
        <div>
          <S.ExitStyle>{expanded && <h2>Sair</h2>}</S.ExitStyle>
        </div>
      </S.DivS>
    </S.SidebarStyle>
  );
};

export default Sidebar;
