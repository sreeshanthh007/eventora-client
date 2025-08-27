import { toggleEvent } from "@/services/vendor/VendorServices"
import type { IAxiosResponse } from "@/types/Response"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"


export const useToggleEventMutation = ()=>{
    return useMutation<IAxiosResponse,Error,{eventId:string,isActive:boolean}>({
        mutationFn:toggleEvent,
        onSuccess:(data)=>{
            toast.success(data.message)
        },
        onError:(err)=>{
            toast.error(err?.response?.data?.message)
        }
    });
}