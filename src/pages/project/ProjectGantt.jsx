import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import gantt from "dhtmlx-gantt";
import { useSearchParams } from "react-router-dom";
import useProjectStore from "../../store/project/useProjectStore";
import { useGetPlanList } from "../../react-query/useProject";
import { parseDate } from "../../util/parseDate";
import { CreateSchedule } from "../../component/project/CreateSchedule";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { PlanDetail } from "../../component/project/PlanDetail";
import { Participants } from "../../component/project/Participants";
import { ProjectInfo } from "../../component/project/ProjectInfo";
import { DeleteProject } from "../../component/project/DeleteProject";
import { Setting } from "../../component/basic/Setting";
import { useExitProject } from "../../react-query/useProject";
import "../../styles/project/GanttChart.scss";
import { useUpdatePlanDate } from "../../react-query/useProject";


export default function ProjectGantt() {
  const { projectId } = useParams();
  const { data, isLoading } = useGetPlanList(projectId);
  const [tasks, setTasks] = useState({ data: [], links: [] });
  const [searchParams, setSearchParams] = useSearchParams();
  const [title, setTitle] = useState(searchParams.get("title"));
  const ganttContainer = useRef(null);
  const [onCreate, setOnCreate] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [onSetting, setOnSetting] = useState(false);
  const [onParticipants, setOnParticipants] = useState(false);
  const [onProjectInfo, setOnProjectInfo] = useState(false);
  const [onDelete, setOnDelete] = useState(false);
 const nav = useNavigate();
  const myId = localStorage.getItem('memberId')
  const {
    setProjectId,
    setTitle: setProjectTitle,
    managerId,
  } = useProjectStore();
  
  const settingRef = useRef(null);
  const onBackgroundClick = (e) => {
    if (settingRef.current && !settingRef.current.contains(e.target)) {
      setOnSetting(false);
    }
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

  const updateProjectInfo = () => {
    setOnProjectInfo(true);
  };

  const updateParticipants = () => {
    setOnParticipants(true);
    setOnSetting(false);
  };

  const deleteProject = () => {
    if (myId != managerId) {
      alert("프로젝트 담당자만 삭제가능힙니다");
      return;
    }
    setOnDelete(true);
    setOnSetting(false);
  };
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
      onClick: deleteProject,
    },
  ];


  useEffect(() => {
    if (data && data.data) {
      const event = data.data
        .map((plan, index) => {
          const startDate = parseDate(plan.startedAt);
          const endDate = parseDate(plan.endedAt);
          const isAllDay = (endDate - startDate) / (1000 * 60 * 60 * 24);
          if (isAllDay < 1) {
            return null;
          }

          return {
            id: plan.planId,
            text: plan.planName,
            start_date: startDate,
            end_date: endDate,
            color: `task-color-${index % 13}`, 
          };
        })
        .filter(Boolean); 

      setTasks({ data: event, links: [] });
    } else {
      setTasks({ data: [], links: [] });
    }
  }, [data]);
  
  useEffect(() => {
    if (ganttContainer.current) {
      gantt.init(ganttContainer.current);

      gantt.config.date_format = "%Y-%m-%d %H:%i"; // 날짜 형식 설정

      // 주 스케일 단위를 연도로 설정
      gantt.config.scale_unit = "year";
      gantt.config.date_scale = "%Y";

      // 서브 스케일을 월과 일로 설정
      gantt.config.subscales = [
        { unit: "month", step: 1, date: "%F" },
        { unit: "day", step: 1, date: "%d" },
      ];

      gantt.config.row_height = 50; // 원하는 높이로 조정
      gantt.config.bar_height = 40; // 원하는 높이로 조정
      gantt.config.scale_height = 90; // 상단 날짜 표시 영역 높이 조정
      gantt.config.show_progress = false; // 진행도 바 제거
      gantt.config.show_links = false; // 링크 아이콘 제거

      gantt.config.drag_resize = false; // 일정 늘리기 제거
      gantt.config.drag_progress = false;
      gantt.config.drag_move = false; // 드래그를 통한 수정 제거

      // 기본 뼈대를 위해 간트 차트를 빈 데이터로 초기화
      gantt.clearAll();
      gantt.parse(tasks);

      gantt.templates.task_class = function (start, end, task) {
        return task.color;
      };

      // Todo list 테이블 속성
      gantt.config.columns = [
        {
          name: "text",
          label: "일정 이름",
          width: "*",
          tree: true,
          template: (obj) => {
            return `<i class="fas fa-calendar-alt"></i> ${obj.text}`;
          },
        },
        { name: "start_date", label: "시작 시간", align: "center" },
        { name: "end_date", label: "종료 시간", align: "center" },
      ];

      gantt.attachEvent("onTaskClick", function (id, e) {
        const task = gantt.getTask(id);
        if (!task) {
          console.error("Task not found");
          return;
        } 
        console.log("Task selected:", task);
        setSelectedTask(task);
        setIsModalOpen(true);
        return true;
      });

      gantt.render();
    }
  }, [tasks]);

  // Add useEffect to log selectedTask changes
  useEffect(() => {
    if (selectedTask) {
      console.log(selectedTask);
    }
  }, [selectedTask]);

  // 커스텀 스크롤 이벤트 추가
  useEffect(() => {
    const ganttElement = ganttContainer.current;

    let isMouseDown = false;
    let startX;
    let scrollLeft;

    const mouseDownHandler = (e) => {
      isMouseDown = true;
      startX = e.pageX - ganttElement.offsetLeft;
      scrollLeft = ganttElement.scrollLeft;
      ganttElement.style.cursor = "grabbing";
    };

    const mouseLeaveHandler = () => {
      isMouseDown = false;
      ganttElement.style.cursor = "grab";
    };

    const mouseUpHandler = () => {
      isMouseDown = false;
      ganttElement.style.cursor = "grab";
    };

    const mouseMoveHandler = (e) => {
      if (!isMouseDown) return;
      e.preventDefault();
      const x = e.pageX - ganttElement.offsetLeft;
      const walk = (x - startX) * 2; // 스크롤 속도 조절
      ganttElement.scrollLeft = scrollLeft - walk;
    };

    ganttElement.addEventListener("mousedown", mouseDownHandler);
    ganttElement.addEventListener("mouseleave", mouseLeaveHandler);
    ganttElement.addEventListener("mouseup", mouseUpHandler);
    ganttElement.addEventListener("mousemove", mouseMoveHandler);

    return () => {
      ganttElement.removeEventListener("mousedown", mouseDownHandler);
      ganttElement.removeEventListener("mouseleave", mouseLeaveHandler);
      ganttElement.removeEventListener("mouseup", mouseUpHandler);
      ganttElement.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, [ganttContainer.current]);
  const handleSettingButton = () => {
    setOnSetting(!onSetting);
  };
  return (
    <div className="gantt-chart">
      {/* 프로젝트 삭제 모달 */}
      {onDelete ? <DeleteProject setOnDelete={setOnDelete} /> : null}

      {/* 프로젝트 정보 모달 */}
      {onProjectInfo ? (
        <ProjectInfo setOnProjectInfo={setOnProjectInfo} />
      ) : null}

      {/* 참여자 모달  */}
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
      <div
        className="gantt"
        ref={ganttContainer}
        id="gantt_here"
        style={{ overflow: "auto", cursor: "grab" }}
      ></div>
      {isModalOpen && (
        <PlanDetail
          setDetail={setIsModalOpen}
          setSelectedEvent={setSelectedTask}
          selectedEvent={selectedTask}
        />
      )}
    </div>
  );
}
