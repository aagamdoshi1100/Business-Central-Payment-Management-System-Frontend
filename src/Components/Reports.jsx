import { Stack } from "@mui/material";
import React from "react";
import Sidebar from "./Sidebar";

const Reports = () => {
  return (
    <div className="container">
      <Sidebar />
      <Stack className="rightSidePage"></Stack>
    </div>
  );
};

export default Reports;
