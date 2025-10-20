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

const CasePaymentManagement = () => {
  const { loading, err, data: casesData } = useFetch("/cases", "get");
  const {
    loading: loadUsers,
    error: errorUsers,
    data: usersData,
  } = useFetch("/user", "GET");

  const filteredAgents = usersData?.users
    ? usersData?.users?.filter((fil) => fil?.accessType === "agent")
    : [];

  const [isFormEnabled, setFormEnabled] = useState(false);
  const [casesDetails, setCasesDetails] = useState([]);

  useEffect(() => {
    setCasesDetails(casesData?.cases);
  }, [casesData?.cases]);

  const handleAgentChange = async (e, caseNumber) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/cases/${caseNumber}`,
        { assignedTo: e.target.value },
        { headers: "Content-Type:application/json" }
      );
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
              />
            )}
            <Button
              variant="contained"
              onClick={() => setFormEnabled(!isFormEnabled)}
            >
              Create Case
            </Button>
          </Stack>

          <DataTable
            columns={columns}
            rows={casesDetails ?? []}
            title="Cases"
            additionalData={{ agents: filteredAgents, handleAgentChange }}
          />
        </Stack>
      </Stack>
    </div>
  );
};

export default CasePaymentManagement;
