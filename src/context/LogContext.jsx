import React, { createContext, useContext, useState } from "react";

const LogContext = createContext();

export const LogProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);
  const [bulkOperations, setBulkOperations] = useState([]);

  return (
    <LogContext.Provider
      value={{ logs, setLogs, bulkOperations, setBulkOperations }}
    >
      {children}
    </LogContext.Provider>
  );
};

export const useLog = () => useContext(LogContext);
