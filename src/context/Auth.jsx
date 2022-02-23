import React, { useState, createContext } from "react";

export const AuthProviderAPI = createContext();

const AuthContext = ({ children }) => {
  
  const [auth, setAuth] = useState(() =>
    localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : null
  );
  const [token, setToken] = useState(() =>
    localStorage.getItem("token")
      ? localStorage.getItem("token")
      : null
  );

  const contextData = {
    auth,
    setAuth,
    token,
    setToken
  };


  return (
    <AuthProviderAPI.Provider value={contextData}>
      {children}
    </AuthProviderAPI.Provider>
  );
};

export default AuthContext;
