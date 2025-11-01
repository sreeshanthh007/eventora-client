import { getServiceDetails } from "@/services/client/ClientServices"
import { useQuery } from "@tanstack/react-query"



export const useGetServiceDetails = (serviceId:string)=>{
    return useQuery({
        queryKey:["service-details",serviceId],
        queryFn:()=>getServiceDetails(serviceId),
        staleTime:5*60*1000
    });
}