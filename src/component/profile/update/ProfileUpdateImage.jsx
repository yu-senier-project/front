import React, { useRef, useState } from "react";
import "../../../styles/profile/update/ProfileUpdateImage.scss";
import CloseButton from "../../basic/CloseButton";
export const ProfileUpdateImage = ({ setImageEdit }) => {
  // 검은 배경 눌렀는지
  const backgroundRef = useRef(null);

  // 미리보기 해줄 이미지
  const [showImage, setShowImage] = useState("public/image/dp.jpg");

  // 사진 업로드 눌렀을 때
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    //setProfileImage(file);
    handleCloseBtn();
    // 서버로 보내는 로직 추가, 낙관적 업데이트 추가
  };

  // 기본 프로필로 설정 눌렀을 때
  const handleOriginImage = () => {
    setShowImage("public/image/dp.jpg");
    handleCloseBtn();
    // 서버로 보내는 로직 추가, 낙관적 업데이트 추가
  };

  const handleBackgroundClick = (e) => {
    if (e.target == backgroundRef.current) {
      setImageEdit(false);
    }
  };

  // x버튼 눌렀을 때
  const handleCloseBtn = () => {
    setImageEdit(false);
  };

  return (
    <div
      className="ProfileUpdateImage"
      ref={backgroundRef}
      onClick={handleBackgroundClick}
    >
      <div className="ProfileUpdateImage-wrap">
        <div className="ProfileUpdateImage-wrap-closeBtn">
          <CloseButton size={20} onCloseButton={handleCloseBtn}></CloseButton>
        </div>
        <div className="ProfileUpdateImage-image">
          <img src={showImage} alt="" />
        </div>
        <div className="ProfileUpdateImage-menu">
          <p>
            <label htmlFor="image">사진 업로드 </label>
          </p>
          <input type="file" hidden id="image" onChange={handleImageChange} />
        </div>
        <div className="ProfileUpdateImage-menu" onClick={handleOriginImage}>
          <p>기본 프로필로 설정</p>
        </div>
        <div className="ProfileUpdateImage-menu" onClick={handleCloseBtn}>
          <p>취소</p>
        </div>
      </div>
    </div>
  );
};
