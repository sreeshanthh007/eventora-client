import { getClientNotificaion } from "@/services/client/ClientServices"
import { useQuery } from "@tanstack/react-query"


export const useGetClientNotificaton = ()=>{

    return useQuery({
        queryKey:["get-client-notification"],
        queryFn:getClientNotificaion,
        staleTime:8*6000
    })
}