//NATIVE
//LIBRARIES
import {
  FacebookCircle,
  InstagramAlt,
  Google,
  LinkedinSquare,
  Twitter,
  Youtube,
} from "@styled-icons/boxicons-logos";
//COMPONENTS
//STYLES
import { Link } from "react-router-dom";
import * as S from "./styles";
//UTILS
import { LINKS } from "../../utils/enums/links";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <S.FooterStyle>
      <S.FooterContentDivStyle>
        <S.FooterListStyle>
          <h4>Links úteis</h4>
          <span>
            <a href={LINKS.JRM_SITE} target="_blank">Conheça o JRM</a>
            <li>
              <a href={LINKS.IBC_SITE} target="_blank">Instituto Brasileiro de Coaching</a>
            </li>
            <li>
              <a href={LINKS.IBC_SHOP} target="_blank">IBC Shop</a>
            </li>
            <li>
              <a href={LINKS.IBC_FACULDADE} target="_blank">Faculdade IBC</a>
            </li>
          </span>
        </S.FooterListStyle>
        <S.FooterListStyle>
          <h4>Contato</h4>
          <span>
            <li>
              <a href="/" target="_blank">WhatsApp</a>
            </li>
            <li>
              <Link to="/user/support">Unidades</Link>
            </li>
            <li>
              <Link to="/user/support">Suporte</Link>
            </li>
          </span>
        </S.FooterListStyle>
        <S.FooterListStyle>
          <h4>Redes Sociais</h4>
          <li>
            <a href={LINKS.FACEBOOK} target="_blank">
              <div>
                <FacebookCircle />
              </div>
            </a>{" "}
            <a href={LINKS.LINKEDIN} target="_blank">
              <div>
                <LinkedinSquare />
              </div>
            </a>
          </li>
          <li>
            <a href={LINKS.GMAIL} target="_blank">
              <div>
                <Google />
              </div>
            </a>{" "}
            <a href={LINKS.TWITTER} target="_blank">
              <div>
                <Twitter />
              </div>
            </a>
          </li>
          <li>
            <a href={LINKS.INSTAGRAM} target="_blank">
              <div>
                <InstagramAlt />
              </div>
            </a>{" "}
            <a href={LINKS.YOUTUBE} target="_blank">
              <div>
                <Youtube />
              </div>
            </a>
          </li>
        </S.FooterListStyle>
        <S.FooterListStyle></S.FooterListStyle>
      </S.FooterContentDivStyle>
      <S.FooterEndDivStyle>
        <span>
          &copy; {year} IBC - Instituto Brasileiro de Coaching. Todos os
          direitos reservados
        </span>
        <span>
          <Link to="/use-terms">Termos de Uso</Link>
          <Link to="/privacy">Política de Privacidade</Link>
        </span>
      </S.FooterEndDivStyle>
    </S.FooterStyle>
  );
};

export default Footer;
