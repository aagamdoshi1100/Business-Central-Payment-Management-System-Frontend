import React, { createContext, useState, useContext } from "react";

const DashboardContext = createContext();

export const DashboardContextProvider = ({ children }) => {
  const [keyMetrics, setKeyMetrics] = useState({});
  const [isDashboardAccessAllowed, setDashboardAccessAllowed] = useState(true);

  return (
    <DashboardContext.Provider
      value={{
        keyMetrics,
        setKeyMetrics,
        isDashboardAccessAllowed,
        setDashboardAccessAllowed,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

// Custom Hook to use context easily
export const useDashboard = () => useContext(DashboardContext);
