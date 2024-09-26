import "../styles/alarm/alarmPage.scss";
import { AlarmList } from "../component/alarm/AlarmList";
import { useEffect, useState } from "react";
import useAlarmStore from "../store/alarm/useAlarmStore";
export default function AlarmModal() {
  const { open } = useAlarmStore();
  const [className, setClassName] = useState("AlarmModalOut");

  useEffect(() => {
    if (open) {
      setClassName("");
    } else {
      setClassName("AlarmModalOut");
    }
  }, [open]);

  return (
    <div className={`AlarmModal ${className}`}>
      <h2>알림</h2>
      <AlarmList />
    </div>
  );
}
