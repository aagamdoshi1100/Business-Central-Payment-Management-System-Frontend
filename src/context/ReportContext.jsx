import React, { createContext, useState, useContext } from "react";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

const ReportContext = createContext();

export const ReportContextProvider = ({ children }) => {
  const [reports, setReports] = useState([]);

  const generateExcelWithData = () => {
    if (!reports || reports.length === 0) {
      alert("No data available to download");
      return;
    }

    try {
      const excelData = reports.map((report) => ({
        "Case Number": report.caseNumber || "N/A",
        "Service Provider": report.serviceProviderName || "N/A",
        Agent: report.agentName || "N/A",
        Amount: report.amount ? `₹${report.amount.toLocaleString()}` : "₹0",
        "Transaction ID": report.transactionId || "N/A",
        "Created Date": report.createdAt
          ? new Date(report.createdAt).toLocaleDateString()
          : "N/A",
        "Payment Date": report.paymentDate
          ? new Date(report.paymentDate).toLocaleDateString()
          : "N/A",
        Status: report.status || "N/A",
        Remarks: report.remarks || "N/A",
      }));

      // Create workbook and worksheet
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(excelData);

      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(wb, ws, "Payment Reports");

      // Generate Excel file and trigger download
      const fileName = `payment-reports-${
        new Date().toISOString().split("T")[0]
      }.xlsx`;
      XLSX.writeFile(wb, fileName);
      toast.success("Data downloaded successfully");
    } catch (error) {
      console.error("Error generating Excel file:", error);
      toast.error("Error downloading file");
    }
  };
  return (
    <ReportContext.Provider
      value={{ reports, setReports, generateExcelWithData }}
    >
      {children}
    </ReportContext.Provider>
  );
};

// Custom Hook to use context easily
export const useReport = () => useContext(ReportContext);
