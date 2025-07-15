import { AuthAxiosInstance } from "@/api/auth.axios";
import type {  IAxiosResponse } from "@/types/Response";
import type  { UserRole } from "@/types/UserRoles";
import type { UserDTO } from "@/types/User";

export interface ILoginData{
    name:string,
    email:string,
    role:UserRole
}

export interface IAuthResponse{
    success:boolean,
    message:string,
    user:{
        id:string,
        name:string,
        email:string,
        role: "client" | "admin" | "vendor"
    }
}

export const signUp = async(user:UserDTO):Promise<IAuthResponse> =>{
    const response = await AuthAxiosInstance.post<IAuthResponse>(
        "/signup",
        user
    )
    return response.data
}


export const logIn = async(user:ILoginData):Promise<IAuthResponse> =>{

    const response = await AuthAxiosInstance.post<IAuthResponse>(
        "/login",
        user
    );
    return response.data
}


export const sendOtp = async(email:string):Promise<IAxiosResponse> =>{
    const response = await AuthAxiosInstance.post("/sent-otp",{
        email,
    });
    return response.data
}

export const sendForgotPasswordOtp = async(email:string) : Promise<IAxiosResponse>=>{
    const response = await AuthAxiosInstance.post("/forgot-password/sent-otp",{
        email
    });
    return response.data
}


export const verifyOtp = async(data:{email:string,otp:string}) : Promise<IAxiosResponse>=>{
    const response = await AuthAxiosInstance.post<IAxiosResponse>(
        "/verify-otp",
        data
    )
    return response.data
    
}