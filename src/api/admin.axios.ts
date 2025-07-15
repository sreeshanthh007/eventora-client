
        import axios from "axios";
        import { toast } from "sonner";

        export const adminAxiosInstance = axios.create({
            baseURL:import.meta.env.VITE_PRIVATE_API_ADMIN_URL,
            withCredentials:true
        });


        let isRefreshing = false;

        adminAxiosInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (!isRefreshing) {
                isRefreshing = true;
                try {
                await adminAxiosInstance.post("/refresh-token");
                isRefreshing = false;

                return adminAxiosInstance(originalRequest);
                } catch (refreshError) {
                isRefreshing = false;
                console.error("Refresh token expired. Redirecting to login.");
                localStorage.removeItem("adminSession");
                window.location.href = "/admin/login";
                toast.info("Please login again");
                return Promise.reject(refreshError);
                }
            }
            }

            if (
            (error.response.status === 403 &&
                error.response.data.message ===
                "Access denied. You do not have permission to access this resource.") ||
            (error.response.status === 403 &&
                error.response.data.message === "Token is blacklisted" &&
                !originalRequest._retry)
            ) {
            localStorage.removeItem("adminSession");
            window.location.href = "/admin";
            toast.info("Please login again");
            return Promise.reject(error);
            }

            return Promise.reject(error);
        }
        );