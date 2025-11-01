import { getVendorWalletDetails } from "@/services/vendor/VendorServices"
import { useQuery } from "@tanstack/react-query"


export const UseGetVendorWalletDetails = () => {

    return useQuery({
        queryKey: ['vendor-wallet-details'],
        queryFn:()=>getVendorWalletDetails()
    })
}