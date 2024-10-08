import React, { useState } from "react";
import "../../../styles/profile/update/ProfileUpdate.scss";

import CloseButton from "../../basic/CloseButton";
import { ProfileUpdateInfo } from "./ProfileUpdateInfo";
import { useRef } from "react";
import { ProfileUpdateImage } from "./ProfileUpdateImage";
export const ProfileUpdate = ({ setOnEdit, intro, date, memberId, img }) => {
  // 프로필 사진
  const [profileImage, setProfileImage] = useState({ img });

  //한줄 소개
  const [oneIntro, setOneIntro] = useState(intro ?? "");

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
        <div className="ProfileUpdate-img">
          <div>
            <img src={img} alt="Profile" />
          </div>
        </div>
        <ProfileUpdateInfo
          memberId={memberId}
          oneIntro={oneIntro}
          date={date}
          setOneIntro={setOneIntro}
          handleCloseBtn={handleCloseBtn}
        />
      </div>
    </div>
  );
};
