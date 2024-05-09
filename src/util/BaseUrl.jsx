// baseurl.jsx
import axios from "axios";

export const BaseUrl = "http://13.51.99.142:8080";

const apiClient = axios.create({
  baseURL: "http://13.51.99.142:8080",
  headers: {
    "Content-Type": "application/json",
  },
});
apiClient.interceptors.request.use(
  (config) => {
    // 로컬 스토리지에서 토큰 가져오기
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
