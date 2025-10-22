import { Typography, Stack } from "@mui/material";
import DataTable from "./DataTable";
import Sidebar from "./Sidebar";
import { userPermissionColums } from "../data";
import { usePermission } from "../context/UserPermissionContext";
import usePaginatedData from "../hooks/usePaginatedData";

const UserPermissions = () => {
  const {
    totalCount,
    loading,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    refresh,
  } = usePaginatedData("user");

  const { updateUserPermission, users } = usePermission();

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
          totalCount={totalCount}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      </Stack>
    </div>
  );
};

export default UserPermissions;
