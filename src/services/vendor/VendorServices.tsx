// import { vendorAxiosInstance } from "@/api/provider.axios";
import type { IAxiosResponse } from "@/types/Response";
import type { IVendor } from "@/types/User";
import { type IEventFormData } from "@/components/forms/AddEventForm";
import type { ServiceFormData } from "@/components/forms/AddServiceForm";
import { axiosInstance } from "@/api/interceptor";





export const refreshVendorSession = async ():Promise<IVendor> =>{
    const response = await axiosInstance.get<IVendor>(
        "/api_v1/_ve/refresh_session"
    );
    return response.data
}



export const VendorSentOTPForforgotPassword = async(email:string) : Promise<IAxiosResponse> =>{
    const response = await axiosInstance.post("/api_v1/_ve/vendorForgot/sent-otp",{
        email
    });
    return response.data 
}



export const GetVendorDetails = async()=>{
    const response = await axiosInstance.get("/api_v1/_ve/details")
    return response.data    
}



export const resendVerification = async(vendorId:string)=>{
  const response = await  axiosInstance.patch(`/api_v1/_ve/${vendorId}/resend-verification`)
  return response.data
}




export const updateProfileImage = async(image:string)=>{
    const response = await axiosInstance.post(
        "/api_v1/_ve/update-profileImage",
        {image}
    );

    return response.data
};


export interface IUpdateVendorPersonalInformation {
    name:string
    phone:string
    about:string
    place:string
}
export const updateVendorPersonalInformation = async(data:Partial<Pick<IUpdateVendorPersonalInformation,"about" | "name" | "phone" | "place">>)=>{
    const response = await axiosInstance.patch(
        "/api_v1/_ve/update-profile",
        data
    );
    return response.data
}




export const addEvent = async(data:IEventFormData) : Promise<IAxiosResponse>=>{
    const response = await axiosInstance.post("/api_v1/_ve/add-event",data)
    return response.data
}


export const getEvents = async({
  page=1,
  limit=6,
  search=""
}:{
  page:number,
  limit:number,
  search:string
})=>{
  const response = await axiosInstance.get("/api_v1/_ve/get-all-events",{
    params:{
      page,
      limit,
      search
    }
  });
  return response.data
}


export interface IEditEventInformation {
  title: string;
  description: string;
  date: Date;
  startTime: string;
  endTime: string;
  pricePerTicket: number;
  totalTicket: number;
  eventLocation: string;
  location: {
    type: "Point";
    coordinates: [number, number]; 
  };
  Images:string[];

}

export type TEditableEventFields = Partial<
  Pick<
    IEditEventInformation,
    "title" | "description" | "date" | "startTime" | "endTime" | "pricePerTicket" | "totalTicket" | "eventLocation" | "location" | "Images"
  >
>;

export const editEvents = async ({
  eventId,
  data,
}: {
  eventId: string;
  data: TEditableEventFields;
}) => {
  const response = await axiosInstance.patch(
    `/api_v1/_ve/edit-events/${eventId}`,
    data
  );
  return response.data;
};

export const getEventsbyId = async(eventId:string)=>{
  const response = await axiosInstance.get(`/api_v1/_ve/get-events-by-id/${eventId}`)
  return response.data
}


export const addService  = async(data:ServiceFormData) : Promise<IAxiosResponse>=>{
    const response = await axiosInstance.post(
        "/api_v1/_ve/add-service",
        data
    );
    return response.data
}


export const getCategoryForService = async()=>{
    const response = await axiosInstance.get(
        "/api_v1/_ve/get-category-service"
    );
    return response.data
}


export const getservices = async ({
  page = 1,
  limit = 2,
  search = "",
}: {
  page: number
  limit: number
  search: string
}) => {
  const response = await axiosInstance.get("/api_v1/_ve/get-services", {
    params: {
      page,
      limit,
      search,
    },
  });

  return response.data;
};


export const getservicesById = async(serviceId:string)=>{
  const response = await axiosInstance.get(`/api_v1/_ve/service-by-id/${serviceId}`,)
  return response.data
}


export interface IEditServiceInformation {
    serviceTitle:string;
    serviceDescription:string
    servicePrice:number
    serviceDuration:number
    additionalHourPrice:number
    cancellationPolicies:string[]
    termsAndConditions:string[]
    yearsOfExperience:number
}

export const editService = async ({
  serviceId,
  data,
}: {
  serviceId: string;
  data: Partial<Pick<IEditServiceInformation,
    "additionalHourPrice" | "cancellationPolicies" | 
    "serviceDescription"  | "serviceDuration" | 
    "servicePrice" | "serviceTitle" | 
    "termsAndConditions" | "yearsOfExperience"
  >>
}) => {
  const response = await axiosInstance.patch(
    `/api_v1/_ve/edit-service/${serviceId}`,
    data
  );
  return response.data;
};


export const toggleService = async ({
  serviceId,
  status,
}: {
  serviceId: string;
  status: string;
}): Promise<IAxiosResponse> => {
  return axiosInstance.patch(`/api_v1/_ve/toggle-service/${serviceId}`, { status });
};

export const toggleEvent = async({
  eventId,
  isActive
}:{
  eventId:string,
  isActive:boolean
}) : Promise<IAxiosResponse>=>{
  return axiosInstance.patch(`/api_v1/_ve/toggle-status/${eventId}`,{isActive})
}