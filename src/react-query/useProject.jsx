import React from "react";
import { useNavigate } from "react-router-dom";
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
  updatePlan,
  exitProject,
  getProjectInfo,
  updateProjectInfo,
  getProjectParticipants,
  updateProjectParticipants,
  deleteProject,
  updatePlanDate,
  createTodo,
  getMyTodo,
  deleteTodo,
  updateTodoState,
  getAllTodos,
  getAllChannels,
  createChannel,
  exitChannel,
  updateChannel,
  deleteChannel
} from "../apis/projectApis";
import { QueryStatsTwoTone } from "@mui/icons-material";

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
      const prevData = queryClient.getQueryData(["projectList"]);
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
      const prevData = queryClient.getQueryData(["planList", projectId]);
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

// 일정 수정
export const useUpdatePlan = (planId) => {
  const queryClient = useQueryClient();
  const { mutate, status } = useMutation({
    mutationFn: (data) => updatePlan(planId, data),
    onError: (e) => {
      console.log(e);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["detailPlan", planId.toString()]);
    },
    onMutate: (data) => {
      console.log(data);
      const prevData = queryClient.getQueryData([
        "detailPlan",
        planId.toString(),
      ]);
      console.log(prevData);

      const newData = {
        content: data.content,
        endedAt: data.endedAt,
        planId: prevData.data.planId,
        planName: data.planName,
        startedAt: data.startedAt,
        participants:
          data.inviteList.length !== 0
            ? data.inviteList.map((user) => {
                return {
                  nickname: "로딩중",
                  profile: null,
                  id: user,
                };
              })
            : prevData.data.participants,
      };

      // const newArr = prevData?.data?.filter((plan) => {
      //   console.log(plan.planId);
      //   return plan.planId != planId;
      // });

      queryClient.setQueryData(["detailPlan", planId.toString()], {
        data: newData,
      });
    },
  });

  return { mutate, status };
};

// 일정 날짜 변경
export const useUpdatePlanDate = (projectId) => {
  const queryClient = useQueryClient();
  const { mutate, status } = useMutation({
    mutationFn: ({ planId, data }) => {
      console.log(planId), console.log(data);
      updatePlanDate(planId, data);
    },
    onError: (e) => {
      console.log(e);
    },
    onSuccess: (data, variables) => {
      const { planId } = variables;
      queryClient.invalidateQueries(["detailPlan", planId.toString()]);
      queryClient.invalidateQueries(["planList"], projectId);
    },
  });

  return { mutate, status };
};

// 프로젝트 나가기
export const useExitProject = (projectId) => {
  const queryClient = useQueryClient();
  const { mutate, status } = useMutation({
    mutationFn: exitProject,
    onError: (e) => {
      console.log(e);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["projectList"]);
    },
    onMutate: (data) => {
      const prevData = queryClient.getQueryData(["projectList"]);

      const newArr = prevData.data.filter(
        (project) => project.projectId != data
      );

      queryClient.setQueryData(["projectList"], {
        data: newArr,
      });
    },
  });
  return { mutate, status };
};

// 프로젝트 정보 받아오기
export const useGetProjectInfo = (projectId) => {
  const { data, isLoading } = useQuery({
    queryKey: ["projectInfo", projectId],
    queryFn: () => getProjectInfo(projectId),
    staleTime: 5 * 1000 * 60,
    gcTime: 10 * 1000 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  return { data, isLoading };
};

// 프로젝트 정보 수정하기
export const useUpdateProjectInfo = (projectId) => {
  const queryClient = useQueryClient();
  const { mutate, status } = useMutation({
    mutationFn: (data) => updateProjectInfo(projectId, data),
    onError: (e) => {
      console.log(e);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["projectList"]);
      queryClient.invalidateQueries(["projectInfo", projectId]);
    },
    onMutate: (data) => {
      console.log(data);
      const prevData = queryClient.getQueryData(["projectList"]);
      console.log(prevData);
      const projectInfo = queryClient.getQueryData(["projectInfo", projectId]);

      let end = data.end.split("-");
      let start = data.start.split("-");
      const newObj = {
        projectId: data.projectId,
        projectName: data.projectName,
        detail: data.detail,
        goal: data.goal,
        start: start,
        end: end,
      };

      const newArr = prevData.data.map((project) => {
        if (project.projectId == projectId) {
          return {
            projectId,
            detail: data.detail,
            postMember: project.postMember,
            projectName: data.projectName,
          };
        } else {
          return project;
        }
      });

      queryClient.setQueryData(["projectInfo", projectId], {
        data: newObj,
      });
      queryClient.setQueryData(["projectList"], {
        data: newArr,
      });
    },
  });

  return { mutate, status };
};

// 프로젝트 참여자 정보 가져오기
export const useGetProjectParticipants = (projectId) => {
  const { data, isLoading } = useQuery({
    queryKey: ["projectParticipants", projectId],
    queryFn: () => getProjectParticipants(projectId),
    staleTime: 5 * 1000 * 60,
    gcTime: 10 * 1000 * 60,
    // refetchOnWindowFocus: false,
    // refetchOnReconnect: false,
  });
  return { data, isLoading };
};

// 프로젝트 참여자 정보 수정하기
export const useUpdateProjectParticipant = (projectId) => {
  const nav = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, status } = useMutation({
    mutationFn: (data) => updateProjectParticipants(projectId, data),
    onError: (e) => {
      console.log(e);
    },
    onSuccess: (data) => {
      nav("/Project");
      queryClient.invalidateQueries(["projectList"]);
      queryClient.invalidateQueries(
        ["projectParticipants", projectId.toString()],
        { refetchInactive: true }
      );
    },
    onMutate: (data) => {
      console.log(data);
      let prev = queryClient.getQueryData(["projectList"]);
      console.log(prev);

      const newArr = prev.data.map((project) => {});
    },
  });

  return { mutate, status };
};

// 프로젝트 삭제하기
export const useDeleteProject = (projectId) => {
  const queryClient = useQueryClient();
  const { mutate, status } = useMutation({
    mutationFn: () => deleteProject(projectId),
    onError: (e) => {
      console.log(e);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["projectList"]);
    },
    onMutate: (data) => {
      const prevData = queryClient.getQueryData(["projectList"]);
      console.log(prevData);

      const newArr = prevData.data.filter(
        (project) => project.projectId != projectId
      );

      queryClient.setQueryData(["projectList"], {
        data: newArr,
      });
    },
  });
  return { mutate, status };
};

// 할일 생성하기
export const useCreateTodo = (projectId) => {
  const queryClient = useQueryClient();
  const { mutate, status } = useMutation({
    mutationFn: (data) => createTodo(projectId, data),
    onError: (e) => {
      console.log(e);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["myTodos", projectId]);
      console.log("성공! ");
    },
    onMutate: (data) => {
      const prev = queryClient.getQueryData(["myTodos", projectId]);
      console.log(prev);
      let prevObj = prev?.data.todoList ?? [];
      console.log(prevObj);
      prevObj = [
        {
          content: data.content,
          state: data.state,
          // id: prevObj[prevObj.length - 1].id + 1,
          id: 0,
        },
        ...prevObj,
      ];

      console.log(prevObj);

      queryClient.setQueryData(["myTodos", projectId], {
        data: { todoList: prevObj },
      });
    },
  });

  return { mutate, status };
};

// 나의 할일 가져오기
export const useGetMyTodo = (projectId) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["myTodos", projectId],
    queryFn: () => getMyTodo(projectId),
    staleTime: 5 * 1000 * 60,
    gcTime: 10 * 1000 * 60,
    refetchOnMount: true,
  });
  return { data, isLoading, refetch };
};

// 할일 삭제하기
export const useDeleteTodo = (projectId, taskId) => {
  const queryClient = useQueryClient();
  const { mutate, status } = useMutation({
    mutationFn: () => deleteTodo(taskId),
    onError: (e) => {
      console.log(e);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["myTodos", projectId]);
    },
    onMutate: (data) => {
      const prevData = queryClient.getQueryData(["myTodos", projectId]);
      console.log(prevData);
      let todoList = prevData.data.todoList;
      todoList = todoList.filter((todo) => todo.id != taskId);

      queryClient.setQueryData(["myTodos", projectId], {
        data: { todoList },
      });
    },
  });
  return { mutate, status };
};

// 할일 상태 수정하기
export const useUpdateTodoState = (projectId) => {
  const queryClient = useQueryClient();
  const { mutate, status, refetch } = useMutation({
    mutationFn: ({ taskId, data }) => {
      return updateTodoState(taskId, data);
    },
    onError: (e) => {
      console.log(e);
    },
    onSuccess: (data) => {
      // queryClient.invalidateQueries(["myTodos", projectId]);
    },
    onMutate: (data) => {
      // console.log(data);
      // const prevData = queryClient.getQueryData(["myTodos", projectId]);
      // let todoList = prevData.data.todoList;
      // todoList = todoList.map((todo) => {
      //   if (todo.id == data.taskId) {
      //     todo.state = data.state;
      //     return todo;
      //   } else {
      //     return todo;
      //   }
      // });
      // queryClient.setQueryData(["myTodos", projectId], {
      //   data: { todoList },
      // });
    },
  });
  return { mutate, status, refetch };
};

// 전체 할일 가져오기
export const useGetAllTodos = (projectId) => {
  const { data, isLoading } = useQuery({
    queryKey: ["allTodos", projectId],
    queryFn: () => getAllTodos(projectId),
    staleTime: 5 * 1000 * 60,
    gcTime: 10 * 1000 * 60,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
  return { data, isLoading };
};

//화상 채팅 채널 가져오기
export const useGetAllChannels = (projectId) => {
  const {data, isLoading} = useQuery({
    queryKey : ["allChannels",projectId],
    queryFn: () => getAllChannels(projectId),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
  return {data, isLoading};
}

//화상 채팅 채널 만들기
export const useCreateChannel = (projectId) => {
  const queryClient = useQueryClient();
  const { mutate, status } = useMutation({
    mutationFn: (data) => createChannel(data, projectId),
    onError: (e) => {
      console.log(e);
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries(["allChannels", projectId]);
    },
    onMutate: (data) => {
      const prevData = queryClient.getQueryData(["allChannels", projectId]);
      const newArr = [...prevData.data, data];
      queryClient.setQueryData(["allChannels", projectId], { data: newArr });
    },
    onSettled: () => {
      queryClient.invalidateQueries(["allChannels",projectId]);
    }
  });

  return { mutate, status };
}

//채널 나가기
export const useExitChannel = (projectId, channelId) => {
  const queryClient = useQueryClient();
  const nav = useNavigate();

  const { mutate, status } = useMutation({
    mutationFn: () => exitChannel(projectId, channelId),
    onError: (e) => {
      console.log(e);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allChannels", projectId]);
      nav(`/ProjectHome/Channel/${projectId}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["allChannels", projectId]);
    }
  });

  return { mutate, status };
};

//채널 명 수정
export const useUpdateChannel = (projectId, channelId) => {
  const queryClient = useQueryClient();

  const { mutate, status } = useMutation({
    mutationFn: (data) => updateChannel(data, projectId, channelId),
    onError: (e) => {
      console.log(e);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allChannels", projectId]);
    },
    onMutate: (data) => {
      const prevData = queryClient.getQueryData(["allChannels", projectId]);
      const updatedChannels = prevData.data.map((channel) =>
        channel.id === channelId ? { ...channel, name: data.name } : channel
      );
      queryClient.setQueryData(["allChannels", projectId], { data: updatedChannels });
    },
    onSettled: () => {
      queryClient.invalidateQueries(["allChannels", projectId]);
    }
  });

  return { mutate, status };
};

//채널 삭제
export const useDeleteChannel = (projectId, channelId) => {
  const queryClient = useQueryClient();

  const { mutate, status } = useMutation({
    mutationFn: () => deleteChannel(projectId, channelId),
    onError: (e) => {
      console.log(e);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allChannels", projectId]);
    },
    onMutate: () => {
      const prevData = queryClient.getQueryData(["allChannels", projectId]);
      const updatedChannels = prevData.data.filter(channel => channel.id !== channelId);
      queryClient.setQueryData(["allChannels", projectId], { data: updatedChannels });
    },
    onSettled: () => {
      queryClient.invalidateQueries(["allChannels", projectId]);
    }
  });

  return { mutate, status };
};