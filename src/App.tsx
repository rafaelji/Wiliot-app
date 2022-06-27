import React from "react";
import Header from "./components/header";

import "./app.css";

function App() {
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
