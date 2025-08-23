import { vendorAxiosInstance } from "@/api/provider.axios";
import type { IAxiosResponse } from "@/types/Response";
import { type Client } from "../client/ClientServices";
import type { IVendor } from "@/types/User";
import { type IEventFormData } from "@/components/forms/AddEventForm";


export interface IVendorProfileUpdateData{
    name:string,
    phone:string,
    bio:string,
    place:string
}




export const refreshVendorSession = async ():Promise<IVendor> =>{
    const response = await vendorAxiosInstance.get<IVendor>(
        "/refresh_session"
    );
    return response.data
}



export const VendorSentOTPForforgotPassword = async(email:string) : Promise<IAxiosResponse> =>{
    const response = await vendorAxiosInstance.post("/vendorForgot/sent-otp",{
        email
    });
    return response.data 
}



export const GetVendorDetails = async()=>{
    const response = await vendorAxiosInstance.get("/details")
    return response.data    
}



export const resendVerification = async(vendorId:string)=>{
  const response = await  vendorAxiosInstance.patch(`${vendorId}/resend-verification`)
  return response.data
}

export interface IUpdateClientData
  extends Pick<
    Client,
    "name"  | "phone" | "about" | "profileImage" | "place"
  > {}

export const updateVendorProfile =async(data:IUpdateClientData)=>{
    const response = await vendorAxiosInstance.put("/update-profile",data)
    return response.data
}


export const addEvent = async(data:IEventFormData) : Promise<IAxiosResponse>=>{
    const response = await vendorAxiosInstance.post("/add-event",data)
    return response.data
}