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

      gantt.attachEvent("onAfterTaskDrag", function (id, mode, e) {
        const task = gantt.getTask(id);
        console.log(
          `Task ${task.text} was moved to: Start date - ${task.start_date}, End date - ${task.end_date}`
        );
      });

      gantt.config.date_format = "%Y-%m-%d %H:%i"; // 날짜 형식 설정
      gantt.config.scale_unit = "month";
      gantt.config.date_scale = "%F";
      gantt.config.subscales = [
        { unit: "year", step: 1, date: "%Y" },
        { unit: "day", step: 1, date: "%d" },
      ];

      gantt.config.row_height = 50; // 원하는 높이로 조정
      gantt.config.bar_height = 40; // 원하는 높이로 조정
      gantt.config.scale_height = 60; // 상단 날짜 표시 영역 높이 조정
      gantt.config.show_progress = false; // 진행도 바 제거
      gantt.config.show_links = false; // 링크 아이콘 제거


      gantt.config.drag_resize = false; //일정 늘리기 제거
      gantt.config.drag_progress = false; // 
      gantt.config.drag_move = false;

      gantt.templates.timeline_cell_class = function (task, date) {
        if (date.getDay() === 0 || date.getDay() === 6) {
          // 주말
          return "weekend";
        }
        return "";
      };

      gantt.templates.tooltip_text = function (start, end, task) {
        return `<b>Task:</b> ${task.text}<br/>
                <b>Start date:</b> ${gantt.templates.tooltip_date_format(
                  start
                )}<br/>
                <b>End date:</b> ${gantt.templates.tooltip_date_format(
                  end
                )}<br/>
                <b>Description:</b> ${task.description}<br/>
                <b>Assigned to:</b> ${task.assigned_to}<br/>
                <b>Priority:</b> ${task.priority}`;
      };

      gantt.templates.task_class = function (start, end, task) {
        return task.color; 
      };

      gantt.render();
    }
  }, [tasks]);

  return (
    <div className="gantt-chart">
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
      <div className="gantt"
        ref={ganttContainer}
        id="gantt_here"
        style={{ }}
      ></div>
      {/* <button
        onClick={() => {
          console.log(tasks);
        }}
      >
        asdfasfasdfasdfasdfasfd
      </button> */}
    </div>
  );
}
