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
  getDetailPlan,
  deletePlan,
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

// 계획 정보 다 받아오기
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

// 계획 상세정보 조회
export const useGetDetailPlan = (planId) => {
  const { data, isLoading } = useQuery({
    queryKey: ["detailPlan", planId],
    queryFn: () => getDetailPlan(planId),
    staleTime: 5 * 1000 * 60,
    gcTime: 10 * 1000 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  return { data, isLoading };
};

// 일정 삭제
export const useDeletePlan = (planId, projectId) => {
  const queryClient = useQueryClient();
  const { mutate, status } = useMutation({
    mutationFn: () => deletePlan(planId),
    onError: (e) => {
      console.log(e);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["planList", projectId]);
    },
    onMutate: (data) => {
      const prevData = queryClient.getQueryData(["planList", projectId]);

      const newArr = prevData?.data?.filter((plan) => {
        console.log(plan.planId);
        return plan.planId != planId;
      });

      queryClient.setQueryData(["planList", projectId], { data: newArr });
    },
  });

  return { mutate, status };
};
