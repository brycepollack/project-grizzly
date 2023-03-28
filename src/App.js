import React from "react";

import { BrowserRouter, Switch, Route, Link, Routes } from "react-router-dom";
import Home from "./components/Home";

const App = () => {
  //CORS error causer make sure to swap true/false
  const isDev = true;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home isDev={isDev} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
