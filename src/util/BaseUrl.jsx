// baseurl.jsx
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://13.51.99.142:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 전 헤더에 토큰 설정
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    console.log("@@@@" + token);
    config.headers["Authorization"] = `${token}`;
  }
  return config;
});

export default apiClient;
