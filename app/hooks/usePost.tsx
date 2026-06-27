import { useState, useCallback } from "react";
import axios, { AxiosRequestConfig } from "axios";

export function usePost<T = any, R = any>(
  url: string,
  config?: AxiosRequestConfig,
) {
  const [data, setData] = useState<R | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const post = useCallback(
    async (body: T) => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("access_token");
        const mergedConfig: AxiosRequestConfig = {
          ...config,
          withCredentials: config?.withCredentials ?? true,
          headers: {
            ...(config?.headers ?? {}),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        };
        const res = await axios.post<R>(url, body, mergedConfig);
        const newAccessToken = res.headers["x-new-access-token"];
        if (newAccessToken) {
          localStorage.setItem("access_token", newAccessToken);
        }
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

  return { data, loading, error, post };
}
