import React, { useState, useContext, createContext } from "react";

const fakeAuth = {
  isAuthenticated: false,
  signin(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(() => cb({
      userName: 'Eduard Eliseev'
    }), 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(() => cb(), 100);
  }
};


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
  const [user, setUser] = useState(null);
  // ... to save the user to state.
  const signin = cb => {
    return fakeAuth.signin(({ userName }) => {
      setUser({
        userName
      });
      cb();
    });
  };

  const signout = cb => {
    return fakeAuth.signout(() => {
      setUser(null);
      cb();
    });
  };
  const isAuthenticated = () => {
    return user.userName !== null;
  };
  // Return the user object and auth methods
  return {
    user,
    signin,
    signout,
    isAuthenticated,
  };
}
