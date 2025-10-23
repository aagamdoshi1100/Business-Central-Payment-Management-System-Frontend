import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import api from "../utils/axios.js";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [authenticatedUser, setAuthenticatedUser] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitloginData = async (data, reset) => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await api.post(`/user/login`, data);
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
      await api.post(`/user/logout`);
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      setAuthenticatedUser(null);
      navigate("/login");
    }
  };

  const me = async () => {
    try {
      const res = await api.get("/user/me");
      setAuthenticatedUser(res?.data?.user);
    } catch (error) {
      console.error(error);
    } finally {
      setCheckingAuth(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authenticatedUser,
        submitloginData,
        loading,
        logout,
        me,
        setAuthenticatedUser,
        checkingAuth,
        setCheckingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to use context easily
export const useAuth = () => useContext(AuthContext);
