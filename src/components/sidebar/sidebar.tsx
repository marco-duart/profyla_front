//NATIVE
import { useState } from "react";
//LIBRARIES
import { Notifications } from "@styled-icons/ionicons-solid/Notifications";
import { Settings } from "@styled-icons/material/Settings";
import { WorkOutline, Dashboard } from "styled-icons/material-rounded";
import { User, Home } from "@styled-icons/heroicons-solid";
import {
  Menu,
  MenuAltLeft,
  Task,
  BuildingHouse,
} from "styled-icons/boxicons-regular";
import { Info } from "@styled-icons/entypo/Info";
import { ExitToApp } from "styled-icons/material-twotone";
import { PeopleTeam, GridKanban, FormNew} from "styled-icons/fluentui-system-filled";
import { ChartPerson } from "styled-icons/fluentui-system-regular";
//COMPONENTS
import SideBarIcons from "../shared/icons/sidebar-icons";
import { useUserContext } from "../../hooks/use-user-context";
//STYLES
import * as S from "./styles";
//UTILS
import Image from "../../assets/image/IBC_GROUP_branco-01.png";

const Sidebar = () => {
  const { isAdmin } = useUserContext();
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
          {isAdmin() ? (
            <S.IconStyle>
              <S.Link to={"/admin/dashboard"}>
                <SideBarIcons icon={Dashboard} />
                {expanded && <S.NameStyle>Dashboard</S.NameStyle>}
              </S.Link>
            </S.IconStyle>
          ) : (
            <S.IconStyle>
              <S.Link to={"/user/home"}>
                <SideBarIcons icon={Home} />
                {expanded && <S.NameStyle>Home</S.NameStyle>}
              </S.Link>
            </S.IconStyle>
          )}
          {isAdmin() ? (
            <S.IconStyle>
              <S.Link to={"/admin/cnpj"}>
                <SideBarIcons icon={BuildingHouse} />
                {expanded && <S.NameStyle>CNPJ</S.NameStyle>}
              </S.Link>
            </S.IconStyle>
          ) : (
            <S.IconStyle>
              <S.Link to={"/user/profile"}>
                <SideBarIcons icon={User} />
                {expanded && <S.NameStyle>Perfil</S.NameStyle>}
              </S.Link>
            </S.IconStyle>
          )}

          {isAdmin() ? (
            <S.IconStyle>
              <S.Link to={"/admin/manager"}>
                <SideBarIcons icon={GridKanban} />
                {expanded && <S.NameStyle>Kanban</S.NameStyle>}
              </S.Link>
            </S.IconStyle>
          ) : (
            <></>
          )}

          {isAdmin() ? (
            <S.IconStyle>
              <S.Link to={"/admin/candidates"}>
                <SideBarIcons icon={PeopleTeam} />
                {expanded && <S.NameStyle>Candidatos</S.NameStyle>}
              </S.Link>
            </S.IconStyle>
          ) : (
            <S.IconStyle>
              <S.Link to={"/user/jobs"}>
                <SideBarIcons icon={WorkOutline} />
                {expanded && <S.NameStyle>Vagas</S.NameStyle>}
              </S.Link>
            </S.IconStyle>
          )}

          {isAdmin() ? (
            <S.IconStyle>
              <S.Link to={"/admin/exams"}>
                <SideBarIcons icon={FormNew} />
                {expanded && <S.NameStyle>Formulários/Exames</S.NameStyle>}
              </S.Link>
            </S.IconStyle>
          ) : (
            <S.IconStyle>
              <S.Link to={"/user/hiring-process"}>
                <SideBarIcons icon={Task} />
                {expanded && <S.NameStyle>Processos Seletivos</S.NameStyle>}
              </S.Link>
            </S.IconStyle>
          )}

          {isAdmin() ? (
            <S.IconStyle>
              <S.Link to={"/admin/traits"}>
                <SideBarIcons icon={ChartPerson} />
                {expanded && <S.NameStyle>Traits</S.NameStyle>}
              </S.Link>
            </S.IconStyle>
          ) : (
            <></>
          )}

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
