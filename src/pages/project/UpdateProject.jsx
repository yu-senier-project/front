import React, { useEffect, useState } from "react";
import "../../styles/pages/CreateProject.scss";
import "../../styles/pages/UpdateProject.scss";
import "react-datepicker/dist/react-datepicker.css";
import { InviteUser } from "../../component/project/InviteUser";
import {
  useCreateProject,
  useGetProjectInfo,
  useUpdateProjectInfo,
} from "../../react-query/useProject";
import { useNavigate } from "react-router-dom";
import useProjectStore from "../../store/project/useProjectStore";
import { Loading } from "../../component/basic/Loading";

export const UpdateProject = () => {
  const nav = useNavigate();

  // 프로젝트 id 받아오는 코드
  const { projectId } = useProjectStore();

  // 게시물 받아오는 react-query
  const { data, isLoading } = useGetProjectInfo(projectId);

  // 게시물 생성 mutate
  const { mutate, status } = useUpdateProjectInfo(projectId);

  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [goal, setGoal] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // 매니저 아이디 저장
  const [managerId, setManagerId] = useState(0);

  // 프로젝트 수정 버튼 눌렀을 때
  const createProject = () => {
    const data = {
      projectName: title,
      detail,
      goal,
      start: startDate,
      end: endDate,
    };
    mutate(data);
    nav("/Project");
  };

  // 취소 버튼 눌렀을 때
  const onCancle = () => {
    nav(-1);
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
    return <Loading text={"정보 가져오는중..."}></Loading>;
  }

  return (
    <div>
      <div className="CreateProject UpdateProject">
        <div className="CreateProject-info">
          <h2>프로젝트 만들기</h2>
          <div className="CreateProject-input">
            {/* 프로젝트 제목 */}
            <div>
              <h4>프로젝트 제목</h4>
              <input
                type="text"
                placeholder="프로젝트 제목"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            {/* 프로젝트 설명 */}
            <div>
              <h4>프로젝트 설명</h4>
              <textarea
                placeholder="프로젝트 설명"
                style={{ height: "200px" }}
                value={detail}
                onChange={(e) => {
                  setDetail(e.target.value);
                }}
              ></textarea>
            </div>
            {/* 프로젝트 목표 */}
            <div>
              <h4>프로젝트 목표</h4>
              <textarea
                style={{ height: "130px" }}
                placeholder="프로젝트 목표"
                value={goal}
                onChange={(e) => {
                  setGoal(e.target.value);
                }}
              ></textarea>
            </div>
            <h4>목표 기간 설정</h4>
            <div className="CreateProject-info-date">
              <div className="CreateProject-startDate">
                <input
                  value={startDate}
                  type="date"
                  onChange={(e) => {
                    setStartDate(e.target.value);
                  }}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <p style={{ fontWeight: "bold" }}>~</p>
              </div>
              <div className="CreateProject-endDate">
                <input
                  value={endDate}
                  type="date"
                  min={startDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="CreateProject-btn">
        <div>
          <button style={{ backgroundColor: "#CE7171" }} onClick={onCancle}>
            취소
          </button>
        </div>
        <div>
          <button
            style={{ backgroundColor: "#71c9ce" }}
            onClick={createProject}
          >
            수정하기
          </button>
        </div>
      </div>
    </div>
  );
};
