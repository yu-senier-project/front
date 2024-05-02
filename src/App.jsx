import "./App.css";
import Home from "./pages/Home";
import Search from "./pages/Search";
import SmallNav from "./component/nav/SmallNav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    // <div className="App">

    //   {/* <Home></Home> */}
    //   <Search></Search>
    // </div>
    <Router>
      <SmallNav></SmallNav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Search" element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;
