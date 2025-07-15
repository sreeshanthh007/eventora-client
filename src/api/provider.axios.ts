import axios  from "axios";
import { toast } from "sonner";

export const vendorAxiosInstance = axios.create({
    baseURL:import.meta.env.VITE_PRIVATE_API_PROVIDER_URL,
    withCredentials:true
});


let isRefreshing = false
vendorAxiosInstance.interceptors.response.use(
    (response)=>response,
    async(err)=>{
        const originalRequest = err.config

        if(err.response?.status==401 && !originalRequest._retry){
            originalRequest._retry = true

            if(!isRefreshing){
                isRefreshing=true

                try {
                    await vendorAxiosInstance.post("/v_/refresh-token")
                    isRefreshing = false

                    return vendorAxiosInstance(originalRequest)
                } catch (error) {
                    isRefreshing = false
                    localStorage.removeItem("vendorSession")
                    window.location.href="/vendor/login"
                    toast.info("please try again")
                }
            }
        }
         if(
            err.response?.status === 403 && 
            err.response?.data?.message == 'Access denied. You do not have permission to access this resource.' || 
            (err.response?.status == 403 && 
                err.response?.data?.message == "Token is blacklisted" ||
                (err.response?.status === 403 && 
                    err.respnse?.data?.message === 'Your account has been blocked' &&
                    !originalRequest._retry)
            )
        ){
            localStorage.removeItem("clientSession")
            window.location.href='/'
            toast.info("Please login again")
        }
        return Promise.reject(err)
    }
)