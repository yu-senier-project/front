import React, { useState, useRef, useEffect } from "react";
import "../../styles/project/ProjectInfo.scss";
import useProjectStore from "../../store/project/useProjectStore";
import { useNavigate } from "react-router-dom";
import { useGetProjectInfo } from "../../react-query/useProject";
import { Loading } from "../basic/Loading";
import { SpinLoading } from "../basic/SpinLoading";

export const ProjectInfo = ({ setOnProjectInfo }) => {
  const myId = localStorage.getItem("memberId");
  const { projectId, managerId } = useProjectStore();
  const nav = useNavigate();

  const backgroundRef = useRef(null);
  const backgroundClick = (e) => {
    if (e.target == backgroundRef.current) {
      setOnProjectInfo(false);
    }
  };

  // 게시물 받아오는 react-query
  const { data, isLoading } = useGetProjectInfo(projectId);

  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [goal, setGoal] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const onCancle = () => {
    setOnProjectInfo(false);
  };

  const onUpdateClick = () => {
    if (myId != managerId) {
      alert("프로젝트 대표자만 수정할 수 있습니다");
      return;
    }
    nav("/ProjectHome/InfoUpdate");
  };

  // 프로젝트 정보 세팅
  useEffect(() => {
    if (data) {
      setTitle(data?.data?.projectName);
      setDetail(data?.data?.detail);
      setGoal(data?.data?.goal);
      let start = `${data?.data?.start[0]}-${
        data?.data?.start[1] < 10
          ? `0${data?.data?.start[1]}`
          : data?.data?.start[1]
      }-${
        data?.data?.start[2] < 10
          ? `0${data?.data?.start[2]}`
          : data?.data?.start[2]
      }`;
      setStartDate(start);
      let end = `${data?.data?.end[0]}-${
        data?.data?.end[1] < 10 ? `0${data?.data?.end[1]}` : data?.data?.end[1]
      }-${
        data?.data?.end[2] < 10 ? `0${data?.data?.end[2]}` : data?.data?.end[2]
      }`;
      setEndDate(end);
    }
  }, [data]);

  if (isLoading) {
    return <Loading text={"정보 가져오는 중..."}></Loading>;
  }

  return (
    <div className="ProjectInfo" ref={backgroundRef} onClick={backgroundClick}>
      <div className="ProjectInfo-wrap">
        <h2>프로젝트 정보</h2>
        <div>
          <h4>프로젝트 제목</h4>
          <p
            style={{
              border: "1px solid grey",
              padding: "10px",
              borderRadius: "10px",
              height: "25px",
              overflow: "scroll",
            }}
          >
            {title}
          </p>
        </div>
        <div>
          <h4>프로젝트 설명</h4>
          <p
            style={{
              border: "1px solid grey",
              padding: "10px",
              borderRadius: "10px",
              height: "120px",
              overflow: "scroll",
            }}
          >
            {detail}
          </p>
        </div>
        <div>
          <h4>프로젝트 목표</h4>
          <p
            style={{
              border: "1px solid grey",
              padding: "10px",
              borderRadius: "10px",
              height: "120px",
              overflow: "scroll",
            }}
          >
            {goal}
          </p>
        </div>
        <div className="ProjectInfo-btn">
          <div>
            <button style={{ backgroundColor: "#CE7171" }} onClick={onCancle}>
              돌아가기
            </button>
          </div>
          <div>
            <button
              style={{ backgroundColor: "#71c9ce" }}
              onClick={onUpdateClick}
            >
              수정하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
