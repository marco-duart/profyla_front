import { useUserContext } from "./use-user-context";
import {
  ChangeEmail,
  ChangeNewsletter,
  ChangePassword,
  ChangePhoto,
} from "../../services/user";

export const useUserConfiguration = () => {
  const { token, autoLogin, user } = useUserContext();

  const changeEmail = async (newEmail: string) => {
    if (!token) {
      return;
    }

    const params = { email: newEmail, token };
    await ChangeEmail(params);
    await autoLogin();
  };

  const changeNewsletter = async (newNewsletter: boolean) => {
    if (!user?.id) {
      return;
    }
    const params = { id: user.id, newsletter: newNewsletter };
    await ChangeNewsletter(params);
    await autoLogin();
  };

  const changePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    if (!token) {
      return;
    }

    const params = {
      current_password: currentPassword,
      new_password: newPassword,
      token,
    };
    await ChangePassword(params);
  };

  const changePhoto = async (photo: File) => {
    if (!token) {
      return;
    }

    const params = { photo, token };
    await ChangePhoto(params);
    await autoLogin();
  };

  return {
    user,
    changeEmail,
    changePassword,
    changeNewsletter,
    changePhoto,
  };
};
