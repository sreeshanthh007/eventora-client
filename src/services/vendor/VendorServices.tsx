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