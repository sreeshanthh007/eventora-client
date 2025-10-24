import { addWorkSample } from "@/services/vendor/VendorServices"
import type { IAxiosResponse } from "@/types/Response"
import type { IWorkSampleData } from "@/types/workSamples"
import { useMutation } from "@tanstack/react-query"
import { useToast } from "../../ui/UseToaster"



export const useAddWorkSampleMutation = ()=>{
    const {showToast} = useToast()
    return useMutation<IAxiosResponse,Error,IWorkSampleData>({
        mutationFn:addWorkSample,
        onSuccess:(data)=>{
            showToast(data.message,"success")
        },
        onError(err:Error){
            showToast(err.response?.data?.message,"error")
        }
    });
}