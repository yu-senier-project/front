import React, { useEffect, useState } from "react";
import "../../styles/pages/ProjectCalendar.scss";
import { useParams } from "react-router-dom";
import useProjectStore from "../../store/project/useProjectStore";
import { Calendar } from "../../component/project/Calendar";
import { useSearchParams } from "react-router-dom";
import { CreateSchedule } from "../../component/project/CreateSchedule";
import { HiOutlineDotsVertical } from "react-icons/hi";

export const ProjectCalendar = () => {
  const { setProjectId, setTitle: setProjectTitle } = useProjectStore();
  const { projectId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  // 프로젝트 제목 저장
  const [title, setTitle] = useState(searchParams.get("title"));

  useEffect(() => {
    setProjectId(projectId);
    setProjectTitle(searchParams.get("title"));
  }, []);

  // 일정 만들기 눌렀는지
  const [onCreate, setOnCreate] = useState(false);

  return (
    <div className="ProjectCalendar">
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
      <Calendar />
    </div>
  );
};
