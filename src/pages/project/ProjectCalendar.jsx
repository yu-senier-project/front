import React, { useEffect, useState, useRef } from "react";
import "../../styles/pages/ProjectCalendar.scss";
import { useParams } from "react-router-dom";
import useProjectStore from "../../store/project/useProjectStore";
import { Calendar } from "../../component/project/Calendar";
import { useSearchParams } from "react-router-dom";
import { CreateSchedule } from "../../component/project/CreateSchedule";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Setting } from "../../component/basic/Setting";
import { useExitProject } from "../../react-query/useProject";
import { useNavigate } from "react-router-dom";
import { Participants } from "../../component/project/Participants";
import { ProjectInfo } from "../../component/project/ProjectInfo";

export const ProjectCalendar = () => {
  const myId = localStorage.getItem("memberId");
  const {
    setProjectId,
    setTitle: setProjectTitle,
    managerId,
  } = useProjectStore();
  const { projectId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const nav = useNavigate();

  // 일정 나가는 mutate
  const { mutate: exitMutate } = useExitProject();

  // 프로젝트 제목 저장
  const [title, setTitle] = useState(searchParams.get("title"));

  // 일정 만들기 눌렀는지
  const [onCreate, setOnCreate] = useState(false);

  // 설정 버튼 눌렀는지
  const [onSetting, setOnSetting] = useState(false);

  // 참여자 정보 창
  const [onParticipants, setOnParticipants] = useState(false);

  // 프로젝트 정보 창
  const [onProjectInfo, setOnProjectInfo] = useState(false);

  // 배경 클릭하면 세팅 닫기
  const settingRef = useRef(null);
  const onBackgroundClick = (e) => {
    if (settingRef.current && !settingRef.current.contains(e.target)) {
      setOnSetting(false);
    }
  };

  // 세팅 버튼 눌렀을 때 실행할 함수
  const handleSettingButton = () => {
    setOnSetting(!onSetting);
  };

  // 프로젝트 나가기 버튼 눌렀을 때 실행할 함수
  const exitProject = () => {
    if (myId == managerId) {
      alert("프로젝트 대표자는 프로젝트를 나갈 수 없습니다.");
      setOnSetting(false);
      return;
    }
    let bool = confirm("정말로 나가겠습니까?");
    if (bool) {
      exitMutate(projectId);
      nav("/Project");
    } else {
      return;
    }
  };

  // 프로젝트 정보 수정하기 버튼 눌렀을 때 실행할 함수
  const updateProjectInfo = () => {
    setOnProjectInfo(true);
  };

  // 프로젝트 참여자 보는거 여는 함수
  const updateParticipants = () => {
    setOnParticipants(true);
    setOnSetting(false);
  };

  // 세팅 정보 담긴 리스트
  const settingTitleList = [
    {
      title: "프로젝트 정보",
      onClick: updateProjectInfo,
    },
    {
      title: "참여자",
      onClick: updateParticipants,
    },
    {
      title: "프로젝트 나가기",
      onClick: exitProject,
    },
    {
      title: "삭제하기",
      onClick: null,
    },
  ];

  useEffect(() => {
    setProjectId(projectId);
    setProjectTitle(searchParams.get("title"));
  }, []);

  return (
    <div className="ProjectCalendar" onClick={onBackgroundClick}>
      {onProjectInfo ? (
        <ProjectInfo setOnProjectInfo={setOnProjectInfo} />
      ) : null}
      {onParticipants ? (
        <Participants setOnParticipants={setOnParticipants} />
      ) : null}
      {onCreate ? (
        <CreateSchedule setOnCreate={setOnCreate}></CreateSchedule>
      ) : null}
      <div className="ProjectCalendar-top">
        {onSetting ? (
          <div className="ProjectCalendar-setting" ref={settingRef}>
            <Setting settingTitleList={settingTitleList}></Setting>
          </div>
        ) : null}
        <h2>
          <button onClick={handleSettingButton}>
            <HiOutlineDotsVertical size={20} />
          </button>
          {title}
        </h2>
        <div>
          <button
            onClick={() => {
              setOnCreate(true);
            }}
          >
            새 일정 만들기
          </button>
        </div>
      </div>
      <Calendar />
    </div>
  );
};
