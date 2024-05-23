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
