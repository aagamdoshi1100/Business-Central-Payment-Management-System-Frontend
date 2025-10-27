import React, { useEffect } from "react";
import { generateLargeXLSX } from "../utils/functions.js";
import Sidebar from "./Sidebar.jsx";
import { Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const GenerateCasesDataset = () => {
  useEffect(() => {
    generateLargeXLSX();
  }, []);
  return (
    <div className="container">
      <Sidebar />
      <Stack className="rightSidePage">
        <Typography variant="h5" component="h5" mb={3}>
          Generate Cases sheet
        </Typography>
        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? "link" : "link")}
        >
          <Typography variant="body1">Go to Dashboard</Typography>
        </NavLink>
      </Stack>
    </div>
  );
};

export default GenerateCasesDataset;
