import { Typography, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import DataTable from "./DataTable";
import useFetch from "../hooks/useFetch";
import Sidebar from "./Sidebar";
import { userPermissionColums } from "../data";
import { usePermission } from "../context/UserPermissionContext";

const UserPermissions = () => {
  const { data, loading, error } = useFetch("/user", "GET");
  const { updateUserPermission, users, setUsers } = usePermission();

  useEffect(() => {
    if (data?.users) {
      setUsers(data.users);
    }
  }, [data]);

  return (
    <div className="container">
      <Sidebar />
      <Stack className="rightSidePage">
        <Typography variant="h4" component={"h4"}>
          User Roles And Permission
        </Typography>
        <Typography variant="subtitle1" component={"p"}>
          Manage roles and their access permissions within the system.
        </Typography>
        <DataTable
          columns={userPermissionColums}
          rows={users}
          title={"Users"}
          additionalData={{ updateUserPermission }}
        />
      </Stack>
    </div>
  );
};

export default UserPermissions;
