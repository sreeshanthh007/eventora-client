// import { vendorAxiosInstance } from "@/api/provider.axios";
import type { IAxiosResponse } from "@/types/Response";
import type { IVendor } from "@/types/User";
import { type IEventFormData } from "@/components/forms/AddEventForm";
import type { ServiceFormData } from "@/components/forms/AddServiceForm";
import { axiosInstance } from "@/api/interceptor";
import { VENDOR_ROUTES } from "@/utils/constants/api.routes";





export const refreshVendorSession = async ():Promise<IVendor> =>{
    const response = await axiosInstance.get<IVendor>(
        VENDOR_ROUTES.REFRESH_SESSION
    );
    return response.data
}



export const VendorSentOTPForforgotPassword = async(email:string) : Promise<IAxiosResponse> =>{
    const response = await axiosInstance.post("/api_v1/_ve/vendorForgot/sent-otp",{
        email
    });
    return response.data 
}



export const GetVendorDetails = async(vendorId:string)=>{
    const response = await axiosInstance.get(VENDOR_ROUTES.VENDOR_DETAILS(vendorId))
    return response.data    
}



export const resendVerification = async(vendorId:string)=>{
  const response = await  axiosInstance.patch(VENDOR_ROUTES.RESEND_VERIFICATION(vendorId))
  return response.data
}




export const updateProfileImage = async(image:string)=>{
    const response = await axiosInstance.post(
        VENDOR_ROUTES.UPDATE_PROFILE_IMAGE,
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
        VENDOR_ROUTES.UPDATE_VENDOR_PERSONAL_INFORMATION,
        data
    );
    return response.data
}




export const addEvent = async(data:IEventFormData) : Promise<IAxiosResponse>=>{
    const response = await axiosInstance.post(VENDOR_ROUTES.ADD_EVENT,data)
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
  const response = await axiosInstance.get(VENDOR_ROUTES.GET_EVENTS_FOR_VENDOR,{
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
  eventSchedule: Array<{
    date: string;
    startTime: string;
    endTime: string;
  }>;
  pricePerTicket: number;
  totalTicket: number;
  maxTicketPerUser: number;
  tickets: Array<{
    ticketType: string;
    price: number;
    totalTickets: number;
    maxTicketsPerUser: number;
  }>;
  eventLocation: string;
  location?: {
    type: "Point";
    coordinates: [number, number];
  }
  Images: File[] | string[];          // Support both File objects and string URLs

}

export type TEditableEventFields = Partial<
  Pick<
    IEditEventInformation,
    | "title" 
    | "description" 
    | "eventSchedule"
    | "pricePerTicket" 
    | "totalTicket" 
    | "maxTicketPerUser"
    | "tickets"
    | "eventLocation" 
    | "location" 
    | "Images"
       
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
    VENDOR_ROUTES.EDIT_EVENTS(eventId),
    data
  );
  return response.data;
};

export const getEventsbyId = async(eventId:string)=>{
  const response = await axiosInstance.get(VENDOR_ROUTES.GET_EVENTS_BY_ID(eventId))
  return response.data
}


export const addService  = async(data:ServiceFormData) : Promise<IAxiosResponse>=>{
    const response = await axiosInstance.post(
        VENDOR_ROUTES.ADD_SERVICE,
        data
    );
    return response.data
}


export const getCategoryForService = async()=>{
    const response = await axiosInstance.get(
        VENDOR_ROUTES.GET_CATEGORY_FOR_SERVICE
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
  const response = await axiosInstance.get(VENDOR_ROUTES.GET_SERVICE_FOR_VENDOR, {
    params: {
      page,
      limit,
      search,
    },
  });

  return response.data;
};


export const getservicesById = async(serviceId:string)=>{
  const response = await axiosInstance.get(VENDOR_ROUTES.GET_SERVICES_BY_ID(serviceId),)
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
    VENDOR_ROUTES.EDIT_SERVICE(serviceId),
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
  const response = await axiosInstance.patch(VENDOR_ROUTES.TOGGLE_SERVICE(serviceId), { status });
  return response.data
};

export const toggleEvent = async({
  eventId,
  isActive
}:{
  eventId:string,
  isActive:boolean
}) : Promise<IAxiosResponse>=>{
  const response = await axiosInstance.patch(VENDOR_ROUTES.TOGGLE_EVENT(eventId),{isActive})
  return response.data
}


export const updateEventStatus = async({
  eventId,
  eventStatus
}:{
  eventId:string,
  eventStatus:string
}) : Promise<IAxiosResponse>=>{
  const response =  await axiosInstance.patch(VENDOR_ROUTES.UPDATE_EVENT_STATUS(eventId),{eventStatus})

  return response.data
}