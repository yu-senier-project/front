import React from "react";
import { Link, Outlet } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import "../../styles/nav/Hamberger.scss"
import useHambergerStore from "../../store/nav/useHambergerStore";
import { faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import { logout } from "../../util/auth";
import { TiMessages } from "react-icons/ti";
import { FiHome } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegSquarePlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useCreateFeed from "../../store/feed/useCreateFeed";
import { FaArrowLeftLong } from "react-icons/fa6";
export const Hamberger = () => {
    const { open, setOpen, setFlase } = useHambergerStore();

    const onCick = () => {
        setOpen()
    }

    const onClose = () =>{
        setOpen()
    }

  const nav = useNavigate();
  const { setToggle } = useCreateFeed((state) => state);
  const onCreate = () => {
    nav("/Home");
    setToggle();
  };
  const myId = localStorage.getItem("memberId");
  return (
    <div>
      <div className={`Hamberger ${open ? "HambergerOpen" : ""}`}>
        {open ? (
          <>
            <div className="HambergerClose" onClick={onClose}>
              <FaArrowLeftLong />
            </div>
            <div>
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
              <div className="Hamberger-menuWrap">
                <Link to={"/Home"} onClick={setFlase}>
                  <div className="Hamberger-menu">
                    <FiHome className="icon" />
                    <p>홈</p>
                  </div>
                </Link>
                <Link to={"/Message"} onClick={setFlase}>
                  <div className="Hamberger-menu">
                    <TiMessages className="icon" />
                    <p>메시지</p>
                  </div>
                </Link>
                <Link to={"/search"} onClick={setFlase}>
                  <div className="Hamberger-menu">
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      className="icon"
                    />
                    <p>검색</p>
                  </div>
                </Link>
                <Link to={"/Project"} onClick={setFlase}>
                  <div className="Hamberger-menu">
                    <FaRegCalendarAlt className="icon" />
                    <p>프로젝트</p>
                  </div>
                </Link>
                <Link to={`/Profile/${myId}`} onClick={setFlase}>
                  <div className="Hamberger-menu">
                    <FaRegUser className="icon" />
                    <p>프로필</p>
                  </div>
                </Link>
                <div className="Hamberger-menu" onClick={()=>{
                    setFlase()
                    onCreate()
                }} >
                  <FaRegSquarePlus className="icon" />
                  <p>게시글 작성</p>
                </div>
              </div>
              <div className="Hamberger-menu">
                <RiLogoutBoxLine className="icon" />
                <p
                  onClick={() => {
                    setFlase()
                    logout();
                    nav("/");
                  }}
                >
                  로그아웃
                </p>
              </div>
            </div>
          </>
        ) : null}
      </div>
      {!open && (
        <div style={{ position: "absolute", top: "30px", left: "30px" }}>
          <button
            onClick={onCick}
            style={{ background: "none", border: "none" }}
          >
            <IoMenu size={30} />
          </button>
        </div>
      )}
      <Outlet />
    </div>
  );
};





