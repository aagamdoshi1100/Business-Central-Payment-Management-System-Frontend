import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { Paper, Stack, Typography, Card, CardContent } from "@mui/material";
import { useDashboard } from "../context/DashboardContext";
import { toast } from "react-toastify";
import axios from "axios";
import { PieChart } from "@mui/x-charts/PieChart";

const Dashboard = () => {
  const { keyMetrics, setKeyMetrics } = useDashboard();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/payment/getBasicDetails`
        );

        setKeyMetrics((prev) => {
          return {
            caseStats: res?.data?.caseStats,
            serviceProviderStats: res?.data?.serviceProviderStats,
          };
        });
      } catch (error) {
        const message =
          error?.response?.data?.message || "Failed to fetch data";
        toast.error(message);
      }
    }
    fetchData();
  }, []);

  const statCards = keyMetrics?.caseStats?.map((stat) => {
    // Map API _id to display titles
    const titleMap = {
      open: "Total Due",
      Paid: "Total Paid",
      "In progress": "In Progress",
    };

    return (
      <Paper
        key={stat._id}
        elevation={2}
        sx={{ p: 2, borderRadius: 2, flex: 1 }}
      >
        <Stack spacing={0.5}>
          <Typography variant="overline" sx={{ color: "gray" }} component="h4">
            {titleMap[stat._id] || stat._id}
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: "500" }} component="p">
            ₹{stat.totalAmount.toLocaleString()}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {stat.caseCount} cases
          </Typography>
        </Stack>
      </Paper>
    );
  });

  return (
    <div className="container">
      <Sidebar />
      <Stack className="rightSidePage">
        <Stack
          spacing={2}
          direction={{ xs: "column", sm: "row" }}
          sx={{ width: "100%" }}
        >
          {statCards}
        </Stack>
        <Stack mt={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "500" }} component="p">
                Case Allocation by Service Provider{" "}
              </Typography>
              {keyMetrics?.serviceProviderStats?.length > 0 ? (
                <PieChart
                  series={[
                    {
                      data: keyMetrics.serviceProviderStats.map((item) => ({
                        id: item.providerId,
                        value: item.caseCount,
                        label: item.provider, // or item.serviceProviderName
                      })),
                    },
                  ]}
                  width={400}
                  height={300}
                />
              ) : (
                <Typography sx={{ mt: 3, color: "gray" }}>
                  No data available for service provider stats
                </Typography>
              )}
            </CardContent>
          </Card>
        </Stack>
      </Stack>
    </div>
  );
};

export default Dashboard;
