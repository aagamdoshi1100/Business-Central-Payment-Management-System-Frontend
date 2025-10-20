import {
  Button,
  MenuItem,
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";

const SPForm = () => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "Ashlee",
      mobile: "8169975445",
      pan: "AUAPD2222B",
      gstin: "22ABCDE1234F1Z5",
      email: "your.emailfakedata15225@gmail.com",
      bankName: "SBI",
      ifscCode: "SBIN0001234",
      accountNumber: "8169975445",
      confirmAccountNumber: "8169975445",
      slaType: "Time Based",
      penaltyType: "Percentage",
      penaltyValue: "1",
      incentiveType: "Fixed",
      incentiveValue: "1",
      tdsApplicable: true,
      tdsPercentage: "1",
    },
    mode: "onBlur",
  });

  const watchedTdsApplicable = watch("tdsApplicable");

  const onSubmit = async (formData) => {
    if (loading) return;
    setLoading(true);
    setErr("");

    try {
      // Transform form data to match backend schema
      const transformedData = {
        name: formData.name,
        mobile: formData.mobile,
        pan: formData.pan,
        gstin: formData.gstin,
        email: formData.email,
        bankInfo: {
          bankName: formData.bankName,
          ifscCode: formData.ifscCode,
          accountNumber: formData.accountNumber,
        },
        slaTerms: {
          slaType: formData.slaType,
          penaltyType: formData.penaltyType,
          penaltyValue: parseFloat(formData.penaltyValue),
          incentiveType: formData.incentiveType,
          incentiveValue: parseFloat(formData.incentiveValue),
        },
        tdsApplicable: formData.tdsApplicable,
        tdsPercentage: formData.tdsApplicable
          ? parseFloat(formData.tdsPercentage)
          : undefined,
      };

      console.log("Sending data:", transformedData);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/service-provider`,
        transformedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Success response:", res.data);
      toast.success(res?.data?.message || "Logged in successfully");
      // reset(); // Reset form after successful submission
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        // Server responded with error status
        setErr(error.response.data.message || "Server error occurred");
      } else if (error.request) {
        // Request was made but no response received
        setErr("Network error - please check your connection");
      } else {
        // Something else happened
        setErr("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  // Validation patterns
  const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  const gstinPattern =
    /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  const mobilePattern = /^[6-9]\d{9}$/;
  const ifscPattern = /^[A-Z]{4}0[A-Z0-9]{6}$/;

  return (
    <div className="container">
      <Sidebar />
      <Stack className="rightSidePage">
        <form className="spformContainer" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={1} sx={{ mb: 3 }}>
            <Typography variant="h4" component="h4" sx={{ fontWeight: "Bold" }}>
              Service Provider Registration
            </Typography>

            <Typography variant="p" component="p" sx={{ color: "gray" }}>
              Please fill in the details to register new service provider.
            </Typography>
          </Stack>

          <Stack spacing={2}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Basic details
                </Typography>
                <Grid
                  container
                  rowSpacing={2}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid size={6}>
                    <Controller
                      name="name"
                      control={control}
                      rules={{
                        required: "Name is required",
                        minLength: {
                          value: 3,
                          message: "Name must be at least 3 characters",
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Provider Name *"
                          variant="outlined"
                          size="small"
                          fullWidth
                          error={!!errors.name}
                          helperText={errors.name?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid size={6}>
                    <Controller
                      name="mobile"
                      control={control}
                      rules={{
                        required: "Mobile number is required",
                        pattern: {
                          value: mobilePattern,
                          message:
                            "Please enter a valid 10-digit mobile number",
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Mobile Number *"
                          type="phone"
                          variant="outlined"
                          size="small"
                          fullWidth
                          error={!!errors.mobile}
                          helperText={errors.mobile?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid size={6}>
                    <Controller
                      name="pan"
                      control={control}
                      rules={{
                        required: "PAN is required",
                        pattern: {
                          value: panPattern,
                          message:
                            "Please enter a valid PAN (e.g., ABCDE1234F)",
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="PAN *"
                          size="small"
                          variant="outlined"
                          fullWidth
                          error={!!errors.pan}
                          helperText={errors.pan?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid size={6}>
                    <Controller
                      name="gstin"
                      control={control}
                      rules={{
                        required: "GSTIN is required",
                        pattern: {
                          value: gstinPattern,
                          message:
                            "Please enter a valid GSTIN (e.g., 22ABCDE1234F1Z5)",
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="GSTIN *"
                          variant="outlined"
                          size="small"
                          fullWidth
                          error={!!errors.gstin}
                          helperText={errors.gstin?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid size={12}>
                    <Controller
                      name="email"
                      control={control}
                      rules={{
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Please enter a valid email address",
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Email *"
                          variant="outlined"
                          size="small"
                          fullWidth
                          error={!!errors.email}
                          helperText={errors.email?.message}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Banking Details
                </Typography>
                <Grid
                  container
                  rowSpacing={2}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid size={6}>
                    <Controller
                      name="bankName"
                      control={control}
                      rules={{
                        required: "Bank name is required",
                        minLength: {
                          value: 2,
                          message: "Bank name must be at least 2 characters",
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Bank Name *"
                          variant="outlined"
                          size="small"
                          fullWidth
                          error={!!errors.bankName}
                          helperText={errors.bankName?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid size={6}>
                    <Controller
                      name="ifscCode"
                      control={control}
                      rules={{
                        required: "IFSC Code is required",
                        pattern: {
                          value: ifscPattern,
                          message:
                            "Please enter a valid IFSC Code (e.g., SBIN0001234)",
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="IFSC Code *"
                          variant="outlined"
                          size="small"
                          fullWidth
                          error={!!errors.ifscCode}
                          helperText={errors.ifscCode?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid size={6}>
                    <Controller
                      name="accountNumber"
                      control={control}
                      rules={{
                        required: "Account number is required",
                        pattern: {
                          value: /^\d{9,18}$/,
                          message: "Account number must be 9-18 digits",
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Account Number *"
                          variant="outlined"
                          size="small"
                          fullWidth
                          error={!!errors.accountNumber}
                          helperText={errors.accountNumber?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid size={6}>
                    <Controller
                      name="confirmAccountNumber"
                      control={control}
                      rules={{
                        required: "Please confirm account number",
                        validate: (value) => {
                          const accountNumber =
                            control._formValues.accountNumber;
                          return (
                            value === accountNumber ||
                            "Account numbers do not match"
                          );
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Confirm Account Number *"
                          variant="outlined"
                          size="small"
                          fullWidth
                          error={!!errors.confirmAccountNumber}
                          helperText={errors.confirmAccountNumber?.message}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  SLA Terms & Conditions
                </Typography>
                <Grid
                  container
                  rowSpacing={2}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid size={12}>
                    <Controller
                      name="slaType"
                      control={control}
                      rules={{
                        required: "SLA Type is required",
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          select
                          label="SLA Type *"
                          size="small"
                          fullWidth
                          error={!!errors.slaType}
                          helperText={errors.slaType?.message}
                        >
                          <MenuItem value="Time Based">Time Based</MenuItem>
                        </TextField>
                      )}
                    />
                  </Grid>
                  <Grid size={6}>
                    <Controller
                      name="penaltyType"
                      control={control}
                      rules={{
                        required: "Penalty Type is required",
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          select
                          label="Penalty Type *"
                          size="small"
                          fullWidth
                          error={!!errors.penaltyType}
                          helperText={errors.penaltyType?.message}
                        >
                          <MenuItem value="Fixed">Fixed</MenuItem>
                          <MenuItem value="Percentage">Percentage</MenuItem>
                        </TextField>
                      )}
                    />
                  </Grid>
                  <Grid size={6}>
                    <Controller
                      name="penaltyValue"
                      control={control}
                      rules={{
                        required: "Penalty Value is required",
                        pattern: {
                          value: /^\d+(\.\d{1,2})?$/,
                          message: "Please enter a valid number",
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Penalty Value *"
                          variant="outlined"
                          size="small"
                          fullWidth
                          error={!!errors.penaltyValue}
                          helperText={errors.penaltyValue?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid size={6}>
                    <Controller
                      name="incentiveType"
                      control={control}
                      rules={{
                        required: "Incentive Type is required",
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          select
                          label="Incentive Type *"
                          size="small"
                          fullWidth
                          error={!!errors.incentiveType}
                          helperText={errors.incentiveType?.message}
                        >
                          <MenuItem value="Fixed">Fixed</MenuItem>
                          <MenuItem value="Percentage">Percentage</MenuItem>
                        </TextField>
                      )}
                    />
                  </Grid>
                  <Grid size={6}>
                    <Controller
                      name="incentiveValue"
                      control={control}
                      rules={{
                        required: "Incentive Value is required",
                        pattern: {
                          value: /^\d+(\.\d{1,2})?$/,
                          message: "Please enter a valid number",
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Incentive Value *"
                          variant="outlined"
                          size="small"
                          fullWidth
                          error={!!errors.incentiveValue}
                          helperText={errors.incentiveValue?.message}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  TDS Details
                </Typography>
                <Grid
                  container
                  rowSpacing={2}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid size={6}>
                    <Controller
                      name="tdsApplicable"
                      control={control}
                      rules={{
                        required: "Please select TDS Applicable",
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          select
                          label="TDS Applicable *"
                          size="small"
                          fullWidth
                          error={!!errors.tdsApplicable}
                          helperText={errors.tdsApplicable?.message}
                        >
                          <MenuItem value={true}>Yes</MenuItem>
                          <MenuItem value={false}>No</MenuItem>
                        </TextField>
                      )}
                    />
                  </Grid>
                  <Grid size={6}>
                    <Controller
                      name="tdsPercentage"
                      control={control}
                      rules={{
                        required: watchedTdsApplicable
                          ? "TDS Percentage is required"
                          : false,
                        pattern: watchedTdsApplicable
                          ? {
                              value: /^(100|[1-9]?\d)(\.\d{1,2})?$/,
                              message:
                                "Please enter a valid percentage (0-100)",
                            }
                          : undefined,
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label={
                            watchedTdsApplicable
                              ? "TDS Percentage *"
                              : "TDS Percentage"
                          }
                          variant="outlined"
                          size="small"
                          fullWidth
                          disabled={!watchedTdsApplicable}
                          error={!!errors.tdsPercentage}
                          helperText={errors.tdsPercentage?.message}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Stack>
          <Stack direction={"row"} justifyContent={"flex-end"} sx={{ mt: 2 }}>
            <Button
              variant="contained"
              size="medium"
              type="submit"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </Stack>
        </form>
      </Stack>
    </div>
  );
};

export default SPForm;
