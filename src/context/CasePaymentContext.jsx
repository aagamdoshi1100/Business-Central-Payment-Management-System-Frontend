import * as XLSX from "xlsx";
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
  const [fileData, setFileData] = useState({
    data: [],
    name: "",
    errMess: "",
    loading: false,
  });

  const initiatePayment = async (rowData) => {
    try {
      const res = await api.post(`/payment`, rowData);
      setCasesDetails((prev) => {
        return prev?.map((c) => {
          if (c._id === rowData?.caseId) {
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

  const handleUploadedFile = (e) => {
    if (fileData?.loading) return;
    try {
      const file = e.target.files[0];
      if (!file) {
        toast.error("No file selected");
        setFileData((prev) => ({ ...prev, loading: false }));
        return;
      }
      const reader = new FileReader();

      reader.onload = async (event) => {
        setFileData((prev) => ({
          ...prev,
          loading: true,
          name: file?.name,
        }));
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(sheet);
        console.log(json, "json");
        if (
          (!json[0].serviceProvider,
          !json[0].workReferenceId,
          !json[0].description,
          !json[0].dueDate,
          !json[0].amount)
        ) {
          toast.error("Invalid columns");
          setFileData((prev) => ({
            ...prev,
            errMess: "Invalid columns",
          }));
        } else {
          try {
            const res = await api.post(`/cases/createBulkCases`, json);
            setFileData((prev) => ({
              ...prev,
              name: file.name,
              data: json,
            }));
            toast.success(res.data.message, {
              style: { whiteSpace: "pre-line" },
            });
          } catch (err) {
            if (err.response.status === 413) {
              toast.error("Only 15MB sheet is alloweded");
            }
            toast.error(err.response.data.message, {
              style: { whiteSpace: "pre-line" },
            });
          } finally {
            setFileData((prev) => ({
              ...prev,
              loading: false,
            }));
          }
        }
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      toast.error(error);
    } finally {
      setFileData((prev) => ({
        ...prev,
        loading: false,
        name: "",
        errMess: "",
      }));
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
        handleUploadedFile,
        fileData,
      }}
    >
      {children}
    </CasePaymentContext.Provider>
  );
};

// Custom Hook to use context easily
export const useCP = () => useContext(CasePaymentContext);
