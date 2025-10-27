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
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useCP } from "../context/CasePaymentContext";
import api from "../utils/axios";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

const CreateCaseForm = ({ setFormEnabled, serviceProviders }) => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const { setCasesDetails, handleUploadedFile, fileData } = useCP();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      serviceProvider: "",
      workReferenceId: "",
      description: "",
      dueDate: "",
      amount: "",
    },
    mode: "onBlur",
  });
  const workReference = watch("workReferenceId");
  useEffect(() => {
    let timeOutId;
    setErr("");
    timeOutId = setTimeout(async () => {
      if (workReference?.length > 5) {
        const res = await api.post(`/cases/validateWorkId`, {
          workReference: workReference.trim(),
        });
        if (!res?.data?.success) {
          setError("workReferenceId", {
            type: "server",
            message: res?.data?.message,
          });
          setErr(res?.data?.message);
        }
      }
    }, 2000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [workReference]);

  const onSubmit = async (formData) => {
    if (loading) return;
    setLoading(true);
    setErr("");

    try {
      // Transform form data to match backend schema
      const transformedData = {
        serviceProvider: formData.serviceProvider,
        workReferenceId: formData.workReferenceId,
        description: formData.description,
        dueDate: formData.dueDate,
        amount: parseFloat(formData.amount),
      };

      const res = await api.post(`/cases`, transformedData);

      toast.success(res?.data?.message || "Case created successfully");
      setCasesDetails((prev) => [res?.data?.newCase, ...prev]);
      reset();
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        setErr(error.response.data.message || "Server error occurred");
        toast.error(error.response.data.message || "Server error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <div className="Overlay" onClick={() => setFormEnabled(false)}>
      <form
        className="createCaseForm"
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => e.stopPropagation()}
      >
        <Card>
          <CardContent>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography
                variant="h5"
                component="h4"
                sx={{ fontWeight: "Bold" }}
              >
                Create New Case
              </Typography>

              <Typography variant="p" component="p" color="gray">
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
                  name="serviceProvider"
                  control={control}
                  rules={{
                    required: "Service Provider Name is required",
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Service Provider Name *"
                      variant="outlined"
                      size="small"
                      fullWidth
                      error={!!errors.serviceProvider}
                      helperText={errors.serviceProvider?.message}
                    >
                      {serviceProviders?.data?.length > 0 ? (
                        serviceProviders.data.map((provider) => (
                          <MenuItem key={provider._id} value={provider._id}>
                            {provider.name}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled>No providers found</MenuItem>
                      )}
                    </TextField>
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

            <Stack direction={"row"} justifyContent={"flex-end"} sx={{ m: 2 }}>
              <Button
                variant="contained"
                size="medium"
                type="submit"
                disabled={loading || err !== ""}
              >
                {loading ? "Creating..." : "Create Case"}
              </Button>
            </Stack>

            <hr />
            <Typography
              variant="subtitle1"
              component="h4"
              sx={{ fontWeight: "bold", mt: 2 }}
            >
              Bulk import cases
            </Typography>
            <Stack
              direction={"row"}
              alignItems={"center"}
              sx={{ mt: 1, gap: 2 }}
            >
              <Button
                component="label"
                role={undefined}
                variant="outlined"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                disabled={fileData?.loading}
              >
                {fileData?.loading ? "Processing..." : "Upload file"}
                <VisuallyHiddenInput
                  type="file"
                  onChange={(event) => handleUploadedFile(event)}
                  multiple
                  disabled={fileData?.loading}
                />
              </Button>
              {fileData?.name && fileData?.name}
            </Stack>
            <Typography
              variant="caption"
              component="p"
              color="red"
              sx={{ mt: 2 }}
            >
              Note: Template must contain these columns: serviceProvider,
              workReferenceId, description, dueDate, amount.
            </Typography>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default CreateCaseForm;
