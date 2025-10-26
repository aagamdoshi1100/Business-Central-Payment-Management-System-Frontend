import React, { createContext, useContext, useState } from "react";

const LogContext = createContext();

export const LogProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);
  const value = {
    logs,
    setLogs,
  };

  return <LogContext.Provider value={value}>{children}</LogContext.Provider>;
};

export const useLog = () => useContext(LogContext);
