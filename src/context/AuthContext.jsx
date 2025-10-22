import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitloginData = async (data, reset) => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/login`,
        data
      );
      toast.success(res?.data?.message || "Logged in successfully");
      setAuthenticatedUser(res?.data?.user);
      navigate("/dashboard");
      reset();
    } catch (error) {
      const message = error?.response?.data?.message || "Login failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/user/logout`,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      setAuthenticatedUser(null);
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{ authenticatedUser, submitloginData, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to use context easily
export const useAuth = () => useContext(AuthContext);
