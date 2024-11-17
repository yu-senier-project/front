import apiClient from "../util/BaseUrl";

// 회사 사람 검색
export const searchCompanyMember = async (nickname, memberId) => {
  return apiClient.get(
    `/api/v1/member/only-company/search?nickname=${nickname}&memberId=${memberId}`
  );
};

// 프로젝트 생성
export const createProject = async (data) => {
  try {
    const response = await apiClient.post(`/api/v1/project`, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// 프로젝트 조회
export const getProjectList = async () => {
  return apiClient.get(`/api/v1/project/list`);
};

// 프로젝트 참여자 조회 api
export const getParticipant = async (projectId) => {
  return apiClient.get(`/api/v1/project/${projectId}/participant`);
};

// 일정 목록 조회
export const getPlanList = async (projectId) => {
  return apiClient.get(`/api/v1/plan/list?projectId=${projectId}`);
};

// 일정 생성하는 api
export const createPlan = async (data, projectId) => {
  try {
    const response = await apiClient.post(
      `/api/v1/plan/create/${projectId}`,
      data
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

// 일정 상세조회 api
export const getDetailPlan = async (planId) => {
  return apiClient.get(`/api/v1/plan/${planId}`);
};

// 일정 삭제 api
export const deletePlan = async (planId) => {
  try {
    const response = await apiClient.delete(`/api/v1/plan/${planId}`);
    return response.data;
  } catch (error) {
    alert("일정은 프로젝트 관리자만 삭제할 수 있습니다!");
  }
};

// 일정 수정 api
export const updatePlan = async (planId, data) => {
  try {
    console.log(data);
    const response = await apiClient.patch(`/api/v1/plan/${planId}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 일정 날자 수정 api
export const updatePlanDate = async (planId, data) => {
  try {
    const response = await apiClient.patch(
      `/api/v1/plan/update-date/${planId}`,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 프로젝트 나가기 api
export const exitProject = async (projectId) => {
  try {
    const res = await apiClient.delete(`/api/v1/project/${projectId}/exit`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// 프로젝트 정보 가져오는 api
export const getProjectInfo = async (projectId) => {
  return apiClient.get(`/api/v1/project/${projectId}`);
};

// 프로젝트 정보 수정하는 api
export const updateProjectInfo = async (projectId, data) => {
  try {
    const response = await apiClient.patch(
      `/api/v1/project/${projectId}`,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 프로젝트 참여자 정보 가져오는 api
export const getProjectParticipants = async (projectId) => {
  return apiClient.get(`/api/v1/project/${projectId}/participant`);
};

// 프로젝트 참여자 수정하는 api
export const updateProjectParticipants = async (projectId, data) => {
  try {
    const response = await apiClient.patch(
      `/api/v1/project/${projectId}/invite`,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 프로젝트 삭제하는 api
export const deleteProject = async (projectId) => {
  try {
    const response = await apiClient.delete(`/api/v1/project/${projectId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 할일 생성하는 api
export const createTodo = async (projectId, data) => {
  try {
    const response = await apiClient.post(`/api/v1/task/${projectId}`, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// 할일 불러오는 api
export const getMyTodo = async (projectId) => {
  return apiClient.get(`/api/v1/task?projectId=${projectId}`);
};

// 할일 삭제하는 api
export const deleteTodo = async (taskId) => {
  try {
    const response = await apiClient.delete(`/api/v1/task/${taskId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 할일 상태변경하는 api
export const updateTodoState = async (taskId, data) => {
  try {
    const response = await apiClient.patch(
      `/api/v1/task/${taskId}/state`,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 전체 할일 가져오는 api
export const getAllTodos = async (projectId) => {
  return apiClient.get(`/api/v1/task/all?projectId=${projectId}`);
};


// 전체 채널 목록 가져오는 api
export const getAllChannels = async (projectId) => {
  return apiClient.get(`/api/v1/project/${projectId}/channel`);
};

// 화상채팅 채널 생성하는 api
export const createChannel = async (data, projectId) => {
  try {
    const response = await apiClient.post(
      `/api/v1/project/${projectId}/channel`,
      data
    );
    return response;
  } catch(error) {
    console.log(error);
  }
}

// 화상채팅 채널 퇴장하는 api
export const exitChannel = async (projectId, channelId) => {
  try {
    const response = await apiClient.delete(
      `/api/v1/project/${projectId}/channel/${channelId}/connection`
    )
    return response.data;
  } catch (error){
    console.log(error);
  }
}

// 화상채팅 세션 생성하는 api
export const createSession = async (projectId, channelId) => {
  try {
    const response = await apiClient.post(
      `/api/v1/project/${projectId}/channel/${channelId}`
    )
    return response.data;
  } catch (error){
    console.log(error);
  }
}

// 화상채팅 토큰 생성하는 api
export const generateToken = async (projectId, channelId, sessionId) => {
  try {
    const response = await apiClient.post(
      `/api/v1/project/${projectId}/channel/${channelId}/connection/${sessionId}`
    )
    return response.data;
  } catch (error){
    console.log(error);
  }
}

export const updateChannel = async (data, projectId, channelId) => {
  try {
    const response = await apiClient.put(
      `/api/v1/project/${projectId}/channel/${channelId}`,
      data
    )
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const deleteChannel = async (projectId, channelId) => {
  try {
    const response = await apiClient.delete(
      `/api/v1/project/${projectId}/channel/${channelId}`
    )
    return response;
  }catch (error){
    console.log(error);
  }
}