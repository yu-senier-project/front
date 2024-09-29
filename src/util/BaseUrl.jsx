import axios from 'axios';

export const BaseUrl = 'http://43.203.69.159:80';

const apiClient = axios.create({
    baseURL: 'http://43.203.69.159:80',
    headers: {
        'Content-Type': 'application/json',
    },
    // withCredentials: true,
});
apiClient.interceptors.request.use(
    (config) => {
        // 로컬 스토리지에서 토큰 가져오기
        const token = localStorage.getItem('accessToken');

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default apiClient;
