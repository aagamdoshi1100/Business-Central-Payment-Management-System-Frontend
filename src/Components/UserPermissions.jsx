import { Typography, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import DataTable from "./DataTable";
import useFetch from "../hooks/useFetch";
import Sidebar from "./Sidebar";

const UserPermissions = () => {
  const { data, loading, error } = useFetch("/user", "GET");

  const keys = data?.users
    ? Object.keys(data?.users?.[0])?.filter(
        (key) => !["_id", "__v"]?.includes(key)
      )
    : [];
  const columns = keys.map((key) => ({ id: key, label: key, minWidth: 100 }));
  const rows = data?.users ? data?.users : [];

  console.log(columns, rows);
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
        <DataTable columns={columns} rows={rows} title={"Users"} />
      </Stack>
    </div>
  );
};

export default UserPermissions;
