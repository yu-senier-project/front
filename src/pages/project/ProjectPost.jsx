import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import { useSearchParams } from "react-router-dom";
import useProjectStore from "../../store/project/useProjectStore";
import { useGetPlanList } from "../../react-query/useProject";
import { HiOutlineDotsVertical } from "react-icons/hi";
// import axios from "axios";
import apiClient from "../../util/BaseUrl";
export default function ProJectPost() {
  const { setProjectId, setTitle: setProjectTitle } = useProjectStore();
  const { projectId } = useParams();
  const { data, isLoading } = useGetPlanList(projectId);
  const [tasks, setTasks] = useState({ data: [], links: [] });
  const [searchParams, setSearchParams] = useSearchParams();
  const [title, setTitle] = useState(searchParams.get("title"));
  const memberId = localStorage.getItem("memberId");
  return (
    <div>
      <button
        onClick={async () => {
          const response = await apiClient.get(
            `/api/v1/project/${projectId}/post?cursorValue=0`
          );
          console.log(response);
        }}
      >
        asdfaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      </button>
      <button
        onClick={async () => {
          const data = {
            content: "qeqweqwe",
          };
          const response = await apiClient.post(
            `/api/v1/project/${projectId}/post`,
            data
          );
          console.log(response);
        }}
      >
        asdfaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabb
      </button>
    </div>
  );
}
