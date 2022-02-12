import React, { useState, useContext, createContext } from "react";
import AuthorizationService from '../services/AuthorizationService';


const authContext = createContext();
// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  )
}
// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};
// Provider hook that creates auth object and handles state
function useProvideAuth() {
  // get user data from localStorage
  const storeUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(storeUser);
  // ... to save the user to state.
  const loginInSystem = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const signin = (credentials) => {
    return (async () => {
      const { token } = await AuthorizationService.signin(credentials)
      console.log('token', token);
      const userData = await AuthorizationService.me();
      loginInSystem(userData);
      return userData;
    })();
  };

  const signout = () => {
    localStorage.removeItem('user');
    setUser(null);
    return null;
  };

  const isAuthenticated = () => {
    return (user?.login || null) !== null;
  };

  // Return the user object and auth methods
  return {
    user,
    signin,
    signout,
    isAuthenticated,
  };
}
