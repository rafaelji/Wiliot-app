import { useEffect, useRef, useState } from "react";
import { Product } from "../../common/types";

const useGetTemperatureAndData = () => {
  const wsRef = useRef<WebSocket>();
  const [rawData, setRawData] = useState<Array<Product>>([]);

  const [shouldGetData, setShouldGetData] = useState(true);

  useEffect(() => {
    wsRef.current = new WebSocket(process.env.REACT_APP_API_URL || "");

    wsRef.current.onopen = () => {
      // todo show toast
      console.log("connection opened");
    };

    wsRef.current.onclose = () => {
      // todo show toast
      console.log("connection closed");
    };

    const wsCurrent = wsRef.current;

    return () => wsCurrent.close();
  }, []);

  useEffect(() => {
    if (!wsRef.current) return;

    wsRef.current.onmessage = (event) => {
      if (!shouldGetData) return;

      const temp = [...rawData];
      const result = temp.concat(JSON.parse(event.data));
      setRawData(
        result
          .filter((item) => item.data <= 100)
          .map((item) => ({
            ...item,
            timestamp: new Date(item.timestamp).toISOString(),
          }))
      );
    };
  }, [rawData, shouldGetData]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setShouldGetData(false);
      // }, 5 * 60000);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return {
    rawData,
  };
};

export default useGetTemperatureAndData;
