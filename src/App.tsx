import React from "react";
import Header from "./components/header";
import TemperatureBox from "./components/temperature-box";
import Chart from "./components/chart";
import useGetTemperatureAndData from "./hooks/use-get-temperature-and-data";

import "./app.css";

function App() {
  const { data } = useGetTemperatureAndData();

  return (
    <>
      <Header />
      <main>
        <div className={"main-content-container"}>
          <TemperatureBox data={data} />
          <Chart data={data} />
        </div>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
