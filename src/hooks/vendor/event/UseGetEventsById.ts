import { getEventsbyId } from "@/services/vendor/VendorServices"
import { useQuery } from "@tanstack/react-query"


export const UseGetEventsById = (eventId:string)=>{
    return useQuery({
        queryKey:["events-by-id"],
        queryFn:()=>getEventsbyId(eventId)
    })
}