import { clientAxiosInstance } from "@/api/client.axios";



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