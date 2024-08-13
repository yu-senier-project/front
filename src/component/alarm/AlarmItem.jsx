import React from "react";
import User from "../../../public/image/dp.jpg";

export const AlarmItem = () => {
  return (
    <div className="AlarmItem">
      <div className="AlarmItem-left">
        {/* 이미지랑 텍스트 */}
        <div>
          <img src={User} alt="유저이미지" />
        </div>
        <p>yeogni님이 회원님의 게시물에 좋아요를 눌렀씁니다!</p>
      </div>
      <div className="AlarmItem-right">
        {/* 시간 */}
        <p style={{ color: "lightgrey" }}>10분전</p>
      </div>
    </div>
  );
};
