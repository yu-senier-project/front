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
        <label htmlFor="resumeUpload">
          <div
            className="ProfileUpdateUser-resume"
            style={{ backgroundColor: "#71c9ce" }}
          >
            이력서 변경
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
