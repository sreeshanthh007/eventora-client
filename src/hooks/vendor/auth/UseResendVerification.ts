import { resendVerification } from "@/services/vendor/VendorServices"
import type { IAxiosResponse } from "@/types/Response"
import {  useMutation } from "@tanstack/react-query"
import { useToast } from "@/hooks/ui/UseToaster"



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