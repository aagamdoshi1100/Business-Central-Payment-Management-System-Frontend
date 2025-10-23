import axios from "axios";
import { useEffect, useState } from "react";
import api from "../utils/axios";

function useFetch(endpoint, method, headers, body) {
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (loading) return;

      setLoading(true);
      setError("");

      try {
        const config = {
          method: method.toLowerCase(),
          url: `${endpoint}`,
        };

        if (
          body &&
          (method === "POST" || method === "PUT" || method === "PATCH")
        ) {
          config.data = body;
        }

        const res = await api(config);
        setData(res.data);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { loading, err, data };
}
export default useFetch;
