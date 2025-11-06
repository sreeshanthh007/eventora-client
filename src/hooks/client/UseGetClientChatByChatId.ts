import { getClientChatbyChatId } from "@/services/client/ClientServices"
import { useQuery } from "@tanstack/react-query"


export const useGetClientChatByChatId = (userId:string,chatId?:string)=>{

    return useQuery({
        queryKey:["get-client-chat-chatId",userId,chatId],
        queryFn:()=>getClientChatbyChatId({userId,chatId}),
        enabled: !!userId, 
        staleTime:5*60*1000
    });
}