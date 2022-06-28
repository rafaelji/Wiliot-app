import { useCallback, useEffect, useState } from "react";
import { Product } from "../../common/types";
import useWebsocketConnection from "../use-websocket-connection";

const useGetTemperatureAndData = () => {
  const { rawData } = useWebsocketConnection();
  const [data, setData] = useState<Array<Product>>(rawData);

  const getTemperatureAndData = useCallback(() => {
    const temp = [...data];
    const result = temp.concat(rawData);
    setData(
      result
        .filter((item) => item.data <= 100)
        .map((item) => ({
          ...item,
          timestamp: new Date(item.timestamp).toISOString(),
        }))
    );
  }, [rawData]);

  useEffect(() => {
    getTemperatureAndData();
  }, [getTemperatureAndData]);

  return {
    data,
  };
};

export default useGetTemperatureAndData;
