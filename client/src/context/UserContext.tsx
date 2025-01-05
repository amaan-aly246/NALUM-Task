import { User } from "@/types/types"
import { useState, ReactNode, createContext } from "react"

interface IUserContext {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}
const UserContext = createContext<IUserContext | null>(null)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
