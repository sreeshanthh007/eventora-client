
import axios from "axios";


export const AuthAxiosInstance = axios.create({
    baseURL:import.meta.env.VITE_AUTH_API_URL,
    withCredentials:true
})