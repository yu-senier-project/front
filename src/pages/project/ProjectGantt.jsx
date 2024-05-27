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

  useEffect(() => {
    if (data && data.data) {
      const event = data.data.map((plan, index) => {
        return {
          id: plan.planId,
          text: plan.planName,
          start_date: parseDate(plan.startedAt),
          end_date: parseDate(plan.endedAt),
          color: `task-color-${index}`,
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
      gantt.config.scale_unit = "day";
      gantt.config.date_scale = "%d";
      gantt.config.subscales = [];

      gantt.config.row_height = 50; // 원하는 높이로 조정
      gantt.config.bar_height = 40; // 원하는 높이로 조정
      gantt.config.scale_height = 60; // 상단 날짜 표시 영역 높이 조정
      gantt.config.show_progress = false; // 진행도 바 제거
      gantt.config.show_links = false; // 링크 아이콘 제거

      gantt.config.drag_resize = false; //일정 늘리기 제거
      gantt.config.drag_progress = false; //
      gantt.config.drag_move = false; // 드래그를 통한 수정 제거

      //날짜 형식 24 May 02
      gantt.templates.date_scale = function (date) {
        return gantt.date.date_to_str("%y %M %d")(date);
      };
      // Tasks 색 지정(수정중)
      gantt.templates.task_class = function (start, end, task) {
        return task.color;
      };
      //Todo list 테이블 속성
      gantt.config.columns = [
        { name: "text", label: "Task name", width: "*", tree: true },
        { name: "start_date", label: "Start time", align: "center" },
        { name: "end_date", label: "End time", align: "center" },
      ];

      gantt.render();
    }
  }, [tasks]);

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
      <div className="gantt" ref={ganttContainer} id="gantt_here"></div>
      <button
        onClick={() => {
          console.log(tasks);
        }}
      >
        asdfasfasdfasdfasdfasfd
      </button>
    </div>
  );
}
