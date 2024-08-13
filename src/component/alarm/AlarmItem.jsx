import React from "react";
import User from "/image/dp.jpg";
import { detailDate } from "../../util/detailDate";

export const AlarmItem = ({ text, createdAt, postId, type }) => {
  return (
    <div className="AlarmItem">
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
