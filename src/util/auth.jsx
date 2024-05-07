// auth.jsx
import apiClient from "./BaseUrl";

export function refreshAccessTokenInterceptor() {
  // 토큰 갱신 상태와 구독자 목록
  let isRefreshing = false;
  let refreshSubscribers = [];

  // 새로운 액세스 토큰이 발급되면 모든 구독자에게 알림
  function onRefreshed(newAccessToken) {
    refreshSubscribers.forEach((callback) => callback(newAccessToken));
    refreshSubscribers = [];
  }

  // 토큰 재발급 함수
  async function refreshAccessToken() {
    console.log("토큰 재발급");

    // 새 토큰 발급 요청
    const response = await apiClient.post("/api/v1/auth/refresh");
    const newAccessToken = response.headers.authorization.replace(
      "Bearer ",
      ""
    );
    localStorage.setItem("accessToken", newAccessToken);
    return newAccessToken;
  }

  // 응답 인터셉터 설정
  apiClient.interceptors.response.use(
    (response) => response, // 정상 응답인 경우 그대로 반환
    async (error) => {
      const { config, response } = error;
      const originalRequest = config;

      // 토큰이 만료된 경우 (401)
      if (response && response.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          console.log("토큰 재발급 중");
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

        // 토큰 재발급 상태로 변경
        originalRequest._retry = true;
        isRefreshing = true;
        console.log("!!");

        try {
          console.log("@@");
          const newAccessToken = await refreshAccessToken();
          isRefreshing = false; // 재발급 완료 후 상태 변경
          onRefreshed(newAccessToken);
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return apiClient(originalRequest);
        } catch (err) {
          isRefreshing = false; // 재발급 실패 시 상태 변경
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

export async function login(data) {
  try {
    const response = await apiClient.post("/api/v1/auth/login", data);
    // console.log("@@@@", response);
    if (response.status === 200) {
      // 응답에서 authorization 헤더 추출
      const authorizationHeader = response.headers["authorization"];
      // console.log(authorizationHeader);
      if (authorizationHeader) {
        const accessToken = authorizationHeader.replace("Bearer ", "");
        localStorage.setItem("accessToken", accessToken);
      } else {
        console.error("Authorization 헤더가 없습니다.");
        return false;
      }

      // 사용자 데이터 저장
      localStorage.setItem("userNickName", data.nickname);
      localStorage.setItem("userPassword", data.password);

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

//로그아웃
export async function logout() {
  try {
    // 로컬 스토리지 및 세션 스토리지 비우기
    localStorage.clear();
    sessionStorage.clear();

    // 루트로 리다이렉트
    window.location.href = "/";
  } catch (error) {
    console.error("로그아웃 오류:", error);
    alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
  }
}
