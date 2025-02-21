import { useState, useContext } from "react"
import { useLazyQuery, useMutation } from "@apollo/client"
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
import { handleLogin } from "@/services/handleLogin"
import { handleSignup } from "@/services/handleSignup"
import UserContext from "@/context/UserContext"
import { User as UserIcon } from "lucide-react"
import { IUserContext } from "@/context/UserContext"
import { GET_USER } from "@/graphql/Query/user.query"
// import {User } from "../types/types"
function AuthModal({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  // const [open, setOpen] = useState<boolean>(false)
  const [mode, setMode] = useState<"signup" | "login">("signup")
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const context = useContext<IUserContext | null>(UserContext)
  const setUser = context ? context.setUser : null

  const [signupDetails, setSignupDetails] = useState({
    name: "",
    email: "",
    password: "",
  })

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  })
  const [getUser, {}] = useLazyQuery(GET_USER)
  const [createUserFunc, { loading: CreateUserLoading }] =
    useMutation(CREATE_USER)

  const [loginUserFunc, { loading: loginLoading }] = useMutation(LOGIN_USER)

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger
        onClick={() => {
          setErrorMsg(null)
          setOpen(true)
        }}>
        <UserIcon />
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
              className="bg-primary_red hover:bg-secondary_red"
              onClick={() =>
                handleSignup({
                  signupDetails,
                  setErrorMsg,
                  setOpen,
                  createUserFunc,
                })
              }
              disabled={CreateUserLoading}>
              {CreateUserLoading ? "Signing Up..." : "Sign Up"}
            </AlertDialogAction>
          ) : (
            <AlertDialogAction
              className="bg-primary_red hover:bg-secondary_red"
              onClick={() =>
                handleLogin({
                  loginDetails,
                  setErrorMsg,
                  setOpen,
                  loginUserFunc,
                  setUser,
                  getUser,
                })
              }
              disabled={loginLoading}>
              {loginLoading ? "Logging In..." : "Login"}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
        <p className="flex justify-center mt-4">
          {mode === "signup" ? (
            <>
              Already have an account?{" "}
              <span
                className="font-semibold underline cursor-pointer text-secondary_red  "
                onClick={() => setMode("login")}
                
                >
                Login
              </span>
            </>
          ) : (
            <>
              Don’t have an account?
              <span
                className="font-semibold underline cursor-pointer text-secondary_red"
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
