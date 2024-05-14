import React, { useState } from "react";
import "../../../styles/profile/update/ProfileUpdateUser.scss";

export const ProfileUpdateUser = ({ setProfileImage }) => {
  const [showImage, setShowImage] = useState("public/image/dp.jpg");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file);
      const imageUrl = URL.createObjectURL(file);
      setShowImage(imageUrl);
    }
  };

  return (
    <div className="ProfileUpdateUser">
      <div className="ProfileUpdateUser-img">
        <img src={showImage} alt="Profile" />
      </div>
      <div className="ProfileUpdateUser-btn">
        <label htmlFor="profileImageUpload">
          <div
            style={{ backgroundColor: "#71C9CE" }}
            className="ProfileUpdateUser-profile"
          >
            프로필 사진 변경
          </div>
        </label>
        <input
          type="file"
          hidden
          id="profileImageUpload"
          onChange={handleImageChange}
        />
        <label htmlFor="resumeUpload">
          <div
            className="ProfileUpdateUser-resume"
            style={{ backgroundColor: "#B3DCB2" }}
          >
            이력서 수정
          </div>
        </label>
        <input
          type="file"
          hidden
          id="resumeUpload"
          // 이력서 수정에 대한 onChange 핸들러는 필요 시 추가
        />
      </div>
    </div>
  );
};
