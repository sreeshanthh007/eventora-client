import { getVendorWorkfolioForClient } from "@/services/client/ClientServices"
import { useQuery } from "@tanstack/react-query"


export const UsegetVendorWorkfolioForClient = (vendorId:string)=>{

    return useQuery({
        queryKey:["get-vendor-portfolio",vendorId],
        queryFn:()=>getVendorWorkfolioForClient(vendorId),
        staleTime:3*6000
    });
}