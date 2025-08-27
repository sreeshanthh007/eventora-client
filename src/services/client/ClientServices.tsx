
// import { clientAxiosInstance } from "@/api/client.axios";
import { axiosInstance } from "@/api/interceptor";
import type { ICategory, IEvent } from "@/types/User";

export type Client = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  about?: string;
  profileImage?: string;
  place: string;
};

export interface ClientResponse {
  success: boolean;
  client: Client;
}

export interface ClientPersonalInformation{
  name:string
  phone:string
}

export const getClientDetails = async () => {
  const result = await axiosInstance.get<ClientResponse>(
    "/api_v1/_cl/details"
  );
  return result.data;
};


export const updateProfileImage = async(image:string) =>{
  const result = await axiosInstance.post(
    "/api_v1/_cl/update-profileImage",
    {image}
  );
  return result.data
};


  export const updatePersonalInformation = async(data:Partial<Pick<ClientPersonalInformation,"name" | "phone">>)=>{
    const response =await axiosInstance.patch(
      "/api_v1/_cl/update-profile",
      data
    );
    return response.data
  }

export const getAllCategories = async() : Promise<ICategory[]>=>{
    const result = await axiosInstance.get<ICategory[]>(
        "/api_v1/_cl/all-categories"
    )
    return result.data
};


export const getAllEvents = async() : Promise<IEvent[]>=>{
  const response = await axiosInstance.get<IEvent[]>(
    "/api_v1/_cl/all-events"
  );
  return response.data
}

export const clientRefreshSession = async() : Promise<ClientResponse> =>{
  const response = await axiosInstance.get<ClientResponse>(
    "/api_v1/_cl/refresh-session"
  );
  return response.data
}
