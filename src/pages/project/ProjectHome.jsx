import React from "react";
import "../../styles/pages/ProjectHome.scss";
import { HiEllipsisVertical } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useGetProjectList } from "../../react-query/useProject";

export const ProjectHome = () => {
  const nav = useNavigate();

  const { data, isLoading } = useGetProjectList();

  let projects = data?.data;

  // 프로젝트 테두리 색깔 입히기
  const colorArray = [
    "lightcoral",
    "lightsalmon",
    "lightgoldenrodyellow",
    "lightgreen",
    "lightblue",
    "lightskyblue",
    "lightslategrey",
  ];

  // 프로젝트 테두리 idx별 색깔 주기
  const getClassName = (idx) => {
    let index = idx % 7;
    return `ProjectHome-project ${colorArray[index]}`;
  };

  const handleCreateProject = () => {
    nav("/Project/Create");
  };

  return (
    <div className="ProjectHome">
      <div className="ProjectHome-title">
        <h2>프로젝트</h2>
      </div>
      <div className="ProjectHome-btn">
        <div>
          <button onClick={handleCreateProject}>새 프로젝트 생성</button>
        </div>
      </div>
      <div className="ProjectHome-projectList">
        {isLoading ? <p>로딩중...</p> : null}
        {projects?.map((project, idx) => (
          <div
            key={project.projectId}
            className={getClassName(idx)}
            onClick={() => {
              nav(
                `/ProjectHome/${project.projectId}?memberId=${project.postMember.id}&title=${project.projectName}`
              );
            }}
          >
            <div className="ProjectHome-projectSetting">
              <HiEllipsisVertical size={25} />
            </div>
            <p>{project.projectName}</p>
            <p>{project.detail}</p>
            <p>담당자 : {project.postMember.nickname}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
