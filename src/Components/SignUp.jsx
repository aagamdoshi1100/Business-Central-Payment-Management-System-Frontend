import { Button, MenuItem, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      accessType: "",
    },
    mode: "onBlur",
  });

  const data = watch();
  console.log(data);

  const onSubmit = async () => {
    if (loading) return;
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/signup`,
        data
      );
      const successMessage = res?.data?.message || "Signup successful";
      toast.success(successMessage);
      reset();
    } catch (error) {
      console.error(error);
      const serverMessage = error?.response?.data?.message;
      const fallbackMessage = "Something went wrong. Please try again.";
      toast.error(serverMessage || fallbackMessage);
      setError(serverMessage || fallbackMessage);
    } finally {
      setLoading(false);
    }
  };

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
            Signup
          </Typography>

          <Typography variant="p" component="p">
            Enter your credentials to create an Admin account
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              size="small"
              sx={{ mb: 2 }}
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Minimum 3 characters required",
                },
              })}
              error={errors.name}
              helperText={errors?.name?.message}
              fullWidth
            />

            <TextField
              id="email"
              label="Email"
              variant="outlined"
              size="small"
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
              fullWidth
            />

            <TextField
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              size="small"
              sx={{ mb: 2 }}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              fullWidth
            />

            <TextField
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              variant="outlined"
              size="small"
              sx={{ mb: 2 }}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === data.password || "Passwords do not match",
              })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              fullWidth
            />

            <TextField
              select
              label="Access Type"
              size="small"
              sx={{ mb: 1 }}
              {...register("accessType", {
                required: "Access type is required",
              })}
              defaultValue=""
              fullWidth
            >
              <MenuItem value={"agent"}>Agent</MenuItem>
              <MenuItem value={"admin"}>Admin</MenuItem>
            </TextField>
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              {loading ? "Loading..." : "Submit"}
            </Button>
          </form>
          <Typography variant="p" component="p" className="">
            Have an account?{" "}
            <Link to={"/login"} className="link">
              Login
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
