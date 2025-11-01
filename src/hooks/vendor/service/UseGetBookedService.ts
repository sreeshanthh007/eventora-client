import { getBookedServices } from "@/services/vendor/VendorServices"
import { useQuery } from "@tanstack/react-query"



interface UseGetBookedServiceParams {
    page:number,
    limit:number,
    search:string
}

export const useGetBookedServices = ({page,limit,search} : UseGetBookedServiceParams)=>{

    return useQuery({
        queryKey:["get-booked-services",page,limit,search],
        queryFn:()=>getBookedServices({page,limit,search})
    });
}