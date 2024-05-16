import React, { useRef, useState } from "react";
import "../../../styles/profile/update/ProfileUpdateImage.scss";
import CloseButton from "../../basic/CloseButton";
import {
  usePostProfileImage,
  useDeleteProfileImage,
} from "../../../react-query/useProfile";
export const ProfileUpdateImage = ({ setImageEdit, img, setProfileImg }) => {
  const memberId = localStorage.getItem("memberId");
  const { mutate, status } = usePostProfileImage(memberId);
  const { mutate: deleteMutate, status: deleteStatus } =
    useDeleteProfileImage(memberId);

  // 검은 배경 눌렀는지
  const backgroundRef = useRef(null);

  // 서버로 보낼 이미지
  const [showImage, setShowImage] = useState(img);

  // 사진 업로드 눌렀을 때 서버로 전송
  const handleImageChange = (event) => {
    const formData = new FormData();
    const file = event.target.files[0];
    const fileUrl = URL.createObjectURL(file);
    // 낙관적 업데이트
    setProfileImg(fileUrl);
    setShowImage(file);
    formData.append("file", file);
    mutate(formData);
    handleCloseBtn();
  };

  // 기본 프로필로 설정 눌렀을 때 서버로 전송
  const handleOriginImage = () => {
    setProfileImg("/public/image/dp.jpg");
    deleteMutate();
    handleCloseBtn();
    // 서버로 보내는 로직 추가, 낙관적 업데이트 추가
  };

  // 배경 클릭시 모달창 닫기
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
          <img src={showImage} alt="" a />
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
