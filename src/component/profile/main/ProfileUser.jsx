import React from "react";
import "../../../styles/profile/profileUser.scss";

export const ProfileUser = ({ setOnEdit, setImageEdit }) => {
  // 수정 버튼 눌렀는지
  const handleEditBtn = () => {
    setOnEdit(true);
  };

  const handleImageEditBtn = () => {
    console.log(true);
    setImageEdit(true);
  };

  return (
    <div className="ProfileUser">
      <div className="ProfileUser-info">
        <div className="ProfileUser-info-img">
          {/* 자기 프로필이면 버튼 클릭해서 프로필 사진 바꿀 수 있게 disabled 사용하기 */}

          <button onClick={handleImageEditBtn}>
            <img src="public/image/dp.jpg" alt="프로필 사진" />
          </button>
        </div>

        {/* 사진이랑 아이디, 한줄소개*/}
        <div className="ProfileUser-info-text">
          {/* 아이디 */}
          <span>yeongib</span>

          {/* 프로필,이력서 수정 부분 */}
          <button
            onClick={handleEditBtn}
            style={{ backgroundColor: "#71C9CE" }}
          >
            프로필 수정
          </button>
          <button style={{ backgroundColor: "#B3DCB2" }}>이력서 조회</button>

          {/* 한줄 소개 부분 */}
          <p>여기는 한줄 소개 </p>
        </div>
      </div>

      {/* 소속  */}
      <div className="ProfileUser-belong">
        {/* 소속 부분 */}
        <span style={{ marginRight: "10px" }}>영남대학교</span>

        {/* 개발 직군 부분 */}
        <span
          style={{
            marginRight: "10px",
            fontSize: "14px",
          }}
        >
          연구/개발
        </span>

        {/* 소속 변경 버튼ㄴ */}
        <span
          className="ProfileUser-belong-changeBtn"
          style={{ marginRight: "10px", fontSize: "14px", color: "grey" }}
        >
          소속 변경
        </span>
      </div>
    </div>
  );
};
