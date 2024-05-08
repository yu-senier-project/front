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
import useNavStore from "../../store/nav/useNavStore";

const BigNav = () => {
  const { open, setOpen } = useNavStore((state) => state);

  let navClassName = `BigNav ${open ? "Block" : "None"}`;
  let className = `${open ? "None" : "Block"}`;
  const onClick = () => {
    setOpen();
  };

  return (
    <div>
      <div className={navClassName}>
        <button className="Nav-toggle-btn-close" onClick={onClick}>
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
    </div>
  );
};

export default BigNav;
