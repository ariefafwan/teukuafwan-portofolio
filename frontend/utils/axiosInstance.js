import axios from "axios";
import Cookies from "js-cookie";

const AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

AxiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

AxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes("/refresh-token")) {
      originalRequest._retry = true;

      try {
        // Hit refresh token endpoint
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/refresh-token`,
          {},
          {
            withCredentials: true,
          }
        );

        const newAccessToken = res.data.data.accessToken;

        if (newAccessToken) {
          Cookies.set("token", newAccessToken, { expires: 1 });

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return AxiosInstance(originalRequest);
        }
      } catch (refreshError) {
        window.location.href = "/auth";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default AxiosInstance;
