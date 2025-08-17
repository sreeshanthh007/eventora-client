import axios  from "axios";
import { createTokenRefreshInterceptor } from "./interceptor";
import { store } from "@/store/store";
import { vendorLogout } from "@/store/slices/vendorSlice";

export const vendorAxiosInstance = axios.create({
    baseURL:import.meta.env.VITE_PRIVATE_API_PROVIDER_URL,
    withCredentials:true
});

createTokenRefreshInterceptor(vendorAxiosInstance,()=>{
    store.dispatch(vendorLogout())
});