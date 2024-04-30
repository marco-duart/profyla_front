//NATIVE

//LIBRARIES

//COMPONENTS

//STYLES
import { useUserContext } from "../../hooks/user/use-user-context";
import * as S from "./styles";

//UTILS

const Configurations = () => {
  const { user, autoLogin } = useUserContext();
  return (
    <S.ContainerDivStyle>
      <div>Configurações da Conta</div>
      <div style={{width: "100px", height: "100px", borderRadius: "50%", border: "2px solid #0351ca"}}>
        <img style={{width: "95px", height: "95px", borderRadius: "50%"}} src={user?.photo_url} alt="" />
      </div>
      <div>Nome: {user?.name}</div>
      <div>CPF: {user?.cpf}</div>
      <div>Email: {user?.email}</div>
      <div>
        <label htmlFor="">Receber e-mails com vagas? </label>
        <input
          type="checkbox"
          name=""
          id=""
          checked={user?.newsletter ? true : false}
        />
      </div>
      <div>
        <div>
          <label htmlFor="">Senha atual</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">Nova Senha</label>
          <input type="text" />
        </div>
      </div>
      <div>
        <button>Salvar</button>
      </div>
    </S.ContainerDivStyle>
  );
};

export default Configurations;
