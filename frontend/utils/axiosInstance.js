import axios from "axios";
import Cookies from "js-cookie";

const AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// Tambahkan token dari localStorage ke setiap request
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

// Cek jika ada token baru di response header, simpan kembali
AxiosInstance.interceptors.response.use(
    (response) => {
        const newToken = response.headers["authorization"];
        if (newToken) {
            const tokenOnly = newToken.replace("Bearer ", "");
            Cookies.set("token", tokenOnly, { expires: 1 });
        }
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default AxiosInstance;
