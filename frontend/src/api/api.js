import axios from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

export const authApi = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        Authorization: localStorage.getItem('TOKEN'),
    },
});

authApi.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem('TOKEN');
    return config;
});

authApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const response = await authApi.post(
                '/refresh-token',
                {},
                {
                    headers: { Authorization: localStorage.getItem('TOKEN') },
                }
            );
            localStorage.setItem('TOKEN', response.data.token);
            authApi.defaults.headers['Authorization'] =
                localStorage.getItem('TOKEN');
            return authApi(originalRequest);
        }
        throw error;
    }
);
