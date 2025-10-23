import React, { useEffect } from "react";
import { Typography, Stack, Button } from "@mui/material";
import DataTable from "./DataTable";
import { columns } from "../data";
import Sidebar from "./Sidebar";
import { useState } from "react";
import CreateCaseForm from "./CreateCaseForm";
import useFetch from "../hooks/useFetch";
import { toast } from "react-toastify";
import axios from "axios";
import { useCP } from "../context/CasePaymentContext";
import PaymentConfirmation from "./PaymentConfirmation";
import usePaginatedData from "../hooks/usePaginatedData";
import api from "../utils/axios";

const CasePaymentManagement = () => {
  const {
    totalCount,
    loading,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    refresh,
  } = usePaginatedData("cases"); //Getting first 10 cases

  const {
    loading: loadUsers,
    error: errorUsers,
    data: usersData,
  } = useFetch("/user", "GET"); //Getting first 10 users

  const {
    loading: loadSP,
    err: errSP,
    data: serviceProviders,
  } = useFetch("/service-provider", "get"); // Getting all service providers

  const {
    casesDetails,
    setCasesDetails,
    isFinalFormEnabled,
    setIsFinalFormEnabled,
  } = useCP();

  const filteredAgents = usersData?.users
    ? usersData?.users?.filter((fil) => fil?.accessType === "agent")
    : [];

  const [isFormEnabled, setFormEnabled] = useState(false);

  useEffect(() => {}, [serviceProviders]);

  const handleAgentChange = async (e, caseNumber) => {
    try {
      const res = await api.put(`/cases/${caseNumber}`, {
        assignedTo: e.target.value,
      });
      if (res.statusText === "OK") {
        setCasesDetails((prev) => {
          return prev.map((ca) => {
            if (ca.caseNumber === caseNumber) {
              return {
                ...ca,
                status: "In progress",
              };
            }
            return ca;
          });
        });
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="container">
      <Sidebar />
      <Stack className="rightSidePage">
        <Stack spacing={2}>
          <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
            <Typography variant="h5" component="h5">
              Cases & Payments Management
            </Typography>
            {isFormEnabled && (
              <CreateCaseForm
                isFormEnabled={isFormEnabled}
                setFormEnabled={setFormEnabled}
                serviceProviders={serviceProviders}
              />
            )}
            <Button
              variant="contained"
              onClick={() => setFormEnabled(!isFormEnabled)}
            >
              Create Case
            </Button>
          </Stack>
          {isFinalFormEnabled.flag && <PaymentConfirmation />}

          <DataTable
            columns={columns}
            rows={casesDetails ?? []}
            title="Cases"
            totalCount={totalCount}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            additionalData={{
              agents: filteredAgents,
              handleAgentChange,
              setIsFinalFormEnabled,
            }}
          />
        </Stack>
      </Stack>
    </div>
  );
};

export default CasePaymentManagement;
