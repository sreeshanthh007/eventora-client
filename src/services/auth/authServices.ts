import { AuthAxiosInstance } from "@/api/auth.axios";
import type {  IAxiosResponse } from "@/types/Response";
import type  { UserRole } from "@/types/UserRoles";
import type { UserDTO } from "@/types/User";
import { axiosInstance } from "@/api/interceptor";
// import { clientAxiosInstance } from "@/api/client.axios";
// import { vendorAxiosInstance } from "@/api/provider.axios";
// import { adminAxiosInstance } from "@/api/admin.axios";

export interface ILoginData{
    name:string,
    email:string,
    role:UserRole,
}

export interface IAuthResponse{
    success:boolean,
    message:string,
    user:{
        _id:string,
        name:string,
        email:string,
        role: "client" | "admin" | "vendor",
        idProof?:string
        status?: "active" | "pending" | "blocked";
        rejectionReason?:string
        submissionDate?:Date 
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

export const clientForgotUpdatePassword = async (data: {
  email: string;
  password: string;
  role:string;
}) => {
  const result = await AuthAxiosInstance.put<IAxiosResponse>(
    "/forgot-password",
    data
  );
  return result.data;
};


export const verifyOtp = async(data:{email:string,otp:string}) : Promise<IAxiosResponse>=>{
    const response = await AuthAxiosInstance.post<IAxiosResponse>(
        "/verify-otp",
        data
    )
    return response.data
    
}

export const saveFcmToken = async({userId,fcmToken,role}:{userId:string,fcmToken:string,role:string}) =>{
    const response = await AuthAxiosInstance.post("/save-fcm",{userId,fcmToken:fcmToken,role})
    return response.data
}
export const logOutClient = async() : Promise<IAxiosResponse> =>{
    const response = await axiosInstance.post("/api_v1/_cl/logout")
    return response.data    
}

export const VendorLogout = async() : Promise<IAxiosResponse> =>{
    const response = await axiosInstance.post("/api_v1/_ve/logout")
    return response.data
}


export const AdminLogout = async() : Promise<IAxiosResponse> =>{
    const reponse = await axiosInstance.post("/api_v1/_ad/logout")
    return reponse.data
}