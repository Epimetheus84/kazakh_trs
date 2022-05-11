import React, { useState, useContext, createContext } from "react";
import UserService from '../services/UserService';

const usersContext = createContext();

export function ProvideUsers({ children }) {
  const users = useProvideUsers();

  return (
    <usersContext.Provider value={users}>
      {children}
    </usersContext.Provider>
  );
}

export const useUsers = () => {
  return useContext(usersContext);
}

function useProvideUsers() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  const createUser = (userData) => {
    return (async () => {
      const user = await UserService.createUser(userData);
      setUser(user);
      return user;
    })();
  }

  const unsetUser = () => {
    setUser(null);
  }

  const getUsersList = () => {
    return (async () => {
      const users = await UserService.getUsersList();
      setUsers(users);
      return users;
    })();
  }

  const getUser = (userName = '') => {
    return (async () => {
      const user = await UserService.getUser(userName);
      setUser(user);
      return user;
    })();
  }

  const updateUser = (userName = '', userData = {}) => {
    return (async () => {
      const user = await UserService.updateUser(userName, userData);
      setUser(user);
      return user;
    })();
  }

  const deleteUser = (userName = '') => {
    return (async () => {
      const user = await UserService.deleteUser(userName);
      setUser(null);
      return user;
    })();
  }

  return {
    users,
    user,
    createUser,
    unsetUser,
    getUsersList,
    getUser,
    updateUser,
    deleteUser,
  };
}
