import {
  Button,
  InputAdornment,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const { submitloginData, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: { email: "", password: "" },
    mode: "onBlur",
  });

  const data = watch();

  return (
    <div className="authContainer">
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
          <form onSubmit={handleSubmit(() => submitloginData(data, reset))}>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ mb: 2 }}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              size="small"
              fullWidth
              sx={{ mb: 2 }}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button type="submit" variant="contained" fullWidth>
              {loading ? "Loading..." : "Submit"}
            </Button>
          </form>
          <Typography variant="p" component="p" className="">
            Don't have an account?{" "}
            <Link to="/signup" className="link">
              Create Account
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Login;
