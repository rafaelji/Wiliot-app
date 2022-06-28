import React from "react";
import Header from "./components/header";
import TemperatureBox from "./components/temperature-box";
import Chart from "./components/chart";
import useGetTemperatureAndData from "./hooks/use-get-temperature-and-data";

import "./app.css";

function App() {
  const { rawData } = useGetTemperatureAndData();

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
    }, 5 * 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Header />
      <main>
        <div className={"main-content-container"}>
          <TemperatureBox data={rawData} />
          <Chart data={rawData} />
        </div>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
