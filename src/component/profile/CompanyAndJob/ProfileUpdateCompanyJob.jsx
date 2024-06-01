import React, { useReducer, useRef, useState } from "react";
import "../../../styles/profile/CompanyJob/ProfileUpdateCompanyJob.scss";
import Input from "../../basic/Input";
import { FaArrowRight } from "react-icons/fa";
import CloseButton from "../../basic/CloseButton";
import { ProfileCompanySearch } from "./ProfileCompanySearch";
import { useUpdateCompany } from "../../../react-query/useProfile";
import { updateCompany } from "../../../apis/profileApis";
import { useNavigate } from "react-router-dom";
export const ProfileUpdateCompanyJob = ({ setOnChangeCompany, data }) => {
  const nav = useNavigate();
  const backgroundRef = useRef(null);

  const { mutateAsync } = useUpdateCompany(localStorage.getItem("memberId"));

  // 바꿀 회사명 저장
  const [company, setCompany] = useState("");

  // 바꿀 소속 저장
  const [position, setPosition] = useState("");

  // 회사 변경 눌렀는지
  const [onCompanyChange, setOnCompanyChange] = useState(false);

  const backgroundClick = (e) => {
    if (e.target == backgroundRef.current) {
      setOnChangeCompany(false);
    }
  };

  // 모달창 닫기
  const handleCloseBtn = () => {
    setOnChangeCompany(false);
  };

  // 변경하기 버튼 눌렀을 때
  const onChange = async () => {
    if (company === "" && position === "") {
      alert("변경할 회사나 소속을 입력하세요");
      return;
    }

    let updateData = {
      companyName: company || data.data.companyName,
      position: position || data.data.position,
    };

    try {
      await mutateAsync(updateData);
      setOnChangeCompany(false);
    } catch (error) {
      alert(
        "프로젝트 담당자는 회사를 바꿀 수 없습니다. 담당자를 교체하고 다시 시도해주세요."
      );
      nav("/Project");
    }
  };

  return (
    <>
      {onCompanyChange ? (
        <ProfileCompanySearch
          setOnCompanyChange={setOnCompanyChange}
          setCompany={setCompany}
        />
      ) : null}
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
              <p>{data.data.companyName}</p>
            </div>
            <div>
              <FaArrowRight size={20} />
            </div>
            <div>
              <p style={{ fontWeight: "bold" }}>변경할 회사</p>
              <p
                className="ProfileUpdateCompanyJob-company-btn"
                onClick={() => {
                  setOnCompanyChange(true);
                }}
              >
                {company != "" ? company : "선택하기"}
              </p>
            </div>
          </div>
          <div className="ProfileUpdateCompanyJob-job">
            <div>
              <p style={{ fontWeight: "bold" }}>현재 소속</p>
              <p>{data.data.position ?? "없음"}</p>
            </div>
            <div>
              <FaArrowRight size={20} />
            </div>
            <div>
              <p style={{ fontWeight: "bold" }}>변경할 소속 </p>
              <p className="ProfileUpdateCompanyJob-company-btn">
                <Input
                  width={150}
                  placeholder={"소속을 입력해주세요"}
                  value={position}
                  onChange={(e) => {
                    setPosition(e.target.value);
                  }}
                ></Input>
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
            <button style={{ backgroundColor: "#71c9ce" }} onClick={onChange}>
              변경하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
