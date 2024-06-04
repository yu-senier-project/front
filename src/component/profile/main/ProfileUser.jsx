import React from "react";
import "../../../styles/profile/profileUser.scss";
import { useMemberData } from "../../../react-query/useProfile";

export const ProfileUser = ({
  myProfile,
  profileImg,
  data,
  setOnEdit,
  setImageEdit,
  setOnResume,
  setOnChangeCompany,
}) => {
  // 소속 변경 눌렀을 때
  const handleCompanyChange = () => {
    setOnChangeCompany(true);
  };

  // 수정 버튼
  const handleEditBtn = () => {
    setOnEdit(true);
  };

  // 프로필 사진 변경 함수
  const handleImageEditBtn = () => {
    setImageEdit(true);
  };

  // 이력서 조회 버튼 눌렀을때
  const handleResumeCheckBtn = () => {
    setOnResume(true);
  };

  return (
    <div className="ProfileUser">
      <div className="ProfileUser-info">
        <div
          className="ProfileUser-info-img"
          onClick={myProfile ? handleImageEditBtn : null}
        >
          {/* 자기 프로필이면 버튼 클릭해서 프로필 사진 바꿀 수 있게 disabled 사용하기 */}
          <img src={profileImg} alt="프로필 사진" />
        </div>

        {/* 사진이랑 아이디, 한줄소개*/}
        <div className="ProfileUser-info-text">
          {/* 아이디 */}
          <span>{data?.data?.nickname}</span>

          {/* 프로필,이력서 수정 부분 */}
          {myProfile ? (
            <button
              onClick={handleEditBtn}
              style={{ backgroundColor: "#71C9CE" }}
            >
              프로필 수정
            </button>
          ) : null}
          <button
            style={{ backgroundColor: "#B3DCB2" }}
            onClick={handleResumeCheckBtn}
          >
            이력서 조회
          </button>

          {/* 한줄 소개 부분 */}
          <p>{data?.data?.introduction ?? ""}</p>
        </div>
      </div>

      {/* 소속  */}
      <div className="ProfileUser-belong">
        {/* 소속 부분 */}
        <span style={{ marginRight: "10px" }}>{data?.data?.companyName}</span>

        {/* 개발 직군 부분 */}
        <span
          style={{
            marginRight: "10px",
            fontSize: "14px",
          }}
        >
          {data?.data?.position ?? "없음"}
        </span>

        {/* 소속 변경 버튼 */}
        {myProfile ? (
          <span
            className="ProfileUser-belong-changeBtn"
            style={{ marginRight: "10px", fontSize: "14px", color: "grey" }}
            onClick={handleCompanyChange}
          >
            소속 변경
          </span>
        ) : null}
      </div>
    </div>
  );
};
