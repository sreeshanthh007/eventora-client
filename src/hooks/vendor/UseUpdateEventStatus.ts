import { updateEventStatus } from "@/services/vendor/VendorServices"
import type { IAxiosResponse } from "@/types/Response"
import { useMutation } from "@tanstack/react-query"
import { useToast } from "../ui/UseToaster"


export const useUpdateEventStatusMutation = ()=>{
    const {showToast} = useToast()
    return useMutation<IAxiosResponse,Error,{eventId:string,eventStatus:string}>({
        mutationFn:updateEventStatus,
        onSuccess:(data)=>{
            showToast(data.message,"success")
        },
        onError:(err:any)=>{
            showToast(err.response?.data?.message,"error")
        }
    });
}