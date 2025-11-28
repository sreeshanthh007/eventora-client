
import { updateVendorStatus } from "@/services/admin/adminService"
import type { IAxiosResponse } from "@/types/Response"
import { useMutation } from "@tanstack/react-query" 
import { useToast } from "../ui/UseToaster"


export const useUpdateVendorMutation = ()=>{
    const {showToast} = useToast()
    return useMutation<IAxiosResponse,Error,{vendorId:string,status:string}>({
        mutationFn:updateVendorStatus,
        onSuccess:(data)=>{ 
            showToast(data.message,"success")
            return data
        },
        onError:(err)=>{
            showToast(err.response?.data?.message || "Something went wrong","error")
        }
    })
} 