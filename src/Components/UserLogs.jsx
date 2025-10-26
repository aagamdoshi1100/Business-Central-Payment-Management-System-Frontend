import React from "react";
import usePaginatedData from "../hooks/usePaginatedData";
import DataTable from "./DataTable";
import { logsColumns } from "../data";
import { useLog } from "../context/LogContext";
import Sidebar from "./Sidebar";
import { Stack, Typography } from "@mui/material";

const UserLogs = () => {
  const {
    totalCount,
    loading,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    refresh,
  } = usePaginatedData("logs");

  const { logs } = useLog();
  return (
    <div className="container">
      <Sidebar />
      <Stack className="rightSidePage">
        <Typography variant="h5" component="h5" mb={3}>
          User Logs
        </Typography>
        <DataTable
          columns={logsColumns}
          rows={logs ?? []}
          title="Logs"
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

export default UserLogs;
