import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import gantt from "dhtmlx-gantt";
import { useSearchParams } from "react-router-dom";
import useProjectStore from "../../store/project/useProjectStore";
import { useGetPlanList } from "../../react-query/useProject";
import { parseDate } from "../../util/parseDate";
import { CreateSchedule } from "../../component/project/CreateSchedule";
import { HiOutlineDotsVertical } from "react-icons/hi";
import "../../styles/project/GanttChart.scss";

export default function ProjectGantt() {
  const { setProjectId, setTitle: setProjectTitle } = useProjectStore();
  const { projectId } = useParams();
  const { data, isLoading } = useGetPlanList(projectId);
  const [tasks, setTasks] = useState({ data: [], links: [] });
  const [searchParams, setSearchParams] = useSearchParams();
  const [title, setTitle] = useState(searchParams.get("title"));
  const ganttContainer = useRef(null);
  const [onCreate, setOnCreate] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (data && data.data) {
      const event = data.data.map((plan, index) => {
        return {
          id: plan.planId,
          text: plan.planName,
          start_date: parseDate(plan.startedAt),
          end_date: parseDate(plan.endedAt),
          color: `task-color-${index % 13}`, // 13개의 색상을 순환하여 할당
        };
      });
      setTasks({ data: event, links: [] });
    }
  }, [data]);

  useEffect(() => {
    if (ganttContainer.current && tasks.data.length > 0) {
      gantt.init(ganttContainer.current);
      gantt.parse(tasks);

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

      gantt.attachEvent("onTaskDblClick", function (id, e) {
        const task = gantt.getTask(id);
        setSelectedTask(task);
        setIsModalOpen(true);
        return false; // 기본 모달 방지
      });

      // Tasks 색 지정
      gantt.templates.task_class = function (start, end, task) {
        return task.color;
      };

    

      // Todo list 테이블 속성
      gantt.config.columns = [
        { name: "text", label: "일정 이름", width: "*", tree: true, template: (obj) => {
            return `<i class="fas fa-calendar-alt"></i> ${obj.text}`;
          }
        },
        { name: "start_date", label: "시작 시간", align: "center" },
        { name: "end_date", label: "종료 시간", align: "center" },
       
      ];

      gantt.render();
    }
  }, [tasks]);

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
      ganttElement.style.cursor = 'grabbing';
    };

    const mouseLeaveHandler = () => {
      isMouseDown = false;
      ganttElement.style.cursor = 'grab';
    };

    const mouseUpHandler = () => {
      isMouseDown = false;
      ganttElement.style.cursor = 'grab';
    };

    const mouseMoveHandler = (e) => {
      if (!isMouseDown) return;
      e.preventDefault();
      const x = e.pageX - ganttElement.offsetLeft;
      const walk = (x - startX) * 2; // 스크롤 속도 조절
      ganttElement.scrollLeft = scrollLeft - walk;
    };

    ganttElement.addEventListener('mousedown', mouseDownHandler);
    ganttElement.addEventListener('mouseleave', mouseLeaveHandler);
    ganttElement.addEventListener('mouseup', mouseUpHandler);
    ganttElement.addEventListener('mousemove', mouseMoveHandler);

    return () => {
      ganttElement.removeEventListener('mousedown', mouseDownHandler);
      ganttElement.removeEventListener('mouseleave', mouseLeaveHandler);
      ganttElement.removeEventListener('mouseup', mouseUpHandler);
      ganttElement.removeEventListener('mousemove', mouseMoveHandler);
    };
  }, [ganttContainer.current]);

  return (
    <div className="gantt-chart">
      {onCreate ? (
        <CreateSchedule setOnCreate={setOnCreate}></CreateSchedule>
      ) : null}
      <div className="ProjectCalendar-top">
        <h2>
          <button>
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
    </div>
  );
}
