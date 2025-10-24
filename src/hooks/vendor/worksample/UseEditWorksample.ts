import { useToast } from "@/hooks/ui/UseToaster"
import { editWorkSample,  type TEditableWorkSampleFields } from "@/services/vendor/VendorServices"
import type { IAxiosResponse } from "@/types/Response"
import { useMutation } from "@tanstack/react-query"



export const useEditWorksampleMutation = ()=>{

    const {showToast} = useToast()
    
    return useMutation<IAxiosResponse,Error,{worksampleId:string,data:TEditableWorkSampleFields}>({

        mutationFn:editWorkSample,
        onSuccess:(data)=>{
            showToast(data.message,"success")
        },
        onError:(err)=>{
            showToast(err.response?.data?.message,"error")
        }
    })
}