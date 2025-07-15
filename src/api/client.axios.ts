import axios from "axios";
import { toast } from "sonner";


export const clientAxiosInstance = axios.create({
    baseURL : import.meta.env.VITE_PRIVATE_API_URL,
    withCredentials:true
})


let isRefreshing = false
clientAxiosInstance.interceptors.response.use(
    (response)=>response,
    async (error)=>{
        const originalRequest = error.config
        
    console.log("⚠️ Interceptor Triggered:", error?.response?.status);
        if(error.response?.status==401 && !originalRequest._retry){
            originalRequest._retry=true

            if(!isRefreshing){
                isRefreshing = true
                try {
                    await clientAxiosInstance.post("/refresh-token");
                    isRefreshing = false

                    return clientAxiosInstance(originalRequest)
                } catch (error) {
                    isRefreshing=false
                    localStorage.removeItem("clientSession")
                    window.location.href="/"
                    toast.info("please try again")
                }
            }
        }
        if(
            error.response?.status === 403 && 
            error.response?.data?.message == 'Access denied. You do not have permission to access this resource.' || 
            (error.response?.status == 403 && 
                error.response?.data?.message == "Token is blacklisted" ||
                (error.response?.status === 403 && 
                    error.respnse?.data?.message === 'Your account has been blocked' &&
                    !originalRequest._retry)
            )
        ){
            localStorage.removeItem("clientSession")
            window.location.href='/'
            toast.info("Please login again")
        }
        return Promise.reject(error)
    }
)

