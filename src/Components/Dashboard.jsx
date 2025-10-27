import React, { useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import { Paper, Stack, Typography, Card, CardContent } from "@mui/material";
import { useDashboard } from "../context/DashboardContext";
import { toast } from "react-toastify";
import { PieChart } from "@mui/x-charts/PieChart";
import api from "../utils/axios";
import AccessDenied from "./AccessDenied";
import PaymentsOverview from "./PaymentsOverview";

const Dashboard = () => {
  const loadingRef = useRef(null);
  const {
    keyMetrics,
    setKeyMetrics,
    isDashboardAccessAllowed,
    setDashboardAccessAllowed,
  } = useDashboard();

  useEffect(() => {
    async function fetchData() {
      if (loadingRef.current) return;
      loadingRef.current = true;
      setDashboardAccessAllowed(true);
      try {
        const res = await api.get(`/payment/getBasicDetails`);

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
        if (error?.response.status === 403) {
          setDashboardAccessAllowed(false);
        }
      } finally {
        loadingRef.current = false;
      }
    }
    fetchData();
  }, []);

  const statCards = keyMetrics?.caseStats?.map((stat) => {
    // Map API _id to display titles
    const titleMap = {
      Open: "Total Due",
      Paid: "Total Gross Paid",
      "In progress": "In progress",
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
        {isDashboardAccessAllowed ? (
          <>
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
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "500" }}
                    component="p"
                  >
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
                      No data available.
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Stack>
            <Stack>
              <PaymentsOverview />
            </Stack>
          </>
        ) : (
          <AccessDenied />
        )}
      </Stack>
    </div>
  );
};

export default Dashboard;
