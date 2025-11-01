import { scanAndVerifyTicket } from "@/services/vendor/VendorServices"
import type { IAxiosResponse } from "@/types/Response"
import { useMutation, useQueryClient } from "@tanstack/react-query"


export const useVerifyTicketMutation = ()=>{
    const queryClient = useQueryClient()
    return useMutation<IAxiosResponse,Error,{eventId:string,ticketId:string,ticketType:string}>({
        mutationFn:scanAndVerifyTicket,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["get-ticket-details"]})
        }
        
    })
}