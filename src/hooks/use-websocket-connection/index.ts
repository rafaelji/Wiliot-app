import { useEffect, useRef, useState } from "react";
import { Product } from "../../common/types";
import useToast from "../use-toast";

const useWebsocketConnection = () => {
  const { setToast } = useToast();
  const [rawData, setRawData] = useState<Array<Product>>([]);
  const wsRef = useRef<WebSocket>();

  useEffect(() => {
    wsRef.current = new WebSocket(process.env.REACT_APP_API_URL || "");

    wsRef.current.onopen = () => {
      setToast({ show: true, content: "connection opened!" });
    };

    wsRef.current.onclose = () => {
      setToast({ show: true, content: "connection closed!" });
    };

    const wsCurrent = wsRef.current;

    return () => wsCurrent.close();
  }, []);

  useEffect(() => {
    if (!wsRef.current) return;

    wsRef.current.onmessage = (event) => {
      setRawData(JSON.parse(event.data));
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      wsRef.current?.close();
    }, 5 * 60000);

    return () => clearInterval(intervalId);
  }, []);

  return { rawData };
};

export default useWebsocketConnection;
