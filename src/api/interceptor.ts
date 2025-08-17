import { toast } from "sonner";
import {type  AxiosInstance, AxiosError } from "axios";
import { StatusCodes } from "@/utils/constants/statusCodes";


type LogoutCallback = () => void;

let isRefreshing = false;
let refreshSubscribers: ((token?: string) => void)[] = [];

// Notify all queued requests when refresh succeeds
function onRefreshed(token?: string) {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
}

export const createTokenRefreshInterceptor = (
  axiosInstance: AxiosInstance,
  logoutCallback: LogoutCallback
) => {
  return axiosInstance.interceptors.response.use(
    (response) => response,

    async (error: AxiosError<any>) => {
      const originalRequest: any = error.config;

     
      if (error.response?.status === StatusCodes.UNAUTHORIZED && !originalRequest._retry) {
        originalRequest._retry = true;

        if (!isRefreshing) {
          isRefreshing = true;

          try {
            const { data } = await axiosInstance.post("/refresh-token");

            isRefreshing = false;
            onRefreshed(data?.token);

            return axiosInstance(originalRequest);
          } catch (refreshError) {
            isRefreshing = false;
            logoutCallback();
            toast.info("Please try again");
            return Promise.reject(refreshError);
          }
        }

        // If refresh is already in progress → queue this request
        return new Promise((resolve) => {
          refreshSubscribers.push(() => {
            resolve(axiosInstance(originalRequest));
          });
        });
      }
      if (
        (error.response?.status === StatusCodes.UNAUTHORIZED &&
          error.response.data?.message === "Unauthorized access") ||
        (error.response?.status === StatusCodes.FORBIDDEN &&
          error.response.data?.message ===
            "Access denied. You do not have permission to access this resource.") ||
        (error.response?.status === StatusCodes.FORBIDDEN &&
          error.response.data?.message === "Token is blacklisted") ||
        (error.response?.status === StatusCodes.FORBIDDEN &&
          error.response.data?.message?.includes("Your account has been blocked"))
      ) {
        toast.info("Please login again");
        logoutCallback();
        return Promise.reject(error);
      }

      return Promise.reject(error);
    }
  );
};
