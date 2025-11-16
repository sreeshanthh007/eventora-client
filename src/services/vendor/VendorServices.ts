
import type { IAxiosResponse, IWorkSampleResponse } from "@/types/Response";
import type { IVendor } from "@/types/User";
import type { IEventFormData } from "@/components/forms/AddEventForm";
import type { ServiceFormData } from "@/components/forms/AddServiceForm";
import { axiosInstance } from "@/api/interceptor";
import { VENDOR_ROUTES } from "@/utils/constants/api.routes";
import type { IUpdateVendorPersonalInformation } from "@/types/vendor";
import type { TEditableEventFields } from "@/types/event";
import type { IWorkSampleData } from "@/types/workSamples";





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


export const vendorChangePassword = async(data:{currentPassword:string,newPassword:string}) : Promise<IAxiosResponse>=>{
    
    const response = await axiosInstance.patch(VENDOR_ROUTES.CHANGE_PASSWORD,data)

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
  limit = 3,
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

export interface IServiceSchedule {
  frequency: "ONCE" | "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
  startDate: string;      
  endDate: string;        
  startTime: string;      
  endTime: string;       
  workingDays?: number[];  
  holidays?: string[];     
  duration: number;        
  capacity: number;
}


export interface IEditServiceInformation {
  serviceTitle?: string;
  serviceDescription?: string;
  servicePrice?: number;
  serviceDuration?: number;
  additionalHourPrice?: number;
  cancellationPolicies?: string[];
  termsAndConditions?: string[];
  yearsOfExperience?: number;
  schedule?: IServiceSchedule[]; 
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
    "termsAndConditions" | "yearsOfExperience" | "schedule"
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



export const addWorkSample = async(data:IWorkSampleData) : Promise<IAxiosResponse>=>{

  const response = await axiosInstance.post(VENDOR_ROUTES.ADD_WORK_SAMPLE,{data});
  return response.data
} 


export const getWorkSampleDetailsByVendors = async() : Promise<IWorkSampleResponse>=>{
  const response  = await axiosInstance.get(VENDOR_ROUTES.GET_WORKSAMPLE_BY_VENDOR);

  return response.data
}


export const getVendorNotification = async()=>{
  const response = await axiosInstance.get(
    VENDOR_ROUTES.GET_VENDOR_NOTIFICATION
  );
  return response.data
}

export const getVendorWalletDetails = async({
  type="all",
  page=1,
  limit=6
}:{
  type:string,
  page:number,
  limit:number
})=>{
  const response = await axiosInstance.get(
    VENDOR_ROUTES.GET_VENDOR_WALLET_DETAILS,
    {
      params:{
        type,
        page,
        limit,

      }
    }
  );
  return response.data
}



export interface IEditWorksample{
  title:string
  description:string
  images:string[]
}

export type TEditableWorkSampleFields = Partial<Pick<IEditWorksample,"description" | "images" | "title">>


export const editWorkSample = async ({
  worksampleId,
  data,
}: {
  worksampleId: string;
  data: TEditableWorkSampleFields;
}): Promise<IAxiosResponse> => {
  const response = await axiosInstance.patch(
    `${VENDOR_ROUTES.EDIT_WORK_SAMPLE(worksampleId)}`,
    data
  );
  return response.data; 
};



export const scanAndVerifyAttendies = async(data:{vendorId:string,eventId:string})=>{

  const response = await axiosInstance.post(VENDOR_ROUTES.SCAN_EVENT_QR,data)

  return response.data
}


export const scanAndVerifyTicket = async(data:{eventId:string,ticketId:string,ticketType:string})=>{

  const response = await axiosInstance.post(VENDOR_ROUTES.SCAN_AND_VERIFY_TICKET,data)

  return response.data
}


export const getTicketDetails = async({
  eventId,
  page=1,
  limit=6,
  search=""
}:{
  eventId:string
  page:number,
  limit:number,
  search:string
}) =>{
  const response = await axiosInstance.get(VENDOR_ROUTES.GET_TICKET_DETAILS,{
    params:{
      eventId,
      page,
      limit,
      search
    }
  });

  return response.data
}


export const getBookedServices = async({
  page=1,
  limit=6,
  search=""
} : {
  page:number
  limit:number
  search:string
}) =>{
  const response = await axiosInstance.get(VENDOR_ROUTES.GET_BOOKINGS,{
    params:{
      page,
      limit,
      search
    }
  });
  return response.data
} 

export  const starBookedService = async(bookingId:string)=>{

  const response = await axiosInstance.patch(
    VENDOR_ROUTES.START_BOOKED_SERVICE(bookingId)
  );
    return response.data
}

export const stopBookedService = async(bookingId:string)=>{

  const response = await axiosInstance.patch(
    VENDOR_ROUTES.STOP_BOOKED_SERVICE(bookingId)
  );

  return response.data
}


export const getAllChatsOfVendor = async()=>{
  const response = await axiosInstance.get(
    VENDOR_ROUTES.GET_CHATS_OF_VENDOR
  );

  return response.data
}


export const getVendorChatByChatId = async({
  userId,
  chatId
}:{
  userId:string,
  chatId?:string
})=>{
  const response = await axiosInstance.get(
    VENDOR_ROUTES.GET_VENDOR_CHAT_ID,

    {
      params:{
        userId,
        chatId
      }
    }
  );
  return response.data
}


export const getVendorAnalyticsDashboard = async({
  period="month",
  startDate,
  endDate
}:{
  period:string,
  startDate?:string,
  endDate?:string
})=>{
  const resoponse = await axiosInstance.get(
    VENDOR_ROUTES.GET_VENDOR_ANALYTICS_DASHBOARD,
    {
      params:{
        period,
        startDate,
        endDate
      }
    }
  );
  return resoponse.data
}