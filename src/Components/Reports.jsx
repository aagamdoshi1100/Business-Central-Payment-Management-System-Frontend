// src/components/Reports.jsx
import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  MenuItem,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import { useForm } from "react-hook-form";
import Sidebar from "./Sidebar";
import { useReport } from "../context/ReportContext";
import DataTable from "./DataTable";
import { reportsColumns } from "../data";
import GetAppIcon from "@mui/icons-material/GetApp";
import api from "../utils/axios";
import { toast } from "react-toastify";

const Reports = () => {
  const [loading, setLoading] = useState(false);
  const { reports, setReports, generateExcelWithData } = useReport();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const onSubmit = async (data) => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await api.post(`/payment/report`, data);
      if (res.request.status === 204) {
        toast.error("No Data Available");
      } else {
        setReports(res.data);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Sidebar />
      <Stack className="rightSidePage">
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" mb={2}>
            Filter Options
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction={"row"} spacing={2}>
              {/* Payment Status */}
              <TextField
                select
                label="Payment Status"
                {...register("status", {
                  required: "Payment status is required",
                })}
                sx={{ flex: 1 }}
                size="small"
                error={!!errors.status}
                helperText={errors.status?.message}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Failed">Failed</MenuItem>
              </TextField>

              {/* Start Date */}
              <TextField
                label="Start Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                {...register("startDate", {
                  required: "Start date is required",
                  validate: (value) => {
                    const today = new Date().toISOString().split("T")[0];
                    if (value > today)
                      return "Start date cannot be in the future";
                    return true;
                  },
                })}
                sx={{ flex: 1 }}
                size="small"
                error={!!errors.startDate}
                helperText={errors.startDate?.message}
              />

              {/* End Date */}
              <TextField
                label="End Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                {...register("endDate", {
                  required: "End date is required",
                  validate: (value) => {
                    const today = new Date().toISOString().split("T")[0];
                    if (value > today)
                      return "End date cannot be in the future";
                    return true;
                  },
                })}
                sx={{ flex: 1 }}
                size="small"
                error={!!errors.endDate}
                helperText={errors.endDate?.message}
              />
            </Stack>

            {/* <Stack direction={"row"} spacing={2}>
              <TextField
                select
                label="Vendor Name"
                defaultValue=""
                {...register("vendorName")}
                sx={{ flex: 1 }}
              >
                <MenuItem value="">Select Vendor</MenuItem>
                <MenuItem value="Tech Solutions Inc.">
                  Tech Solutions Inc.
                </MenuItem>
                <MenuItem value="Global Supplies Ltd.">
                  Global Supplies Ltd.
                </MenuItem>
                <MenuItem value="Software Innovations LLC">
                  Software Innovations LLC
                </MenuItem>
                <MenuItem value="Hardware Components Co.">
                  Hardware Components Co.
                </MenuItem>
                <MenuItem value="Integrated Systems Corp.">
                  Integrated Systems Corp.
                </MenuItem>
              </TextField>

              <TextField
                label="Amount"
                type="number"
                {...register("amount", {
                  min: { value: 0, message: "Amount must be positive" },
                })}
                error={!!errors.amount}
                helperText={errors.amount?.message}
                sx={{ flex: 1 }}
              />

              <TextField
                label="Case Number"
                {...register("caseNumber", {
                  pattern: {
                    value: /^CN\d+$/,
                    message:
                      "Case number should start with CN followed by digits",
                  },
                })}
                error={!!errors.caseNumber}
                helperText={errors.caseNumber?.message}
                sx={{ flex: 1 }}
              />
            </Stack> */}

            <Stack
              direction={"row"}
              justifyContent={"center"}
              spacing={2}
              mt={2}
            >
              <Button type="submit" variant="contained">
                Generate Report
              </Button>
            </Stack>
          </form>
        </Paper>

        {/* Report Table */}
        <Stack sx={{ p: 3, mt: 3 }}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            sx={{ mb: 1 }}
          >
            <Typography variant="h6">Payment Reports</Typography>
            {reports?.length > 0 && (
              <Button
                variant="outlined"
                startIcon={<GetAppIcon />}
                onClick={generateExcelWithData}
              >
                Download
              </Button>
            )}
          </Stack>
          <DataTable columns={reportsColumns} rows={reports} />
        </Stack>
      </Stack>
    </div>
  );
};

export default Reports;
