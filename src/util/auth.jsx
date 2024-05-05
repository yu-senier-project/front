// auth.jsx
import apiClient from "./BaseUrl";

export function refreshAccessTokenInterceptor() {
  console.log("@@@@" + token);

  let isRefreshing = false;
  let refreshSubscribers = [];

  function onRefreshed(newAccessToken) {
    refreshSubscribers.forEach((callback) => callback(newAccessToken));
    refreshSubscribers = [];
  }

  async function refreshAccessToken() {
    console.log("토큰 재발급");

    // 새 토큰 발급
    const response = await apiClient.post("/api/v1/auth/refresh");
    const newAccessToken = response.headers.authorization.replace(
      "Bearer ",
      ""
    );
    localStorage.setItem("accessToken", newAccessToken);
    return newAccessToken;
  }

  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const { config, response } = error;
      const originalRequest = config;

      // 토큰이 만료된 경우(401)
      if (response && response.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          // 토큰 재발급 중인 경우 기다림
          return new Promise((resolve) => {
            refreshSubscribers.push((newAccessToken) => {
              originalRequest.headers[
                "Authorization"
              ] = `Bearer ${newAccessToken}`;
              resolve(apiClient(originalRequest));
            });
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const newAccessToken = await refreshAccessToken();
          isRefreshing = false;
          onRefreshed(newAccessToken);
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return apiClient(originalRequest);
        } catch (err) {
          isRefreshing = false;
          refreshSubscribers = [];
          console.error("토큰 갱신 오류:", err);
          alert("세션이 만료되었습니다. 다시 로그인해주세요.");
          window.location.href = "/";
          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
    }
  );
}

// auth.jsx
export async function login(data) {
  try {
    const response = await apiClient.post("/api/v1/auth/login", data);
    console.log(response);
    if (response.status === 200) {
      // 실제로 발급받은 토큰 저장
      const accessToken = response.headers.authorization.replace("Bearer ", "");
      localStorage.setItem("accessToken", accessToken);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("로그인 오류:", error);
    alert("로그인에 실패했습니다. 다시 시도해주세요.");
    return false;
  }
}
