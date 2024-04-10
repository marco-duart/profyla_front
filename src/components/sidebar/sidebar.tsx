//NATIVE
import { useState } from "react";
//LIBRARIES
import { Notifications } from "@styled-icons/ionicons-solid/Notifications";
import { Settings } from "@styled-icons/material/Settings";
import { WorkOutline, Dashboard } from "styled-icons/material-rounded";
import { User } from "@styled-icons/heroicons-solid/User";
import { Menu, MenuAltLeft, Task } from "styled-icons/boxicons-regular";
import { Info } from "@styled-icons/entypo/Info";
import { ExitToApp } from "styled-icons/material-twotone";
//COMPONENTS
import SideBarIcons from "../shared/icons/sidebar-icons";
//STYLES
import * as S from "./styles";
//UTILS
import Image from "../../assets/image/IBC_GROUP_branco-01.png";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <S.SidebarNavStyle expanded={expanded}>
      <S.SidebarStyle>
        <S.SidebarIconStyle>
          <S.MenuStyle>
            <S.MenuIconStyle>
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
            </S.MenuIconStyle>
            <div>{expanded && <img src={Image} />}</div>
          </S.MenuStyle>
          <S.IconStyle>
            <S.Link to={"/user/dashboard"}>
              <SideBarIcons icon={Dashboard} />
              {expanded && <S.NameStyle>Dashboard</S.NameStyle>}
            </S.Link>
          </S.IconStyle>
          <S.IconStyle>
            <S.Link to={"/user/profile"}>
              <SideBarIcons icon={User} />
              {expanded && <S.NameStyle>Perfil</S.NameStyle>}
            </S.Link>
          </S.IconStyle>
          <S.IconStyle>
            <S.Link to={"/user/jobs"}>
              <SideBarIcons icon={WorkOutline} />
              {expanded && <S.NameStyle>Vagas</S.NameStyle>}
            </S.Link>
          </S.IconStyle>
          <S.IconStyle>
            <S.Link to={"/user/hiring-process"}>
              <SideBarIcons icon={Task} />
              {expanded && <S.NameStyle>Processos Seletivos</S.NameStyle>}
            </S.Link>
          </S.IconStyle>
          <S.IconStyle>
            <S.Link to={"/user/configurations"}>
              <SideBarIcons icon={Settings} />
              {expanded && <S.NameStyle>Configurações</S.NameStyle>}
            </S.Link>
          </S.IconStyle>
          <S.IconStyle>
            <S.Link to={"/user/notifications"}>
              <SideBarIcons icon={Notifications} />
              {expanded && <S.NameStyle>Notificações</S.NameStyle>}
            </S.Link>
          </S.IconStyle>
          <S.IconStyle>
            <S.Link to={"/user/about-us"}>
              <SideBarIcons icon={Info} />
              {expanded && <S.NameStyle>Sobre Nós</S.NameStyle>}
            </S.Link>
          </S.IconStyle>
        </S.SidebarIconStyle>
        <S.SidebarIconStyle>
          <S.IconStyle>
            <S.Link to={"/"}>
              {" "}
              <SideBarIcons icon={ExitToApp} />
              {expanded && <S.NameStyle>Sair</S.NameStyle>}
            </S.Link>
          </S.IconStyle>
        </S.SidebarIconStyle>
      </S.SidebarStyle>
    </S.SidebarNavStyle>
  );
};

export default Sidebar;
