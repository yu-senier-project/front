import React, { useState } from "react";
import "../../../styles/profile/update/ProfileUpdate.scss";
import { ProfileUpdateUser } from "./ProfileUpdateUser";
import CloseButton from "../../basic/CloseButton";
import { ProfileUpdateInfo } from "./ProfileUpdateInfo";
import { useRef } from "react";
import { ProfileUpdateImage } from "./ProfileUpdateImage";
export const ProfileUpdate = ({ setOnEdit }) => {
  // 프로필 사진
  const [profileImage, setProfileImage] = useState("public/image/dp.jpg");

  //한줄 소개
  const [oneIntro, setOneIntro] = useState("기본 한줄 소개값");

  // X버튼 누르면 닫김
  const handleCloseBtn = () => {
    setOnEdit(false);
  };

  // 배경화면 dom 저장
  const backgroundRef = useRef(null);

  // 배경 클릭하면 모달 닫기
  const onBackgroundClick = (e) => {
    if (e.target === backgroundRef.current) {
      setOnEdit(false);
    }
  };

  return (
    <div
      className="ProfileUpdate"
      ref={backgroundRef}
      onClick={onBackgroundClick}
    >
      <div className="ProfileUpdate-wrap">
        <div className="ProfileUpdate-closeBtn">
          <CloseButton size={18} onCloseButton={handleCloseBtn}></CloseButton>
        </div>
        <ProfileUpdateUser setProfileImage={setProfileImage} />
        <ProfileUpdateInfo oneIntro={oneIntro} setOneIntro={setOneIntro} />
      </div>
    </div>
  );
};
