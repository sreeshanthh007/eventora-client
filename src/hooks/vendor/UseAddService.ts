import type { ServiceFormData } from "@/components/forms/AddServiceForm"
import { addService } from "@/services/vendor/VendorServices"
import type { IAxiosResponse } from "@/types/Response"
import { useMutation } from "@tanstack/react-query"
import { useToast } from "../ui/UseToaster"



export const useAddServiceMutation = ()=>{
    const {showToast} = useToast()
    return useMutation<IAxiosResponse,Error,ServiceFormData>({
        mutationFn:addService,
        onSuccess:(data)=>{
            showToast(data.message,"success")
        },
        onError:(err)=>{
            showToast(err.response?.data?.message,"error")
        }
    })
}