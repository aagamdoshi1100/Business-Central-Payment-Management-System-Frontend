import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CasePaymentContextProvider } from "./context/CasePaymentContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { UserPermissionProvider } from "./context/UserPermissionContext.jsx";
import { DashboardContextProvider } from "./context/DashboardContext.jsx";
import { ReportContextProvider } from "./context/ReportContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { LogProvider } from "./context/LogContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <LogProvider>
          <UserPermissionProvider>
            <CasePaymentContextProvider>
              <DashboardContextProvider>
                <ReportContextProvider>
                  <App />
                </ReportContextProvider>
              </DashboardContextProvider>
            </CasePaymentContextProvider>
          </UserPermissionProvider>
        </LogProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
