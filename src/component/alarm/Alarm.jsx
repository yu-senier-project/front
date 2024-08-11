import React, { useEffect, useState, useRef } from "react";
import "../../styles/alarm/alarm.scss";
import { FaRegBell } from "react-icons/fa6";
import CloseButton from "../basic/CloseButton";
export const Alarm = () => {
  return (
    <div className="Alarm">
      <div className="Alarm-top">
        <div className="Alarm-top-left">
          <FaRegBell />
          <span style={{ marginLeft: "10px" }}>알림</span>
        </div>
        <div className="Alarm-top-right">
          <CloseButton size={15} />
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
