import axios, { type AxiosInstance, AxiosError } from "axios";
import { toast } from "sonner";
import { store } from "@/store/store";
import { adminLogout } from "@/store/slices/adminSlice";
import { clientLogout } from "@/store/slices/clientSlice";
import { vendorLogout } from "@/store/slices/vendorSlice";
import { StatusCodes } from "@/utils/constants/statusCodes";
import { URL_PART } from "@/utils/constants/route";
import { ADMIN_ROUTES, CLIENT_ROUTES, VENDOR_ROUTES } from "@/utils/constants/api.routes";

export const axiosInstance: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

let isRefreshing = false;
let refreshSubscribers: ((token?: string) => void)[] = [];

function onRefreshed(token?: string) {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
}

const handleLogout = (role: string) => {
  switch (role) {
    case URL_PART.client:
      store.dispatch(clientLogout());
      break;
    case URL_PART.admin:
      store.dispatch(adminLogout());
      break;
    case URL_PART.vendor:
      store.dispatch(vendorLogout());
      break;
    default:
      window.location.href = "/";
  }
};

function getRoleFromUrl(url?: string) {
  const part = url?.split("/")[2] || "";
  return ["_cl", "_ad", "_ve"].includes(part) ? part : "";
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<any>) => {
    const originalRequest: any = error.config;
    const role = getRoleFromUrl(originalRequest.url);
    const message = error.response?.data?.message || "";

    if (error.response?.status === StatusCodes.UNAUTHORIZED && !originalRequest._retry) {
      originalRequest._retry = true;

      
      const isRefreshTokenRequest = originalRequest.url?.includes('refresh-token');
      if (isRefreshTokenRequest) {
        toast.info("Session expired, please log in again");
        handleLogout(role);
        return Promise.reject(error);
      }

      if (!isRefreshing) {
        isRefreshing = true;

        const refreshEndpoint =
          role === URL_PART.admin
            ? ADMIN_ROUTES.REFRESH_TOKEN
            : role === URL_PART.client
            ? CLIENT_ROUTES.REFRESH_TOKEN
            : role === URL_PART.vendor
            ? VENDOR_ROUTES.REFRESH_TOKEN
            : "";

        try {
          const { data } = await axiosInstance.post(refreshEndpoint);
          isRefreshing = false;
          onRefreshed(data?.token);
          return axiosInstance(originalRequest);
        } catch (refreshError: any) {
          const errorMessage = refreshError.response?.data?.message || "Failed to refresh token";
          toast.info(errorMessage);
          isRefreshing = false;
          handleLogout(role);
          return Promise.reject(refreshError);
        }
      }

      return new Promise((resolve) => {
        refreshSubscribers.push(() => {
          resolve(axiosInstance(originalRequest));
        });
      });
    }
    
    if (
      error.response?.status === StatusCodes.FORBIDDEN &&
      (message.includes("Access denied") ||
       message.includes("Token is blacklisted") ||
       message.includes("Your account has been blocked"))
    ) {
      toast.info(message || "Access denied");
      handleLogout(role);
      return Promise.reject(error);
    }

    if (
      error.response?.status === StatusCodes.UNAUTHORIZED &&
      message.includes("Unauthorized access") && 
      message.includes("please login")
    ) {
      // toast.info(message || "Please log in again");
      handleLogout(role);
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);