import { addCategory } from "@/services/admin/adminService"
import type { IAuthResponse } from "@/services/auth/authServices"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useToast } from "../ui/UseToaster"
import { useNavigate } from "react-router-dom"


export const UseAddCategoryMutation = ()=>{
    const {showToast} = useToast()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    return useMutation<IAuthResponse,Error,{title:string,image:string}>({
        mutationFn:addCategory,
        onSuccess:(data)=>{
            showToast(data.message,"success")
            navigate("/admin/category")
            queryClient.invalidateQueries({queryKey:["categories"]})
        },
        onError:(err)=>{
            showToast(err.message,"error")
        }
    })
    
}