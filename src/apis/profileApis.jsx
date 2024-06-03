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
    if (cursorValue == 0) {
      return apiClient.get(
        `/api/v1/member/${memberId}/post?filter=${filterType}`
      );
    }
    return apiClient.get(
      `/api/v1/member/${memberId}/post?filter=${filterType}&cursorValue=${cursorValue}`
    );
  }
  if (cursorValue == 0) {
    return apiClient.get(
      `/api/v1/member/${memberId}/post?filter=${filterType}&start=${startDate}&end=${endDate}`
    );
  }
  return apiClient.get(
    `/api/v1/member/${memberId}/post?filter=${filterType}&start=${startDate}&end=${endDate}&cursorValue=${cursorValue}`
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
  if (cursorValue == 0) {
    return apiClient.get(`/api/v1/member/${memberId}/post/liked`);
  } else {
    return apiClient.get(
      `/api/v1/member/${memberId}/post/liked?cursorValue=${cursorValue}`
    );
  }
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
    console.log(response.data.profile);
    localStorage.setItem("profile", response.data.profile);
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
    localStorage.setItem("profile", null);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 회사 검색 api
export const getCompany = async (companyName) => {
  return apiClient.get(`/api/v1/company/search?keyword=${companyName}`);
};

// 회사 이메일 가져오는 api
export const getCompanyEmail = async (companyName) => {
  return apiClient.get(`/api/v1/company/${companyName}/email`);
};

// 회사 이메일 요청
export const getEmail = async (email) => {
  return apiClient.get(`/api/v1/email-auth/request/${email}`);
};

// 이메일 인증
export const postEmailAuthNum = async (data) => {
  try {
    const response = await apiClient.post(`/api/v1/email-auth/confirm`, data);
    return response;
  } catch (error) {
    return error;
  }
};

// 회사나 직무 수정
export const updateCompany = async (data) => {
  try {
    const response = await apiClient.put(`/api/v1/member/company`, data);
    return response;
  } catch (error) {
    if (error.response) {
      // 서버에서 반환된 에러
      throw new Error(
        error.response.data.message || "서버 에러가 발생했습니다."
      );
    } else if (error.request) {
      // 요청이 전송되었지만 응답이 없는 경우
      throw new Error("서버로부터 응답이 없습니다. 나중에 다시 시도해주세요.");
    } else {
      // 요청 설정 중에 에러가 발생한 경우
      throw new Error("요청을 처리하는 중에 에러가 발생했습니다.");
    }
  }
};
