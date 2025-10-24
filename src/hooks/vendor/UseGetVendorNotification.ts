import { getVendorNotification } from "@/services/vendor/VendorServices"
import { useQuery } from "@tanstack/react-query"


export const UseGetVendorNotification = ()=>{
    return useQuery({
        queryKey:["get-vendor-notification"],
        queryFn:getVendorNotification,
        staleTime:8*6000
    })
}