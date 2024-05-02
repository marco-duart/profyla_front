import { useUserContext } from "./use-user-context"
import { ChangeEmail, ChangeNewsletter, ChangePassword, ChangePhoto } from "../../services/user"


export const useUserConfiguration = () => {
  const { token, autoLogin } = useUserContext()

  const changeEmail = async (email: string) => {
    if (!token) {
      return
    }

    const params = { email, token }
    await ChangeEmail(params)
    autoLogin()
  }

  const changePassword = async (current_password: string, new_password: string) => {
    if (!token) {
      return
    }

    const params = { current_password, new_password, token }
    await ChangePassword(params)
  }

  const changeNewsletter = async (id: string, newsletter: string) => {
    const params = { id, newsletter }
    await ChangeNewsletter(params)
    autoLogin()
  }

  const changePhoto = async (photo: File) => {
    if (!token) {
      return
    }

    const params = { photo, token}
    await ChangePhoto(params)
    autoLogin()
  }

  return {
    changeEmail,
    changePassword,
    changeNewsletter,
    changePhoto
  }
}