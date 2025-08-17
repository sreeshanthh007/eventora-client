
import { updateUserStatus } from "@/services/admin/adminService"
import type { IAxiosResponse } from "@/types/Response"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useToast } from "../ui/UseToaster"




export const useUpdateUserMutation = ()=>{

    const {showToast} = useToast()
    return useMutation<IAxiosResponse,Error,{userId:string,status:string}>({
        mutationFn:updateUserStatus,
        onSuccess:(data)=>{
            showToast(data.message,"success")
            return data
        },
        onError:()=>{
            showToast("error to  update user","error")
        }
    })
}