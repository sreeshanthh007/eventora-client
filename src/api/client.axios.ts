import axios from "axios";
import { createTokenRefreshInterceptor } from "./interceptor";
import { store } from "@/store/store";
import { clientLogout } from "@/store/slices/clientSlice";


export const clientAxiosInstance = axios.create({
    baseURL : import.meta.env.VITE_PRIVATE_API_URL,
    withCredentials:true
})

createTokenRefreshInterceptor(clientAxiosInstance,()=>{
    store.dispatch(clientLogout())
})