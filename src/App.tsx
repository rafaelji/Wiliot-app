import React, { useEffect, useRef, useState } from "react";
import Header from "./components/header";
import { Product } from "./common/types";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import "./app.css";
import CurrentTemperature from "./components/current-temperature";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
      text: "Data",
    },
  },
};

function App() {
  const wsRef = useRef<WebSocket>();
  const [rawData, setRawData] = useState<Array<Product>>([]);
  const [id1Data, setId1Data] = useState<{ id: number; temperature: number }>();
  const [id2Data, setId2Data] = useState<{ id: number; temperature: number }>();
  const [shouldGetData, setShouldGetData] = useState(true);

  const labels = [...new Set(rawData.map((item) => item.timestamp))];

  const chartData = {
    labels,
    datasets: [
      {
        label: "ID 1",
        data: rawData.filter((item) => item.id === 1).map((item) => item.data),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "ID 2",
        data: rawData.filter((item) => item.id === 2).map((item) => item.data),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

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
    const list = rawData.filter((item) => item.id === 1);
    setId1Data(list[list.length - 1]);
  }, [rawData]);

  useEffect(() => {
    const list = rawData.filter((item) => item.id === 2);
    setId2Data(list[list.length - 1]);
  }, [rawData]);

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
          {id1Data && (
            <CurrentTemperature
              id={id1Data.id}
              temperature={id1Data.temperature}
            />
          )}
          {id2Data && (
            <CurrentTemperature
              id={id2Data.id}
              temperature={id2Data.temperature}
            />
          )}
          <Line options={options} data={chartData} />
        </div>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
