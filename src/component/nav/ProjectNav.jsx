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
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import useCreateFeed from "../../store/feed/useCreateFeed";
import useProjectStore from "../../store/project/useProjectStore";
import { logout } from "../../util/auth";
import { FaChartGantt } from "react-icons/fa6";
import { MdDynamicFeed } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { SlNotebook } from "react-icons/sl";
import { BiWebcam } from "react-icons/bi";

export const ProjectNav = () => {
  const { projectId, title, managerId } = useProjectStore();

  const { setToggle } = useCreateFeed((state) => state);
  const onCreate = () => {
    setToggle();
  };
  return (
    <div>
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
          <Link
            to={`/ProjectHome/${projectId}?memberId=${managerId}&title=${title}`}
          >
            <div className="SmallNav-menu">
              <FaRegCalendarAlt className="icon" />
              <p>캘린더</p>
            </div>
          </Link>
          <Link
            to={`/ProjectHome/Gantt/${projectId}?memberId=${managerId}&title=${title}`}
          >
            <div className="SmallNav-menu">
              <FaChartGantt className="icon" />
              <p>간트차트</p>
            </div>
          </Link>
          <Link
            to={`/ProjectHome/Post/${projectId}?memberId=${managerId}&title=${title}`}
          >
            <div className="SmallNav-menu">
              <MdDynamicFeed className="icon" />
              <p>게시물</p>
            </div>
          </Link>
          <Link to={`/ProjectHome/Todo/${projectId}`}>
            <div className="SmallNav-menu">
              <SlNotebook className="icon" />
              <p>할 일</p>
            </div>
          </Link>
          <Link
            to={`/ProjectHome/Channel/${projectId}`}>
            <div className="SmallNav-menu">
              <BiWebcam className="icon" />
              <p>화상 회의</p>
            </div>
          </Link>
        </div>
        <Link to={"/Project"}>
          <div className="SmallNav-menu">
            <FontAwesomeIcon icon={faRightFromBracket} className="icon" />
            <p>나가기</p>
          </div>
        </Link>
      </div>
      <Outlet />
    </div>
  );
};
