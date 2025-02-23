import { createContext, SetStateAction, useState } from "react";

interface IUserContext {
  token: string;
  setToken: React.Dispatch<SetStateAction<string>>;
}

interface UserContextProviderProps {
  children: React.ReactNode;

}

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext<IUserContext>({ token: "" , setToken: () => {} });

export const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }: UserContextProviderProps) => {
  const [token, setToken] = useState("")
  return (
    <UserContext.Provider value={{ token, setToken }}>
      {children}
    </UserContext.Provider>
  )
}