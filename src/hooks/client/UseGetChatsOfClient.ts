import { getAllChatsOfClient } from "@/services/client/ClientServices"
import { useQuery } from "@tanstack/react-query"


export const GetAllChatsOfClients = ()=>{

    return useQuery({
        queryKey:['get-chats-of-client'],
        queryFn:getAllChatsOfClient,
        staleTime:5*60*1000
    })
}