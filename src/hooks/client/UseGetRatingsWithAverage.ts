import { getAllRatingsWithAverage } from "@/services/client/ClientServices"
import { useQuery } from "@tanstack/react-query"


export const useGetRatingsWithAverage = (serviceId:string)=>{
    
    return useQuery({
        queryKey:["get-ratings-with-average",serviceId],
        queryFn:()=>getAllRatingsWithAverage(serviceId),
         staleTime: 5 * 60 * 1000, 
    });
}