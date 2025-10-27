import React, { createContext, useContext, useState } from "react";

const LogContext = createContext();

export const LogProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);
  const [bulkOperations, setBulkOperations] = useState([]);
  const [isLogAccessAllowed, setLogAccessAllowed] = useState(true);

  return (
    <LogContext.Provider
      value={{
        logs,
        setLogs,
        bulkOperations,
        setBulkOperations,
        isLogAccessAllowed,
        setLogAccessAllowed,
      }}
    >
      {children}
    </LogContext.Provider>
  );
};

export const useLog = () => useContext(LogContext);
