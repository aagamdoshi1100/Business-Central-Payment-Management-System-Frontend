import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
import SPForm from "./Components/SPForm";
import CasePaymentManagement from "./Components/CasePaymentManagement";
import SignUp from "./Components/SignUp";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import CreateCaseForm from "./Components/CreateCaseForm";
import UserPermissions from "./Components/UserPermissions";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Components/Dashboard";
import Reports from "./Components/Reports";

function App() {
  const [isFormEnabled, setFormEnabled] = useState(true);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/service-provider-registration" element={<SPForm />} />
          <Route
            path="/cash-payment-management"
            element={<CasePaymentManagement />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/roles-and-permissions" element={<UserPermissions />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </BrowserRouter>
      {/* {isFormEnabled && <CreateCaseForm />}
      <div className="floatBtn" onClick={() => setFormEnabled(!isFormEnabled)}>
        Create Case
      </div> */}

      <ToastContainer />
    </>
  );
}

export default App;
