
import { clientAxiosInstance } from "@/api/client.axios";
import type { ICategory } from "@/types/User";

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

export const getClientDetails = async () => {
  const result = await clientAxiosInstance.get<ClientResponse>(
    "/client/details"
  );
  return result.data;
};


export const updateProfileImage = async(image:string) =>{
  const result = await clientAxiosInstance.post(
    "/update-profileImage",
    {image}
  );
  return result.data
}

export const getAllCategories = async() : Promise<ICategory[]>=>{
    const result = await clientAxiosInstance.get<ICategory[]>(
        "/all-categories"
    )
    return result.data
};


export const clientRefreshSession = async() : Promise<ClientResponse> =>{
  const response = await clientAxiosInstance.get<ClientResponse>(
    "/refresh-session"
  );
  return response.data
}
