import { getservicesById } from "@/services/vendor/VendorServices"
import { useQuery } from "@tanstack/react-query"



export const UseGetServiceById = (serviceId:string)=>{
    return useQuery({
        queryKey:["serviceById",serviceId],
        queryFn:()=>getservicesById(serviceId),
    });
}

