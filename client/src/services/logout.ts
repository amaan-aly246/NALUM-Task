import { User } from "../types/types"
import { NavigateFunction } from "react-router"
export const logout = async (
  {
    setUser,
    navigate,
  }: { setUser: React.Dispatch<React.SetStateAction<User | null>> | null
    navigate : NavigateFunction
   }
): Promise<void> => {
  if (setUser) {
    setUser(null)
    navigate ("/")
  }
}
