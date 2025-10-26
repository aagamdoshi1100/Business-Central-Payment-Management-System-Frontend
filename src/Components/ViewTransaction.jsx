import React, { useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Stack,
} from "@mui/material";
import {
  CheckCircle,
  CalendarToday,
  Person,
  Business,
  Email,
  Receipt,
} from "@mui/icons-material";
import { useCP } from "../context/CasePaymentContext";

const ViewTransaction = () => {
  const { isFinalFormEnabled, transactionDetails, getTransactionDetails } =
    useCP();

  useEffect(() => {
    if (isFinalFormEnabled?.data?.status === "Paid") {
      getTransactionDetails(isFinalFormEnabled?.data?._id);
    }
  }, []);

  const caseData = {
    ...transactionDetails?.[0],
  };
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  return (
    <Card
      className="paymentDetailsContainer"
      elevation={3}
      onClick={(e) => e.stopPropagation()}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 1,
          }}
        >
          <Box>
            <Typography
              variant="h5"
              component="h1"
              sx={{ fontWeight: "bold", color: "primary.main" }}
            >
              {caseData.caseNumber}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Case Details
            </Typography>
          </Box>
          <Chip
            icon={<CheckCircle />}
            label={caseData.status}
            color="success"
            variant="filled"
            sx={{
              fontSize: "1rem",
              padding: "8px 16px",
              "& .MuiChip-icon": { fontSize: "1.25rem" },
            }}
          />
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Transaction Details */}
        <Paper elevation={1} sx={{ p: 3, mb: 4, backgroundColor: "grey.50" }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <Receipt color="primary" />
            Transaction Details
          </Typography>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", border: "none" }}>
                  Transaction ID
                </TableCell>
                <TableCell sx={{ border: "none" }}>
                  {caseData.transactionId}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", border: "none" }}>
                  Payment Date
                </TableCell>
                <TableCell sx={{ border: "none" }}>
                  {formatDate(caseData.paymentDate)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", border: "none" }}>
                  GST
                </TableCell>
                <TableCell sx={{ border: "none" }}>
                  {formatCurrency(caseData.GSTAmount)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", border: "none" }}>
                  SLA Amount
                </TableCell>
                <TableCell sx={{ border: "none" }}>
                  {formatCurrency(caseData.SLAAmountValue)} (
                  {caseData.SLAType?.charAt(0).toUpperCase() +
                    caseData.SLAType?.slice(1).toLowerCase()}
                  )
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", border: "none" }}>
                  TDS
                </TableCell>
                <TableCell sx={{ border: "none" }}>
                  {formatCurrency(caseData.TDSAmount)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", border: "none" }}>
                  Trade Discount
                </TableCell>
                <TableCell sx={{ border: "none" }}>
                  {formatCurrency(caseData.TradeDiscountAmount)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", border: "none" }}>
                  Convenience Charges
                </TableCell>
                <TableCell sx={{ border: "none" }}>
                  {formatCurrency(caseData.convenienceCharges)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", border: "none" }}>
                  Net Amount
                </TableCell>
                <TableCell
                  sx={{
                    border: "none",
                    fontWeight: "bold",
                    color: "success.main",
                  }}
                >
                  {formatCurrency(caseData.NetAmount)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>

        {/* Contact Information */}
        {/* Agent Information */}
        <Stack direction={"row"} spacing={2}>
          <Paper elevation={1} sx={{ p: 3, flex: 1 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <Person color="primary" />
              Agent Information
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                {caseData.agentName}
              </Typography>
              <Typography
                variant="body2"
                color="primary"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mt: 1,
                  textDecoration: "none",
                }}
                component="a"
                href={`mailto:${caseData.agentEmail}`}
              >
                <Email fontSize="small" />
                {caseData.agentEmail}
              </Typography>
            </Box>
          </Paper>

          {/* Service Provider Information */}
          <Paper elevation={1} sx={{ p: 3, flex: 1 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <Business color="primary" />
              Service Provider
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                {caseData.serviceProviderName}
              </Typography>
              <Typography
                variant="body2"
                color="primary"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mt: 1,
                  textDecoration: "none",
                }}
                component="a"
                href={`mailto:${caseData.serviceProviderEmail}`}
              >
                <Email fontSize="small" />
                {caseData.serviceProviderEmail}
              </Typography>
            </Box>
          </Paper>

          {/* Timeline & Remarks */}
          <Paper elevation={1} sx={{ p: 3, flex: 1 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <CalendarToday color="primary" />
              Timeline
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }} color="text.secondary">
              Created At
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {formatDate(caseData.createdAt)}
            </Typography>
          </Paper>
        </Stack>

        {/* <Typography variant="h6" sx={{ mt: 4 }}>
          Remarks
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          {caseData.remarks}
        </Typography> */}
      </CardContent>
    </Card>
  );
};

export default ViewTransaction;
