import { clientAxiosInstance } from "@/api/client.axios";
import { type IAxiosResponse } from "@/types/Response";


export type Client ={
    _id:string,
    name:string,
    email:string,
    phone:string,
    password:string,
    role:string,
    status:string,
    createdAt:string,
    updatedAt:string
}

export interface ClientResponse {
    success:boolean
    client:Client
}

export const getClientDetails = async()=>{
    const result = await clientAxiosInstance.get<ClientResponse>(
        "/client/details"
    )
    return result.data
}


        export const clientForgotUpdatePassword = async(data: { email: string; password: string })=>{
            const result = await clientAxiosInstance.put<IAxiosResponse>(
                "/forgot-password",
                data
            )
            return result.data
        }