import { toggleService } from "@/services/vendor/VendorServices"
import type { IAxiosResponse } from "@/types/Response"
import { useMutation } from "@tanstack/react-query"
import { useToast } from "../ui/UseToaster"


export const useToggleServiceMutation = ()=>{
    const {showToast} = useToast()
    return useMutation<IAxiosResponse,Error,{serviceId:string,status:string}>({
        mutationFn:toggleService,
        // onSuccess:(data)=>{
        //     showToast(data.message,"success")
        // },
        onError:(err)=>{
            showToast(err.response?.data?.message,"error")
        }
    });
}