
// import { clientAxiosInstance } from "@/api/client.axios";
import { axiosInstance } from "@/api/interceptor";
import type { IAxiosResponse } from "@/types/Response";
import type { ICategory, IEvent } from "@/types/User";
import { CLIENT_ROUTES } from "@/utils/constants/api.routes";
import { current } from "@reduxjs/toolkit";

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


export const changePassword = async (data: { currentPassword: string; newPassword: string }): Promise<IAxiosResponse> => {
  const response = await axiosInstance.patch(CLIENT_ROUTES.CHANGE_PASSWORD, data);
  return response.data;
};

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


export const getAllEventForEventPage = async({
  page= 1,
  limit = 6,
  search = "",
  location = "all",
  sort = "date-asc",
   lat,
  lng,
}:{
  page:number,
  limit:number,
  search:string,
  location:string,
  sort:string,
    lat?: number;
  lng?: number;
}) =>{

  const response = await axiosInstance.get(CLIENT_ROUTES.GET_ALL_EVENTS_FOR_CLIENT,{
    params:{
      page,
      limit,
      search,
      location,
      sort,
      lat,
      lng, // send coordinates here
    },
  })
  return response.data
}


export const getEventDetails = async(eventId:string) =>{

  const response = await axiosInstance.get(CLIENT_ROUTES.GET_EVENT_DETAILS(eventId))

  return response.data
}

export const getAllServiceForServicePage = async ({
  page = 1,
  limit = 6,
  search = "",
  sort = "date-asc",
}: {
  page: number
  limit: number
  search: string
  sort: string
}) => {
  const response = await axiosInstance.get(
    CLIENT_ROUTES.GET_ALL_SERVICES_FOR_CLIENT,
    {
      params: {
        page,
        limit,
        search,
        sort,
      },
    }
  )

  return response.data
}



export const getServiceDetails = async(serviceId:string) =>{

  const response = await axiosInstance.get(
    CLIENT_ROUTES.GET_SERVICE_DETAILS(serviceId)
  );

  return response.data
}


export const getBookedEvents = async({
  page = 1,
  limit = 6,
  search = "",
}:{
  page:number,
  limit:number,
  search:string,
}) =>{
  const response = await axiosInstance.get(
    CLIENT_ROUTES.GET_BOOKED_EVENTS,
    {
      params:{
        page,
        limit,
        search,
      }
    }
  );
  return response.data
}

export const clientRefreshSession = async() : Promise<ClientResponse> =>{
  const response = await axiosInstance.get<ClientResponse>(
    CLIENT_ROUTES.REFRESH_SESSION
  );
  return response.data
}
