import { vendorChangePassword } from "@/services/vendor/VendorServices"
import type { IAxiosResponse } from "@/types/Response"
import { useMutation } from "@tanstack/react-query"
import { useToast } from "@/hooks/ui/UseToaster"



export const useVendorChangePasswordMutation = () =>{
    const {showToast} = useToast()

    return useMutation<IAxiosResponse,Error,{currentPassword:string,newPassword:string}>({

        mutationFn:vendorChangePassword,

        onSuccess:(data)=>{
            showToast(data.message,"success")
        },

        onError:(err)=>{
            showToast(err.response?.data?.message,"error")
        }

    })
}