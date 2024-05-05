import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import IdFind from "./pages/IdFind";
import PasswordFind from "./pages/PasswordFind";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Id" element={<IdFind />} />
        <Route path="/Password" element={<PasswordFind />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
