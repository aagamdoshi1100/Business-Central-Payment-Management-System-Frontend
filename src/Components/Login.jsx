import { Button, TextField, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="loginContainer">
      <div className="left">
        <div className="leftContent">
          <Typography variant="h3" component="h3">
            Business Central Payment Management System
          </Typography>

          <Typography variant="h6" component="h6">
            Stremline your payment management
          </Typography>
        </div>
      </div>
      <div className="right">
        <div className="rightContent">
          <Typography variant="h4" component="h4">
            Login
          </Typography>

          <Typography variant="p" component="p">
            Enter your credentials to access your account
          </Typography>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            fullWidth
          />
          <Button variant="contained" fullWidth>
            Submit
          </Button>
          <Typography variant="p" component="p" className="">
            Don't have an account?{" "}
            <Link href="/signup" className="link">
              Create Account
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Login;
