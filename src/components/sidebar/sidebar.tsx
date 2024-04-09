//NATIVE
import { useState } from "react";
//LIBRARIES
import { Dashboard } from "@styled-icons/material-rounded/Dashboard";
import { Notifications } from "@styled-icons/ionicons-solid/Notifications";
import { Settings } from "@styled-icons/material/Settings";
import { Task } from "styled-icons/boxicons-regular";
import { WorkOutline } from "styled-icons/material-rounded";
import { User } from "@styled-icons/heroicons-solid/User";
import { MenuAltLeft } from "styled-icons/boxicons-regular";
import { Menu } from "styled-icons/boxicons-regular";
import { Info } from "@styled-icons/entypo/Info";
//COMPONENTS
import SideBarIcons from "../shared/icons/sidebar-icons";
//STYLES
import * as S from "./styles";
//UTILS

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <S.SidebarNavStyle expanded={expanded}>
      <S.SidebarStyle>
        <S.SidebarIconStyle>
          <S.MenuStyle>
            {!expanded && (
              <SideBarIcons
                icon={MenuAltLeft}
                setExpanded={setExpanded}
                expanded={expanded}
              />
            )}
            {expanded && (
              <SideBarIcons
                icon={Menu}
                setExpanded={setExpanded}
                expanded={expanded}
              />
            )}
            {expanded && <S.MenuNameStyle>Menu</S.MenuNameStyle>}
          </S.MenuStyle>
          <div className="width 100%">
            <S.Link to={"/user/dashboard"}>
              <SideBarIcons icon={Dashboard} />
              {expanded && <S.NameStyle>Dashboard</S.NameStyle>}
            </S.Link>
          </div>
          <div>
            <S.Link to={"/user/profile"}>
              <SideBarIcons icon={User} />
              {expanded && <S.NameStyle>Perfil</S.NameStyle>}
            </S.Link>
          </div>
          <div>
            <S.Link to={"/user/jobs"}>
              <SideBarIcons icon={WorkOutline} />
              {expanded && <S.NameStyle>Vagas</S.NameStyle>}
            </S.Link>
          </div>
          <div>
            <S.Link to={"/user/hiring-process"}>
              <SideBarIcons icon={Task} />
              {expanded && <S.NameStyle>Processos Seletivos</S.NameStyle>}
            </S.Link>
          </div>
          <div>
            <S.Link to={"/user/configurations"}>
              <SideBarIcons icon={Settings} />
              {expanded && <S.NameStyle>Configurações</S.NameStyle>}
            </S.Link>
          </div>
          <div>
            <S.Link to={"/user/notifications"}>
              <SideBarIcons icon={Notifications} />
              {expanded && <S.NameStyle>Notificações</S.NameStyle>}
            </S.Link>
          </div>
          <div>
            <S.Link to={"/user/about-us"}>
              <SideBarIcons icon={Info} />
              {expanded && <S.NameStyle>Sobre Nós</S.NameStyle>}
            </S.Link>
          </div>
        </S.SidebarIconStyle>
        <S.SidebarIconStyle>
          <S.FooterLink to={"/"}>
            {" "}
            <S.ExitStyle>
              {expanded && <S.ExitNameStyle>Sair</S.ExitNameStyle>}
            </S.ExitStyle>{" "}
          </S.FooterLink>
        </S.SidebarIconStyle>
      </S.SidebarStyle>
    </S.SidebarNavStyle>
  );
};

export default Sidebar;
