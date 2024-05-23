import React from "react";
import {
  useQuery,
  useQueryClient,
  useInfiniteQuery,
  useMutation,
} from "@tanstack/react-query";
import {
  searchCompanyMember,
  createProject,
  createPlan,
  getProjectList,
  getParticipant,
  getPlanList,
} from "../apis/projectApis";

// 프로젝트 조회
export const useGetProjectList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["projectList"],
    queryFn: getProjectList,
    staleTime: 10 * 1000 * 60,
    gcTime: 10 * 1000 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return { data, isLoading };
};

// 프로젝트 참여자 조회
export const useGetParticipant = (projectId) => {
  const { data, isLoading } = useQuery({
    queryKey: ["participant", projectId],
    queryFn: () => getParticipant(projectId),
    staleTime: 5 * 1000 * 60,
    gcTime: 10 * 1000 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  return { data, isLoading };
};

// 프로젝트 생성
export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const { mutate, status } = useMutation({
    mutationFn: createProject,
    onError: (e) => {
      console.log(e);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["projectList"]);
    },
    onMutate: (data) => {
      console.log(data);
      const prevData = queryClient.getQueryData(["projectList"]);
      console.log(prevData);
      const newData = {
        detail: data.detail,
        projectId: 0,
        projectName: data.projectName,
        postMember: {
          id: 0,
          nickname: "업데이트중...",
          profile: null,
        },
      };
      const newArr = [...prevData.data, newData];
      queryClient.setQueryData(["projectList"], { data: newArr });
    },
  });

  return { mutate, status };
};

// 일정 생성
export const useCreatePlan = (projectId) => {
  const queryClient = useQueryClient();
  const { mutate, status } = useMutation({
    mutationFn: (data) => createPlan(data, projectId),
    onError: (e) => {
      console.log(e);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["planList", projectId]);
    },
    onMutate: (data) => {
      console.log(data);
      const prevData = queryClient.getQueryData(["planList", projectId]);
      console.log(prevData);
      const newData = {
        planName: data.planName,
        startedAt: data.startedAt,
        endedAt: data.endedAt,
      };
      const newArr = [...prevData.data, newData];
      queryClient.setQueryData(["planList", projectId], { data: newArr });
    },
  });

  return { mutate, status };
};

export const useGetPlanList = (projectId) => {
  const { data, isLoading } = useQuery({
    queryKey: ["planList", projectId],
    queryFn: () => getPlanList(projectId),
    staleTime: 5 * 1000 * 60,
    gcTime: 10 * 1000 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  return { data, isLoading };
};
