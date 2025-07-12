
import { getClientDetails } from "@/services/client/ClientServices";

import { useMutation , useQuery , useQueryClient } from "@tanstack/react-query";


export const UseClientProfileQuery =()=>{
    return useQuery({
        queryKey:["client-profile"],
        queryFn:getClientDetails
    })  
}


