import { toggleEvent } from "@/services/vendor/VendorServices"
import type { IAxiosResponse } from "@/types/Response"
import { useMutation } from "@tanstack/react-query"
import { useToast } from "@/hooks/ui/UseToaster"


export const useToggleEventMutation = ()=>{
    const {showToast} = useToast()
    return useMutation<IAxiosResponse,Error,{eventId:string,isActive:boolean}>({
        mutationFn:toggleEvent,
        onSuccess:(data)=>{
           showToast(data.message,"success")
        },
        onError:(err:any)=>{
            showToast(err.response?.data?.message,"error")
        }
    });
}