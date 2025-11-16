import { getVendorWalletDetails } from "@/services/vendor/VendorServices"
import type { TransactionType } from "@/types/wallet"
import { useQuery } from "@tanstack/react-query"


interface GetVendorWalletDetailsParams {
    page:number,
    limit:number,
    type:TransactionType
}


export const UseGetVendorWalletDetails = ({page,limit,type}:GetVendorWalletDetailsParams) => {

    return useQuery({
        queryKey: ['vendor-wallet-details',page,limit,type],
        queryFn:()=>getVendorWalletDetails({page,limit,type})
    })
}