import { User } from "@/types/types";
import { useState, ReactNode, createContext, useEffect } from "react";
import { decodeToken } from "react-jwt";
import { GET_USER } from "@/graphql/Query/user.query";
import { useLazyQuery } from "@apollo/client";
import { fetchUser } from "@/services/fetchUser";

export interface IUserContext {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<IUserContext | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [getUser] = useLazyQuery(GET_USER);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = decodeToken<{
        email: string;
        iat: number;
        exp: number;
      } | null>(token);

      if (decoded?.email) {
        fetchUser({
          email: decoded.email,
          getUser,
          setUser,
        });
      }
    }
  }, []); 

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
