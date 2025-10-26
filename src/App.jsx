import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
import SPForm from "./Components/SPForm";
import CasePaymentManagement from "./Components/CasePaymentManagement";
import SignUp from "./Components/SignUp";
import { ToastContainer } from "react-toastify";
import UserPermissions from "./Components/UserPermissions";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Components/Dashboard";
import Reports from "./Components/Reports";
import ProtectedRoute from "./Components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import { useEffect } from "react";
import UserLogs from "./Components/UserLogs";

function App() {
  const { me } = useAuth();
  useEffect(() => {
    me();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/service-provider-registration"
          element={
            <ProtectedRoute>
              <SPForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cash-payment-management"
          element={
            <ProtectedRoute>
              <CasePaymentManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/roles-and-permissions"
          element={
            <ProtectedRoute>
              <UserPermissions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sidebar"
          element={
            <ProtectedRoute>
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/logs"
          element={
            <ProtectedRoute>
              <UserLogs />
            </ProtectedRoute>
          }
        />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
