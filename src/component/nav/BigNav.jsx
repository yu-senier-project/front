import "../../styles/nav/BigNav.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMessage,
  faMagnifyingGlass,
  faCalendarDays,
  faUser,
  faSquarePlus,
  faGear,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const BigNav = () => {
  const [toggle, setToggle] = useState(true);

  let navClassName = `BigNav ${toggle ? "Block" : "None"}`;
  let className = `${toggle ? "None" : "Block"}`;
  const onClick = () => {
    setToggle(!toggle);
  };

  return (
    <div>
      <div className={navClassName}>
        <button className="Nav-toggle-btn" onClick={onClick}>
          <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
        </button>
        <h1>CNS</h1>
        <div className="BigNav-menuWrap">
          <div className="BigNav-menu">
            <FontAwesomeIcon icon={faHouse} />
            <p>홈</p>
          </div>
          <div className="BigNav-menu">
            <FontAwesomeIcon icon={faMessage} />
            <p>회사</p>
          </div>
          <div className="BigNav-menu">
            <FontAwesomeIcon icon={faMessage} />
            <p>메시지</p>
          </div>
          <div className="BigNav-menu">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <p>검색</p>
          </div>
          <div className="BigNav-menu">
            <FontAwesomeIcon icon={faCalendarDays} />
            <p>프로젝트</p>
          </div>
          <div className="BigNav-menu">
            <FontAwesomeIcon icon={faUser} />
            <p>프로필</p>
          </div>{" "}
          <div className="BigNav-menu">
            <FontAwesomeIcon icon={faSquarePlus} />
            <p>만들기</p>
          </div>
        </div>
        <div className="BigNav-menu">
          <FontAwesomeIcon icon={faGear} />
          <p>설정</p>
        </div>
      </div>
      <div className={className}>
        <button onClick={onClick} className="Nav-toggle-btn-open">
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
      <div className={`empty ${toggle ? "Block" : "None   "}`}></div>
    </div>
  );
};

export default BigNav;
