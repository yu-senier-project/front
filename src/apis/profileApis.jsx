import apiClient from "../util/BaseUrl";

// 회원 피드 가져오기
export const getMemberFeed = async (
  memberId,
  filterType,
  startDate,
  endDate,
  cursorValue,
  likeCnt
) => {
  if (cursorValue === false) {
    return { data: [] };
  }
  if (startDate == 0 || endDate == 0) {
    return apiClient.get(
      `/api/v1/member/${memberId}/post?filter=${filterType}&likeCnt=${likeCnt}&cursorValue=${cursorValue}`
    );
  }
  return apiClient.get(
    `/api/v1/member/${memberId}/post?filter=${filterType}&likeCnt=${likeCnt}&start=${startDate}&end=${endDate}&cursorValue=${cursorValue}`
  );
};

// 회원 정보 가져오는 api
export const getMemberData = async (memberId) => {
  return apiClient.get(`/api/v1/member/${memberId}`);
};

// 회원 이력서 가져오는 api
export const getMemberResume = async (memberId) => {
  return apiClient.get(`/api/v1/member/${memberId}/resume`);
};

// 회원 좋아요한 게시물 가져오는 api
export const getMemberLikeFeed = async (memberId, cursorValue) => {
  if (cursorValue === false) {
    return { data: [] };
  }
  return apiClient.get(
    `/api/v1/member/${memberId}/post/liked?cursorValue=${cursorValue}`
  );
};

// 회원 정보 수정 api
export const patchMemberData = async (data) => {
  try {
    const response = await apiClient.patch(`/api/v1/member`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 회원 이력서 업로드 api
export const postResume = async (data) => {
  try {
    const response = await apiClient.post(`/api/v1/member/resume`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 회원 프로필 사진 업로드 api
export const postProfileImage = async (data) => {
  try {
    const response = await apiClient.post(`/api/v1/member/profile`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 회원 이력서 삭제 api
export const deleteResume = async () => {
  try {
    const response = await apiClient.delete(`/api/v1/member/resume`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 회원 프로필 삭제
export const deleteProfileImage = async () => {
  try {
    const response = await apiClient.delete(`/api/v1/member/profile`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
