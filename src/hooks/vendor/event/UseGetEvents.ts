import { getEvents } from "@/services/vendor/VendorServices"
import { useQuery } from "@tanstack/react-query"


interface UseGetAllEventtsParams {
    page:number,
    limit:number,
    search:string
}

export const UseGetAllEvents = ({page,limit,search}:UseGetAllEventtsParams)=>{
    return useQuery({
        queryKey:["events",page,limit,search],
        queryFn:()=>getEvents({page,limit,search}),
        staleTime:60*1000
    });
}