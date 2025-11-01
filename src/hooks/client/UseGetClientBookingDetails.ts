import { getClientBookingDetails } from "@/services/client/ClientServices"
import { useQuery } from "@tanstack/react-query"


interface GetClientBookingDetailsParams {
    page:number,
    limit:number,
    search:string
}


export const useGetClientBookingDetails = ({page,limit,search}:GetClientBookingDetailsParams)=>{

    return useQuery({
        queryKey:["get-client-booking-details",page,limit,search],
        queryFn:()=>getClientBookingDetails({page,limit,search}),
       staleTime:1*60*6000
    });
}