import { Input } from "@/components/ui/input"
import { LogOut } from "lucide-react"
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

function Navigation() {
  return (
    <>
      <div className="  flex gap-4 py-2 items-center  bg-fuchsia-200">
        <div className="rounded-full bg-yellow-200 h-11 ml-6">photo</div>
        <Input placeholder="search" />
        <button>🔍</button>
        {/* Logout alert  */}
        <AlertDialog>
          <AlertDialogTrigger>
            {" "}
            <LogOut color="#7981ec" width={70} className="cursor-pointer" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Log Out</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <Outlet />
    </>
  )
}

export default Navigation
