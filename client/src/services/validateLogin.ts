import { loginSchema } from "@/Zod/schema.zod"
import { LoginDetails } from "@/types/types"

interface ValidateLoginProps {
  loginDetails: LoginDetails
  setErrorMsg: (msg: string | null) => void
  setOpen: (open: boolean) => void
}
export const validateLogin = ({
  loginDetails,
  setErrorMsg,
  setOpen,
}: ValidateLoginProps) => {
  const result = loginSchema.safeParse(loginDetails)
  if (!result.success) {
    setErrorMsg(result.error.errors[0].message)
    setOpen(true)
    return false
  }
  return true
}
