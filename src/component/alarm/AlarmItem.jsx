import React from "react";
import User from "/image/dp.jpg";
import { detailDate } from "../../util/detailDate";
import { useNavigate } from "react-router-dom";
import useAlarmStore from "../../store/alarm/useAlarmStore";

export const AlarmItem = ({ text, createdAt, postId, type }) => {
  const nav = useNavigate();
  // 알림 모달 닫기 위해 store에서 가져옴
  const { setOpen } = useAlarmStore();

  let onClick;
  switch (type) {
    case "POST_COMMENT":
      onClick = () => {
        setOpen(false);
        nav(`/Post/${postId}`);
      };
      break;
  }

  return (
    <div className="AlarmItem" onClick={onClick}>
      <div className="AlarmItem-left">
        {/* 이미지랑 텍스트 */}
        <div>
          <img src={User} alt="유저이미지" />
        </div>
        <p>{text}</p>
      </div>
      <div className="AlarmItem-right">
        {/* 시간 */}
        <p style={{ color: "lightgrey" }}>{detailDate(new Date(createdAt))}</p>
      </div>
    </div>
  );
};
