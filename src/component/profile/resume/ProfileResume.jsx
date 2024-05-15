import React, { useEffect, useRef, useState } from "react";
import "../../../styles/profile/resume/ProfileResume.scss";
import CloseButton from "../../basic/CloseButton";
import {
  useGetResume,
  useDeleteResume,
  usePostResume,
} from "../../../react-query/useProfile";
export const ProfileResume = ({ setOnResume, memberId }) => {
  const { data, isLoading, isFetching } = useGetResume(memberId);

  let pdfUrl = data?.data?.uploadFileURL ?? "없음";

  // 이력서 삭제 mutate
  const mutate = useDeleteResume(memberId);

  // 이력서 등록 mutate
  const { mutate: postMutate, status } = usePostResume(memberId);

  // 이력서 저장할 state
  const [resume, setResume] = useState("");
  const [showResume, SetShowResume] = useState("파일을 선택해주세요!");

  // 이력서 수정 버튼 눌렀는지
  const [onEdit, setOnEdit] = useState(false);

  // pdf 주소 저장할 변수 (서버에서 null 값주면 등록된 이력서 없다고 띄우기)

  const backgroundRef = useRef(null);

  // 배경 클릭시 모달창 닫기
  const onCLickBackground = (e) => {
    if (e.target === backgroundRef.current) {
      setOnResume(false);
    }
  };

  // 닫기 버튼 눌렀을 떄
  const handleCloseBtn = () => {
    setOnResume(false);
  };

  // 링크 클릭시 새 창에서 열기
  const handleLinkClick = (event) => {
    event.preventDefault(); // 기본 동작 막기
    window.open(pdfUrl, "_blank"); // 새 창에서 열기
  };

  // 이력서 등록
  const handleResumeUpdate = (e) => {
    SetShowResume(e.target.value);
    const file = e.target.files[0];
    setResume(file);
  };

  // 삭제하기 버튼 눌렀을 때
  const handleOnDelete = () => {
    if (pdfUrl === "없음") {
      alert("등록된 이력서가 없습니다!");
      return;
    }
    mutate();
  };

  // 등록하기 버튼 눌렀을 때
  const handleOnPost = () => {
    if (showResume === "파일을 선택해주세요!") {
      alert("파일을 선택해주세요!");
      return;
    }
    const formData = new FormData();
    formData.append("file", resume);
    setOnEdit(false);
    postMutate(formData);
  };

  // 파일 등록시 state에 파일 등록
  return (
    <div
      className="ProfileResume"
      ref={backgroundRef}
      onClick={onCLickBackground}
    >
      <div className="ProfileResume-wrap">
        {!onEdit ? (
          <div>
            <div className="ProfileResume-closeBtn">
              <CloseButton
                size={15}
                onCloseButton={handleCloseBtn}
              ></CloseButton>
            </div>
            <p className="ProfileResume-title">이력서 조회</p>
            <div className="ProfileResume-main">
              {isLoading || status === "pending" || isFetching ? (
                "로딩중..."
              ) : pdfUrl !== "없음" ? (
                <a href={"#"} onClick={handleLinkClick}>
                  이력서 보러가기
                </a>
              ) : (
                "등록된 이력서가 없습니다!"
              )}
            </div>
            <div className="ProfileResume-btn">
              <button
                style={{ backgroundColor: "#CE7171" }}
                onClick={handleOnDelete}
              >
                삭제하기
              </button>
              <button
                style={{ backgroundColor: "#71c9ce" }}
                onClick={() => {
                  setOnEdit(true);
                }}
              >
                {pdfUrl === "없음" ? "등록하기" : "수정하기"}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="ProfileResume-closeBtn">
              <CloseButton size={15}></CloseButton>
            </div>
            <p className="ProfileResume-title">이력서 등록</p>
            <div className="ProfileResume-main">
              <p>현재 등록된 이력서</p>
              {isLoading || status === "pending" ? (
                "로딩중..."
              ) : pdfUrl !== "없음" ? (
                <a href={"#"} onClick={handleLinkClick}>
                  이력서 보러가기
                </a>
              ) : (
                "등록된 이력서가 없습니다!"
              )}
            </div>
            <div className="ProfileResume-update">
              <p>등록할 이력서</p>
              <div>
                <label htmlFor="resume">
                  <p>이력서 등록(.pdf)</p>
                </label>
                <input
                  type="file"
                  hidden
                  id="resume"
                  onChange={handleResumeUpdate}
                  accept=".pdf"
                />
              </div>
              <p>{showResume}</p>
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
                onClick={handleOnPost}
              >
                등록하기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
