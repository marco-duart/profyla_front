import { useUserContext } from "./use-user-context";
import {
  ChangeEmail,
  ChangeNewsletter,
  ChangePassword,
  ChangePhoto,
} from "../../services/user";
import { useState } from "react";

export const useUserConfiguration = () => {
  const { token, autoLogin, user } = useUserContext();
  const [message, setMessage] = useState<string>("");

  const handleMessage = (message: string) => {
    setMessage(message);
  };

  const changeEmail = async (newEmail: string) => {
    if (!token) {
      return;
    }

    const params = { email: newEmail, token };
    const { message } = await ChangeEmail(params);
    handleMessage(message);
    autoLogin();
  };

  const changeNewsletter = async (newNewsletter: boolean) => {
    if (!user?.id) {
      return;
    }
    const params = { id: user.id, newsletter: newNewsletter };
    await ChangeNewsletter(params);
    autoLogin();
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
    const { message } = await ChangePassword(params);
    handleMessage(message);
  };

  const changePhoto = async (photo: File) => {
    if (!token) {
      return;
    }

    const params = { photo, token };
    await ChangePhoto(params);
    autoLogin();
  };

  return {
    user,
    message,
    changeEmail,
    changePassword,
    changeNewsletter,
    changePhoto,
  };
};
