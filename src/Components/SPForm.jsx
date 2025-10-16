import { Button, MenuItem, Stack, TextField, Typography } from "@mui/material";
import React from "react";

const SPForm = () => {
  return (
    <div className="spformContainer">
      <Stack spacing={1} sx={{ mb: 3 }}>
        <Typography variant="h4" component="h4" sx={{ fontWeight: "Bold" }}>
          Service Provider Registration
        </Typography>

        <Typography variant="p" component="p" sx={{ color: "gray" }}>
          Please fill in the details to register new service provider.
        </Typography>
      </Stack>
      <Stack spacing={2}>
        <Stack direction={"row"} spacing={4}>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            size="small"
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label="PAN"
            size="small"
            variant="outlined"
            fullWidth
          />
        </Stack>
        <TextField
          id="outlined-basic"
          label="GSTIN"
          variant="outlined"
          size="small"
          fullWidth
        />
        <TextField
          id="outlined-basic"
          label="Mobile Number"
          variant="outlined"
          size="small"
          fullWidth
        />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          size="small"
          fullWidth
        />

        <Stack direction={"row"} spacing={4}>
          <TextField
            id="outlined-basic"
            label="Bank Name"
            variant="outlined"
            size="small"
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label="Account Number"
            variant="outlined"
            size="small"
            fullWidth
          />
        </Stack>
        <TextField
          id="outlined-basic"
          label="IFSC Code"
          variant="outlined"
          size="small"
          fullWidth
        />

        <Stack direction={"row"} spacing={4}>
          <TextField
            id="outlined-basic"
            label="SLA Due Date"
            variant="outlined"
            size="small"
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label="Penalty Rate"
            variant="outlined"
            size="small"
            fullWidth
          />
        </Stack>
        <Stack direction={"row"} spacing={4}>
          <TextField
            id="outlined-basic"
            label="Incentive Rate"
            variant="outlined"
            size="small"
            fullWidth
          />

          <TextField select label="TDS Applicable" size="small" fullWidth>
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </TextField>
        </Stack>
      </Stack>
      <Stack direction={"row"} justifyContent={"flex-end"} sx={{ mt: 2 }}>
        <Button variant="contained" size="medium">
          Submit
        </Button>
      </Stack>
    </div>
  );
};

export default SPForm;
