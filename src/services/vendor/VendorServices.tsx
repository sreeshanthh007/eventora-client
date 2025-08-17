import { vendorAxiosInstance } from "@/api/provider.axios";
import type { IAxiosResponse } from "@/types/Response";
import { type Client } from "../client/ClientServices";



export interface IVendorProfileUpdateData{
    name:string,
    phone:string,
    bio:string,
    place:string
}

// export const refreshVendorSession = async ():Promise<UserDTO> =>{
//     const response = await vendorAxiosInstance.get<UserDTO>(
//         "/refresh_session"
//     );
//     return response.data
// }



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


export interface IUpdateClientData
  extends Pick<
    Client,
    "name"  | "phone" | "about" | "profileImage" | "place"
  > {}

export const updateVendorProfile =async(data:IUpdateClientData)=>{
    const response = await vendorAxiosInstance.put("/update-profile",data)
    return response.data
}