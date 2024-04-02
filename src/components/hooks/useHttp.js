import { useState, useCallback, useEffect } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(
      resData.message || "Something went wrong, failed to send request.",
    );
  }

  return resData;
}

export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const sendRequest = useCallback(
    async function sendRequest() {
      // Khi bắt đầu gửi yêu cầu lầy dữ liệu
      setIsLoading(true);
      // Sử lý và chờ lấy dữ liệu
      try {
        const resData = await sendHttpRequest(url, config);
        setData(resData);
      } catch (error) {
        setError(error.message || "Something went wrong!");
      }

      // Sau khi lấy được dữ liệu
      setIsLoading(false);
    },
    [url, config],
  );

  useEffect(() => {
    if ((config && (config.method === "Get" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);
  return {
    data,
    isLoading,
    error,
  };
}
