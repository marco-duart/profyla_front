import { useState } from "react";
import { useUserConfiguration } from "../../hooks/user/use-user-configuration";
import * as S from "./styles";

const Configurations = () => {
  const { user, changeEmail, changeNewsletter, changePassword } = useUserConfiguration();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  return (
    <S.ContainerDivStyle>
      <div>Configurações da Conta</div>
      <div>
        <img src={user?.photo_url} alt="" style={{width: "100px", height: "100px", objectFit: "cover"}}/>
      </div>
      <input type="file" name="photo" id="photo"/>
      <div>Email: {user?.email}</div>
      <div>
        <label htmlFor="">Receber e-mails com vagas? </label>
        <input
          type="checkbox"
          checked={user?.newsletter}
          onChange={() => changeNewsletter(!user?.newsletter)}
        />
      </div>
      <div>
        <div>
          <label htmlFor="">Senha atual</label>
          <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
        </div>
        <div>
          <label htmlFor="">Nova Senha</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </div>
        <div>
          <label htmlFor="">Confirme a Nova Senha</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <button onClick={() => {}}>Alterar Senha</button>
      </div>
    </S.ContainerDivStyle>
  );
};

export default Configurations;
