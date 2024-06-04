import { useState } from "react";
import "../styles/pages/search.scss";
import SearchTop from "../component/search/SearchTop";
import SearchInput from "../component/search/SearchInput";
import SearchNav from "../component/search/SearchNav";
import SearchUserList from "../component/search/SearchUserList";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tap, setTap] = useState(true);
  const [results, setResults] = useState([]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleResultsFetched = (data) => {
    setResults(data);
  };

  const handleButtonClick = () => {
    console.log("검색 결과:", results);
  };

  return (
    <div className="Search width-400">
      <SearchTop />
      <SearchInput onSearch={handleSearch} onButtonClick={handleButtonClick} />
      <SearchNav tap={tap} setTap={setTap} />
      <SearchUserList searchQuery={searchQuery} tap={tap} onResultsFetched={handleResultsFetched} />
    </div>
  );
};

export default Search;
