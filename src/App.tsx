import React from "react";
import Header from "./components/header";
import TemperatureBox from "./components/temperature-box";
import Chart from "./components/chart";
import useGetTemperatureAndData from "./hooks/use-get-temperature-and-data";
import Toast from "./components/toast";

import "./app.css";

function App() {
  const { data } = useGetTemperatureAndData();

  return (
    <>
      <Toast />
      <Header />
      <main>
        <div className={"main-content-container"}>
          <TemperatureBox data={data} />
          <Chart data={data} />
        </div>
      </main>
    </>
  );
}

export default App;
