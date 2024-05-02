import CloseButton from "../basic/CloseButton";
import "../../styles/search/searchTop.scss";

const SearchTop = () => {
  return (
    <div className="search-top">
      <h1>검색</h1>
      <div id="search-top-btn">
        <CloseButton size={25}></CloseButton>
      </div>
    </div>
  );
};

export default SearchTop;
