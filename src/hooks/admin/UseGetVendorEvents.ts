import { getVendorEvents } from "@/services/admin/adminService"
import { useQuery } from "@tanstack/react-query"



interface GetVendorsEventsParams {
    page:number,
    limit:number,
    search:string,
    filterBy:string
}
export const useGetVendorsEvents = ({page,limit,search,filterBy}:GetVendorsEventsParams)=>{

    return useQuery({
        queryKey:["get-events-vendors",page,limit,search,filterBy],
        queryFn:()=>getVendorEvents({page,limit,search,filterBy})
    });
}