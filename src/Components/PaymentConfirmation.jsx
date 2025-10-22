import {
  Card,
  CardContent,
  Typography,
  Divider,
  Stack,
  Button,
  Box,
} from "@mui/material";
import React, { useEffect } from "react";
import { useCP } from "../context/CasePaymentContext";
import useFetch from "../hooks/useFetch";
import {
  calculateGST,
  convenienceCharge,
  SLACalculator,
  TDSCalculator,
  TradeDiscount,
} from "../utils/functions";
import PaymentDetails from "./PaymentDetails";

const PaymentConfirmation = () => {
  const {
    isFinalFormEnabled,
    setIsFinalFormEnabled,
    initiatePayment,
    getTransactionDetails,
  } = useCP();
  const {
    loading,
    error,
    data: { data: finalData },
  } = useFetch(
    `/service-provider/${isFinalFormEnabled?.data?.serviceProvider?._id}`,
    "get"
  );

  const baseAmount = isFinalFormEnabled?.data?.amount;
  const GSTAmount = calculateGST(baseAmount, 18)?.gstAmount;

  const TDSAmount = TDSCalculator(
    baseAmount,
    finalData?.tdsPercentage
  )?.tdsAmount;

  const TradeDiscountAmount = TradeDiscount(baseAmount)?.discountAmount;
  const convenienceCharges = convenienceCharge(baseAmount)?.chargeAmount;
  const SLAAmount = SLACalculator(
    baseAmount,
    finalData?.slaTerms,
    isFinalFormEnabled?.data?.dueDate
  );
  let grossAmount =
    baseAmount +
    GSTAmount -
    TDSAmount -
    TradeDiscountAmount +
    convenienceCharges;

  if (SLAAmount?.status === "incentive") {
    grossAmount += SLAAmount?.value;
  } else {
    grossAmount -= SLAAmount?.value;
  }

  const paymentDetails = [
    {
      label: "Base Amount",
      value: baseAmount,
    },
    {
      label: "GST",
      value: "+" + GSTAmount,
    },
    {
      label: "TDS",
      value: "-" + TDSAmount,
    },
    {
      label: "SLA Penalties/Incentives",
      value:
        SLAAmount?.status === "incentive"
          ? "+" + SLAAmount?.value
          : "-" + SLAAmount?.value,
    },
    {
      label: "Trade Discounts",
      value: "-" + TradeDiscountAmount,
    },
    {
      label: "Convenience Charges",
      value: "+" + convenienceCharges,
    },
    {
      label: "Gross Amount",
      value: grossAmount,
    },
  ];

  const serviceProvider = {
    name: finalData?.name,
    contact: finalData?.mobile,
    bankName: finalData?.bankInfo?.bankName,
    bankAccount: finalData?.bankInfo?.accountNumber,
    pan: finalData?.pan,
    email: finalData?.email,
  };
  useEffect(() => {
    if (isFinalFormEnabled?.data?.status === "Paid") {
      getTransactionDetails(isFinalFormEnabled?.data?._id);
    }
  }, []);
  useEffect(() => {}, [serviceProvider]);

  return (
    <div
      className="Overlay"
      onClick={() => setIsFinalFormEnabled({ flag: false, data: {} })}
    >
      {isFinalFormEnabled?.data?.status !== "Paid" ? (
        <Card
          className="paymentContainer"
          onClick={(e) => e.stopPropagation()}
          sx={{
            width: 550,
            borderRadius: 3,
            boxShadow: 4,
            backgroundColor: "#fff",
          }}
        >
          <CardContent>
            <Typography variant="h5" fontWeight={700}>
              Payment Confirmation
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Review the details before proceeding.
            </Typography>
            {/* Payment Breakdown */}
            <Stack spacing={1.5} mb={2}>
              {paymentDetails.map((item, index) => (
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  key={item.label}
                  sx={{
                    borderBottom:
                      paymentDetails?.length - 1 !== index
                        ? "0.5px solid #d6d5d5"
                        : "",
                    pb: 1,
                  }}
                >
                  <Typography variant="body1" color="text.secondary">
                    {item.label}
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {item.value}
                  </Typography>
                </Stack>
              ))}
            </Stack>
            <Divider sx={{ my: 2 }} />
            {/* Service Provider Info */}
            <Typography variant="subtitle1" fontWeight={600} mb={1}>
              Service Provider Details
            </Typography>
            <Box sx={{ lineHeight: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Name: <strong>{serviceProvider.name}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Contact: <strong>{serviceProvider.contact}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Bank Code: <strong>{serviceProvider.bankName}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Bank Account Number:{" "}
                <strong>{serviceProvider.bankAccount}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                PAN Number: <strong>{serviceProvider.pan}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email:<strong>{serviceProvider.email}</strong>
              </Typography>
            </Box>
            {/* Button */}
            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                borderRadius: 2,
                py: 1.2,
                backgroundColor: "#1976d2",
                ":hover": { backgroundColor: "#115293" },
              }}
              onClick={() =>
                initiatePayment(
                  isFinalFormEnabled?.data?._id,
                  isFinalFormEnabled?.data?.serviceProvider?._id,
                  isFinalFormEnabled?.data?.assignedTo?._id,
                  grossAmount
                )
              }
            >
              Proceed Payment
            </Button>{" "}
          </CardContent>
        </Card>
      ) : (
        <PaymentDetails />
      )}
    </div>
  );
};

export default PaymentConfirmation;
