import apiClient from "../util/BaseUrl";

// 모든 알람 불러오는 api 호출 함수 (무한스크롤)
export const getAllAlarms = async (cursor) => {
  let data;
  if (cursor === 0) {
    data = await apiClient.get(`/api/v1/notification/all`);
  } else {
    data = await apiClient.get(`/api/v1/notification/all?cursor=${cursor}`);
  }
  return data?.data;
};
