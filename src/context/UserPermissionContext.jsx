import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import api from "../utils/axios";

const UserPermissionContext = createContext();

export const UserPermissionProvider = ({ children }) => {
  const [permisison, setPermission] = useState({
    flag: true,
    data: {},
  });
  const [users, setUsers] = useState([]);

  const updateUserPermission = async (accountId, status, privilege) => {
    try {
      const res = await api.put(`/user/${accountId}`, { accountId, status });
      setUsers((prev) => {
        return prev?.map((us) => {
          if (us?._id === res?.data?.user?._id) {
            return {
              ...us,
              accessEnabled: res?.data?.user?.accessEnabled,
            };
          }
          return us;
        });
      });
      toast.success(res?.data?.message);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <UserPermissionContext.Provider
      value={{
        permisison,
        setPermission,
        users,
        setUsers,
        updateUserPermission,
      }}
    >
      {children}
    </UserPermissionContext.Provider>
  );
};

export const usePermission = () => useContext(UserPermissionContext);
