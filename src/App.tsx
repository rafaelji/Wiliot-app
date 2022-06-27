import React, { useEffect, useRef, useState } from "react";
import Header from "./components/header";
import { Product } from "./common/types";

import "./app.css";

function App() {
  const wsRef = useRef<WebSocket>();
  const [data, setData] = useState<Array<Product>>([]);

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
      const temp = [...data];
      const result = temp.concat(JSON.parse(event.data));
      setData(result);
      console.log("hey", data);
    };
  }, [data]);

  return (
    <>
      <Header />
      <main>
        <div className={"main-content-container"}></div>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
