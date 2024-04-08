// import { S.DivS, S.ExitStyle, S.IconStyle, div, S.SidebarStyle } from "./styles";
import * as S from "./styles"
import { Dashboard } from "@styled-icons/material-rounded/Dashboard";
import { Notifications } from "@styled-icons/ionicons-solid/Notifications";
import { Settings } from "@styled-icons/material/Settings";
import { Task } from "styled-icons/boxicons-regular";
import { WorkOutline } from "styled-icons/material-rounded";
import { User } from "@styled-icons/heroicons-solid/User";
import { MenuAltLeft } from "styled-icons/boxicons-regular";
import { Menu } from "styled-icons/boxicons-regular";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBarIcons from "../shared/icons/sidebar-icons";


const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  console.log(expanded);

  return (
    <S.SidebarStyle expanded={expanded}>
      <S.DivS>
        <S.Div2>
          <S.MenuStyle>
            {!expanded &&<SideBarIcons icon={MenuAltLeft} setExpanded={setExpanded} expanded={expanded}/>}
            {expanded &&<SideBarIcons icon={Menu} setExpanded={setExpanded} expanded={expanded}/>}
            {expanded && <h1>Menu</h1>}
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
          {/* <div>
            <S.IconStyle>
              <Dashboard />
            </S.IconStyle>
            <div> {expanded && <S.NameStyle>Dashboard</S.NameStyle>} </div>
          </div>
          <div>
            <S.IconStyle>
              <User />
            </S.IconStyle>
            <div> {expanded && <S.NameStyle>Perfil</S.NameStyle>} </div>
          </div>
          <div>
            <S.IconStyle>
              <WorkOutline />
            </S.IconStyle>
            <div> {expanded && <S.NameStyle>Vagas</S.NameStyle>} </div>
          </div>
          <div>
            <S.IconStyle>
              <Task />
            </S.IconStyle>
            <div> {expanded && <S.NameStyle>Processos Seletivos</S.NameStyle>} </div>
          </div>
          <div>
            <S.IconStyle>
              <Settings />
            </S.IconStyle>
            <div> {expanded && <S.NameStyle>Configurações</S.NameStyle>} </div>
          </div>
          <div>
            <S.IconStyle>
              <Notifications />
            </S.IconStyle>
            <div> {expanded && <S.NameStyle>Notificações</S.NameStyle>} </div>
          </div> */}
        </S.Div2>
        <S.Div2>
          <S.ExitStyle>{expanded && <S.NameStyle2 onClick={() => navigate("/user/about-us")}>Sobre Nós</S.NameStyle2>}</S.ExitStyle>
          <S.ExitStyle>{expanded && <S.NameStyle2 onClick={() => navigate("/")}>Sair</S.NameStyle2>}</S.ExitStyle>
        </S.Div2>
      </S.DivS>
    </S.SidebarStyle>
  );
};

export default Sidebar;
