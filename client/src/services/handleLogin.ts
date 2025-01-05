import { AuthResponse } from "@/types/types"
import { validateLogin } from "./validateLogin"
import { LoginDetails } from "@/types/types"
import { MutationFunction } from "@apollo/client"
export const handleLogin = async ({
  loginDetails,
  setErrorMsg,
  setOpen,
  loginUserFunc,
}: {
  loginDetails: LoginDetails
  setErrorMsg: (msg: string | null) => void
  setOpen: (open: boolean) => void
  loginUserFunc: MutationFunction
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
    if (response.token) {
      localStorage.setItem("token", response.token)
      const token = localStorage.getItem("token");
      console.log(token);
    }
    setOpen(false)
  } catch (error: any) {
    console.error(error)
    setErrorMsg(error.message || "An unexpected error occurred")
  }
}
