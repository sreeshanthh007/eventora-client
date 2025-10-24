import { getClientWalletDetails } from "@/services/client/ClientServices";
import { useQuery } from "@tanstack/react-query"



export const useGetClientWalletDetails = ()=>{
    return useQuery({
        queryKey:["get-client-wallet-details"],
        queryFn:()=>getClientWalletDetails()
    });
}