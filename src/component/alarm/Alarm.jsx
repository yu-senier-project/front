import React from "react";
import "../../styles/alarm/alarm.scss";
import { FaRegBell } from "react-icons/fa6";
import CloseButton from "../basic/CloseButton";
import { useAlarm } from "../../hooks/useAlarm";
import { useNavigate } from "react-router-dom";
export const Alarm = () => {
  const nav = useNavigate();
  const { message, className, handleClose, postId, type } = useAlarm();

  let onClick;
  switch (type) {
    case "POST_COMMENT":
      onClick = () => {
        handleClose();
        nav(`/Post/${postId}`);
      };
      break;
  }

  return (
    <div className={`Alarm ${className}`} onClick={onClick}>
      <div className="Alarm-top">
        <div className="Alarm-top-left">
          <FaRegBell />
          <span style={{ marginLeft: "10px" }}>알림</span>
        </div>
        <div className="Alarm-top-right">
          <CloseButton size={15} onCloseButton={handleClose} />
        </div>
      </div>
      <div className="Alarm-text">{message}</div>
    </div>
  );
};
