import "../../styles/nav/SmallNav.scss";
import { Link, Outlet } from "react-router-dom";
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
import { logout } from "../../util/auth";
import { TiMessages } from "react-icons/ti";
import { FiHome } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegSquarePlus } from "react-icons/fa6";

const SmallNav = () => {
  const { setToggle } = useCreateFeed((state) => state);
  const onCreate = () => {
    setToggle();
  };
  const myId = localStorage.getItem("memberId");
  return (
    <div>
      <div className="SmallNav">
        <h1>CNS</h1>
        <div className="SmallNav-menuWrap">
          <Link to={"/Home"}>
            <div className="SmallNav-menu">
              <FiHome className="icon" />
              <p>홈</p>
            </div>
          </Link>
          <Link to={"/Message"}>
            <div className="SmallNav-menu">
              <TiMessages className="icon" />
              <p>메시지</p>
            </div>
          </Link>
          <Link to={"/search"}>
            <div className="SmallNav-menu">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
              <p>검색</p>
            </div>
          </Link>
          <Link to={"/Project"}>
            <div className="SmallNav-menu">
              <FaRegCalendarAlt className="icon" />
              <p>프로젝트</p>
            </div>
          </Link>
          <Link to={`/Profile/${myId}`}>
            <div className="SmallNav-menu">
              <FaRegUser className="icon" />
              <p>프로필</p>
            </div>
          </Link>
          <div className="SmallNav-menu" onClick={onCreate}>
            <FaRegSquarePlus className="icon" />
            <p>만들기</p>
          </div>
        </div>

        <div className="SmallNav-menu">
          <FontAwesomeIcon icon={faGear} className="icon" />
          <p>설정</p>
        </div>
        <button onClick={logout}>로그아웃</button>
      </div>
      <Outlet />
    </div>
  );
};

export default SmallNav;
