import { useUserContext } from "./use-user-context"
import { ChangeEmail, ChangeNewsletter, ChangePassword, ChangePhoto } from "../../services/user"
import { useState } from "react";


export const useUserConfiguration = () => {
  const { token, autoLogin, user } = useUserContext();
  const [passwordChangeResult, setPasswordChangeResult] = useState<boolean | null>(null);

  const changeEmail = async (newEmail: string) => {
    if (!token) {
      return;
    }

    const params = { email: newEmail, token };
    await ChangeEmail(params);
    autoLogin();
  };

  const changeNewsletter = async (newNewsletter: boolean) => {
    if (!user?.id) {
      return
    }
    const params = { id: user.id, newsletter: newNewsletter };
    await ChangeNewsletter(params);
    autoLogin();
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    if (!token) {
      return;
    }

    const params = { current_password: currentPassword, new_password: newPassword, token };
    const { success } = await ChangePassword(params);
    setPasswordChangeResult(success);
  };

  const changePhoto = async (photo: File) => {
    if (!token) {
      return
    }

    const params = { photo, token}
    await ChangePhoto(params)
    autoLogin()
  }

  return {
    user,
    changeEmail,
    changePassword,
    changeNewsletter,
    changePhoto
  }
}