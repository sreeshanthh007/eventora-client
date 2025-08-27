import { editService, type IEditServiceInformation } from "@/services/vendor/VendorServices"
import type { IAxiosResponse } from "@/types/Response"
import { useMutation } from "@tanstack/react-query"
import { useToast } from "../ui/UseToaster"



export const useEditServiceMutation = ()=>{
    const {showToast} = useToast()
    return useMutation<IAxiosResponse,Error,{serviceId:string,data:Partial<Pick<IEditServiceInformation,
        "additionalHourPrice" | "cancellationPolicies" | 
        "serviceDescription" | "serviceDuration"  | 
        "servicePrice" | "serviceTitle" |
        "termsAndConditions" | "yearsOfExperience"      
        >>}>({
            mutationFn:editService,
            onSuccess:(data)=>{
                showToast(data.message,"success")
            },
            onError:(err)=>{
                showToast(err.response?.data?.message,"error")
            }
        })
}