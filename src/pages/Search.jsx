import "../styles/pages/search.scss";
import SearchTop from "../component/search/SearchTop";
import SearchInput from "../component/search/SearchInput";
import SearchNav from "../component/search/SearchNav";
import SearchUserList from "../component/search/SearchUserList";

const Search = () => {
  return (
    <div className="Search width-400">
      <SearchTop></SearchTop>
      <SearchInput></SearchInput>
      <SearchNav></SearchNav>
      <SearchUserList></SearchUserList>
    </div>
  );
};

export default Search;
