import CloseButton from "../basic/CloseButton";
import "../../styles/search/searchTop.scss";
import { Link } from "react-router-dom";

const SearchTop = () => {
  return (
    <div className="search-top">
      <h1>검색</h1>
      <div id="search-top-btn">
        <Link to={"/Home"}>
          <CloseButton size={25}></CloseButton>
        </Link>
      </div>
    </div>
  );
};

export default SearchTop;
