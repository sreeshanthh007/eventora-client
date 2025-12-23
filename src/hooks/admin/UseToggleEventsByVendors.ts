import { useMutation } from "@tanstack/react-query";
import { useToast } from "../ui/UseToaster"
import type { IAxiosResponse } from "@/types/Response";
import { toggleEventsByVendors } from "@/services/admin/adminService";


export const useToggleEventsByVendors = () => {

    const {showToast} = useToast();

    return useMutation<IAxiosResponse,Error,{eventId:string,isActive:boolean}>({
        mutationFn:toggleEventsByVendors,
        onSuccess:(data)=>{
            showToast(data.message,"success")
        },
        onError:(err:Error)=>{
            showToast(err.response?.data?.message || err.message)
        }
    })
}