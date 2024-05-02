import "../../styles/search/searchNav.scss";
import useSearchStore from "../../store/search/useSearchStore";
const SearchNav = () => {
  const { tap, setTap } = useSearchStore((state) => state);
  const onUserClick = () => {
    if (tap) {
      return;
    }
    setTap(true);
  };

  const onHashTagClick = () => {
    if (!tap) {
      return;
    }
    setTap(false);
  };

  const userClassName = `SearchNav-tap ${tap && "SearchNav-border"}`;

  const hashTagClassName = `SearchNav-tap ${!tap && "SearchNav-border"}`;

  return (
    <div className="SearchNav width-370">
      <div className={userClassName} onClick={onUserClick}>
        사용자
      </div>
      <div className={hashTagClassName} onClick={onHashTagClick}>
        해시태그
      </div>
    </div>
  );
};

export default SearchNav;
