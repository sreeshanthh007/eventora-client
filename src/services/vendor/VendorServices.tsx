import { vendorAxiosInstance } from "@/api/provider.axios";
import type { IAxiosResponse } from "@/types/Response";




export const VendorForgotPassword = async(data:{email:string,password:string})=>{
   const result = await vendorAxiosInstance.put<IAxiosResponse>(
    "/forgot-vendor_password",
    data
   )
    return result.data
}


export const VendorSentOTPForforgotPassword = async(email:string) : Promise<IAxiosResponse> =>{
    const response = await vendorAxiosInstance.post("/vendorForgot/sent-otp",{
        email
    });
    return response.data    
}

export interface IVendorProfileUpdateData{
    name:string,
    phone:string,
    bio:string,
    place:string
}


export const GetVendorDetails = async()=>{
    const response = await vendorAxiosInstance.get("/details")
    return response.data    
}

export const updateVendorProfile =async(data:IVendorProfileUpdateData)=>{
    const response = await vendorAxiosInstance.put("/update-profile",data)
    return response.data
}