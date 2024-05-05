import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "../styles/util/searchIcon.scss";

const SearchIcon = ({ style }) => {
  return (
    <div className="searchIcon" style={style}>
      <FontAwesomeIcon icon={faMagnifyingGlass} />
    </div>
  );
};

export default SearchIcon;
