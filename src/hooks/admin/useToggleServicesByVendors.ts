import { useMutation } from "@tanstack/react-query";
import { useToast } from "../ui/UseToaster";
import { toggleServiceByAdmin } from "@/services/admin/adminService";
import type { IAxiosResponse } from "@/types/Response";


export const useToggleServicesByVendors = () => {

    const {showToast} = useToast();

    return  useMutation<IAxiosResponse,Error,{serviceId:string,status:string}>({
        mutationFn:toggleServiceByAdmin,
        
        onSuccess:(data)=>{
            showToast(data.message,"success")
        },
        onError:(err:Error)=>{
            showToast(err.response?.data?.message || err.message)
        }
    })
}