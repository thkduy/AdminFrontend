import { createContext } from "react";

const authUserContext = createContext({
  user: [],
  isAuthenticated: false,
  token: "",
  signIn: () => {},
  checkAuthenticated: () => {},
  setNewToken: () => {},
});

export default authUserContext;