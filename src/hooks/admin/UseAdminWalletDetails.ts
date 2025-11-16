import { getAdminWalletDetails } from "@/services/admin/adminService"
import type { TransactionType } from "@/types/wallet";
import { useQuery } from "@tanstack/react-query"

    interface GetAdminWalletDetailsParams {
        page:number,
        limit:number,
        type:TransactionType
    }
export const useAdminWalletDetails = ({page,limit,type}:GetAdminWalletDetailsParams) => {

    return useQuery({
        queryKey: ['admin-wallet-details',page,limit,type],
        queryFn:()=>getAdminWalletDetails({page,limit,type})
    });
}