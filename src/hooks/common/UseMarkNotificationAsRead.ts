import { markNotificationAsRead } from "@/services/common/common.service"
import type { IAxiosResponse } from "@/types/Response"
import { useMutation } from "@tanstack/react-query"
import { useToast } from "../ui/UseToaster"



export const useMarkNotificationAsReadMutation = ()=>{
    const {showToast} = useToast()
    return useMutation<IAxiosResponse,Error,string>({
        mutationFn:markNotificationAsRead,
        onSuccess:(data)=>{
            showToast(data.message,"success")
        },
        onError:(err)=>{
            showToast(err.response?.data?.message,"error")
        }
    })
}
