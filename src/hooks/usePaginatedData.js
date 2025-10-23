import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useCP } from "../context/CasePaymentContext";
import { usePermission } from "../context/UserPermissionContext";
import api from "../utils/axios";

const usePaginatedData = (endpoint, defaultLimit = 10) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultLimit);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { setCasesDetails } = useCP();
  const { setUsers } = usePermission();
  const fetchData = async (currentPage = page, currentLimit = rowsPerPage) => {
    try {
      setLoading(true);
      const res = await api.get(
        `/${endpoint}?page=${currentPage}&limit=${currentLimit}`
      );
      if (endpoint === "cases") setCasesDetails(res.data?.cases);
      if (endpoint === "user") setUsers(res.data?.users);
      setTotalCount(res.data?.totalCases || res.data?.totalUsers || 0);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error fetching data");
    } finally {
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
