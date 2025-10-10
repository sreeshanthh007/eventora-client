import { GetVendorDetails } from "@/services/vendor/VendorServices"
import { useQuery } from "@tanstack/react-query"


export const useGetVendorDetails= (vendorId:string)=>{
    return useQuery({
        queryKey:["vendor-details",vendorId],
        queryFn:()=>GetVendorDetails(vendorId)
    })
}