import { ReactEventHandler, useState } from "react"
import { User } from "lucide-react"

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

function Login() {
  interface ILoginDetails {
    email: string
    password: string
  }
  const [open, setOpen] = useState<boolean>(false)
  const [loginDetails, setLoginDetails] = useState<ILoginDetails>({
    email: "",
    password: "",
  })

  const login: ReactEventHandler = async (e) => {
    e.preventDefault()
    console.log(loginDetails)
    setOpen(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>
        <User color="#7981ec" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Log In to your account</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex-col p-4">
          <div className="flex gap-14 justify-between mb-4">
            <Label className="text-xl">Email</Label>
            <Input
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setLoginDetails((prevDetails: ILoginDetails) => ({
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
                setLoginDetails((prevDetails: ILoginDetails) => ({
                  ...prevDetails,
                  password: e.target.value,
                }))
              }}
            />
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={login}>Log In</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default Login
