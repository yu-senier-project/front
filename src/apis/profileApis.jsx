import apiClient from "../util/BaseUrl";

export const getMemberPost = () => {
  return apiClient.get(
    "/api/v1/member/{memberId}/post?filter={filterType}&start={startDate}&end={endDate}"
  );
};
