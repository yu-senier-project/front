import "../../styles/nav/Nav.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
const Nav = () => {
  return (
    <div className="Nav">
      <FontAwesomeIcon icon={faArrowRight} />
    </div>
  );
};

export default Nav;
