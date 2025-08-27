import { getAllEvents } from "@/services/client/ClientServices"
import { useQuery } from "@tanstack/react-query"


export const UseGetAllEvents = ()=>{
    return useQuery({
        queryKey:["get-events"],
        queryFn:getAllEvents,
        staleTime:5 * 60 * 1000,
    })
}