import React, { useEffect, useState, useRef } from "react";
import "../../styles/alarm/alarm.scss";
import { FaRegBell } from "react-icons/fa6";
import CloseButton from "../basic/CloseButton";
export const Alarm = () => {
  // 알림 애니메이션 담당할 state
  const [className, setClassName] = useState("Alarm-out");

  useEffect(() => {
    // 알림 왔을 때 알림 나타나도록 함
    setClassName("Alarm-in");

    // 3초후 알람 안보이게
    const timer = setTimeout(() => {
      setClassName("Alarm-out");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // CloseButton 클릭 시 알람 숨김
  const handleClose = () => {
    setClassName("Alarm-out");
  };
  return (
    <div className={`Alarm ${className}`}>
      <div className="Alarm-top">
        <div className="Alarm-top-left">
          <FaRegBell />
          <span style={{ marginLeft: "10px" }}>알림</span>
        </div>
        <div className="Alarm-top-right">
          <CloseButton size={15} onCloseButton={handleClose} />
        </div>
      </div>
      <div className="Alarm-text">
        fdsaklfjsdlkfjsadlkfjasdlkfjaskldfjsaklfjsadklfjksalfjskldfjklsfjklsdjflksdjflks
        jfklasj flksadjf lksafj lksaf jsalkfj
        lksdkflsjdlfkjsdklfjsdlkfjsdlkfsadjf asdflkasjdfklasd sadklfasdlsdf
      </div>
    </div>
  );
};
