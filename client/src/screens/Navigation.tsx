import { Input } from "@/components/ui/input"
import { LogOut as LogOutIcon } from "lucide-react"
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
import { Outlet } from "react-router"
import UserContext from "@/context/UserContext"
import { IUserContext } from "@/context/UserContext"
import { useContext } from "react"
import { logout } from "@/services/logout"
import { useNavigate } from "react-router"
function Navigation() {
  const context = useContext<IUserContext | null>(UserContext)
  const setUser = context ? context.setUser : null
  const user = context ? context.user : null
  const navigate = useNavigate()
  return (
    <>
      <div className="  flex gap-4 py-2 justify-around items-center  bg-tertiary_color text-primary_red">
        <div className="rounded-full bg-yellow-200 h-11 ml-6 border-primary_red ">
          photo
        </div>
        <Input className="lg:w-2/6 " placeholder="search" />
        <button>🔍</button>
        {/* Logout btn  */}
        {user ? (
          <>
            <AlertDialog>
              <AlertDialogTrigger>
                <LogOutIcon width={70} className="cursor-pointer" />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-primary_red"
                    onClick={() => {
                      logout({ setUser, navigate })
                    }}>
                    Log Out
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        ) : (
          <></>
        )}
      </div>
      <Outlet />
    </>
  )
}

export default Navigation
