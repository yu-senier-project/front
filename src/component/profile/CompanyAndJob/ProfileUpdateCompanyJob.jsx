import React, { useReducer, useRef } from "react";
import "../../../styles/profile/CompanyJob/ProfileUpdateCompanyJob.scss";
import Input from "../../basic/Input";
import { FaArrowRight } from "react-icons/fa";
import CloseButton from "../../basic/CloseButton";
export const ProfileUpdateCompanyJob = ({ setOnChangeCompany }) => {
  const backgroundRef = useRef(null);

  const backgroundClick = (e) => {
    if (e.target == backgroundRef.current) {
      setOnChangeCompany(false);
    }
  };

  // 모달창 닫기
  const handleCloseBtn = () => {
    setOnChangeCompany(false);
  };

  return (
    <div
      className="ProfileUpdateCompanyJob"
      ref={backgroundRef}
      onClick={backgroundClick}
    >
      <div className="ProfileUpdateCompanyJob-wrap">
        <div className="ProfileUpdateCompanyJob-closeBtn">
          <CloseButton size={20} onCloseButton={handleCloseBtn}></CloseButton>
        </div>
        <p className="ProfileUpdateCompanyJob-title">소속 변경</p>
        <div className="ProfileUpdateCompanyJob-company">
          <div>
            <p style={{ fontWeight: "bold" }}>현재 회사</p>
            <p>영남대학교</p>
          </div>
          <div>
            <FaArrowRight size={20} />
          </div>
          <div>
            <p style={{ fontWeight: "bold" }}>변경할 회사</p>
            <p className="ProfileUpdateCompanyJob-company-btn">선택하기</p>
          </div>
        </div>
        <div className="ProfileUpdateCompanyJob-job">
          <div>
            <p style={{ fontWeight: "bold" }}>현재 소속</p>
            <p>연구/개발</p>
          </div>
          <div>
            <FaArrowRight size={20} />
          </div>
          <div>
            <p style={{ fontWeight: "bold" }}>변경할 소속 </p>
            <p className="ProfileUpdateCompanyJob-company-btn">
              <Input width={150} placeholder={"소속을 입력해주세요"}></Input>
            </p>
          </div>
        </div>
        <div className="ProfileResume-btn">
          <button
            style={{ backgroundColor: "#CE7171" }}
            onClick={handleCloseBtn}
          >
            취소하기
          </button>
          <button
            style={{ backgroundColor: "#71c9ce" }}
            onClick={() => {
              setOnEdit(true);
            }}
          >
            변경하기
          </button>
        </div>
      </div>
    </div>
  );
};
