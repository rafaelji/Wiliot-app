import React, { useEffect } from "react";
import Header from "./components/header";

import "./app.css";

function App() {
  useEffect(() => {
    const ws = new WebSocket(process.env.REACT_APP_API_URL || "");

    ws.onmessage = (event) => {
      console.log("hey", JSON.parse(event.data));
    };

    return () => ws.close();
  }, []);

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
