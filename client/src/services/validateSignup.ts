import { signupSchema } from "@/Zod/schema.zod"

type SignupDetails = {
  name: string
  email: string
  password: string
}
interface ValidSignupProps {
  signupDetails: SignupDetails
  setErrorMsg: (msg: string | null) => void
  setOpen: (open: boolean) => void
}
export const validateSignup = ({
  signupDetails,
  setErrorMsg,
  setOpen,
}: ValidSignupProps) => {
  const result = signupSchema.safeParse(signupDetails)
  if (!result.success) {
    console.log(result.error.errors)
    setErrorMsg(result.error.errors[0].message)
    setOpen(true)
    return false
  }
  return true
}
