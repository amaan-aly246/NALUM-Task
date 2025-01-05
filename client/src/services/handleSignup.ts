import { AuthResponse } from "@/types/types"
import { validateSignup } from "./validateSignup"

import { SignupDetails } from "@/types/types"
import { MutationFunction } from "@apollo/client"
export const handleSignup = async ({
  signupDetails,
  setErrorMsg,
  setOpen,
  createUserFunc,
}: {
  signupDetails: SignupDetails
  setErrorMsg: (msg: string | null) => void
  setOpen: (open: boolean) => void
  createUserFunc: MutationFunction
}): Promise<void> => {
  if (!validateSignup({ signupDetails, setErrorMsg, setOpen })) return
  try {
    setErrorMsg(null)
    const response: AuthResponse = (
      await createUserFunc({
        variables: {
          name: signupDetails.name,
          email: signupDetails.email,
          password: signupDetails.password,
        },
      })
    ).data.createUser
    if (!response.success) {
      setErrorMsg(response.message)
      return
    }
    setOpen(false)
  } catch (error: any) {
    console.error(error)
    setErrorMsg(error.message || "An unexpected error occurred")
  }
}
