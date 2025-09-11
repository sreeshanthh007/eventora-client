import { toggleEvent } from "@/services/vendor/VendorServices"
import type { IAxiosResponse } from "@/types/Response"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useToast } from "../ui/UseToaster"


export const useToggleEventMutation = ()=>{
    const {showToast} = useToast()
    const queryClient  = useQueryClient()
    return useMutation<IAxiosResponse,Error,{eventId:string,isActive:boolean}>({
        mutationFn:toggleEvent,
        onSuccess:(data)=>{
           showToast(data.message,"success")
        //    queryClient.invalidateQueries({queryKey:["events"]})
        },
        onError:(err:any)=>{
            showToast(err.response?.data?.message,"error")
        }
    });
}