import React, { useState } from "react";
import "../../styles/pages/CreateProject.scss";
import "react-datepicker/dist/react-datepicker.css";
import { InviteUser } from "../../component/project/InviteUser";
import { useCreateProject } from "../../react-query/useProject";
import { useNavigate } from "react-router-dom";

export const CreateProject = () => {
  const nav = useNavigate();

  // 게시물 생성 mutate
  const { mutate, status } = useCreateProject();

  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [goal, setGoal] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // 참여자 리스트
  const [participants, setParticipants] = useState([]);

  // 매니저 아이디 저장
  const [managerId, setManagerId] = useState(0);

  // 프로젝트 생성 버튼 눌렀을 때
  const createProject = () => {
    if (title == "") {
      alert("프로젝트 제목을 입력하세요");
      return;
    }
    if (detail == "") {
      alert("프로젝트 설명을 입력하세요");
      return;
    }
    if (goal == "") {
      alert("프로젝트 목표를 입력하세요");
      return;
    }
    if (startDate == "") {
      alert("프로젝트 시작날짜를 입력하세요");
      return;
    }
    if (endDate == "") {
      alert("프로젝트 끝날짜를 입력하세요");
      return;
    }
    if (participants.length == 0) {
      alert("참여자를 초대하세요");
      return;
    }
    if (managerId == 0) {
      alert("대표자를 선택하세요");
      return;
    }

    let memberList = participants.map((user) => user.memberId);
    memberList = memberList.filter((memberId) => managerId != memberId);

    const data = {
      projectName: title,
      detail,
      goal,
      start: startDate,
      end: endDate,
      managerId,
      memberList,
    };
    mutate(data);
    nav("/Project");
  };

  // 취소 버튼 눌렀을 때
  const onCancle = () => {
    nav("/Project");
  };

  return (
    <div>
      <div className="CreateProject">
        <div className="CreateProject-info">
          <h2>프로젝트 만들기</h2>
          <div className="CreateProject-input">
            {/* 프로젝트 제목 */}
            <div>
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
                  type="date"
                  onChange={(e) => {
                    setStartDate(e.target.value);
                  }}
                />
              </div>
              <div
                style={{ display: "flex", alignItems: "center", width: "10px" }}
              >
                <p style={{ fontWeight: "bold" }}>~</p>
              </div>
              <div className="CreateProject-endDate">
                <input
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
        <div className="CreateProject-user">
          <h2>참여자 초대</h2>
          <InviteUser
            setManagerId={setManagerId}
            participants={participants}
            setParticipants={setParticipants}
          />
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
            생성
          </button>
        </div>
      </div>
    </div>
  );
};
