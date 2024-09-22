import "../../styles/nav/SmallNav.scss";
import { Link, Outlet } from "react-router-dom";
import { Alarm } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import useCreateFeed from "../../store/feed/useCreateFeed";
import useAlarmStore from "../../store/alarm/useAlarmStore";
import AlarmModal from "../../pages/AlarmModal";
import CreateFeed from "../feed/create/CreateFeed";
import { logout } from "../../util/auth";
import { TiMessages } from "react-icons/ti";
import { FiHome } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegSquarePlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";

const SmallNav = () => {
  // 알람 모달 버튼 클릭했는지 안했는지 zustand에서 상태 가져오기
  const { open, setOpen } = useAlarmStore();
  const nav = useNavigate();
  const { setToggle } = useCreateFeed((state) => state);
  const onCreate = () => {
    allCloseAlarm();
    nav("/Home");
    setToggle();
  };

  // 알람 아이콘 클릭했을 떄 실행
  const handleAlarmIconClick = () => {
    setOpen(!open);
  };

  // 알림 모달이 열려있는 상태에서 다른 메뉴로 이동시 알림 모달 닫기
  const allCloseAlarm = () => {
    if (open) {
      setOpen(false);
    }
  };

  const myId = localStorage.getItem("memberId");
  return (
    <div>
      <AlarmModal />
      <div className="SmallNav">
        <h1
          style={{
            cursor: "pointer",
          }}
          onClick={() => {
            nav("/Home");
          }}
        >
          CNS
        </h1>
        <div className="SmallNav-menuWrap">
          <Link to={"/Home"} onClick={allCloseAlarm}>
            <div className="SmallNav-menu">
              <FiHome className="icon" />
              <p>홈</p>
            </div>
          </Link>
          <Link to={"/Message"} onClick={allCloseAlarm}>
            <div className="SmallNav-menu">
              <TiMessages className="icon" />
              <p>메시지</p>
            </div>
          </Link>
          <Link to={"/search"} onClick={allCloseAlarm}>
            <div className="SmallNav-menu">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
              <p>검색</p>
            </div>
          </Link>
          <Link to={"/Project"} onClick={allCloseAlarm}>
            <div className="SmallNav-menu">
              <FaRegCalendarAlt className="icon" />
              <p>프로젝트</p>
            </div>
          </Link>
          <Link to={`/Profile/${myId}`} onClick={allCloseAlarm}>
            <div className="SmallNav-menu">
              <FaRegUser className="icon" />
              <p>프로필</p>
            </div>
          </Link>
          <div className="SmallNav-menu" onClick={onCreate}>
            <FaRegSquarePlus className="icon" />
            <p>게시글 작성</p>
          </div>
          <div className="SmallNav-menu" onClick={handleAlarmIconClick}>
            <FaRegHeart className="icon" />
            <p>알림</p>
          </div>
        </div>

        <div className="SmallNav-menu">
          <RiLogoutBoxLine className="icon" />
          <p
            onClick={() => {
              logout();
              nav("/");
            }}
          >
            로그아웃
          </p>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default SmallNav;
