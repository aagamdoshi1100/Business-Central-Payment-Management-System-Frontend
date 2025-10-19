import React from "react";
import { Typography, Stack, Paper } from "@mui/material";
import DataTable from "./DataTable";
import { columns, rows } from "../data";
import Sidebar from "./Sidebar";

const CasePaymentManagement = () => {
  return (
    <div className="container">
      <Sidebar />
      <Stack className="rightSidePage">
        <Stack spacing={2}>
          <Typography variant="h5" component="h5">
            Case & Payment Management Dashboard
          </Typography>

          <DataTable columns={columns} rows={rows} title="Cases" />
        </Stack>
      </Stack>
    </div>
  );
};

export default CasePaymentManagement;
