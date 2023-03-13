import { createContext, useState } from "react";


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState();

  const handleLogout = () => {
    setLoggedInUser();
  };


  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};
