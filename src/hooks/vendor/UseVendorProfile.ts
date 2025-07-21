import { GetVendorDetails, updateVendorProfile, type IVendorProfileUpdateData } from "@/services/vendor/VendorServices"
import type { IAxiosResponse } from "@/types/Response";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"


export const useVendorProfileDetailsQuery = ()=>{
        return useQuery({
            queryKey:["vendor-profile"],
            queryFn:GetVendorDetails
        });
}



export const useVendorProfileMutation = ()=>{
    const queryClient = useQueryClient()
    return useMutation<IAxiosResponse,Error,IVendorProfileUpdateData>({
        mutationFn:updateVendorProfile,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["vendor-profile"]})
        }
    })
}