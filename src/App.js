/*eslint-disable*/
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import FindId from "./pages/find/FindId";
import FindPW from "./pages/find/FindPW";
import Login from "./pages/login/Login";
import NotFound from "./pages/NotFound";

//회사 선택

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/user/FindID" element={<FindId />}></Route>
          <Route path="/user/FindPW" element={<FindPW />}></Route>
          <Route path="/" element={<Login />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
