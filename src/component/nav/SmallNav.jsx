import "../../styles/nav/SmallNav.scss";
import { Link } from "react-router-dom";
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
import useCreateFeed from "../../store/feed/useCreateFeed";
import CreateFeed from "../feed/create/CreateFeed";

const SmallNav = () => {
  const { setToggle } = useCreateFeed((state) => state);

  const onCreate = () => {
    setToggle();
    console.log(toggle);
  };
  return (
    <div className="SmallNav">
      <h1>CNS</h1>
      <div className="SmallNav-menuWrap">
        <Link to={"/"}>
          <div className="SmallNav-menu">
            <FontAwesomeIcon icon={faHouse} className="icon" />
            <p>홈</p>
          </div>
        </Link>
        <div className="SmallNav-menu">
          <FontAwesomeIcon icon={faMessage} className="icon" />
          <p>메시지</p>
        </div>
        <Link to={"/search"}>
          <div className="SmallNav-menu">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
            <p>검색</p>
          </div>
        </Link>
        <div className="SmallNav-menu">
          <FontAwesomeIcon icon={faCalendarDays} className="icon" />
          <p>프로젝트</p>
        </div>
        <div className="SmallNav-menu">
          <FontAwesomeIcon icon={faUser} className="icon" />
          <p>프로필</p>
        </div>{" "}
        <div className="SmallNav-menu" onClick={onCreate}>
          <FontAwesomeIcon icon={faSquarePlus} className="icon" />
          <p>만들기</p>
        </div>
      </div>
      <div className="SmallNav-menu">
        <FontAwesomeIcon icon={faGear} className="icon" />
        <p>설정</p>
      </div>
    </div>
  );
};

export default SmallNav;
