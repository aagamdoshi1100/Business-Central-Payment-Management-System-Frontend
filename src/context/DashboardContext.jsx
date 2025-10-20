import React, { createContext, useState, useContext } from "react";

const DashboardContext = createContext();

export const DashboardContextProvider = ({ children }) => {
  const [keyMetrics, setKeyMetrics] = useState({});
  return (
    <DashboardContext.Provider value={{ keyMetrics, setKeyMetrics }}>
      {children}
    </DashboardContext.Provider>
  );
};

// Custom Hook to use context easily
export const useDashboard = () => useContext(DashboardContext);
