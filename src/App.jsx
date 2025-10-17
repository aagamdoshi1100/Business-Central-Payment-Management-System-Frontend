import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
import SPForm from "./Components/SPForm";
import CasePaymentManagement from "./Components/CasePaymentManagement";
import SignUp from "./Components/SignUp";
import { ToastContainer } from "react-toastify";

function App() {
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
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
