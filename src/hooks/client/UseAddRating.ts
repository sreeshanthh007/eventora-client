import { addRating } from "@/services/client/ClientServices";
import type { IAxiosResponse } from "@/types/Response";
import type { IReviewData } from "@/types/service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../ui/UseToaster";
import type { AxiosError } from "axios";


export const useAddRatingMutation = ()=>{
    const {showToast} = useToast()
    const queryClient = useQueryClient()
    return useMutation<IAxiosResponse,Error,IReviewData>({
        mutationFn:addRating,
        onSuccess:(data)=>{
            showToast(data.message,"success")
            queryClient.invalidateQueries({queryKey:["get-ratings-with-average"]})
        },
        onError:(err)=>{
            if(err as AxiosError){
                showToast(err.response?.data?.message,"error")
            }
        }
    })
}