import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useCP } from "../context/CasePaymentContext";
import { usePermission } from "../context/UserPermissionContext";
import api from "../utils/axios";
import { useLog } from "../context/LogContext";

const usePaginatedData = (endpoint, defaultLimit = 10) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultLimit);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { setCasesDetails } = useCP();
  const { setUsers } = usePermission();
  const { setLogs, setBulkOperations, setLogAccessAllowed } = useLog();
  const loadingRef = useRef(false);

  const fetchData = async (currentPage = page, currentLimit = rowsPerPage) => {
    if (loadingRef.current) return;
    setLogAccessAllowed(true);
    try {
      loadingRef.current = true;
      const res = await api.get(
        `/${endpoint}?page=${currentPage}&limit=${currentLimit}`
      );
      if (endpoint === "cases") setCasesDetails(res.data?.cases);
      if (endpoint === "user") setUsers(res.data?.users);
      if (endpoint === "logs") setLogs(res?.data?.logs);
      if (endpoint === "logs/blukLogs") setBulkOperations(res?.data?.bulkLogs);
      setTotalCount(
        res.data?.totalCases ||
          res.data?.totalUsers ||
          res.data?.totalLogs ||
          res.data?.totalBulkLogs ||
          0
      );
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error fetching data");
      if (err?.response.status === 403) {
        setLogAccessAllowed(false);
      }
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page, rowsPerPage);
  }, [page, rowsPerPage]);

  return {
    totalCount,
    loading,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    refresh: fetchData,
  };
};

export default usePaginatedData;
