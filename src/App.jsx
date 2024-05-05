import "./App.css";
import Home from "./pages/Home";
import Search from "./pages/Search";
import SmallNav from "./component/nav/SmallNav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useCreateFeed from "./store/feed/useCreateFeed";
import CreateFeed from "./component/feed/create/CreateFeed";
function App() {
  const { toggle } = useCreateFeed((state) => state);
  return (
    <Router>
      <SmallNav></SmallNav>
      {toggle && <CreateFeed></CreateFeed>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Search" element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;
