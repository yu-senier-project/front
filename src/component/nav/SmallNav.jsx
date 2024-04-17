import "../../styles/nav/SmallNav.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMessage,
  faMagnifyingGlass,
  faCalendarDays,
  faUser,
  faSquarePlus,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

const SmallNav = () => {
  return (
    <div className="SmallNav">
      <h1>CNS</h1>
      <div className="SmallNav-menuWrap">
        <div className="SmallNav-menu">
          <FontAwesomeIcon icon={faHouse} className="icon" />
          <p>hello</p>
        </div>
        <div className="SmallNav-menu">
          <FontAwesomeIcon icon={faMessage} className="icon" />
          <p>hello</p>
        </div>
        <div className="SmallNav-menu">
          <FontAwesomeIcon icon={faMessage} className="icon" />
          <p>hello</p>
        </div>
        <div className="SmallNav-menu">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
          <p>hello</p>
        </div>
        <div className="SmallNav-menu">
          <FontAwesomeIcon icon={faCalendarDays} className="icon" />
          <p>hello</p>
        </div>
        <div className="SmallNav-menu">
          <FontAwesomeIcon icon={faUser} className="icon" />
          <p>hello</p>
        </div>{" "}
        <div className="SmallNav-menu">
          <FontAwesomeIcon icon={faSquarePlus} className="icon" />
          <p>hello</p>
        </div>
      </div>
      <div className="SmallNav-menu end">
        <FontAwesomeIcon icon={faGear} className="icon" />
        <p>hello</p>
      </div>
    </div>
  );
};

export default SmallNav;
