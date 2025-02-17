import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
