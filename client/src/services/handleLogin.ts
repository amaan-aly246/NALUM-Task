import { AuthResponse } from "@/types/types"
import { validateLogin } from "./validateLogin"
import { LoginDetails } from "@/types/types"
import { MutationFunction } from "@apollo/client"
import { User } from "../types/types"
export const handleLogin = async ({
  loginDetails,
  setErrorMsg,
  setOpen,
  loginUserFunc,
  setUser,
  getUser,
}: {
  loginDetails: LoginDetails
  setErrorMsg: (msg: string | null) => void
  setOpen: (open: boolean) => void
  loginUserFunc: MutationFunction
  setUser: React.Dispatch<React.SetStateAction<User | null>> | null
  getUser: any
}): Promise<void> => {
  if (!validateLogin({ loginDetails, setErrorMsg, setOpen })) return
  try {
    setErrorMsg(null)

    const response: AuthResponse = (
      await loginUserFunc({
        variables: {
          email: loginDetails.email,
          password: loginDetails.password,
        },
      })
    ).data.loginUser
    if (!response.success) {
      setErrorMsg(response.message)
      return
    }
    // console.log(response)
    if (response.token) {
      localStorage.setItem("token", response.token)
      // console.log(localStorage.getItem("token"));
    }
    const { email, name } = (
      await getUser({
        variables: { email: loginDetails.email },
      })
    ).data.User

    // console.log("data", email)
    if (setUser) {
      setUser({
        email,
        name,
      })
    }

    setOpen(false)
  } catch (error: any) {
    console.error(error)
    setErrorMsg(error.message || "An unexpected error occurred")
  }
}
