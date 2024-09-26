// Nav.js
import "../../styles/nav/Nav.scss";
import useCreateFeed from "../../store/feed/useCreateFeed";
import useAlarmStore from "../../store/alarm/useAlarmStore";
import AlarmModal from "../../pages/AlarmModal";
import { logout } from "../../util/auth";
import { FaRegBell, FaBell } from "react-icons/fa";
import { FaRegSquarePlus, FaMessage, FaRegMessage } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import {
  RiLogoutBoxLine,
  RiSearchLine,
  RiSearchFill,
  RiProjectorLine,
  RiProjectorFill,
} from "react-icons/ri";
import NavItem from "./navItem";
import { GoHome, GoHomeFill } from "react-icons/go";
import { IoPerson, IoPersonOutline } from "react-icons/io5";
import { useSelectedMenu } from "../../store/nav/useNavStore";
import useWindowWidth from "../../hooks/useWindowWidth";
import CloseButton from "../basic/CloseButton";
import { useNavOpen } from "../../store/nav/useNavStore";

const Nav = ({ close, onCloseClick }) => {
  // 알람 모달창 오픈 여부
  const { open, setOpen } = useAlarmStore();
  const nav = useNavigate();
  const { setToggle } = useCreateFeed((state) => state);
  const { selectedMenu, setSelectedMenu } = useSelectedMenu();
  const windowWidth = useWindowWidth();

  // 게시글 작성 버튼 클릭 시 실행
  const onCreate = () => {
    allCloseAlarm();
    nav("/Home");
    setToggle();
  };

  // 알람 모달 열기/닫기
  const handleAlarmIconClick = () => {
    setOpen(!open);
  };

  // 알림 모달이 열려있는 상태에서 다른 메뉴로 이동 시 알림 모달 닫기
  const allCloseAlarm = () => {
    if (open) {
      setOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    nav("/");
  };

  const myId = localStorage.getItem("memberId");

  return (
    <div>
      <AlarmModal />
      <div className="nav">
        {/* close가 true일 때만 닫기 버튼을 표시 */}
        {close && (
          <div className="navCloseButton" onClick={onCloseClick}>
            <CloseButton />
          </div>
        )}
        <h1
          style={{
            cursor: "pointer",
          }}
          onClick={() => {
            setSelectedMenu("Home");
            nav("/Home");
          }}
        >
          {windowWidth < 960 ? "C" : "CNS"}
        </h1>
        <div className="navMenuWrap">
          <NavItem
            children={
              selectedMenu === "Home" ? (
                <GoHomeFill size={"1.4rem"} />
              ) : (
                <GoHome size={"1.4rem"} />
              )
            }
            text={"홈"}
            onClick={() => {
              if (selectedMenu !== "Home") {
                setSelectedMenu("Home");
                allCloseAlarm();
              }
            }}
            link={"/Home"}
          />
          <NavItem
            children={
              selectedMenu === "Message" ? (
                <FaMessage size={"1.3rem"} />
              ) : (
                <FaRegMessage size={"1.3rem"} />
              )
            }
            text={"메시지"}
            onClick={() => {
              if (selectedMenu !== "Message") {
                setSelectedMenu("Message");
                allCloseAlarm();
              }
            }}
            link={"/Message"}
          />
          <NavItem
            children={
              selectedMenu === "Search" ? (
                <RiSearchFill size={"1.4rem"} />
              ) : (
                <RiSearchLine size={"1.4rem"} />
              )
            }
            text={"검색"}
            onClick={() => {
              if (selectedMenu !== "Search") {
                setSelectedMenu("Search");
                allCloseAlarm();
              }
            }}
            link={"/search"}
          />
          <NavItem
            children={
              selectedMenu === "Project" ? (
                <RiProjectorFill size={"1.4rem"} />
              ) : (
                <RiProjectorLine size={"1.4rem"} />
              )
            }
            text={"프로젝트"}
            onClick={() => {
              if (selectedMenu !== "Project") {
                setSelectedMenu("Project");
                allCloseAlarm();
              }
            }}
            link={"/Project"}
          />
          <NavItem
            children={
              selectedMenu === "Profile" ? (
                <IoPerson size={"1.4rem"} />
              ) : (
                <IoPersonOutline size={"1.4rem"} />
              )
            }
            text={"프로필"}
            onClick={() => {
              if (selectedMenu !== "Profile") {
                setSelectedMenu("Profile");
                allCloseAlarm();
              }
            }}
            link={`/Profile/${myId}`}
          />
          <NavItem
            children={<FaRegSquarePlus className="icon" />}
            text={"게시글 작성"}
            onClick={() => {
              setSelectedMenu("Home");
              onCreate();
            }}
          />
          <NavItem
            children={<FaRegBell size={"1.4rem"} />}
            text={"알림"}
            onClick={handleAlarmIconClick}
          />
        </div>
        <NavItem
          children={<RiLogoutBoxLine className="icon" />}
          text={"로그아웃"}
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default Nav;
