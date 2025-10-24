import { editEvents, type TEditableEventFields } from "@/services/vendor/VendorServices"
import type { IAxiosResponse } from "@/types/Response"
import { useMutation } from "@tanstack/react-query"
import { useToast } from "@/hooks/ui/UseToaster"
import { useNavigate } from "react-router-dom"



export const useEditEventMutation = ()=>{
    const {showToast} = useToast()
    const navigate = useNavigate()
    return useMutation<IAxiosResponse,Error,{eventId:string,data:TEditableEventFields}>({
        mutationFn:editEvents,
        onSuccess:(data)=>{
            showToast(data.message,"success")
            navigate("/vendor/events")
        },
        onError:(err)=>{
            showToast(err.response?.data?.message,"error")
        }
    });
}