import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
import SPForm from "./Components/SPForm";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/service-provider-registration" element={<SPForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
