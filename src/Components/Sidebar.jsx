import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import Person3OutlinedIcon from "@mui/icons-material/Person3Outlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import AppRegistrationOutlinedIcon from "@mui/icons-material/AppRegistrationOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SummarizeIcon from "@mui/icons-material/Summarize";
import BatchPredictionIcon from "@mui/icons-material/BatchPrediction";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";

const Sidebar = () => {
  const { authenticatedUser, logout } = useAuth();
  return (
    <>
      <Box className="sideContainer">
        <Stack>
          <img
            src="src\assets\logo-without-bg.png"
            alt="Company Logo"
            className="logo"
            width={230}
            height={60}
          />

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "sideItem active" : "sideItem"
            }
          >
            <DashboardOutlinedIcon />
            <Typography variant="body1">Dashboard</Typography>
          </NavLink>

          <NavLink
            to="/cash-payment-management"
            className={({ isActive }) =>
              isActive ? "sideItem active" : "sideItem"
            }
          >
            <CreditCardOutlinedIcon color="gray" />
            <Typography variant="body1">Cases</Typography>
          </NavLink>

          <NavLink
            to="/roles-and-permissions"
            className={({ isActive }) =>
              isActive ? "sideItem active" : "sideItem"
            }
          >
            <Person3OutlinedIcon color="gray" />
            <Typography variant="body1">Roles And Permission</Typography>
          </NavLink>

          <NavLink
            to="/reports"
            className={({ isActive }) =>
              isActive ? "sideItem active" : "sideItem"
            }
          >
            <BarChartOutlinedIcon color="gray" />
            <Typography variant="body1">Reports</Typography>
          </NavLink>

          <NavLink
            to="/service-provider-registration"
            className={({ isActive }) =>
              isActive ? "sideItem active" : "sideItem"
            }
          >
            <AppRegistrationOutlinedIcon color="gray" />
            <Typography variant="body1">
              Service Provider Registration
            </Typography>
          </NavLink>

          <NavLink
            to="/logs"
            className={({ isActive }) =>
              isActive ? "sideItem active" : "sideItem"
            }
          >
            <SummarizeIcon color="gray" />
            <Typography variant="body1">Logs</Typography>
          </NavLink>
          <NavLink
            to="/bulk-operations"
            className={({ isActive }) =>
              isActive ? "sideItem active" : "sideItem"
            }
          >
            <PlaylistAddCheckIcon color="gray" />
            <Typography variant="body1">Bulk Operations</Typography>
          </NavLink>
        </Stack>
        <Button
          onClick={logout}
          sx={{ justifyContent: "flex-start" }}
          className="sideItem sideItem-logout"
        >
          <LogoutOutlinedIcon color="gray" />
          <Typography variant="body1">{authenticatedUser?.name}</Typography>
        </Button>
      </Box>
      <div className="bgPadding"></div>
    </>
  );
};

export default Sidebar;
