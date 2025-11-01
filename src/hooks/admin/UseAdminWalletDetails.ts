import { getAdminWalletDetails } from "@/services/admin/adminService"
import { useQuery } from "@tanstack/react-query"


export const useAdminWalletDetails = () => {

    return useQuery({
        queryKey: ['admin-wallet-details'],
        queryFn:()=>getAdminWalletDetails()
    });
}