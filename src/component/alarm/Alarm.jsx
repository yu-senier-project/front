import React, { useEffect, useState, useRef } from "react";
import "../../styles/alarm/alarm.scss";
import { FaRegBell } from "react-icons/fa6";
import CloseButton from "../basic/CloseButton";
import { useAlarm } from "../../hooks/useAlarm";
export const Alarm = () => {
  // const { message, className, newAlarm, handleClose } = useAlarm();
  // return (
  //   // <div className={`Alarm ${className}`}>
  //   //   <div className="Alarm-top">
  //   //     <div className="Alarm-top-left">
  //   //       <FaRegBell />
  //   //       <span style={{ marginLeft: "10px" }}>알림</span>
  //   //     </div>
  //   //     <div className="Alarm-top-right">
  //   //       <CloseButton size={15} onCloseButton={handleClose} />
  //   //     </div>
  //   //   </div>
  //   //   <div className="Alarm-text">{message}</div>
  //   // </div>
  // );
};
