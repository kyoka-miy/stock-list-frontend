import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

export function useGet<T = any>(url: string, config?: AxiosRequestConfig) {
  const [data, setData] = useState<T>(null as any);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [trigger, setTrigger] = useState(0);

  const refetch = () => setTrigger((t) => t + 1);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get<T>(url, config)
      .then((res) => setData(res.data))
      .catch((err) => {
        setError(err);
        console.error("Error fetching data:", err);
      })
      .finally(() => setLoading(false));
  }, [url, trigger]);

  return { data, loading, error, refetch };
}
