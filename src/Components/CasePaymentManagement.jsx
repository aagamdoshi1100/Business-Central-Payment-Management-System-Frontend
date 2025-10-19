import React from "react";
import { Typography, Stack, Paper, Button } from "@mui/material";
import DataTable from "./DataTable";
import { columns, rows } from "../data";
import Sidebar from "./Sidebar";
import { useState } from "react";
import CreateCaseForm from "./CreateCaseForm";
const CasePaymentManagement = () => {
  const [isFormEnabled, setFormEnabled] = useState(false);

  return (
    <div className="container">
      <Sidebar />
      <Stack className="rightSidePage">
        <Stack spacing={2}>
          <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
            <Typography variant="h5" component="h5">
              Case & Payment Management Dashboard
            </Typography>
            {isFormEnabled && (
              <CreateCaseForm
                isFormEnabled={isFormEnabled}
                setFormEnabled={setFormEnabled}
              />
            )}
            <Button
              variant="contained"
              onClick={() => setFormEnabled(!isFormEnabled)}
            >
              Create Case
            </Button>
          </Stack>

          <DataTable columns={columns} rows={rows} title="Cases" />
        </Stack>
      </Stack>
    </div>
  );
};

export default CasePaymentManagement;
