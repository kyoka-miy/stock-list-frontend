import { useState, useCallback } from "react";
import axios, { AxiosRequestConfig } from "axios";

export function usePut<T = any, R = any>(
  url: string,
  config?: AxiosRequestConfig,
) {
  const [data, setData] = useState<R | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const put = useCallback(
    async (body: T) => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.put<R>(url, body, config);
        setData(res.data);
        return res.data;
      } catch (err) {
        setError(err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [url, config],
  );

  return { data, loading, error, put };
}
