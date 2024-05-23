import React, { useEffect, useState } from "react";
import "../../styles/pages/ProjectCalendar.scss";
import { useParams } from "react-router-dom";
import useProjectStore from "../../store/project/useProjectStore";
import { Calendar } from "../../component/project/Calendar";

export const ProjectCalendar = () => {
  const { setProjectId } = useProjectStore();
  const { projectId } = useParams();

  useEffect(() => {
    setProjectId(projectId);
  }, []);

  return (
    <div className="ProjectCalendar">
      <h4>프로젝트 이름</h4>

      <Calendar />
    </div>
  );
};
