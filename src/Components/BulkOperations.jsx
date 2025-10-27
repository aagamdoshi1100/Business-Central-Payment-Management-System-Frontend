import React from "react";
import usePaginatedData from "../hooks/usePaginatedData";
import DataTable from "./DataTable";
import { bulkOperationsColumns } from "../data";
import Sidebar from "./Sidebar";
import { Stack, Typography } from "@mui/material";
import { useLog } from "../context/LogContext";
import AccessDenied from "./AccessDenied";

const BulkOperations = () => {
  const {
    totalCount,
    loading,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    refresh,
  } = usePaginatedData("logs/blukLogs");

  const { bulkOperations, isLogAccessAllowed } = useLog();

  return (
    <div className="container">
      <Sidebar />
      <Stack className="rightSidePage">
        {isLogAccessAllowed ? (
          <>
            <Typography variant="h5" component="h5" mb={3}>
              Bulk Operations
            </Typography>
            <DataTable
              columns={bulkOperationsColumns}
              rows={bulkOperations ?? []}
              title="Logs"
              totalCount={totalCount}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
            />
          </>
        ) : (
          <AccessDenied />
        )}
      </Stack>
    </div>
  );
};

export default BulkOperations;
