import React, { FC } from "react";
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
import { ChartComponentProps } from "../../common/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart: FC<ChartComponentProps> = ({ data }) => {
  const labels = [
    ...new Set(
      data.map((item) => item.timestamp.split("T")[1].substring(0, 12))
    ),
  ];

  const options = {
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

  const chartData = {
    labels,
    datasets: [
      {
        label: "ID 1",
        data: data.filter((item) => item.id === 1).map((item) => item.data),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "ID 2",
        data: data.filter((item) => item.id === 2).map((item) => item.data),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Line options={options} data={chartData} />;
};

export default Chart;
