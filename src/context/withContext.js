import React, { useState } from "react";
import AuthUserContext from "./context";
const UserContext = (props) => {
  let localUser = JSON.parse(localStorage.getItem("user"));
  if (localUser === null) localUser = [];

  let localToken = localStorage.getItem("token");
  if (localToken === null) localToken = "";

  let localIsAuthenticated = JSON.parse(
    localStorage.getItem("isAuthenticated")
  );

  const [user, setUser] = useState(localUser);

  const [isAuthenticated, setIsAuthenticated] = useState(localIsAuthenticated);

  const [token, setToken] = useState(localToken);

 
  const setNewToken = (token) => {
    setToken(token);
  };

  const signIn = (user) => {
    setUser(user);
  };

  const checkAuthenticated = (isAuthenticated) => {
    setIsAuthenticated(isAuthenticated);
  };

  return (
    <AuthUserContext.Provider
      value={{
        user,
        isAuthenticated,
        token,
        signIn,
        checkAuthenticated,
        setNewToken,
      }}
    >
      {props.children}
    </AuthUserContext.Provider>
  );
};

export default UserContext;