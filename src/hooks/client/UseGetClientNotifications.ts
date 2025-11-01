import { getClientNotificaion } from "@/services/client/ClientServices"
import { useQuery } from "@tanstack/react-query"


export const useGetClientNotificaton = ()=>{

    return useQuery({
        queryKey:["get-client-notification"],
        queryFn:getClientNotificaion,
        staleTime:1*60*6000
    })
}