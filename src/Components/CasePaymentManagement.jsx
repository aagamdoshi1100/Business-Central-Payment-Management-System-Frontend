import React from "react";
import { Typography, Stack, Paper } from "@mui/material";
import DataTable from "./DataTable";
import { columns, rows } from "../data";

const CasePaymentManagement = () => {
  return (
    <Stack spacing={2} sx={{ p: 2, background: "#efefef" }}>
      <Typography variant="h5" component="h5">
        Case & Payment Management Dashboard
      </Typography>

      <Stack
        spacing={2}
        direction={{ xs: "column", sm: "row" }}
        sx={{ width: "100%" }}
      >
        <Paper elevation={2} sx={{ p: 2, borderRadius: 2, flex: 1 }}>
          <Stack spacing={0.5}>
            <Typography
              variant="overline"
              sx={{ color: "gray" }}
              component={"h4"}
            >
              Total Paid
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: "500" }} component={"p"}>
              $5000
            </Typography>
          </Stack>
        </Paper>

        <Paper elevation={2} sx={{ p: 2, borderRadius: 2, flex: 1 }}>
          <Stack spacing={0.5}>
            <Typography
              variant="overline"
              sx={{ color: "gray" }}
              component={"h4"}
            >
              Total Due
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: "500" }} component={"p"}>
              $5000
            </Typography>
          </Stack>
        </Paper>

        <Paper elevation={2} sx={{ p: 2, borderRadius: 2, flex: 1 }}>
          <Stack spacing={0.5}>
            <Typography
              variant="overline"
              sx={{ color: "gray" }}
              component={"h4"}
            >
              Total Overdue
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: "500" }} component={"p"}>
              $5000
            </Typography>
          </Stack>
        </Paper>
      </Stack>
      <DataTable columns={columns} rows={rows} title="Cases" />
    </Stack>
  );
};

export default CasePaymentManagement;
