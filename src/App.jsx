import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import IdFind from "./pages/IdFind";
import PasswordFind from "./pages/PasswordFind";
import Home from "./pages/Home";
import Search from "./pages/Search";
import SmallNav from "./component/nav/SmallNav";
import useCreateFeed from "./store/feed/useCreateFeed";
import CreateFeed from "./component/feed/create/CreateFeed";
import "./App.css";

function App() {
  const { toggle } = useCreateFeed((state) => state);
  return (
    <BrowserRouter>
      <SmallNav></SmallNav>
      {toggle && <CreateFeed></CreateFeed>}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Id" element={<IdFind />} />
        <Route path="/Password" element={<PasswordFind />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
