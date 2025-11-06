import { cancelService } from "@/services/client/ClientServices"
import type { IAxiosResponse } from "@/types/Response"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useToast } from "../ui/UseToaster"


export const useCancelServiceMutation = ()=>{
    const {showToast} = useToast()
    const queryClient = useQueryClient()
    return useMutation<IAxiosResponse,Error,{serviceId:string,vendorId:string,bookingId:string}>({
        mutationFn:({serviceId,vendorId,bookingId}) => cancelService(serviceId,vendorId,bookingId),

        onSuccess:(data)=>{
            showToast(data.message,"success"),
            queryClient.invalidateQueries({queryKey:["get-client-booking-details"]})
        },
        onError:(err)=>{
            showToast(err.response?.data?.message,"error")
        }

    })
}