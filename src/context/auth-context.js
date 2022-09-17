import React, { useState } from "react";

const defaultAuthContext = {
  isAuth: false,
  login: () => {}
};

export const AuthContext = React.createContext(defaultAuthContext);

const AuthContextProvider = ({ children }) => {
  const [isAthenticated, setIsAthenticated] = useState();

  const loginHandelr = () => {
    setIsAthenticated(true);
  };

  const authContext = {
    isAuth: isAthenticated,
    login: loginHandelr
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
