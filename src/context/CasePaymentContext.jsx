import axios from "axios";
import React, { createContext, useState, useContext } from "react";
import { toast } from "react-toastify";
import api from "../utils/axios";

const CasePaymentContext = createContext();

export const CasePaymentContextProvider = ({ children }) => {
  const [casesDetails, setCasesDetails] = useState([]);
  const [isFinalFormEnabled, setIsFinalFormEnabled] = useState({
    flag: false,
    data: {},
  });
  const [transactionDetails, setTransactionDetails] = useState({});

  const initiatePayment = async (
    caseId,
    serviceProviderId,
    agentId,
    amount
  ) => {
    try {
      const res = await api.post(`/payment`, {
        caseId,
        serviceProviderId,
        agentId,
        amount,
      });
      setCasesDetails((prev) => {
        return prev?.map((c) => {
          if (c._id === caseId) {
            return {
              ...c,
              status: "Paid",
            };
          }
          return c;
        });
      });
      toast.success(res?.data?.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const getTransactionDetails = async (caseId) => {
    try {
      const res = await api.get(`/payment/cases/${caseId}`);
      setTransactionDetails(res?.data?.data);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <CasePaymentContext.Provider
      value={{
        casesDetails,
        setCasesDetails,
        isFinalFormEnabled,
        setIsFinalFormEnabled,
        initiatePayment,
        getTransactionDetails,
        transactionDetails,
      }}
    >
      {children}
    </CasePaymentContext.Provider>
  );
};

// Custom Hook to use context easily
export const useCP = () => useContext(CasePaymentContext);
