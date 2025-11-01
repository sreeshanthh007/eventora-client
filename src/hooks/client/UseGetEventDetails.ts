import { getEventDetails } from "@/services/client/ClientServices"
import { useQuery } from "@tanstack/react-query"


    export const useGetEventDetails = (eventId:string) =>{
        return useQuery({
            queryKey:["event-details",eventId],
            queryFn:()=>getEventDetails(eventId),
            staleTime: 1 * 60 * 1000, 
        });
        
    }
