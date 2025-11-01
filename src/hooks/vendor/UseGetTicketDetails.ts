import { getTicketDetails } from "@/services/vendor/VendorServices"
import { useQuery } from "@tanstack/react-query"



interface GetTicketDetailsParams{
    eventId:string
    page:number,
    limit:number,
    search:string
}
export const useGetTicketDetails = ({eventId,page,limit,search} : GetTicketDetailsParams)=>{

    return useQuery({
        queryKey:["get-ticket-details",eventId,page,limit,search],
        queryFn:()=>getTicketDetails({eventId,page,limit,search}),
        staleTime: 60 * 1000,
    })
}