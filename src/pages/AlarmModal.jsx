import "../styles/alarm/alarmPage.scss";
import { AlarmList } from "../component/alarm/AlarmList";
import { useState } from "react";
export default function AlarmModal() {
  const [className, setClassName] = useState("");

  return (
    <div className={`AlarmModal ${className}`}>
      <h2>알림</h2>
      <AlarmList />
    </div>
  );
}
