import { User } from "../types/types"
export const logout = async (
  setUser: React.Dispatch<React.SetStateAction<User | null>> | null
): Promise<void> => {
    if(setUser){
        console.log("Logout function called")
        setUser(null);
    }
}
