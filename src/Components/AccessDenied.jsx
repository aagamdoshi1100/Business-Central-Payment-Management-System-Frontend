import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";

const AccessDenied = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        bgcolor: "#f9fafb",
        px: 2,
      }}
    >
      {/* Shield / Alert Icon */}
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          bgcolor: "#fdecea",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 3,
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 40, color: "#d32f2f" }} />
      </Box>

      {/* Title */}
      <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
        Access Denied
      </Typography>

      {/* Description */}
      <Typography
        variant="body1"
        sx={{ color: "text.secondary", maxWidth: 400, mb: 4 }}
      >
        You do not have the necessary permissions to view this page. Please
        contact your administrator if you believe this is an error.
      </Typography>

      {/* Buttons */}
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/dashboard")}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            px: 3,
          }}
        >
          Return to Dashboard
        </Button>
      </Stack>
    </Box>
  );
};

export default AccessDenied;
