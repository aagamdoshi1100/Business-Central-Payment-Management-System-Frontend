import React, { createContext, useState, useContext } from "react";

const CasePaymentContext = createContext();

export const CasePaymentContextProvider = ({ children }) => {
  const [casesDetails, setCasesDetails] = useState([]);
  const [isFinalFormEnabled, setIsFinalFormEnabled] = useState({
    flag: false,
    data: {},
  });
  return (
    <CasePaymentContext.Provider
      value={{
        casesDetails,
        setCasesDetails,
        isFinalFormEnabled,
        setIsFinalFormEnabled,
      }}
    >
      {children}
    </CasePaymentContext.Provider>
  );
};

// Custom Hook to use context easily
export const useCP = () => useContext(CasePaymentContext);
