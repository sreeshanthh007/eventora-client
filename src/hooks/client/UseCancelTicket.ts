import { cancelTicket } from "@/services/client/ClientServices"
import type { IAxiosResponse } from "@/types/Response"
import { useMutation } from "@tanstack/react-query"
import { useToast } from "../ui/UseToaster";


export const useCancelTicketMutation = () => {
    const {showToast} = useToast()
  return useMutation<IAxiosResponse, Error, { ticketId: string; eventId: string }>({
    mutationFn: async ({ ticketId, eventId }) => {
      return await cancelTicket(ticketId, eventId);
    },
    onSuccess:(data)=>{
        showToast(data.message,"success")
    },
    onError:(err)=>{
        showToast(err.response?.data?.message,"error")
    }
  });
};