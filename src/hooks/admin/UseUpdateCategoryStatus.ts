import { useMutation } from "@tanstack/react-query"
import { useToast } from "../ui/UseToaster"
import type { IAxiosResponse } from "@/types/Response"
import { updateCategoryStatus } from "@/services/admin/adminService"



export const useUpdateCategoryMutation = ()=>{
    const {showToast} = useToast()

    return useMutation<IAxiosResponse,Error,{categoryId:string,status:string}>({
        mutationFn:updateCategoryStatus,
        onSuccess:(data)=>{
            showToast(data.message,"success")
        },
        onError:(err)=>{
            showToast(err.message,"error")
        }
    })
}