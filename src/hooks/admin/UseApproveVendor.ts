import { useMutation } from "@tanstack/react-query"
import { useToast } from "../ui/UseToaster"
import type { IAxiosResponse } from "@/types/Response"
import { approveVendor } from "@/services/admin/adminService"


export const useApproveVendorMutation = ()=>{
    const {showToast} = useToast()

    return useMutation<IAxiosResponse,Error,string>({
        mutationFn:approveVendor,
        onSuccess:(data)=>{
            showToast(data.message,"success")
            return data
        },
        onError:(err)=>{
            showToast(err.message,"error")
        }
    })
}