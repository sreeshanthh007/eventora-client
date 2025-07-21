import { AuthAxiosInstance } from "@/api/auth.axios";
import { type IAuthResponse } from "./authServices";


export const googleAuth = async({
    credential,
    client_id,
    role
}:{
    credential:any,
    client_id:any,
    role:string
}):Promise<IAuthResponse>=>{
    const response = await AuthAxiosInstance.post("/google-auth",{
        credential,
        client_id,
        role
    });
    return response.data
}