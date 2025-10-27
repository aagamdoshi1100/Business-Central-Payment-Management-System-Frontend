import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Stack,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import api from "../utils/axios";
// 🎨 Chart colors
const COLORS = ["#1976d2", "#2e7d32", "#f57c00", "#d32f2f", "#7b1fa2"];

const PaymentsOverview = () => {
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [slaData, setSlaData] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await api.get("payment/getPaymentSummary");
        const result = res.data?.data?.payments || [];
        setPayments(result);

        // --- 🧮 Compute Analytics ---
        const monthMap = {};
        result.forEach((p) => {
          const month = new Date(p.paymentDate).toLocaleString("default", {
            month: "short",
            year: "2-digit",
          });
          if (!monthMap[month]) {
            monthMap[month] = { month, total: 0 };
          }
          monthMap[month].total += p.NetAmount || 0;
        });
        setMonthlyData(Object.values(monthMap));

        const slaMap = {};
        result.forEach((p) => {
          const type = p.SLAType || "Standard";
          if (!slaMap[type]) slaMap[type] = 0;
          slaMap[type] += 1;
        });
        setSlaData(
          Object.entries(slaMap).map(([name, value]) => ({ name, value }))
        );

        setLoading(false);
      } catch (error) {
        console.error("Error fetching payments", error);
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) {
    return (
      <Card sx={{ p: 4, textAlign: "center" }}>
        <CircularProgress />
      </Card>
    );
  }

  const totalNet = payments.reduce((acc, p) => acc + (p.NetAmount || 0), 0);
  const totalGST = payments.reduce((acc, p) => acc + (p.GSTAmount || 0), 0);
  const totalTDS = payments.reduce((acc, p) => acc + (p.TDSAmount || 0), 0);

  return (
    <Stack direction={"row"} spacing={2} mt={5}>
      <Card sx={{ flex: 1 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            GST / TDS / Net Breakdown
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={[
                {
                  name: "Totals",
                  GST: totalGST,
                  TDS: totalTDS,
                  Net: totalNet,
                },
              ]}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="GST" fill="#f57c00" />
              <Bar dataKey="TDS" fill="#1976d2" />
              <Bar dataKey="Net" fill="#2e7d32" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 📈 Monthly Payment Trend */}
      <Card sx={{ flex: 1 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Monthly Payment Trend
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#1976d2"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 🍰 SLA Type Usage */}
      {/* <Card sx={{ flex: 1 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            SLA Incentive Usage
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={slaData}
                cx="50%"
                cy="50%"
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {slaData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card> */}
    </Stack>
  );
};

export default PaymentsOverview;
