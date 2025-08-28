import axios, { type AxiosInstance, AxiosError } from "axios";
import { toast } from "sonner";
import { store } from "@/store/store";
import { adminLogout } from "@/store/slices/adminSlice";
import { clientLogout } from "@/store/slices/clientSlice";
import { vendorLogout } from "@/store/slices/vendorSlice";
import { StatusCodes } from "@/utils/constants/statusCodes";
import { URL_PART } from "@/utils/constants/route";

export const axiosInstance: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

let isRefreshing = false;
let refreshSubscribers: ((token?: string) => void)[] = [];

// Notify queued requests when refresh succeeds
function onRefreshed(token?: string) {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
}

const handleLogout = (role: string) => {
  switch (role) {
    case "_cl":
      store.dispatch(clientLogout());
      break;
    case "_ad":
      store.dispatch(adminLogout());
   
      break;
    case "_ve":
      store.dispatch(vendorLogout());
    
      break;
    default:
      window.location.href = "/";
  }
 
};

function getRoleFromUrl(url?: string) {
  const part = url?.split("/")[2] || ""; 
  if (["_cl", "_ad", "_ve"].includes(part)) return part;
  return "";
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<any>) => {
    console.log("error message", error.response?.data?.message);
    const originalRequest: any = error.config;
    const role = getRoleFromUrl(originalRequest.url);

   
    if (error.response?.status === StatusCodes.UNAUTHORIZED && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        const refreshEndpoint =
          role === URL_PART.admin
            ? "/api_v1/_ad/refresh-token"
            : role === URL_PART.client
            ? "/api_v1/_cl/refresh-token"
            : role === URL_PART.vendor
            ? "/api_v1/_ve/refresh-token"
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
      toast.info(error.response?.data?.message || "Session expired, please log in again");
      handleLogout(role);
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
