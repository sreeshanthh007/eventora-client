import { stopBookedService } from "@/services/vendor/VendorServices"
import type { IAxiosResponse } from "@/types/Response"
import { useMutation } from "@tanstack/react-query"
import { useToast } from "../ui/UseToaster"



export const useStopBookingMutation = ()=>{
    const {showToast} = useToast()
    return useMutation<IAxiosResponse,Error,{bookingId:string}>({
        mutationFn:({bookingId})=>stopBookedService(bookingId),

        onSuccess:(data)=>{
            showToast(data.message,"success")
        },
        onError:(err)=>{
            showToast(err.response?.data?.message,"error")
        }
    });
}