import {
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

const CreateCaseForm = ({ setFormEnabled }) => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      serviceProviderName: "",
      workReferenceId: "",
      description: "",
      dueDate: "",
      amount: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (formData) => {
    if (loading) return;
    setLoading(true);
    setErr("");

    try {
      // Transform form data to match backend schema
      const transformedData = {
        serviceProviderName: formData.serviceProviderName,
        workReferenceId: formData.workReferenceId,
        description: formData.description,
        dueDate: formData.dueDate,
        amount: parseFloat(formData.amount),
      };

      console.log("Sending data:", transformedData);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/cases`,
        transformedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Success response:", res.data);
      toast.success(res?.data?.message || "Case created successfully");
      reset(); // Reset form after successful submission
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        setErr(error.response.data.message || "Server error occurred");
        toast.error(error.response.data.message || "Server error occurred");
      } else if (error.request) {
        setErr("Network error - please check your connection");
        toast.error("Network error - please check your connection");
      } else {
        setErr("An unexpected error occurred");
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="caseOverlay" onClick={() => setFormEnabled(false)}>
      <form
        className="createCaseForm"
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => e.stopPropagation()}
      >
        <Card>
          <CardContent>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography
                variant="h4"
                component="h4"
                sx={{ fontWeight: "Bold" }}
              >
                Create New Case
              </Typography>

              <Typography variant="p" component="p" sx={{ color: "gray" }}>
                Please fill in the details to create a new case.
              </Typography>
            </Stack>

            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid size={6}>
                <Controller
                  name="serviceProviderName"
                  control={control}
                  rules={{
                    required: "Service Provider Name is required",
                    minLength: {
                      value: 3,
                      message:
                        "Service Provider Name must be at least 3 characters",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Service Provider Name *"
                      variant="outlined"
                      size="small"
                      fullWidth
                      error={!!errors.serviceProviderName}
                      helperText={errors.serviceProviderName?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={6}>
                <Controller
                  name="workReferenceId"
                  control={control}
                  rules={{
                    required: "Work Reference ID is required",
                    pattern: {
                      value: /^WORK-\d{3,}$/,
                      message:
                        "Please enter a valid Work Reference ID (e.g., WORK-001)",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Work Reference ID *"
                      variant="outlined"
                      size="small"
                      fullWidth
                      error={!!errors.workReferenceId}
                      helperText={errors.workReferenceId?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={12}>
                <Controller
                  name="description"
                  control={control}
                  rules={{
                    required: "Description is required",
                    minLength: {
                      value: 10,
                      message: "Description must be at least 10 characters",
                    },
                    maxLength: {
                      value: 500,
                      message: "Description must not exceed 500 characters",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Description *"
                      variant="outlined"
                      size="small"
                      fullWidth
                      multiline
                      rows={3}
                      error={!!errors.description}
                      helperText={errors.description?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={6}>
                <Controller
                  name="dueDate"
                  control={control}
                  rules={{
                    required: "Due Date is required",
                    validate: (value) => {
                      const selectedDate = new Date(value);
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return (
                        selectedDate >= today ||
                        "Due date must be today or in the future"
                      );
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Due Date *"
                      type="date"
                      variant="outlined"
                      size="small"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      error={!!errors.dueDate}
                      helperText={errors.dueDate?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={6}>
                <Controller
                  name="amount"
                  control={control}
                  rules={{
                    required: "Amount is required",
                    pattern: {
                      value: /^\d+(\.\d{1,2})?$/,
                      message: "Please enter a valid amount",
                    },
                    validate: (value) => {
                      const numValue = parseFloat(value);
                      return numValue > 0 || "Amount must be greater than 0";
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Amount *"
                      variant="outlined"
                      size="small"
                      fullWidth
                      type="number"
                      inputProps={{ min: 0, step: 0.01 }}
                      error={!!errors.amount}
                      helperText={errors.amount?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Stack direction={"row"} justifyContent={"flex-end"} sx={{ mt: 2 }}>
              <Button
                variant="contained"
                size="medium"
                type="submit"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Case"}
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default CreateCaseForm;
