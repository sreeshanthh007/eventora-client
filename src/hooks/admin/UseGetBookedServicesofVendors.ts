import { getBookedServicesofVendors } from "@/services/admin/adminService"
import { useQuery } from "@tanstack/react-query"


interface GetBookedServicesofVendorsParams {
    page:number,
    limit:number,
    search:string
    filterType:string
}
export const useGetBookedServicesofVendor = ({page,limit,search,filterType}:GetBookedServicesofVendorsParams)=>{

    return useQuery({
        queryKey:["get-booked-services-vendors",page,limit,search,filterType],
        queryFn:()=>getBookedServicesofVendors({page,limit,search,filterType}),
        staleTime:1000*60
    })
}