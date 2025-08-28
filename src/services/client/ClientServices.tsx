
// import { clientAxiosInstance } from "@/api/client.axios";
import { axiosInstance } from "@/api/interceptor";
import type { ICategory, IEvent } from "@/types/User";
import { CLIENT_ROUTES } from "@/utils/constants/api.routes";

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
    CLIENT_ROUTES.CLIENT_DETAILS
  );
  return result.data;
};


export const updateProfileImage = async(image:string) =>{
  const result = await axiosInstance.post(
    CLIENT_ROUTES.UPDATE_PROFILE_IMAGE,
    {image}
  );
  return result.data
};


  export const updatePersonalInformation = async(data:Partial<Pick<ClientPersonalInformation,"name" | "phone">>)=>{
    const response =await axiosInstance.patch(
      CLIENT_ROUTES.UPDATE_PERSONAL_INFORMATION,
      data
    );
    return response.data
  }

export const getAllCategories = async() : Promise<ICategory[]>=>{
    const result = await axiosInstance.get<ICategory[]>(
        CLIENT_ROUTES.GET_ALL_CATEGORIES
    )
    return result.data
};


export const getAllEvents = async() : Promise<IEvent[]>=>{
  const response = await axiosInstance.get<IEvent[]>(
    CLIENT_ROUTES.GET_ALL_EVENTS
  );
  return response.data
}

export const clientRefreshSession = async() : Promise<ClientResponse> =>{
  const response = await axiosInstance.get<ClientResponse>(
    CLIENT_ROUTES.REFRESH_SESSION
  );
  return response.data
}
