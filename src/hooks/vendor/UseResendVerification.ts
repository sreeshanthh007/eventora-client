import { resendVerification } from "@/services/vendor/VendorServices"
import type { IAxiosResponse } from "@/types/Response"
import { Mutation, useMutation } from "@tanstack/react-query"
import { useToast } from "../ui/UseToaster"



export const useResendVerificationMutation=()=>{
    const {showToast} = useToast()
    return useMutation<IAxiosResponse,Error,string>({
        mutationFn:resendVerification,
        onSuccess:(data)=>{
            showToast(data.message,"success")
        },
        onError:(err:Error)=>{
            showToast(err.response?.data?.message || err.message)
        }
    })
}