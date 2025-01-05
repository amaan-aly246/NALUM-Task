import { ReactEventHandler, useState } from "react"
import { User } from "lucide-react"
import { useMutation } from "@apollo/client"
import { validateLogin } from "@/services/validateLogin"
import { validateSignup } from "@/services/validateSignup"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { CREATE_USER, LOGIN_USER } from "@/graphql/Mutation/user.mutation"
import { AuthResponse } from "@/types/types"
function AuthModal() {
  const [open, setOpen] = useState<boolean>(false)
  const [mode, setMode] = useState<"signup" | "login">("signup")
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const [signupDetails, setSignupDetails] = useState({
    name: "",
    email: "",
    password: "",
  })

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  })

  const [createUserFunc, { loading: CreateUserLoading }] =
    useMutation(CREATE_USER)

  const handleSignup: ReactEventHandler = async (): Promise<void> => {
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

  const [loginUserFunc, { loading: loginLoading }] = useMutation(LOGIN_USER)
  const handleLogin: ReactEventHandler = async (): Promise<void> => {
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
      // console.log(response)
      if (!response.success) {
        setErrorMsg(response.message)
        return
      }
      if (response.token) {
        console.log("whats up token")
        localStorage.setItem("token", response.token)
        const tokenAfterStored = localStorage.getItem("token");
        console.log(tokenAfterStored)

      }
      setOpen(false)
    } catch (error: any) {
      console.error(error)
      setErrorMsg(error.message || "An unexpected error occurred")
    }
  }

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger
        onClick={() => {
          setErrorMsg(null)
          setOpen(true)
        }}>
        <User color="#7981ec" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {mode === "signup" ? "Create Account" : "Log In to your Account"}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex-col p-4">
          {mode === "signup" ? (
            <>
              <div className="flex gap-12 justify-between mb-4">
                <Label className="text-xl">Name</Label>
                <Input
                  type="text"
                  placeholder="Name"
                  onChange={(e) => {
                    setSignupDetails((prevDetails) => ({
                      ...prevDetails,
                      name: e.target.value,
                    }))
                  }}
                />
              </div>
            </>
          ) : (
            <></>
          )}
          <div className="flex gap-14 justify-between mb-4">
            <Label className="text-xl">Email</Label>
            <Input
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setLoginDetails((prevDetails) => ({
                  ...prevDetails,
                  email: e.target.value,
                }))
                setSignupDetails((prevDetails) => ({
                  ...prevDetails,
                  email: e.target.value,
                }))
              }}
            />
          </div>
          <div className="flex gap-5 justify-between mb-4">
            <Label className="text-xl">Password</Label>
            <Input
              placeholder="Password"
              type="password"
              onChange={(e) => {
                setLoginDetails((prevDetails) => ({
                  ...prevDetails,
                  password: e.target.value,
                }))
                setSignupDetails((prevDetails) => ({
                  ...prevDetails,
                  password: e.target.value,
                }))
              }}
            />
          </div>
        </div>
        {errorMsg && <p className="text-red-500">{errorMsg}</p>}
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
          {mode == "signup" ? (
            <AlertDialogAction
              onClick={handleSignup}
              disabled={CreateUserLoading}>
              {CreateUserLoading ? "Signing Up..." : "Sign Up"}
            </AlertDialogAction>
          ) : (
            <AlertDialogAction onClick={handleLogin} disabled={loginLoading}>
              {loginLoading ? "Logging In..." : "Login"}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
        <p className="flex justify-center mt-4">
          {mode === "signup" ? (
            <>
              Already have an account?{" "}
              <span
                className="font-semibold underline cursor-pointer"
                onClick={() => setMode("login")}>
                Login
              </span>
            </>
          ) : (
            <>
              Don’t have an account?
              <span
                className="font-semibold underline cursor-pointer"
                onClick={() => setMode("signup")}>
                Sign Up
              </span>
            </>
          )}
        </p>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AuthModal
