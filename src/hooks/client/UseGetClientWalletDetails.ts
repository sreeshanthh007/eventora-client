import { getClientWalletDetails } from "@/services/client/ClientServices";
import { useQuery } from "@tanstack/react-query"




interface GetClientWalletDetailsParams {
    page:number,
    limit:number,
    type:string
}

export const useGetClientWalletDetails = ({page,limit,type} : GetClientWalletDetailsParams)=>{
    return useQuery({
        queryKey:["get-client-wallet-details",page,limit,type],
        queryFn:()=>getClientWalletDetails({page,limit,type}),
        staleTime: 3 * 60 * 1000
    });
}