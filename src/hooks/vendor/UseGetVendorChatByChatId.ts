import { getVendorChatByChatId } from "@/services/vendor/VendorServices"
import { useQuery } from "@tanstack/react-query"


export const useGetVendorChatByChatId = (userId:string,chatId:string)=>{

    return useQuery({
        queryKey:["get-vendor-chat-chatId",userId,chatId],
        queryFn:()=>getVendorChatByChatId({userId,chatId}),
         enabled: !!userId, 
        staleTime:5*60*1000
    })
}