// SnsNav.js
import useWindowWidth from "../../hooks/useWindowWidth";
import { Outlet } from "react-router-dom";
import Nav from "./nav";
import { IoMdMenu } from "react-icons/io";
import "../../styles/nav/SnsNav.scss";
import { useEffect, useState } from "react";
import { useNavOpen } from "../../store/nav/useNavStore";

export default function SnsNav() {
  const windowWidth = useWindowWidth();
  const { open, setOpen } = useNavOpen();
  const [claseName, setClassName] = useState("snsNavOut");

  useEffect(() => {
    if (open) {
      setClassName("snsNavIn");
    } else {
      setClassName("snsNavOut");
    }
  }, [open]);

  const handleOpen = () => {
    setOpen(true); // 네비게이션 열기
  };

  const onCloseClick = () => {
    setOpen(false); // 네비게이션 닫기
  };

  return (
    <>
      {windowWidth > 600 ? (
        <Nav />
      ) : (
        <div className="snsNav">
          {!open ? <IoMdMenu size={30} onClick={handleOpen} /> : null}
          <div className={`reponsiveNav ${claseName}`}>
            <Nav close={true} onCloseClick={onCloseClick} />
          </div>
        </div>
      )}
      <Outlet />
    </>
  );
}
