// app.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import IdFind from "./pages/Auth/IdFind";
import PasswordFind from "./pages/PasswordFind";
import Home from "./pages/Home";
import Search from "./pages/Search";
import SmallNav from "./component/nav/SmallNav";
import Message from "./pages/Message/Message";
import IdCheck from "./pages/Auth/IdCheck";
import useCreateFeed from "./store/feed/useCreateFeed";
import CreateFeed from "./component/feed/create/CreateFeed";
import useLoginStore from "./store/login/useLoginStore";
import { refreshAccessTokenInterceptor } from "./util/auth";
import "./App.css";

// 액세스 토큰 갱신 인터셉터
refreshAccessTokenInterceptor();

function App() {
  const { toggle } = useCreateFeed((state) => state);
  const { isLogin } = useLoginStore((state) => state);
  return (
    <BrowserRouter>
      {isLogin && <SmallNav></SmallNav>}
      {toggle && <CreateFeed></CreateFeed>}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Id" element={<IdFind />} />
        <Route path="/CheckId" element={<IdCheck />} />
        <Route path="/Password" element={<PasswordFind />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/Message" element={<Message />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
