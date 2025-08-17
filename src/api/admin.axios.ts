import axios from "axios";
import { adminLogout } from "@/store/slices/adminSlice";
import { store } from "@/store/store";
import { createTokenRefreshInterceptor } from "./interceptor";

export const adminAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PRIVATE_API_ADMIN_URL,
  withCredentials: true,
});

createTokenRefreshInterceptor(adminAxiosInstance,()=>{
    store.dispatch(adminLogout())
})
